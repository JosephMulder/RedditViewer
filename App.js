import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import HomeScreen from './component/HomeScreen';
import ToggleSwitch from 'toggle-switch-react-native';
 

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: true,
      nsfw: true
    }
    this.commentsToggle = this.commentsToggle.bind(this);
    this.nsfwToggle = this.nsfwToggle.bind(this);
  }
  commentsToggle() {
    let opposite = !this.state.comments;
    this.setState({
      comments: opposite
    });
  };

  nsfwToggle() {
    let opposite = !this.state.nsfw;
    this.setState({
      nsfw: opposite
    });
  };

  render() {

    return (
       <MyApp screenProps={{comments: this.state.comments, nsfw: this.state.nsfw, commentsToggle: this.commentsToggle, nsfwToggle: this.nsfwToggle}} /> 
    );
  }
}



  

  class Sidebar extends React.Component {
    constructor(props) {
      super(props);

    }
    render() {

      return (
  <View style={styles.sidebar}>
    <View style={styles.sidebarheader}>
      <Text style={styles.sidebarText}>Settings</Text>

      <TouchableOpacity  style={styles.closebutton} onPress={this.props.navigation.closeDrawer}> 
          <Image style={{width: 30, height: 30}} source={require("./img/close.png")}/>
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

    <View>
      <Text>Made by Joseph Mulder</Text>
    </View>

  </View>
    )}
  }




const MyApp = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  }
}, {
    initialRouteName: 'Home',
    drawerPosition: 'right',
    contentComponent: Sidebar,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    sliderOn: false
});



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
      padding: 15
  },
  closebutton: {
    paddingLeft: '25%',
    flexDirection: 'row',
    paddingBottom: 10
  }
});


