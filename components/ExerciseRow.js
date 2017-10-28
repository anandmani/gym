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
            <Text style={styles.lineOne} numberOfLines={1}>
              {`${set.reps} reps`}
            </Text>
            :
            null
        }
        {
          set.measure ?
            <Text style={styles.lineTwo} numberOfLines={1}>
              {`${set.measure.value} ${set.measure.units} `}
            </Text>
            :
            null
        }
      </View>
    )
  }

  render() {
    console.log("this.props", this.props)
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
        <View style={styles.exercise}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#cccccc')}
            onPress={this.openExercise}
          >
            <View style={styles.headingView}>
              <Text style={styles.heading} numberOfLines={1}>
                {this.props.name}
              </Text>
              <View style={styles.arrowIconWrapper}>
                <Ionicons
                  name="ios-arrow-dropright"
                  size={15}
                />
              </View>
            </View>
          </TouchableNativeFeedback>
          <ScrollView
            horizontal={true}
            style={styles.sets}
          >
            {
              this.props.sets.map(this.renderSets)
            }
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
    justifyContent: 'center'
  },
  headingView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16
  },
  heading: {
    fontSize: 16
  },
  sets: {
    marginTop: 5
  },
  set: {
    width: 50,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#f2f2f2',
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
    justifyContent: 'center',
    marginLeft: 15
  }
})