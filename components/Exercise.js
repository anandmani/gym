import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableNativeFeedback, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { fromJS } from 'immutable'
import Set from './Set'
import ToolbarIcon from './ToolbarIcon'
import TextField from './TextField'


const defaultNewSet = {
  reps: null,
  measure: {
    value: null,
    units: 'kg'
  }
}

export default class Exercise extends PureComponent {

  constructor() {
    super()
    const newSet = fromJS(defaultNewSet)
    this.state = {
      name: null,
      sets: [
        newSet
      ],
      errors: {
        name: false
      }
    }
    this.nameInput
  }

  focusNameInput = () => this.nameInput.focus()

  componentDidMount() {
    setTimeout(this.focusNameInput)
  }

  addSet = () => {
    const newSet = this.state.sets.length ?
      fromJS({
        reps: (this.state.sets[0].get('reps') !== undefined) ? null : undefined,
        measure: this.state.sets[0].get('measure') ?
          {
            value: null,
            units: this.state.sets[0].getIn(['measure', 'units'])
          }
          :
          undefined
      })
      :
      fromJS(defaultNewSet)
    this.setState({
      sets: [...this.state.sets, newSet]
    })
  }

  changeSet = (index, value) => {
    const newSets = [...this.state.sets]
    newSets.splice(index, 1, value)
    this.setState({ sets: newSets })
  }

  removeSet = (index) => {
    const newSets = [...this.state.sets]
    newSets.splice(index, 1)
    this.setState({ sets: newSets })
  }

  renderSet = (set, index) => {
    const showRemoveIcons = (index > 0) ? false : (this.state.sets.length > 1) ? false : true //Show remove icons only if there is one set
    return (
      <Set
        key={index}
        index={index}
        set={set}
        onChange={this.changeSet}
        onRemove={this.removeSet}
        showRemoveIcons={showRemoveIcons}
      />
    )
  }

  handleNameChange = (name) => this.setState({ name })

  validateForm = () => {
    if (!this.state.name) {
      this.setState({ errors: { name: true } })
      ToastAndroid.show('Fill in error fields', ToastAndroid.SHORT)
      return false
    }
    return true
  }

  handleSubmit = () => {
    if (this.validateForm()) {
      const { onSave, index } = this.props.navigation.state.params
      const { name, sets } = this.state
      sets = sets.map(set => set.toJS())
      onSave(index, { name, sets })
      this.props.navigation.goBack()
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.toolbar}>
          <ToolbarIcon
            iconName="md-arrow-back"
            onPress={() => this.props.navigation.goBack()}
          />
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            Exercise
          </Text>
          <ToolbarIcon
            iconName="md-checkmark"
            onPress={this.handleSubmit}
          />
        </View>

        <View style={styles.nameWrapper}>
          <TextField
            placeholder="Name"
            onChangeText={this.handleNameChange}
            style={styles.textInput}
            error={this.state.errors.name}
            refCallback={(element) => this.nameInput = element}
            selectTextOnFocus
          />
        </View>

        <Text
          numberOfLines={1}
          style={styles.subHeading}
        >
          Sets
        </Text>
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }} keyboardVerticalOffset={0}>
          <ScrollView
            style={styles.scrollView}
          >
            {
              this.state.sets.map(this.renderSet)
            }
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple('#5cb85c')}
              onPress={this.addSet}
            >
              <View style={styles.addIconWrapper}>
                <Ionicons
                  name="ios-add-circle-outline"
                  style={styles.addIcon}
                  size={20}
                />
              </View>
            </TouchableNativeFeedback>
          </ScrollView>
        </KeyboardAvoidingView >
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
  scrollView: {
    flex: 1
  },
  addIconWrapper: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addIcon: {
    color: '#5cb85c'
  },
  textInput: {
    height: 54
  },
  nameWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16
  },
  subHeading: {
    fontSize: 16,
    marginLeft: 16,
    marginTop: 16,
    fontWeight: "500",
    color: 'grey'
  }
})