import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLegend } from "victory-native";
import { colors } from '../utils'

const axisStyle = {
  axisLabel: {
    padding: 30
  }
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

export default class LineGraph extends Component {
  constructor(props) {
    super(props)
    this.getAxes()
    this.getLines()
  }

  getAxes = () => {
    this.axes = ['reps', this.props.exercises[0].sets[0].measure.units]
  }

  getSet = (set, index) => ({
    x: set.reps,
    y: set.measure.value,
    set: index + 1
  })

  getLine = ({ sets }) => sets.map(this.getSet)

  getLines = () => {
    this.lines = this.props.exercises.map(this.getLine)
  }

  getLegendRow = (exercise, index) => ({
    name: exercise.date,
    symbol: {
      fill: colors[index]
    }
  })

  getLegend = () => this.props.exercises.map(this.getLegendRow)

  renderAxis = (axis, index) => {
    const conditionalProps = {}
    if (index === 1) {
      conditionalProps.dependentAxis = true
    }
    return (
      <VictoryAxis
        key={index}
        label={axis}
        style={axisStyle}
        {...conditionalProps}
      />
    )
  }

  renderLine = (line, index) => (
    <VictoryLine
      key={index}
      style={{
        data: { stroke: colors[index] },
        parent: { border: "1px solid #ccc" }
      }}
      data={line}
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
            x={250} y={50}
            data={this.getLegend()}
          />
          {
            this.axes.map(this.renderAxis)
          }
          {
            this.lines.map(this.renderLine)
          }
        </VictoryChart>
      </View>
    );
  }
}

LineGraph.defaultProps = {
  exercises: {
  }
}