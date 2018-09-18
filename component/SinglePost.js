import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, WebView } from 'react-native';
import axios from 'react-native-axios';
let SortComments = require('./../SortComments.js').getComments;

export default class LoadingScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [{data:{children: [{data: {title: 'Loading...', ups: 1337, url: "https://i.redd.it/tk0i07xvopj11"}}]}},{data:{children: [{data: {title: 'Loading...', ups: 1337,data: {body: 'blah blah', author: 'huh'}, body: "blah blah blah"}}]}}],
        like: null
      }
    } 

    componentWillMount() {
        this.listingData();
    }

    listingData() {
        axios.get(`https://www.reddit.com/r/${this.props.data[0]}/comments/${this.props.data[1]}.json?limit=25`)
            .then((res) => {

                this.setState({
                    data: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    changeScore() {
        let prevstate = this.state.like;
    
        if (prevstate === 'upvote') {
          prevstate = 'none';
        } else {
          prevstate = 'upvote';
        }
        this.setState({
          like: prevstate
        })
      }
    
      changeScoreNegative() {
        let prevstate = this.state.like;
    
        if (prevstate === 'downvote') {
            prevstate = 'none';
          } else {
            prevstate = 'downvote';
          }
          this.setState({
            like: prevstate
          })
      }


    render() {

    let comments = SortComments(this.state.data);
    let postType = this.state.data[0].data.children[0].data.post_hint;
    let selfPost = this.state.data[0].data.children[0].data.selftext;
    let domain = this.state.data[0].data.children[0].data.domain;
    let thumbnail = this.state.data[0].data.children[0].data.thumbnail;
    let renderThis;

    if (postType === 'hosted:video') {
        renderThis = <WebView
        source={{uri: this.state.data[0].data.children[0].data.media.reddit_video.fallback_url}}
        style={{height: 300, width: '100%'}}
        bounces={false}
        scrollEnable={false}
      />

    } else if (postType === 'image') {
        renderThis = <Image style={{width: '100%', height: 450}} source={{uri: this.state.data[0].data.children[0].data.url}} resizeMode="contain"/>;

    } else if (postType === 'link' && (this.state.data[0].data.children[0].data.url.slice(this.state.data[0].data.children[0].data.url.length -3) === 'ifv') ) {
        renderThis = <WebView
        source={{uri: this.state.data[0].data.children[0].data.url}}
        style={{height: 450, width: '100%'}}
        bounces={false}
        scrollEnable={false}
        />;
    } else if (postType === 'link' && (this.state.data[0].data.children[0].data.url.indexOf('imgur') !== -1)) {
        renderThis = <Image style={{width: '100%', height: 600}} source={{uri: this.state.data[0].data.children[0].data.url + '.jpg'}} resizeMode="contain"/>;
    } else if (postType === 'link') {
    renderThis = <WebView
        source={{uri: this.state.data[0].data.children[0].data.url}}
        style={{height: 500, width: '100%'}}
        bounces={false}
        scrollEnable={false}
      />;

    } else if (postType === 'rich:video') {
        renderThis = <Image style={{width: '100%', height: 700}} source={{uri: this.state.data[0].data.children[0].data.secure_media.oembed.thumbnail_url}} resizeMode="contain"/>;
    } else if (selfPost) {
        renderThis = 
            <View style={{padding: 10, borderTopWidth: 1.5, borderBottomWidth: 1.5, borderColor: '#707070'}}>
                <Text style={{color: 'white'}}>{selfPost}</Text>
            </View>;
    } else if (thumbnail === 'self') {
        renderThis =             
        <View style={{display: 'none'}}>
            <Text>{selfPost}</Text>
        </View>;
    } else if (domain && domain.indexOf('eddit') === -1) {
        renderThis = <WebView
        source={{uri: this.state.data[0].data.children[0].data.url}}
        style={{height: 500, width: '100%'}}
        bounces={false}
        scrollEnable={false}
      />;
    } else {
        renderThis =             
        <View style={{display: 'none'}}>
            <Text>{selfPost}</Text>
        </View>;
    }


      return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerScore}>
                    <TouchableOpacity onPress={() => this.changeScore()}>
                        <Image style={{width: 30, height: 30}} source={this.state.like === 'upvote' ? require("./../img/upvoteclicked.png"): require("./../img/upvote.png")}/>
                    </TouchableOpacity>
                    <Text style={styles.articleText}>{this.state.data[0].data.children[0].data.score}</Text>
                    <TouchableOpacity onPress={() => this.changeScoreNegative()}>
                        <Image  style={{width: 30, height: 30}} source={this.state.like === 'downvote' ? require("./../img/downvoteclicked.png"):require("./../img/downvote.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleBody}>
                    <Text style={styles.title}>{this.state.data[0].data.children[0].data.title.slice(0, 98)}</Text>
                </View>
            </View>

            {renderThis}
           
           <View style={styles.commentSection}>
               <Text style={styles.commentSectionText}>{this.props.comments ? <Text>Comments</Text> : <Text>Comments off</Text>}</Text>
           </View>

           {this.props.comments ? comments.map((comment, index) => (
               <View key={index} style={styles.eachComment}>
                  <Text style={{color: 'white'}}>
                    <Text style={styles.userName}>{comment[1]}: </Text>
                    <Text>{comment[0]}</Text>
                  </Text>
            
               </View>
           )) : <Text style={styles.commentsOff}>To turn comments back on, go to settings</Text>}

        </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#303030'
    },
    header: {
        width: '100%',
        height: 100,
        paddingTop: 15,
        flexDirection: 'row'
    },
    headerScore: {
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        width: '20%'
    },
    titleBody: {
        alignItems: 'flex-start',
         flex: 1
    },
    title: {
        flex: 1,
        flexWrap: 'wrap', 
        color: 'white', 
        paddingLeft: 10, 
        paddingRight: 5, 
        fontSize: 16, 
        paddingTop: 15, 
        fontWeight: 'bold'
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
    commentSection: {
        padding: 8, 
        borderBottomWidth: 0.5, 
        borderColor: '#707070'
    },
    commentSectionText: {
        fontSize: 16, 
        color: 'white', 
        fontWeight: 'bold'
    },
    eachComment: {
        padding: 10, 
        borderBottomWidth: 0.2, 
        borderColor: '#707070'
    },
    userName: {
        fontWeight: '700', 
        color: 'lightblue'
    },
    commentsOff: {
        color: 'lightblue', 
        paddingLeft: 10, 
        paddingTop: 10
    }
  });

