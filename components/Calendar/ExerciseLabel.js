import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class ExerciseLabel extends PureComponent {
  render() {
    return (
      <View style={[styles.view, { backgroundColor: this.props.color }]}>
        <Text
          fontSize={8}
          numberOfLines={3}
          style={styles.text}
        >
          {this.props.name}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    margin: 2,
    padding: 2,
    borderRadius: 4
  },
  text: {
    fontSize: 8
  }
})