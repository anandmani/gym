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
    height: 40,
    margin: 5,
    backgroundColor: 'white',
    elevation: 1,
    borderRadius: 4
  }
})

export default draggable(Card)
