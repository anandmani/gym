import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Exponent from 'expo'
import Calendar from './components/Calendar'
import Workout from './components/Workout'
import Exercise from './components/Exercise'
import Compare from './components/Compare'
import Dnd from './components/Dnd'
import Test from './components/Test'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Dnd />
        {/* <Test /> */}
        {/* <Workout />  */}
        {/* <Exercise /> */}
        {/* <Calendar /> */}
        {/* <Compare /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    marginTop: Exponent.Constants.statusBarHeight
  }
})