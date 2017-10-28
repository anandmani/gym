import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { DrawerNavigator } from 'react-navigation'
import Exponent from 'expo'
import { Ionicons } from '@expo/vector-icons';
import Calendar from './components/Calendar/Calendar'
import Workout from './components/Workout'
import Exercise from './components/Exercise'
import Compare from './components/Compare'
import sampleData from './sampleData.json'

// class HomeScreen extends PureComponent {
//   static navigationOptions = {
//     drawerLabel: 'Calendar'
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         {/* <Test /> */}
//         {/* <Workout />  */}
//         {/* <Exercise /> */}
//         <Calendar />
//         {/* <Compare /> */}
//       </View>
//     );
//   }
// }

const NavContainer = DrawerNavigator({
  Exercise: {
    screen: Exercise
  },
  Calendar: {
    screen: Calendar
  },
  Workout: {
    screen: Workout
  },

  Compare: {
    screen: Compare
  }
})

const dummy = () => new Promise((resolve) => {
  setTimeout(() => resolve(), 4000)
})

export default class App extends PureComponent {
  async componentDidMount() {
    // val = {
    //   "25-10-2017": "Arms",
    //   "24-10-2017": "Back"
    // }
    // AsyncStorage.setItem("10-2017", JSON.stringify(val))
    AsyncStorage.setItem("25-10-2017", JSON.stringify(sampleData["25-10-2017"]))
    AsyncStorage.setItem("24-10-2017", JSON.stringify(sampleData["24-10-2017"]))
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

