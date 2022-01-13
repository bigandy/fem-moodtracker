import React, {
  useContext,
  createContext,
  useCallback,
  useState,
  useEffect,
} from 'react';

import { MoodOptionWithTimestamp, MoodOptionType } from '../types';

import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'my-app-data';

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (selectedMood: MoodOptionType) => void;
  handleDeleteMood: (mood: MoodOptionWithTimestamp) => void;
};

type AppData = { moods: MoodOptionWithTimestamp[] };

const getAppData = async (): Promise<AppData | null> => {
  try {
    const data = await AsyncStorage.getItem(storageKey);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch {
    return null;
  }
};

const setAppData = async (newData: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch {}
};

const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
  handleDeleteMood: () => {},
});

export const AppProvider: React.FC = ({ children }) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moods);
      }
    };
    getDataFromStorage();
  }, []);

  const handleSelectMood = useCallback((selectedMood: MoodOptionType) => {
    setMoodList(prevMoodList => {
      const newMoodList = [
        ...prevMoodList,
        { mood: selectedMood, timestamp: Date.now() },
      ];
      setAppData({ moods: newMoodList });
      return newMoodList;
    });
  }, []);

  const handleDeleteMood = useCallback((mood: MoodOptionWithTimestamp) => {
    setMoodList(prevMoods => {
      const newMoodList = prevMoods.filter(
        item => item.timestamp !== mood.timestamp,
      );
      setAppData({ moods: newMoodList });
      return newMoodList;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{ moodList, handleSelectMood, handleDeleteMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
