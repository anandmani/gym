import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, FlatList, Vibration, BackHandler, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ToolbarIcon from '../ToolbarIcon'
import Month from './Month'
import { getPreviousMonth, getNextMonth } from '../../utils'
import DaysOfWeek from './DaysOfWeek'

export const workoutColors = {
}

export default class Calendar extends PureComponent {

  constructor() {
    super()
    this.today = new Date
    this.compareDates = []
    this.state = {
      months: this.getInitialMonths(),
      compare: false
    }
    BackHandler.addEventListener('hardwareBackPress', this.backHandler)
  }

  backHandler = () => {
    if (this.state.compare) {
      this.resetCompare()
      return true //don't exec default
    }
    return false
  }

  getInitialMonths = () => {
    //Current month, prev month, next month
    const thisMonth = {
      month: this.today.getMonth() + 1,
      year: this.today.getFullYear()
    }
    return [
      thisMonth,
      getPreviousMonth(thisMonth)
    ]
  }

  addPrevMonth = () => {
    const earliestMonth = this.state.months[this.state.months.length - 1]
    const prevMonth = getPreviousMonth(earliestMonth)
    this.setState({
      months: [...this.state.months, prevMonth]
    })
  }

  openDrawer = () => {
    this.props.navigation.navigate('DrawerToggle')
  }

  onWorkoutSubmit = () => {
    setTimeout(() => this.forceUpdate())
  }

  keyExtractor = (item, index) => `${item.month}-${item.year}`

  scrollToToday = () => this.list.scrollToIndex({
    index: 0
  })

  startCompare = (dbKey) => {
    Vibration.vibrate(100)
    this.compareDates.push(dbKey)
    this.setState({ compare: true })
  }

  checkCompareComplete = ({ dbKey, hasWorkout }) => {
    if (hasWorkout) {
      this.resetCompare()
      this.props.navigation.navigate('Compare')
    }
    else {
      ToastAndroid.show("Choose a day with a workout", ToastAndroid.SHORT)
    }
  }

  handleDayPress = (arg) => {
    if (this.state.compare) {
      this.checkCompareComplete(arg)
      return true
    }
    else {
      return false
    }
  }

  resetCompare = () => {
    this.compareDates = []
    this.setState({ compare: false })
  }

  renderMonth = ({ item, index }) => {  //notice {item, index}
    const conditionalProps = {}
    if (this.compareDates[0]) {
      console.log(this.state.compare, Number(this.compareDates[0].split('-')[1]), index)
    }
    if (index === 0) {
      conditionalProps.today = this.today.getDate()
    }
    if (this.state.compare && Number(this.compareDates[0].split('-')[1]) === item.month) {
      conditionalProps.selectedDay = Number(this.compareDates[0].split('-')[0])
      console.log("sle", conditionalProps.selectedDay)
    }
    return (
      <View>
        <Month
          month={item.month}
          year={item.year}
          navigation={this.props.navigation}
          onWorkoutSubmit={this.onWorkoutSubmit}
          onDayPress={this.handleDayPress}
          onDayLongPress={this.startCompare}
          {...conditionalProps}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <ToolbarIcon
            onPress={this.openDrawer}
          />
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {
              this.state.compare ?
                "Compare to"
                :
                "Calendar"
            }
          </Text>
          {
            this.state.compare ?
              <ToolbarIcon
                iconName="md-close"
                onPress={this.resetCompare}
              />
              :
              null
          }
          <ToolbarIcon
            iconName="md-arrow-down"
            onPress={this.scrollToToday}
          />
        </View>
        <DaysOfWeek
          today={this.today.getDay()}
        />
        <FlatList
          data={this.state.months}
          extraData={this.state.compare}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderMonth}
          ref={element => this.list = element}
          onEndReached={this.addPrevMonth}
          inverted
        />
        <DaysOfWeek
          today={this.today.getDay()}
        />
      </View >
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', //elevation doesnt work without background color for some reason
    // elevation: 5,
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
  months: {
    flex: 1,
    paddingBottom: 5
  }
});
