import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { Home } from './Home.screen';
import { History } from './History.screen';
import { Analytics } from './Analytics.screen';

import { theme } from '../theme';

import { HomeIcon, ListIcon, AnalyticsIcon } from '../components/Icons';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colorBlue,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarShowLabel: false,
        tabBarIcon: ({ size }) => {
          if (route.name === 'Home') {
            return <HomeIcon size={size} />;
          }

          if (route.name === 'History') {
            return <ListIcon size={size} />;
          }

          if (route.name === 'Analytics') {
            return <AnalyticsIcon size={size} />;
          }

          return null;
        },
      })}>
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{ title: "Today's Mood" }}
      />
      <BottomTabs.Screen
        name="History"
        component={History}
        options={{ title: 'Past Moods' }}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={Analytics}
        options={{ title: 'Fancy Charts' }}
      />
    </BottomTabs.Navigator>
  );
};
