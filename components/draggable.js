import React, { PureComponent } from 'react'
import { View, PanResponder, StyleSheet } from 'react-native'

const _getDistanceBetweenPoints = (aX, aY, bX, bY) => {
  var deltaX = aX - bX;
  var deltaY = aY - bY;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

const LONG_PRESS_THRESHOLD = 500
const LONG_PRESS_ALLOWED_MOVEMENT = 10

export default (Component) => (

  class Draggable extends PureComponent {

    panResponder = {}
    previousTop = 0
    elementStyles = {}
    element = null
    initialPressLocation = null
    shouldGrantResponder = false

    componentWillMount() {
      this.elementStyles = {
        style: {
          top: this.previousTop
        }
      }
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
        onPanResponderGrant: this.handlePanResponderGrant,
        onPanResponderMove: this.handlePanResponderMove,
        onPanResponderRelease: this.handlePanResponderEnd,
        onPanResponderTerminate: this.handlePanResponderEnd
      });
    }

    componentWillReceiveProps() { //Resetting relative position to 0. i.e, after drag is over and parent changes list order, the native 'top' that we set should be reset to 0
      this.previousTop = 0
      this.elementStyles = {
        style: {
          top: 0,
        }
      }
      this.element.setNativeProps(this.elementStyles)
    }

    componentWillUnmount() {
      clearInterval(this.longPressTimeout)
    }

    updateNativeStyles = () => {
      this.element && this.element.setNativeProps(this.elementStyles)
    }

    highlight = () => {
      this.elementStyles = {
        style: {
          opacity: 0.8,
          elevation: 2,
          transform: [{ rotateZ: '5deg' }]
        }
      }
      this.updateNativeStyles()
    }

    unHighlight = () => {
      this.elementStyles = {
        style: {
          opacity: 1,
          elevation: 1,
          transform: [{ rotateZ: '0deg' }]
        }
      }
      this.updateNativeStyles()
    }

    setInitialPressLocation = (e) => {
      let { pageX, pageY } = e.nativeEvent
      this.initialPressLocation = { pageX, pageY }
    }

    handleStartShouldSetPanResponder = (e, gestureState) => {
      this.setInitialPressLocation(e)
      this.longPressTimeout = setTimeout(() => {
        this.shouldGrantResponder = true
      }, LONG_PRESS_THRESHOLD)
      return false
    }

    handleMoveShouldSetPanResponder = (e, gestureState) => {
      let { pageX, pageY } = e.nativeEvent
      if (this.shouldGrantResponder) {
        return true
      }
      if (_getDistanceBetweenPoints(pageX, pageY, this.initialPressLocation.pageX, this.initialPressLocation.pageY) > LONG_PRESS_ALLOWED_MOVEMENT) {
        clearInterval(this.longPressTimeout)
      }
      return false
    }

    handlePanResponderGrant = (e, gestureState) => {
      this.highlight()
      this.props.onDragStart(this.props.id)
    }

    handlePanResponderMove = (e, gestureState) => {
      this.elementStyles.style.top = this.previousTop + gestureState.dy
      this.updateNativeStyles()
      this.props.onDrag(this.props.id, e.nativeEvent.pageY)
    }

    handlePanResponderEnd = (e, gestureState) => {
      this.unHighlight()
      this.props.onDragEnd(this.props.id)
      this.previousTop += gestureState.dy;
      this.shouldGrantResponder = false
      this.initialPressLocation = null
      clearInterval(this.longPressTimeout)
    }

    render() {
      // adding collapsable={false} because measure support in android is glitch https://github.com/facebook/react-native/issues/3282
      return (
        <View
          ref={(element) => this.element = element}
          collapsable={false}
          style={styles.container}
          {...this.panResponder.panHandlers}
        >
          <Component {...this.props} />
        </View>
      )
    }

  }

)

const styles = StyleSheet.create({
  container: {
    marginRight: 50
  }
})