import React, { PureComponent } from 'react'
import { Text, StyleSheet } from 'react-native'
import draggable from './draggable'

class Card extends PureComponent {
  render() {
    return (
      <Text
        style={styles.card}
      >
        {
          this.props.value
        }
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    height: 80,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    elevation: 0,
  }
})

export default draggable(Card)
