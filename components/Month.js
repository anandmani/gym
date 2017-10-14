import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { daysInMonth, getDay } from '../utils'
const {height: windowHeight, width: windowWidth} = Dimensions.get('window');

const today = new Date()
const a = new Array(31).fill(1)

export default class Month extends PureComponent {
  constructor(props) {
    super(props)
    this.numberOfCells = daysInMonth(props.month, props.year)
    this.numberOfDummyCells = getDay(1, props.month, props.year)
  }
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
            Array(this.numberOfCells).fill().map((item, index) => (
              <Text style={styles.realCell} key={index}>
                {index + 1}
              </Text>
            ))
          }
        </View>
      </View>
    )
  }
}

Month.defaultProps = {
  month: 10,
  year: 2017
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
  },
  dummyCell: {
    flexBasis: `${100 / 7}%`,
    // height: `${100 / 6}%`,
    height: (windowHeight - 100)/6
  },
  cell: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
    paddingTop: 10,
    fontSize: 10,
  }
})

styles.realCell = StyleSheet.flatten([styles.dummyCell, styles.cell])