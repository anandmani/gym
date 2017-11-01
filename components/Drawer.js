import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native'
import { DrawerItems } from 'react-navigation'
import { appVersion } from '../App'
import { Ionicons } from '@expo/vector-icons';

export default class Drawer extends PureComponent {

  constructor() {
    super()
    this.state = {
      appMeta: {}
    }
  }

  async componentDidMount() {
    const appMeta = await this.fetchAppMeta
    this.setState({ appMeta })
  }

  fetchAppMeta = () => AsyncStorage.getItem('appMeta')

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <View style={styles.userImageContainer}>
            <Image
              source={require('../resources/goku.jpeg')}
              style={styles.userImage}
            />
          </View>
          <Text
            style={styles.userName}
          >
            {
              this.state.appMeta.username ? this.state.appMeta.username : 'Username'
            }
          </Text>
        </View>
        <View
          style={
            {
              flexDirection: 'row',
              backgroundColor: '#f8fdb2',
              padding: 8
            }
          }
        >
          <Ionicons
            name="md-sync"
            size={20}
            color="grey"
          />
          <Text
            style={{
              color: 'grey',
              paddingLeft: 8
            }}
          >
            Last synced at:
          </Text>
        </View>
        {
          <DrawerItems {...this.props} />
        }
        <Text
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 8,
            backgroundColor: '#eeeeee',
            fontSize: 12,
            color: 'grey'
          }}
        >
          App version: {appVersion}
        </Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userContainer: {
    paddingTop: 8,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userImageContainer: {
    paddingHorizontal: 16,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  userName: {
    fontSize: 16,
    flex: 1,
    paddingRight: 16
  }
})