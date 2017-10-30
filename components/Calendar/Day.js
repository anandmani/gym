import React, { PureComponent } from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet, Dimensions } from 'react-native'
import ExerciseLabel from './ExerciseLabel'
import { modes } from '../../utils'
import randomColor from 'randomcolor'
import { workoutColors } from './Calendar'
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

export default class Day extends PureComponent {

  openWorkout = () => {
    const defaultProps = {
      dbKey: this.props.dbKey,
      onSubmit: this.props.onWorkoutSubmit
    }
    this.props.workout ?
      this.props.navigation.navigate('Workout', { ...defaultProps, mode: modes.edit })
      :
      this.props.navigation.navigate('Workout', { ...defaultProps, mode: modes.new })
  }

  getColor = () => {
    if (workoutColors[this.props.workout]) {
      this.color = workoutColors[this.props.workout]
    }
    else {
      this.color = randomColor({ luminosity: 'light' })
      workoutColors[this.props.workout] = this.color
    }
  }

  handlePress = () => {
    const retVal = this.props.onPress({
      dbKey: this.props.dbKey,
      hasWorkout: !!this.props.workout
    })
    if(!retVal){
      this.openWorkout()
    }
  }

  handleLongPress = () => {
    this.props.workout ?
      this.props.onLongPress(this.props.dbKey)
      :
      null
  }

  render() {
    this.getColor()
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#cccccc')}
        onPress={this.handlePress}
        onLongPress={this.handleLongPress}
      >
        <View style={this.props.selected ? styles.selectedCell : styles.cell}>
          <Text style={this.props.today ? styles.today : styles.fs10}>
            {this.props.day}
          </Text>
          {
            this.props.workout ?
              <ExerciseLabel
                name={this.props.workout}
                color={this.color}
              />
              :
              null
          }
        </View>
      </TouchableNativeFeedback>
    )
  }

}

const styles = StyleSheet.create({
  cell: {
    flexBasis: `${100 / 7}%`,
    height: (windowHeight - 200) / 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
    paddingTop: 10,
    paddingHorizontal: 2
  },
  selected: {
    backgroundColor: '#f6f6f6'
  },
  fs10: {
    fontSize: 10,
  },
  today: {
    fontSize: 10,
    color: 'white',
    backgroundColor: '#4ca6ff',
    width: 15,
    height: 15,
    borderRadius: 8,
    textAlign: 'center',
    justifyContent: 'center',
    position: 'relative',
    left: -2
  }
})

styles.selectedCell = StyleSheet.flatten([styles.cell, styles.selected])