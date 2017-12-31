import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import AppHome from '../screens/AppHome';
import Home from '../screens/Home';
import Jobs from '../screens/Jobs';
import Receipts from '../screens/Receipts';

export const FeedStack = StackNavigator({
  AppHome: {
    screen: AppHome,
    navigationOptions: {
      title: 'Status',
    },
  },
  Jobs: {
    screen: Jobs,
    navigationOptions: {
      title: 'Jobs',
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'My ID#',
    }
  },
  Receipts: {
    screen: Receipts,
    navigationOptions: {
      title: 'Receipts',
    }
  },
});

export const Tabs = TabNavigator({
  AppHome: {
    screen: AppHome,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  Jobs: {
    screen: Jobs,
    navigationOptions: {
      tabBarLabel: 'Jobs',
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'My ID#'
    },
  },
  Receipts: {
    screen: Receipts,
    navigationOptions: {
      tabBarLabel: 'Receipts',
    }
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: AppHome,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
