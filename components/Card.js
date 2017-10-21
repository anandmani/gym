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
    height: 100,
    margin: 10,
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 4
  }
})

export default draggable(Card)
