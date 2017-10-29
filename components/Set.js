import React, { PureComponent } from 'react'
import { StyleSheet, Text, TextInput, View, Picker, TouchableNativeFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import TextField from './TextField'

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

class IconWrapper extends PureComponent {
  render() {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(this.props.nativeFeedbackBackgroundColor)}
        onPress={this.props.onPress}
      >
        <View style={this.props.viewStyle}>
          <Ionicons
            name={this.props.iconName}
            size={this.props.iconSize}
            style={this.props.iconStlye}
          />
        </View>
      </TouchableNativeFeedback>
    )
  }
}

export default class Set extends PureComponent {
  constructor() {
    super()
    this.state = { measure: measures[0].value }
  }

  renderPickerItem = (item) => <Picker.Item key={item.value} label={item.label} value={item.value} />

  getMeasurePlaceholder = () => {
    switch (this.props.set.getIn(['measure', 'units'])) {
      case 'kg':
        return 'Weight'
      case 'min':
        return 'Time'
      case 'km':
        return 'Distance'
    }
  }

  handleRemove = () => this.props.onRemove(this.props.index)

  handleChange = (path, value) => {
    const newSet = this.props.set.setIn(path, value)
    this.props.onChange(this.props.index, newSet)
  }

  handleRepsChange = (value) => {
    value = Number(value)
    this.handleChange(['reps'], value)
  }

  handleMeasureValueChange = (value) => {
    value = Number(value)
    this.handleChange(['measure', 'value'], value)
  }

  handleMeasureUnitsChange = (value) => {
    this.handleChange(['measure', 'units'], value)
  }

  handleRemoveRep = () => {
    const newSet = this.props.set.delete('reps')
    this.props.onChange(this.props.index, newSet)
  }

  handleRemoveMeasure = () => {
    const newSet = this.props.set.delete('measure')
    this.props.onChange(this.props.index, newSet)
  }

  render() {
    return (
      <View style={styles.container}>

        <IconWrapper
          nativeFeedbackBackgroundColor='#d9534f'
          onPress={this.handleRemove}
          viewStyle={styles.removeSet}
          iconName='ios-close-circle-outline'
          iconSize={20}
          iconStlye={styles.removeSetIcon}
        />

        {
          (this.props.set.get('reps') !== undefined) ?
            <View style={styles.repsView}>
              <TextInput
                placeholder='Reps'
                keyboardType="numeric"
                style={styles.textInput}
                value={
                  this.props.set.get('reps') ? String(this.props.set.get('reps')) : null
                }
                onChangeText={this.handleRepsChange}
                selectTextOnFocus
              />
              {
                this.props.showRemoveIcons && this.props.set.getIn(['measure', 'units']) ?
                  <IconWrapper
                    nativeFeedbackBackgroundColor='#ffcc00'
                    onPress={this.handleRemoveRep}
                    viewStyle={styles.removeRep}
                    iconName="ios-remove-circle-outline"
                    iconSize={15}
                    iconStlye={styles.removeRepIcon}
                  />
                  :
                  null
              }
            </View>
            :
            null
        }
        {
          this.props.set.getIn(['measure', 'units']) ?
            <View style={styles.measureView}>
              <TextInput
                placeholder={this.getMeasurePlaceholder()}
                keyboardType="numeric"
                style={styles.textInput}
                value={
                  this.props.set.getIn(['measure', 'value']) ? String(this.props.set.getIn(['measure', 'value'])) : null
                }
                onChangeText={this.handleMeasureValueChange}
                selectTextOnFocus
              />
              <Picker
                selectedValue={this.props.set.getIn(['measure', 'units'])}
                mode='dropdown'
                onValueChange={this.handleMeasureUnitsChange}
                style={styles.picker}
              >
                {
                  measures.map(this.renderPickerItem)
                }
              </Picker>
              {
                (this.props.showRemoveIcons && this.props.set.get('reps') !== undefined) ?
                  <IconWrapper
                    nativeFeedbackBackgroundColor='#ffcc00'
                    onPress={this.handleRemoveMeasure}
                    viewStyle={styles.removeRep}
                    iconName="ios-remove-circle-outline"
                    iconSize={15}
                    iconStlye={styles.removeRepIcon}
                  />
                  :
                  null
              }

            </View>
            :
            null
        }
      </View>
    )
  }
}

Set.propTypes = {
  index: PropTypes.number,
  onRemove: PropTypes.func,
  onChange: PropTypes.func,
  set: ImmutablePropTypes.mapContains({
    reps: PropTypes.number,
    measure: ImmutablePropTypes.mapContains({
      value: PropTypes.number,
      units: PropTypes.string
    })
  })
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    height: 54
  },
  textInput: {
    flex: 1,
    height: '100%',
  },
  picker: {
    width: 90
  },
  repsView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    marginRight: 20
  },
  measureView: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeSet: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48
  },
  removeSetIcon: {
    color: '#d9534f'
  },
  removeRep: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30
  },
  removeRepIcon: {
    color: '#ffd500'
  }
})