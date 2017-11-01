import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, AsyncStorage, Dimensions } from 'react-native'
import { daysInMonth, getDay } from '../../utils'
import Day from './Day'
import { getMonthName } from '../../utils'
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

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

  renderDay = (item, index) => {
    const conditionalProps = {}
    if (this.props.today && this.props.today === index + 1) {
      conditionalProps.today = true
    }
    if (this.props.selectedDay && this.props.selectedDay === index + 1) {
      conditionalProps.selected = true
    }
    return (
      <Day
        key={index}
        day={index + 1}
        dbKey={this.generateDbKey(index + 1, this.props.month, this.props.year)}
        workout={this.state.workouts && this.state.workouts[`${index + 1}-${this.props.month}-${this.props.year}`]}
        navigation={this.props.navigation}
        onWorkoutSubmit={this.props.onWorkoutSubmit}
        onPress={this.props.onDayPress}
        onLongPress={this.props.onDayLongPress}
        {...conditionalProps}
      />
    )
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {
              `${getMonthName(this.props.month)} ${this.props.year}`
            }
          </Text>
        </View>
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
    marginBottom: 8,
    backgroundColor: 'white',
    elevation: 2,
    marginHorizontal: 8,
    borderRadius: 8
  },
  titleContainer: {
    height: 40,
    justifyContent: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: 'grey'
  },
  title: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 18,
    backgroundColor: 'white'
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8
    // paddingHorizontal: 16
  },
  dummyCell: {
    flexBasis: `${100 / 7}%`,
    height: (windowHeight - 200) / 6
  }
})

