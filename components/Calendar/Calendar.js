import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ToolbarIcon from '../ToolbarIcon'
import Month from './Month'
import MonthName from './MonthName'
import { getPreviousMonth, getNextMonth } from '../../utils'

export default class Calendar extends PureComponent {

  constructor() {
    super()
    this.today = new Date
    this.state = {
      months: this.getInitialMonths()
    }
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
    // this.props.navigation.navigate('DrawerToggle')
    this.list.scrollToEnd()
  }

  onWorkoutSubmit = () => {
    setTimeout(() => this.forceUpdate())
  }

  keyExtractor = (item, index) => `${item.month}-${item.year}`

  scrollToToday = () => this.list.scrollToIndex({
    index: 0
  })

  renderMonth = ({ item, index }) => {  //notice {item, index}
    return (
      <View>
        <MonthName
          month={item.month}
          year={item.year}
        />
        <Month
          month={item.month}
          year={item.year}
          navigation={this.props.navigation}
          onWorkoutSubmit={this.onWorkoutSubmit}
          today={index === 0 ? this.today.getDate() : null}
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
            Calendar
          </Text>
          <ToolbarIcon
            iconName="md-arrow-down"
            onPress={this.scrollToToday}
          />
        </View>
        <FlatList
          data={this.state.months}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderMonth}
          ref={element => this.list = element}
          onEndReached={this.addPrevMonth}
          inverted
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
    // backgroundColor: '#ff7faa',
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
