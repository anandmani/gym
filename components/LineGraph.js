import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native'
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLegend } from "victory-native";
import {colors} from '../utils'

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
  render() {
    return (
      <View style={styles.container}>
        <Text
          numberOfLines={1}
          style={styles.subHeading}
        >
          Barbell Lifts Barbell Lifts Barbell Lifts Barbell Lifts Barbell Lifts
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
            data={[
              { name: "15-Oct", symbol: { fill: colors[0] } },
              { name: "8-Oct", symbol: { fill: colors[1] } },
            ]}
          />
          <VictoryAxis
            label='reps'
            style={axisStyle}
          />
          <VictoryAxis
            dependentAxis
            label='kg'
            style={axisStyle}
          />
          <VictoryLine
            style={{
              data: { stroke: colors[0] },
              parent: { border: "1px solid #ccc" }
            }}
            data={[
              { x: 15, y: 5, set: 1 },
              { x: 12, y: 7.5, set: 2 },
              { x: 10, y: 10, set: 3 },
            ]}
            labels={d => d.set}
          />
          <VictoryLine
            style={{
              data: { stroke: colors[1] },
              parent: { border: "1px solid #ccc" }
            }}
            data={[
              { y: 7.5, x: 15, set: 1 },
              { y: 10, x: 12, set: 2 },
              { y: 12.5, x: 8, set: 3 },
            ]}
            labels={d => d.set}
          />
        </VictoryChart>
      </View>
    );
  }
}