import React, { PureComponent } from 'react'
import { StyleSheet, Text, TextInput, View, Picker } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const measures = [
  {
    label: 'kg',
    value: 'kg'
  },
  {
    label: 'min',
    value: 'min'
  },
  {
    label: 'km',
    value: 'km'
  }
]

export default class Set extends PureComponent {
  constructor() {
    super()
    this.state = { measure: measures[0].value }
  }

  renderPickerItem = (item) => <Picker.Item key={item.value} label={item.label} value={item.value} />

  render() {
    return (
      <View style={styles.container}>
        <Ionicons
          name="ios-close-circle-outline"
          style={styles.removeSet}
          size={20}
        />
        <View style={styles.repsView}>
          <TextInput
            placeholder='Reps'
            keyboardType="numeric"
            style={styles.textInput}
          />
          <Ionicons
            name="ios-remove-circle-outline"
            size={20}
          />
        </View>
        <View style={styles.measureView}>
          <TextInput
            placeholder='#'
            keyboardType="numeric"
            style={styles.textInput}
          />
          <Picker
            selectedValue={this.state.measure}
            onValueChange={(itemValue, itemIndex) => this.setState({ measure: itemValue })}
            mode='dropdown'
            style={styles.picker}
          >
            {
              measures.map(this.renderPickerItem)
            }
          </Picker>
          <Ionicons
            name="ios-remove-circle-outline"
            size={20}
          />
        </View>
      </View>
    )
  }
}

Set.defaultProps = {
  number: 1,
  reps: 15,
  measure: {
    value: 10,
    units: 'kg'
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10
  },
  textInput: {
    flex: 1,
    height: 54,
  },
  picker: {
    width: 75
  },
  repsView: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 32
  },
  measureView: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeSet: {
    color: '#d9534f',
    alignSelf: 'center',
    marginRight: 16
  }
})