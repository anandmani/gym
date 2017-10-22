import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Dnd from './Dnd'

export default class Test extends PureComponent {
  render() {
    return (
      <View>
        <Dnd />
      </View>
    )
  }
}