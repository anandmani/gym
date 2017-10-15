import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Set from './Set'

export default class Exercise extends PureComponent {
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
            Exercise
          </Text>
          <Ionicons
            name="md-checkmark"
            size={32}
            style={styles.rightIcon}
          />
        </View>
        <View style={styles.nameWrapper}>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
          />
        </View>
        <ScrollView
          style={styles.scrollView}
        >
          <Text
            numberOfLines={1}
            style={styles.subHeading}
          >
            Sets
          </Text>
          <Set />
          <Set />
          <Set />
          <View style={styles.addIconWrapper}>
            <Ionicons
              name="ios-add-circle-outline"
              style={styles.addIcon}
              size={20}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = new StyleSheet.create({
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
  rightIcon: {
    margin: 16,
    // color: 'white'
  },
  scrollView: {
    flex: 1,
    padding: 16
  },
  addIconWrapper: {
    height: 54,
    justifyContent: 'center'
  },
  addIcon: {
    color: '#5cb85c'
  },
  textInput: {
    height: 54,
    marginBottom: 16
  },
  nameWrapper: {
    paddingHorizontal: 16
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 16,
    color: 'grey'
  }
})