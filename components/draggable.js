import React, { PureComponent } from 'react'
import { View, PanResponder, StyleSheet } from 'react-native'

export default (Component) => (

  class Draggable extends PureComponent {

    panResponder = {}
    previousTop = 0
    elementStyles = {}
    element = null

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
        onPanResponderTerminate: this.handlePanResponderEnd,
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

    handleStartShouldSetPanResponder = () => true

    handleMoveShouldSetPanResponder = () => true

    handlePanResponderGrant = () => {
      this.props.onDragStart(this.props.id)
      this.highlight()
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