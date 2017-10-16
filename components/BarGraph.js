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
            label='sets'
            style={xAxisStyle}
            tickCount={1}
          />
          <VictoryAxis
            dependentAxis
            label='kg'
            style={axisStyle}
          />
          <VictoryBar
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
          />
        </VictoryChart>
      </View>
    );
  }
}