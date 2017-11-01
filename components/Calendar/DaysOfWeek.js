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
              style={this.props.today === index ? styles.today : styles.day}
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
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f6f6f6',
    elevation: 4
  },
  day: {
    flex: 1,
    fontSize: 8,
    // fontWeight: 'bold',
    color: 'grey',
    paddingLeft: 4
  },
  blue: {
    color: '#4ca6ff'
  }
})

styles.today = StyleSheet.flatten([styles.day, styles.blue])

export default DaysOfWeek