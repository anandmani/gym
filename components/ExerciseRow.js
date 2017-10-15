import React, { PureComponent } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default class ExerciseRow extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Ionicons
          name="ios-close-circle-outline"
          style={styles.removeExercise}
          size={20}
        />
        <View style={styles.exercise}>
          <Text style={styles.heading} numberOfLines={1}>
            Barbell Lift Barbell Lift Barbell Lift Barbell Lift
          </Text>
          <ScrollView
            horizontal={true}
          >
            <View style={styles.set}>
              <Text style={styles.lineOne}>
                15 Reps
              </Text>
              <Text style={styles.lineTwo}>
                7.5 kg
              </Text>
            </View>
            <View style={styles.arrowIconWrapper}>
              <Ionicons
                name="ios-arrow-dropright"
                size={20}
              />
            </View>
          </ScrollView>

        </View>
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
    color: '#d9534f',
    marginRight: 16
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