import React, { PureComponent } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableNativeFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default class ExerciseRow extends PureComponent {

  openExercise = () => this.props.navigation.navigate('Exercise')

  renderSets = (set, index) => {
    return (
      <View style={styles.set} key={index}>
        {
          set.reps ?
            <Text style={styles.lineOne}>
              {`${set.reps} reps`}
            </Text>
            :
            null
        }
        {
          set.measure ?
            <Text style={styles.lineTwo}>
              {set.measure}
            </Text>
            :
            null
        }
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#d9534f')}
          useForeground
          onPress={() => null}
        >
          <View style={styles.removeExercise}>
            <Ionicons
              name="ios-close-circle-outline"
              size={20}
              style={styles.removeExerciseIcon}
            />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#cccccc')}
          onPress={this.openExercise}
        >
          <View style={styles.exercise}>
            <Text style={styles.heading} numberOfLines={1}>
              {this.props.name}
            </Text>
            <ScrollView
              horizontal={true}
            >
              {
                this.props.sets.map(this.renderSets)
              }
              <View style={styles.arrowIconWrapper}>
                <Ionicons
                  name="ios-arrow-dropright"
                  size={20}
                />
              </View>
            </ScrollView>

          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 76,
    alignItems: 'center',
    marginBottom: 16
  },
  removeExercise: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48
  },
  removeExerciseIcon: {
    color: '#d9534f'
  },
  exercise: {
    flex: 1,
    marginRight: 16,
    justifyContent: 'center'
  },
  heading: {
    fontSize: 16
  },
  set: {
    width: 75,
    justifyContent: 'center',
    alignItems: 'center'
    // paddingLeft: 16,
  },
  lineOne: {
    fontSize: 13,
    color: 'grey',
  },
  lineTwo: {
    fontSize: 13,
    color: 'grey',
  },
  arrowIconWrapper: {
    justifyContent: 'center'
  }
})