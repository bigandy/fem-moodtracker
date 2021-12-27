import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAppContext } from '../components/App.provider';
import { MoodItemRow } from '../components/MoodItemRow';

export const History: React.FC = () => {
  const { moodList } = useAppContext();
  return (
    <View style={styles.container}>
      {moodList.length > 0 &&
        moodList.map(item => <MoodItemRow item={item} key={item.timestamp} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
