import React, { PureComponent } from 'react'
import { View, Text, ScrollView, StyleSheet, ToastAndroid, AsyncStorage } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import LineGraph from './LineGraph'
import BarGraph from './BarGraph'
import ToolbarIcon from './ToolbarIcon'

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

  // componentWillUpdate(nextProps, nextState){
  //   if(this.state.fetching && !nextState.fetching){

  //   }
  // }

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
    )
  }

  getGraphs = () => {
    const workoutOneExercises = Object.keys(this.workouts[0].exercises)
    const workoutTwoExercises = Object.keys(this.workouts[1].exercises)
    const commonExercises = workoutOneExercises.filter((exercise) => workoutTwoExercises.indexOf(exercise) >= 0)
    return commonExercises.map(this.chooseGraph)
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
            Compare
          </Text>
        </View>
        {
          !this.state.fetching ?
            <ScrollView>
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
  leftIcon: {
    margin: 16,
    // color: 'white'
  },
  pseudoScrollView: { //Adding this to fix a bug in 'react-native-svg' used by 'victory-native' that messes up scrolling in android
    backgroundColor: 'black',
    opacity: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
})