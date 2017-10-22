import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Dnd from './Dnd'

export default class Test extends PureComponent {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: 'black', height: 100 }} />
        <Dnd />
      </View>
    )
  }
}