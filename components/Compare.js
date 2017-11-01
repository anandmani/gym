import React, { PureComponent } from 'react'
import { View, Text, ScrollView, StyleSheet, ToastAndroid, AsyncStorage } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import LineGraph from './LineGraph'
import BarGraph from './BarGraph'
import AppBar, { AppBarIcon, AppTitle } from './AppBar'

export default class Compare extends PureComponent {

  constructor(props) {
    super(props)
    this.dbKeys = this.props.navigation.state.params.dbKeys
    this.state = {
      fetching: true
    }
  }

  componentDidMount() {
    this.getWorkouts()
  }

  mapExercises = (exercisesArray) => {
    const exercisesMap = {}
    exercisesArray.forEach((exercise) => {
      exercisesMap[exercise.name] = exercise
    })
    return exercisesMap
  }

  getWorkout = (dbKey) => (
    AsyncStorage.getItem(dbKey)
      .then((data) => JSON.parse(data))
      .then((data) => ({
        name: data.name,
        date: dbKey,
        exercises: this.mapExercises(data.exercises)
      }))
  )

  getWorkouts = async () => {
    const fetchPromises = this.dbKeys.map(this.getWorkout)
    try {
      this.workouts = await Promise.all(fetchPromises)
      this.setState({ fetching: false })
    } catch (err) {
      ToastAndroid.show('Failed to fetch workouts', ToastAndroid.SHORT)
      console.error(err)
    }
  }

  chooseGraph = (exercise, index) => {
    let GraphComponent = BarGraph
    if (this.workouts[0].exercises[exercise].sets[0].reps && this.workouts[0].exercises[exercise].sets[0].measure) {
      GraphComponent = LineGraph
    }
    return (
      // <View style={styles.graphContainer} key={index}>
      <GraphComponent
        key={index}
        exercises={[
          {
            date: this.workouts[0].date,
            ...this.workouts[0].exercises[exercise]
          },
          {
            date: this.workouts[1].date,
            ...this.workouts[1].exercises[exercise]
          }
        ]}
      />
      // </View>
    )
  }

  getGraphs = () => {
    const workoutOneExercises = Object.keys(this.workouts[0].exercises)
    const workoutTwoExercises = Object.keys(this.workouts[1].exercises)
    const commonExercises = workoutOneExercises.filter((exercise) => workoutTwoExercises.indexOf(exercise) >= 0)
    return commonExercises.map(this.chooseGraph)
  }

  renderAppBar = () => (
    <AppBar style={styles.toolbar}>
      <AppBarIcon
        iconName="md-arrow-back"
        onPress={() => this.props.navigation.goBack()}
      />
      <AppTitle>
        Compare
      </AppTitle>
    </AppBar>
  )

  render() {
    return (
      <View style={styles.container}>
        {
          this.renderAppBar()
        }
        {
          !this.state.fetching ?
            <ScrollView style={styles.scrollView}>
              {
                this.getGraphs()
              }
              {/* <BarGraph /> */}
              <View style={styles.pseudoScrollView} />
            </ScrollView>
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
  scrollView: {
    paddingTop: 8,
    backgroundColor: '#eeeeee'
  },
  pseudoScrollView: { //Adding this to fix a bug in 'react-native-svg' used by 'victory-native' that messes up scrolling in android
    backgroundColor: 'black',
    opacity: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  graphContainer: {
    borderRadius: 8,
    elevation: 2,
    marginBottom: 8,
    marginHorizontal: 8
  }
})