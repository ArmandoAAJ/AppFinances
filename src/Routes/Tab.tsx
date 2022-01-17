import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

import {HomeScreen} from '../Home';
import {Descriptions} from '../Descriptions';

export const MyTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderRadius: 50,
          position: 'absolute',
          right: 10,
          left: 10,
          bottom: 10,
          elevation: 1,
          borderTopWidth: 0,
          backgroundColor: '#eeeeee',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Icon
              name="home-outline"
              size={focused ? 30 : 25}
              color={focused ? '#E64924' : '#6D6D6D'}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Description"
        component={Descriptions}
        options={() => ({
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Icon
              name="list"
              size={focused ? 30 : 25}
              color={focused ? '#E64924' : '#6D6D6D'}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
