import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableNativeFeedback, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { fromJS } from 'immutable'
import Set from './Set'
import AppBar, { AppBarIcon, AppTitle } from './AppBar'
import TextField from './TextField'
import { modes } from '../utils'

const defaultNewSet = {
  reps: null,
  measure: {
    value: null,
    units: 'kg'
  }
}

export default class Exercise extends PureComponent {

  constructor(props) {
    super(props)
    this.checkMode(props)
    this.mode === modes.edit ? this.initEdit() : this.initNew()
    this.nameInput
  }

  checkMode = (props) => {
    if (props.navigation.state.params && props.navigation.state.params.name) {
      this.mode = modes.edit
      this.name = this.props.navigation.state.params.name
      this.sets = this.props.navigation.state.params.sets
    }
    else {
      this.mode = modes.new
    }
  }

  initEdit = () => {
    this.state = {
      name: this.name,
      sets: fromJS(this.sets),
      errors: {
        name: false
      }
    }
  }

  initNew = () => {
    this.state = {
      name: null,
      sets: fromJS([defaultNewSet]),
      errors: {
        name: false
      }
    }
  }

  focusNameInput = () => this.nameInput.focus()

  componentDidMount() {
    if (this.mode === modes.new) {
      setTimeout(this.focusNameInput)
    }
  }

  addSet = () => {
    const newSet = this.state.sets.size ?
      fromJS({
        reps: (this.state.sets.getIn([0, 'reps']) !== undefined) ? null : undefined,
        measure: this.state.sets.getIn([0, 'measure']) ?
          {
            value: null,
            units: this.state.sets.getIn([0, 'measure', 'units'])
          }
          :
          undefined
      })
      :
      fromJS(defaultNewSet)
    this.setState({ sets: this.state.sets.push(newSet) })
  }

  changeSet = (index, value) => {
    this.setState({ sets: this.state.sets.set(index, value) })
  }

  removeSet = (index) => {
    this.setState({ sets: this.state.sets.delete(index) })
  }

  renderSet = (set, index) => {
    const showRemoveIcons = (index > 0) ? false : (this.state.sets.size > 1) ? false : true //Show remove icons only if there is one set
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

  handleNameChange = (name) => this.setState({ name: name.trim() })

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
      sets = sets.toJS()
      onSave(index, { name, sets })
      this.props.navigation.goBack()
    }
  }

  goBack = () => this.props.navigation.goBack()

  renderAppBar = () => (
    <AppBar>
      <AppBarIcon
        iconName="md-arrow-back"
        onPress={this.goBack}
      />
      <AppTitle>
        Exercise
      </AppTitle>
      <AppBarIcon
        iconName="md-checkmark"
        onPress={this.handleSubmit}
      />
    </AppBar>
  )

  render() {
    return (
      <View style={styles.container}>
        {
          this.renderAppBar()
        }
        <View style={styles.nameWrapper}>
          <TextField
            placeholder="Name"
            value={this.state.name}
            onChangeText={this.handleNameChange}
            style={styles.textInput}
            autoCapitalize='words'
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
    height: 54,
    fontSize: 18,
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