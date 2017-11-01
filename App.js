import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import Exponent from 'expo'
import { Ionicons } from '@expo/vector-icons';
import Calendar from './components/Calendar/Calendar'
import Workout from './components/Workout'
import Exercise from './components/Exercise'
import Compare from './components/Compare'
import Drawer from './components/Drawer'
import sampleData from './sampleData.json'

export const appVersion = 'v1.0.0-beta'

const StackNavigatorContainer = StackNavigator(
  {
    Calendar: {
      screen: Calendar
    },
    Workout: {
      screen: Workout
    },
    Exercise: {
      screen: Exercise
    },
    Compare: {
      screen: Compare
    }
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'white'
    }
  }
)

const NavContainer = DrawerNavigator(
  {
    Calendar: {
      screen: StackNavigatorContainer
    }
  },
  {
    contentComponent: Drawer
  }
)

export default class App extends PureComponent {

  setAppVersion = () => AsyncStorage.setItem('appVersion', appVersion)

  componentDidMount() {
    // val = {
    //   "25-10-2017": "Arms",
    //   "24-10-2017": "Back"
    // }
    // AsyncStorage.setItem("10-2017", JSON.stringify(val))
    // AsyncStorage.setItem("25-10-2017", JSON.stringify(sampleData["25-10-2017"]))
    // AsyncStorage.setItem("24-10-2017", JSON.stringify(sampleData["24-10-2017"]))
  }

  render() {
    return (
      <View style={styles.container}>
        <NavContainer />
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Exponent.Constants.statusBarHeight
  },
  icon: {
    width: 24,
    height: 24,
  }
})

