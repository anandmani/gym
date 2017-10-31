import React, { PureComponent } from 'react'
import { Text, StyleSheet } from 'react-native'

export class AppTitle extends PureComponent {
  render() {
    return (
      <Text
        style={styles.title}
        numberOfLines={1}
      >
        {
          this.props.children
        }
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    marginLeft: 16,
    fontSize: 20,
    color: 'black'
  }
})