import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calendar from './components/Calendar'
import Workout from './components/Workout'
import Exercise from './components/Exercise'
import Compare from './components/Compare'
import Exponent from 'expo'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Workout /> */}
        {/* <Exercise /> */}
        {/* <Calendar /> */}
        <Compare />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Exponent.Constants.statusBarHeight
  }
})