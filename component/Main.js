import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'react-native-axios';
let SortPosts = require('../SortPosts.js').SortPosts;


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      random: ['What on earth is the URL to get a simple JSON listing of a subreddit?', 'This 23-pound wolf pup, named Shadow, is in the process of completing a 30-day quaranti...', 'Would consider buying starbucks if the etiquete was like this :D', "We're stuck...", "Granny messaged to wish me luck on my test", "Leaked day 1 patch for Spiderman!", 'big fren smol fren', 'An update on the FireEye report and Reddit', 'These two idiots on the highway', 'Florida couple built drive-thru window at mobile home to sell drugs: cops', "This American flag made out of fire hoses in honor of my city’s fire department.", "He was just trying to help.", "This lady's excitement over seeing a skateboarding trick"],
      score: [require("./../img/upvote.png"), require("./../img/upvoteclicked.png"), require("./../img/downvote.png"), require("./../img/downvoteclicked.png")],
      data: [{data: {title: 'Loading...', thumbnail: 'http://www1.pic2go.com/wp-content/themes/pic2go/images/loading_icon.gif', score: 1337, likes: null, suggested_sort: null }}]
    } 
    this.changeScore = this.changeScore.bind(this);
  }

  componentWillMount() {
    this.startupdata(this.props.show);
  }

  changeScore(index) {
    let prevstate = this.state.data;

    if (prevstate[index].data.likes) {
      prevstate[index].data.likes = false;
    } else {
      prevstate[index].data.likes = true;
      prevstate[index].data.dislikes = false;
    }
    this.setState({
      data: prevstate
    })
  }

  changeScoreNegative(index) {
    let prevstate = this.state.data;

    if (prevstate[index].data.dislikes) {
      prevstate[index].data.dislikes = false;
    } else {
      prevstate[index].data.dislikes = true;
      prevstate[index].data.likes = null;
    }
    this.setState({
      data: prevstate
    })
  }



  startupdata(subreddit) {
    axios.get(`https://www.reddit.com/r/${subreddit}/hot.json?limit=25`)
      .then((res) => {
          let postData;

          if (this.props.nsfw) {
            postData = res.data.data.children.slice(2);
          } else {
            postData = SortPosts(res.data.data.children.slice(2));
          }
        this.setState({
          data: postData
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
  componentWillReceiveProps(nextProps) {
      this.startupdata(nextProps.show);
  }
 

  render() {

    return (
      <ScrollView style={styles.container}>
        {this.state.data.map((listing, index) => (
        <View key={index} style={styles.article}>

          <View style={styles.articleScore}>
            <TouchableOpacity onPress={() => this.changeScore(index)}>
              <Image style={{width: 20, height: 20}} source={listing.data.likes ? require("./../img/upvoteclicked.png"): require("./../img/upvote.png")}/>
            </TouchableOpacity>
            <Text style={styles.articleText}>{listing.data.score}</Text>
            <TouchableOpacity onPress={() => this.changeScoreNegative(index)}>
              <Image  style={{width: 20, height: 20}} source={listing.data.dislikes ? require("./../img/downvoteclicked.png"):require("./../img/downvote.png")}/>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => this.props.toListing(listing.data.subreddit, listing.data.id)}>
            {(listing.data.thumbnail.length !== 0 && listing.data.thumbnail !== 'self') ? listing.data.thumbnail === 'nsfw' ? <Image style={{width: 60, height: 60}} source={require("./../img/nsfw.png")}/> :<Image style={{width: 60, height: 60}} source={(listing.data.thumbnail !== 'default' && listing.data.thumbnail !== 'self') ? {uri: listing.data.thumbnail}: require("./../img/link.png")}/>: <Image style={{width: 60, height: 60}} source={require("./../img/textpost.png")}/>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.articleBody} onPress={() => this.props.toListing(listing.data.subreddit, listing.data.id)}>
            <Text style={styles.articleBodyText}>{listing.data.title.slice(0, 98)}</Text>
          </TouchableOpacity>

        </View>
        ))}
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#303030',
    },
    article: {
      paddingTop: 5,
      paddingBottom: 5,
      borderBottomWidth: 1.0,
      borderColor: '#707070',
      flexDirection: 'row',
    },
    articleText: {
      color: 'white'
    },
    articleScore: {
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10,
      width: '20%'
    },
    articleBody: {
      alignItems: 'flex-start',
      flex: 1
    },
    articleBodyText: {
      flex: 1,
      flexWrap: 'wrap',
      color: 'white',
      paddingLeft: 10,
      paddingRight: 5
    }
  });

  //#212121

  //#707070

  //#303030