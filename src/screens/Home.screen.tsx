import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Home - Hello World!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
});
