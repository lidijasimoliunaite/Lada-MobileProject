import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import { Icon, Fab } from 'native-base';
import Button from 'react-native-button';
import YoutubePlayer from "react-native-youtube-iframe";
import firebase from '../database/firebase';




export default class Playlist extends Component {

  componentDidMount() {
    this.state.JSON_from_server = [];
    AsyncStorage.getItem('Key_28').then((value) => this.setState({ creatorEmail: value }))
    fetch('https://finstudy.lt/react/playlist.php?creatorEmail=' + this.state.creatorEmail)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ JSON_from_server: [...this.state.JSON_from_server, ...responseJson] });
        this.state.isLoading = false;
        this.refresh();
      })
      .catch((error) => {
        console.error(error);
      });        
  }


  addLike =()=>{
    AsyncStorage.getItem('Key_28').then((value) => this.setState({ creatorEmail: value }));
    fetch('https://finstudy.lt/react/like.php',
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    videoID: this.state.videoID,
                    creatorEmail: this.state.creatorEmail,
                    userEmail: firebase.auth().currentUser.email,
                })

        }).then((response) => response.json()).then((responseJson) => {
            alert(responseJson);
        }).catch((error) => {
            console.error(error);

        });
};







  
  refresh = () => {
    this.state.JSON_from_server = [];
    AsyncStorage.getItem('Key_28').then((value) => this.setState({ creatorEmail: value }))
    fetch('https://finstudy.lt/react/playlist.php?creatorEmail=' + this.state.creatorEmail)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ JSON_from_server: [...this.state.JSON_from_server, ...responseJson], isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setPlaying = () => {
    this.setState({ playing: !this.state.playing })
  }


  constructor() {
    super();
    this.state = {
      isLoading: true,
      JSON_from_server: [],
      fetching_Status: false,
      creatorEmail: '',
      videoID: '',
      userEmail: '',
    }


  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#783694', height: 60, flexDirection: 'row' }}>
          <View style={{ marginLeft: 10, marginTop: 5 }} >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Events')}>
              <Icon style={{ color: '#fff', fontSize: 45 }} name="back" type="AntDesign" />
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 80, marginTop: 13 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Event Playlist</Text>
          </View>
          <View style={{ left: 75, marginTop: 5 }}>
            <TouchableOpacity
              onPress={this.refresh}>
              <Icon style={{ color: '#fff', fontSize: 45 }} name="reload" type="MaterialCommunityIcons" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          
          {
            (this.state.isLoading == true)
              ?
              (<Text>Press update button to see music list</Text>)
              :
              (
                <FlatList
                  style={{ width: '100%' }}
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.JSON_from_server}
                  ItemSeparatorComponent={this.FlatListItemSeparator}
                  renderItem={({ item, index }) =>
                    <React.Fragment>
                      <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'center'}}>
                      
                        <YoutubePlayer
                          height={170}
                          width={'70%'}
                          play={this.state.playing}
                          volume={100}
                          videoId={item.videoID}
                        />
                       
                       <TouchableOpacity
              onPress={() => {this.state.videoID = item.videoID; this.addLike(); console.log('hellllllll'); this.refresh()}}>
              <Icon style={{ color: '#000', fontSize: 45 }} name="like2" type="AntDesign" />
              
            </TouchableOpacity>
            <Text style={{fontSize: 20, color: "black"}}>{item.likes}</Text>
                        </View>
                    </React.Fragment>
                  }
                />
              )
          }
        </View>
        <Fab
          direction="up"
          containerStyle={{ marginLeft: 10 }}
          style={{ backgroundColor: '#783694' }}
          position="bottomRight"
          onPress={() => {AsyncStorage.setItem('Key_29',this.state.creatorEmail); console.log(this.state.creatorEmail); this.props.navigation.navigate('Search')}}>
          <Icon style={{ color: '#fff', fontSize: 55 }} name="ios-add" />
        </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  }
});
