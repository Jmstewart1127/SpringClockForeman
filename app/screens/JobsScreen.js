import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Receipts from '../components/Receipts';
import Jobs from '../components/Jobs';

class JobsScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    return (
      <Jobs/>
    );
  }
}

export default JobsScreen;