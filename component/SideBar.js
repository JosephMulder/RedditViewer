import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, WebView } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
 

export default class SideBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showPolicy: false
      }
      this.showPolicy = this.showPolicy.bind(this);
    }

    showPolicy() {
      this.setState({
        showPolicy: true
      });
    }

    render() {
      let PrivatePolicy;

      if (this.state.showPolicy) {
        PrivatePolicy = 
        <WebView
          source={{uri: `https://redditviewer.firstcloudit.com`}}
          style={{height: 200, width: '100%', flex: 1}}
          bounces={false}
          scrollEnable={false}
        />;
      } else {
       PrivatePolicy =
        <TouchableOpacity onPress={this.showPolicy} style={{flex: 1}}>
          <Text style={{padding: 15, paddingLeft: 25, fontSize: 20, color: 'white'}}>View Private Policy</Text>
        </TouchableOpacity>;
      }

      return (
  <View style={styles.sidebar}>
    <View style={styles.sidebarheader}>
      <Text style={styles.sidebarText}>Settings</Text>

      <TouchableOpacity  style={styles.closebutton} onPress={this.props.navigation.closeDrawer}> 
          <Image style={{width: 30, height: 30}} source={require("./../img/close.png")}/>
      </TouchableOpacity>
    </View>

    <View style={styles.toggle}>
      <ToggleSwitch
          isOn={this.props.screenProps.comments}
          onColor='green'
          offColor='red'
          label='Turn off Comments'
          labelStyle={{color: 'white', fontWeight: '700', fontSize: 14}}
          size='large'
          onToggle={ () => this.props.screenProps.commentsToggle() }
      />
    </View>

    <View style={styles.toggle}>
      <ToggleSwitch
          isOn={this.props.screenProps.nsfw}
          onColor='green'
          offColor='red'
          label='Hide 18+ Content   '
          labelStyle={{color: 'white', fontWeight: '700', fontSize: 14}}
          size='large'
          onToggle={ () => this.props.screenProps.nsfwToggle() }
      />
    </View>

      {PrivatePolicy}

    <View>
      <Text style={{paddingLeft: 25, paddingTop: 15, paddingBottom: 10}}>Made by Joseph Mulder</Text>
    </View>

  </View>
    )}
  }



  const styles = StyleSheet.create({
    sidebar: {
      flex: 1,
      backgroundColor: '#707070'
    },
    sidebarheader: {
      paddingTop: 25,
      paddingBottom: 5,
      borderBottomWidth: 1.0,
      borderColor: 'black',
      backgroundColor: '#212121',
      paddingLeft: '36%',
      flexDirection: 'row'
    },
    sidebarText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '600'
    },
    toggle: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: 'white'
    },
    closebutton: {
      paddingLeft: '25%',
      flexDirection: 'row',
      paddingBottom: 10
    }
  });