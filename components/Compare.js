import React, { PureComponent } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import LineGraph from './LineGraph'
import BarGraph from './BarGraph'

export default class Compare extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Ionicons
            name="ios-arrow-back"
            size={32}
            style={styles.leftIcon}
          />
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            Compare
          </Text>
        </View>
        <ScrollView>
          <LineGraph />
          <BarGraph />
          <View style={styles.pseudoScrollView} />
        </ScrollView>
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