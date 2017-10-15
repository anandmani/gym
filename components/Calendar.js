import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Month from './Month'
import MonthName from './MonthName'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Ionicons
            name="md-menu"
            size={32}
            style={styles.leftIcon}
          />
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            Calendar
          </Text>
        </View>
        <ScrollView
          stickyHeaderIndices={[0, 2]}
          style={styles.months}
        >
          <MonthName
            month={9}
          />
          <Month
            month={9}
            year={2017}
          />
          <MonthName
            month={10}
          />
          <Month
            month={10}
            year={2017}
          />
          <MonthName
            month={11}
          />
          <Month
            month={11}
            year={2017}
          />
        </ScrollView>

      </View>
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
