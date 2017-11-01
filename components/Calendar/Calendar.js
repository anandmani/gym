import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, FlatList, Vibration, BackHandler, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppBar, { AppBarIcon, AppTitle } from '../AppBar'
import Month from './Month'
import { getPreviousMonth, getNextMonth } from '../../utils'
import DaysOfWeek from './DaysOfWeek'

export const workoutColors = { //Filled in during runtime
}

export default class Calendar extends PureComponent {

  constructor() {
    super()
    this.today = new Date
    this.compareDates = []
    this.state = {
      months: this.getInitialMonths(),
      compare: false,
      refresh: {}
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

  onWorkoutSubmit = (dbKey) => {
    const month = Number(dbKey.split('-')[1])
    this.setState({
      refresh: {
        month,
        time: Date.now()
      }
    })
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
      this.compareDates.push(dbKey)
      this.props.navigation.navigate('Compare', { dbKeys: this.compareDates })
      this.resetCompare()
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
    if (index === 0) {
      conditionalProps.today = this.today.getDate()
    }
    if (this.state.compare && Number(this.compareDates[0].split('-')[1]) === item.month) {
      conditionalProps.selectedDay = Number(this.compareDates[0].split('-')[0])
    }
    if (this.state.refresh.month === item.month) {
      conditionalProps.refreshAt = this.state.refresh.timestamp
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

  renderAppBar = () => (
    <AppBar>
      <AppBarIcon
        onPress={this.openDrawer}
      />
      <AppTitle>
        {
          this.state.compare ?
            "Compare to"
            :
            "Calendar"
        }
      </AppTitle>
      {
        this.state.compare ?
          <AppBarIcon
            iconName="md-close"
            onPress={this.resetCompare}
          />
          :
          null
      }
      <AppBarIcon
        iconName="md-arrow-down"
        onPress={this.scrollToToday}
      />
    </AppBar>
  )

  render() {
    return (
      <View style={styles.container}>
        {
          this.renderAppBar()
        }
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
          style={styles.scrollView}
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
  scrollView: {
    backgroundColor: '#eeeeee'
  }
});
