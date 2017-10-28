import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

class DaysOfWeek extends PureComponent {
  render() {
    return (
      <View style={styles.bar}>
        {
          days.map((day, index) => (
            <Text
              key={index}
              style={styles.day}
            >
              {day}
            </Text>
          ))
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: 20,
    paddingHorizontal: 16
  },
  day: {
    flex: 1,
    fontSize: 10,
    // fontWeight: 'bold',
    color: 'grey'
  }
})

export default DaysOfWeek