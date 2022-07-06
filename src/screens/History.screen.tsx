import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useAppContext } from '../components/App.provider';
import { MoodItemRow } from '../components/MoodItemRow';

export const History: React.FC = () => {
  const { moodList } = useAppContext();
  return (
    <ScrollView style={styles.container}>
      {moodList.length > 0 &&
        moodList
          .slice()
          .reverse()
          .map(item => <MoodItemRow item={item} key={item.timestamp} />)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
