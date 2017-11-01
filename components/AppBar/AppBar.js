import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'

export class AppBar extends PureComponent {
  render() {
    return (
      <View style={styles.appBar}>
        {
          this.props.children
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', //elevation doesnt work without background color for some reason
    elevation: 4,
  }
})