import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableNativeFeedback, Button, AsyncStorage, ActivityIndicator, ToastAndroid } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import ExerciseRow from './ExerciseRow'
import ToolbarIcon from './ToolbarIcon'
import TextField from './TextField'
import { modes } from '../utils'

export default class Workout extends PureComponent {

  constructor(props) {
    super(props)
    this.dbKey = this.props.navigation.state.params.dbKey
    this.mode = this.props.navigation.state.params.mode
    this.onSubmit = this.props.navigation.state.params.onSubmit
    this.state = {
      name: null,
      exercises: [],
      loading: this.mode === modes.edit ? true : false,
      errors: {
        name: null
      }
    }
    this.nameInput
  }

  getWorkout = async () => {
    try {
      const workout = await AsyncStorage.getItem(this.dbKey)
      if (workout !== null) {
        const { name, exercises } = JSON.parse(workout)
        this.setState({
          name,
          exercises,
          loading: false
        })
      }
    } catch (error) {
      ToastAndroid.show('Failed to fetch workout', ToastAndroid.SHORT)
    }
  }

  getMonthDbKey = (dbKey) => {
    const temp = dbKey.split('-')
    temp.splice(0, 1)
    return temp.join('-')
  }

  saveWorkout = async () => {
    const monthDbKey = this.getMonthDbKey(this.dbKey)
    const monthValue = JSON.stringify({ [this.dbKey]: this.state.name })
    const monthData = [monthDbKey, monthValue]
    const { name, exercises } = this.state
    const dayValue = JSON.stringify({ name, exercises })
    const dayData = [this.dbKey, dayValue]
    try {
      await AsyncStorage.multiMerge([monthData, dayData])
      this.props.navigation.goBack()
    } catch (error) {
      ToastAndroid.show('Failed to save workout', ToastAndroid.SHORT)
    }
  }

  focusNameInput = () => this.nameInput.focus()

  componentDidMount() {
    if (this.mode === modes.edit) {
      this.getWorkout()
    }
    else {
      setTimeout(this.focusNameInput)
    }
  }

  removeExercise = (index) => {
    const newExercises = [...this.state.exercises]
    newExercises.splice(index, 1)
    this.setState({ exercises: newExercises })
  }

  renderExerciseRow = (exercise, index) => {
    const { name, sets } = exercise
    return (
      <ExerciseRow
        key={index}
        index={index}
        name={name}
        sets={sets}
        onRemove={this.removeExercise}
        navigation={this.props.navigation}
      />
    )
  }

  saveExercise = (index, exercise) => {
    const newExercises = [...this.state.exercises]
    newExercises[index] = exercise
    this.setState({ exercises: newExercises })
  }

  addExercise = () => {
    this.props.navigation.navigate('Exercise', {
      index: this.state.exercises.length,
      onSave: this.saveExercise
    })
  }

  handleNameChange = (name) => this.setState({ name: name.trim() })

  validateForm = () => {
    if (!this.state.name) {
      this.setState({ errors: { name: true } })
      ToastAndroid.show('Fill in error fields', ToastAndroid.SHORT)
      return false
    }
    return true
  }

  handleSubmit = () => {
    if (this.validateForm()) {
      this.saveWorkout()
      this.onSubmit()
    }
  }

  goBack = () => this.props.navigation.goBack()

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <ToolbarIcon
            iconName="md-arrow-back"
            onPress={this.goBack}
          />
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            Workout
          </Text>
          <ToolbarIcon
            iconName="md-checkmark"
            onPress={this.handleSubmit}
          />
        </View>
        <View style={styles.nameWrapper}>
          <TextField
            placeholder="Name"
            style={styles.textInput}
            value={this.state.name}
            onChangeText={this.handleNameChange}
            autoCapitalize='words'
            error={this.state.errors.name}
            refCallback={element => this.nameInput = element}
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
            this.state.exercises.map(this.renderExerciseRow)
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
    fontSize: 18,
    marginBottom: 16
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    color: 'grey'
  }
})