import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, AsyncStorage } from 'react-native'
import { daysInMonth, getDay } from '../../utils'
import Day from './Day'

const today = new Date()

export default class Month extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      workouts: null
    }
    this.numberOfCells = daysInMonth(props.month, props.year)
    this.numberOfDummyCells = getDay(1, props.month, props.year)
  }

  fetchWorkouts = async () => {
    const { month, year } = this.props
    return await AsyncStorage.getItem(`${month}-${year}`)
  }

  componentDidMount() {
    this.fetchWorkouts()
      .then((workouts) => this.setState({ workouts: JSON.parse(workouts) }))
  }

  generateDbKey = (day, month, year) => `${day}-${month}-${year}`

  renderDay = (item, index) => (
    <Day
      key={index}
      day={index + 1}
      dbKey={this.generateDbKey(index + 1, this.props.month, this.props.year)}
      workout={this.state.workouts && this.state.workouts[`${index + 1}-${this.props.month}-${this.props.year}`]}
      navigation={this.props.navigation}
      onWorkoutSubmit={this.props.onWorkoutSubmit}
      today={this.props.today === index + 1}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.grid}>
          {
            Array(this.numberOfDummyCells).fill().map((item, index) => (
              <View style={styles.dummyCell} key={`dummy-${index}`} />
            ))
          }
          {
            Array(this.numberOfCells).fill().map(this.renderDay)
          }
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16
  }
})

