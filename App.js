import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import HomeScreen from './component/HomeScreen';
import SideBar from './component/SideBar.js';
 

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



const MyApp = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  }
}, {
    initialRouteName: 'Home',
    drawerPosition: 'right',
    contentComponent: SideBar,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    sliderOn: false
});


