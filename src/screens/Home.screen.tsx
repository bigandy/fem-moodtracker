import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import format from 'date-fns/format';

import { MoodPicker } from '../components/MoodPicker';
import { MoodOptionWithTimestamp, MoodOptionType } from '../types';

export const Home: React.FC = () => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((selectedMood: MoodOptionType) => {
    setMoodList(prevMoodList => {
      const newMoodList = [
        ...prevMoodList,
        { mood: selectedMood, timestamp: Date.now() },
      ];
      return newMoodList;
    });
  }, []);

  return (
    <View style={styles.container}>
      <MoodPicker handleSelectMood={handleSelectMood} />
      {moodList.length > 0 &&
        moodList.map(({ mood, timestamp }) => (
          <Text key={timestamp}>
            {mood.emoji} -{' '}
            {format(new Date(timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
          </Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
