import React, { PureComponent } from 'react'
import { TouchableNativeFeedback, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const hitSlop = { top: 16, bottom: 16, left: 16, right: 16 }

export default class ToolbarIcon extends PureComponent {
  render() {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(this.props.nativeFeedbackBackgroundColor, true)}
        onPress={this.props.onPress}
        hitSlop={hitSlop}
      >
        <View
          style={this.props.viewStyle}
        >
          <Ionicons
            name={this.props.iconName}
            size={32}
          />
        </View>
      </TouchableNativeFeedback>
    )
  }
}

ToolbarIcon.defaultProps = {
  iconName: "md-menu",
  onPress: () => null,
  nativeFeedbackBackgroundColor: '#cccccc',
  viewStyle: {
    margin: 16
  }
}
