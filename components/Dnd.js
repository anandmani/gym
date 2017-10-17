import React, { PureComponent } from 'react'
import { ScrollView, View, StyleSheet, PanResponder } from 'react-native'

export default class Dnd extends PureComponent {

  panResponder = {}
  previousTop = 0
  previousLeft = 0
  elementStyles = {}
  element = null

  componentWillMount() {
    this.elementStyles = {
      style: {
        top: this.previousTop,
        left: this.previousLeft
      }
    }
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
  }

  updateNativeStyles = () => {
    this.element && this.element.setNativeProps(this.elementStyles)
  }

  highlight = () => {
    this.elementStyles = {
      style: {
        backgroundColor: 'blue'
      }
    }
    this.updateNativeStyles()
  }

  unHighlight = () => {
    this.elementStyles = {
      style: {
        backgroundColor: 'black'
      }
    }
    this.updateNativeStyles()
  }

  handleStartShouldSetPanResponder = () => true

  handleMoveShouldSetPanResponder = () => true

  handlePanResponderGrant = (e) => {
    this.highlight()
  }

  handlePanResponderMove = (e, gestureState) => {
    this.elementStyles.style.top = this.previousTop + gestureState.dy
    this.updateNativeStyles()
  }

  handlePanResponderEnd = (e, gestureState) => {
    // this.previousLeft += gestureState.dx;
    console.log("handlePanResponderEnd")
    this.unHighlight()
    this.previousTop += gestureState.dy;
  }

  render() {
    return (
      <View
        ref={(element) => this.element = element}
        {...this.panResponder.panHandlers}
        style={styles.row}
      >
      </View>
    )
  }

}

const styles = StyleSheet.create({
  row: {
    height: 50,
    borderBottomWidth: 1,
    backgroundColor: 'black'

  }
})

