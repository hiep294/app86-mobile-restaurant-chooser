import React from 'react';
import { Provider as DecisionProvider } from './src/context/DecisionContext'
import { setNavigator } from 'app/navigationRef'

import { Image, Platform, StatusBar } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import PeopleAddScreen from './src/screens/People/PeopleAddScreen'
import DecisionTimeScreen from './src/screens/Decision/DecisionTimeScreen'
import RestaurantAddScreen from './src/screens/Restaurant/RestaurantAddScreen'
import RestaurantListScreen from './src/screens/Restaurant/RestaurantListScreen'
import PeopleListScreen from './src/screens/People/PeopleListScreen';
import WhosGoingScreen from './src/screens/Decision/WhosGoingScreen';
import PreFiltersScreen from './src/screens/Decision/PreFiltersScreen';
import ChoiceScreen from './src/screens/Decision/ChoiceScreen';
import PostChoiceScreen from './src/screens/Decision/PostChoiceScreen';

const platformOS = Platform.OS.toLowerCase()
console.log(`RestaurantChooser starting on ${platformOS}`)

const TabNavigator = createBottomTabNavigator({
  PeopleScreens: {
    screen: createStackNavigator({
      PeopleListScreen,
      PeopleAddScreen
    }, {
      headerMode: 'none'
    }),
    navigationOptions: {
      tabBarLabel: 'People',
      tabBarIcon: ({ tintColor }) => {
        return <Image
          source={require('app/images/icon-people.png')}
          style={{ width: 20, height: 20, tintColor }}
        />
      }
    }
  },
  DecisionScreens: {
    screen: createStackNavigator({
      DecisionTimeScreen,
      WhosGoingScreen,
      PreFiltersScreen,
      ChoiceScreen,
      PostChoiceScreen
    }, {
      headerMode: 'none'
    }),
    navigationOptions: {
      tabBarLabel: "Decision: PreFilter",
      tabBarIcon: ({ tintColor }) => (
        <Image source={require('app/images/icon-decision.png')}
          style={{ width: 20, height: 20, tintColor }}
        />
      )
    }
  },
  RestaurantScreens: {
    screen: createStackNavigator({
      RestaurantListScreen,
      RestaurantAddScreen
    }, {
      // initialRouteName: 'RestaurantAddScreen',
      headerMode: "none",
      // hea
    }),

    navigationOptions: {
      tabBarLabel: 'Restaurants',
      tabBarIcon: ({ tintColor }) => {
        return <Image source={require('app/images/icon-restaurants.png')}
          style={{ width: 20, height: 20, tintColor }}
        />
      }
    }
  }
}, {
  initialRouteName: 'DecisionScreens',
  tabBarOptions: {
    activeTintColor: '#ff0000',
  }
})


const App = createAppContainer(TabNavigator)

export default () => {
  return <DecisionProvider>
    <App ref={setNavigator} />
    <StatusBar
      hidden={platformOS == 'android'} />
  </DecisionProvider>
}