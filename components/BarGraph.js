import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native'
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis, VictoryLegend } from "victory-native";
import { colors } from '../utils'

const axisStyle = {
  axisLabel: {
    padding: 30
  }
}

const xAxisStyle = {
  tickLabels: { fontSize: 0, padding: 5 }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    marginBottom: 16
  },
  subHeading: {
    fontSize: 16,
    color: 'grey',
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20
  }
})

export default class BarGraph extends Component {
  constructor(props) {
    super(props)
    this.findDependentAxis(props) //reps or measure
    this.getAxes()
    this.getBarGroups()
  }

  findDependentAxis = () => {
    this.dependentAxis = this.props.exercises[0].sets[0].reps ? 'reps' : this.props.exercises[0].sets[0].measure.units
  }

  getAxes = () => {
    this.axes = ['sets', this.dependentAxis]
  }

  getBarGroup = ({ sets }, groupIndex) => {
    return sets.map((set, index) => {
      const returnObject = {
        set: index + 1,
        x: groupIndex + 1 + index * 3 //for spacing alternatively
      }
      returnObject.y = this.dependentAxis === 'reps' ? set.reps : set.measure.value
      return returnObject
    })
  }

  getBarGroups = () => {
    this.barGroups = this.props.exercises.map(this.getBarGroup)
  }

  getLegendRow = (exercise, index) => ({
    name: exercise.date,
    symbol: {
      fill: colors[index]
    }
  })

  getLegend = () => this.props.exercises.map(this.getLegendRow)

  renderBarGroup = (data, index) => (
    <VictoryBar
      key={index}
      style={{
        data: { fill: colors[index] },
        parent: { border: "1px solid #ccc" }
      }}
      data={data}
      labels={d => d.set}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <Text
          numberOfLines={1}
          style={styles.subHeading}
        >
          {this.props.exercises[0].name}
        </Text>
        <VictoryChart
          domainPadding={20}
          title='title'
          desc='desc'
          label='kg'
          theme={VictoryTheme.material}
        >
          <VictoryLegend
            x={50} y={30}
            orientation="horizontal"
            data={this.getLegend()}
          />
          <VictoryAxis
            label={this.axes[0]}
            style={xAxisStyle}
            tickCount={1}
          />
          <VictoryAxis
            dependentAxis
            label={this.axes[1]}
            style={axisStyle}
          />
          {
            this.barGroups.map(this.renderBarGroup)
          }
          {/* <VictoryBar
            style={{
              data: { fill: colors[0] },
              parent: { border: "1px solid #ccc" }
            }}
            data={[
              { y: 15, x: 1, set: 1 },
              { y: 12, x: 4, set: 2 },
              { y: 10, x: 7, set: 3 },
            ]}
            labels={d => d.set}
          />
          <VictoryBar
            style={{
              data: { fill: colors[1] },
              parent: { border: "1px solid #ccc" }
            }}
            data={[
              { y: 20, x: 2, set: 1 },
              { y: 15, x: 5, set: 2 },
              { y: 13, x: 8, set: 3 },
            ]}
            labels={d => d.set}
          /> */}
        </VictoryChart>
      </View>
    );
  }
}