import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableNativeFeedback, Button, AsyncStorage, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import ExerciseRow from './ExerciseRow'
import ToolbarIcon from './ToolbarIcon'

export default class Workout extends PureComponent {

  constructor(props) {
    super(props)
    this.dbKey = this.props.navigation.state.params && this.props.navigation.state.params.dbKey
    this.state = {
      workout: {
        name: null,
        exercises: []
      },
      loading: this.dbKey ? true : false
    }
  }

  getWorkout = async (dbKey) => {
    console.log("getWorkout", dbKey)
    return AsyncStorage.getItem(dbKey)
  }

  componentDidMount() {
    if (this.dbKey) {
      this.getWorkout(this.dbKey)
        .then(workout => {
          workout = JSON.parse(workout)
          this.setState({
            workout,
            loading: false
          })
        })
    }
  }

  renderExerciseRow = (exercise) => {
    const { name, sets } = exercise
    return (
      <ExerciseRow
        key={name}
        name={name}
        sets={sets}
        navigation={this.props.navigation}
      />
    )
  }

  addExercise = () => {
    this.props.navigation.navigate('Exercise')
    // const newExercises = { ...this.state.exercises }
    // newExercises.push()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <ToolbarIcon
            iconName="md-arrow-back"
            onPress={() => this.props.navigation.goBack()}
          />
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            Workout
          </Text>
          <ToolbarIcon
            iconName="md-checkmark"
            onPress={() => null}
          />
        </View>
        <View style={styles.nameWrapper}>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            value={this.state.workout.name}

          />
        </View>
        <Text
          numberOfLines={1}
          style={styles.subHeading}
        >
          Exercises
          </Text>
        <ScrollView
          style={styles.scrollView}
        >
          {
            this.state.workout.exercises.map(this.renderExerciseRow)
          }
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#5cb85c')}
            onPress={this.addExercise}
          >
            <View style={styles.addExercise}>
              <Ionicons
                name="ios-add-circle-outline"
                style={styles.addExerciseIcon}
                size={20}
              />
            </View>
          </TouchableNativeFeedback>
        </ScrollView>
        {
          this.state.loading ?
            <View style={styles.spinnerContainer}>
              <ActivityIndicator size='large' />
            </View>
            :
            null
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinnerContainer: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  toolbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#1de8b5',
    // elevation: 4
  },
  title: {
    flex: 1,
    marginLeft: 16,
    fontSize: 20,
    // color: 'white'
  },
  rightIcon: {
    margin: 16,
    // color: 'white'
  },
  scrollView: {
    flex: 1
  },
  addExercise: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addExerciseIcon: {
    color: '#5cb85c'
  },
  nameWrapper: {
    paddingHorizontal: 16
  },
  textInput: {
    height: 54,
    marginBottom: 16
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    color: 'grey'
  }
})