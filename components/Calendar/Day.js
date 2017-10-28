import React, { PureComponent } from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet, Dimensions } from 'react-native'
import ExerciseLabel from './ExerciseLabel'

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

export default class Day extends PureComponent {

  openWorkout = () => {
    this.props.workout ?
      this.props.navigation.navigate('Workout', { dbKey: this.props.dbKey })
      :
      this.props.navigation.navigate('Workout', { dbKey: null }) //need to specify dbKey = null as it merges with existing params
  }

  render() {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#cccccc')}
        onPress={this.openWorkout}
      >
        <View style={styles.realCell}>
          <Text style={styles.fs10}>
            {this.props.day}
          </Text>
          {
            this.props.workout ?
              <ExerciseLabel
                name={this.props.workout}
                color='pink'
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
  dummyCell: {
    flexBasis: `${100 / 7}%`,
    height: (windowHeight - 200) / 6
  },
  cell: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
    paddingTop: 10,
  },
  fs10: {
    fontSize: 10,
  }
})

styles.realCell = StyleSheet.flatten([styles.dummyCell, styles.cell])