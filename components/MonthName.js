import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getMonthName } from '../utils'
import DaysOfWeek from './DaysOfWeek'

export default class MonthName extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {getMonthName(this.props.month)}
        </Text>
        <DaysOfWeek />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
    // backgroundColor: '#ffe5ee',
    backgroundColor: '#f6f6f6',
  },
  title: {
    textAlign: 'center',
    color: 'grey',
    padding: 5,
  },
})