import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Main from './Main.js';
import SinglePost from './SinglePost.js';

export default class HomeScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        subreddits: ["All", "r/pics", "r/movies", "r/funny", "r/mildlyinteresting", "r/colorizedhistory", "r/jokes", "r/showerthoughts"],
        data: [{data: {title: 'Loading', thumbnail: 'https://i.redd.it/rl4vx3maabj11.jpg', score: 1337, likes: null }}],
        show: 'all',
        singlePost: false,
        singlePostData: []
      }
      this.toListing = this.toListing.bind(this);
    } 

  
    pickSub(sub) {
   
      if (sub && sub === 'All') {
        this.setState({
          show: 'all',
          singlePost: false
        });
      } else {
        this.setState({
          show: sub.slice(2),
          singlePost: false
        });
      } 
    };
  
    toListing(subreddit, id) {
      this.setState({
        singlePost: true,
        singlePostData: [subreddit, id]
      });
    };


    render() {

      let backbutton;
      if (this.state.singlePost) {
        backbutton = 
        <TouchableOpacity style={{paddingLeft: '6%'}} onPress={() =>this.pickSub('All')}> 
          <Image style={{width: 25, height: 25}} source={require("./../img/back.png")}/>
        </TouchableOpacity>;
      } else {
        backbutton = 
        <TouchableOpacity style={{paddingLeft: '13%'}}> 
          <Image style={{width: 25, height: 25, display: 'none'}} source={require("./../img/back.png")}/>
        </TouchableOpacity>;
      }
    return (


<View style={styles.container}>

  <View style={styles.header}>
    {backbutton}
    <TouchableOpacity style={{paddingLeft: '21%'}}> 
      <Text style={styles.headerText}>RedditViewer</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{paddingLeft: '21%'}} onPress={() => this.props.navigation.openDrawer()}>
      <Image style={{width: 22, height: 22}} source={require("./../img/sidebar.png")}/>
    </TouchableOpacity>
  </View>


  <View>
    <ScrollView horizontal={true} style={styles.options}>
      {this.state.subreddits.map((sub, index) => (
        <TouchableOpacity key={index} onPress={() => this.pickSub(sub)}>
          <Text style={styles.scrollText}>{sub}</Text>
        </TouchableOpacity>
      ))} 
    </ScrollView>
  </View>
  {!this.state.singlePost ?
  <Main show={this.state.show} toListing={this.toListing} nsfw={this.props.screenProps.nsfw} />
  : <SinglePost data={this.state.singlePostData} comments={this.props.screenProps.comments}/>}

</View>


    );
  }
}



const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    header: {
      width: '100%',
      alignItems: 'center',
      paddingTop: 40,
      paddingBottom: 10,
      borderBottomWidth: 2.0,
      backgroundColor: '#212121',
      flexDirection: 'row'
    },
    headerText: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold'
    },
    options: {
      paddingBottom: 7,
      paddingTop: 7,
      borderBottomWidth: 2.0,
      backgroundColor: '#303030'
    },
    scrollText: {
      fontSize: 16,
      color: 'white',
      paddingLeft: 25
    }
  });
