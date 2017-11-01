import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLegend } from "victory-native";
import { colors } from '../utils'

const axisStyle = {
  axisLabel: { padding: 30 },
  tickLabels: { fontSize: 12, padding: 5 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 8,
    marginHorizontal: 8
  },
  titleContainer: {
    height: 40,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: 'grey'
  },
  title: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 18,
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
        tickFormat={(t) => Number.isInteger(t) ? `${Math.round(t)}` : ''}
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
        <View style={styles.titleContainer}>
          <Text
            numberOfLines={1}
            style={styles.title}
          >
            {this.props.exercises[0].name}
          </Text>
        </View>
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