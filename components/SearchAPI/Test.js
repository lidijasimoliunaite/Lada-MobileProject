import React, {Component, useEffect} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import SearchBar from './SearchBar'
import AppHeader from '../Header'
import YTSearch from 'youtube-api-search'
import VideoList from './VideoList'
import { Icon } from 'native-base';



const API_KEY = 'AIzaSyANir3Ut46XopoTZT31o8yWVl7zygBTD58';




export default class Test extends Component {


state = {
  loading: false,
  videos: []
}

onPressSearch = term => {
  this.searchYT(term);
}

searchYT = term => {
  this.setState({ loading: true});
  YTSearch({key: API_KEY, term}, videos => {
    console.log(videos);
    this.setState({ loading: false, videos});
  });
}

  render() {
  return (
    <View style={{ flex: 1, backgroundColor: '#ddd' }}>
              <View style={{ backgroundColor: '#783694', height: 60, flexDirection: 'row' }}>
          <View style={{ marginLeft: 10, marginTop: 5 }} >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Playlist')}>
              <Icon style={{ color: '#fff', fontSize: 45 }} name="back" type="AntDesign" />
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 80, marginTop: 13 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Search song</Text>
          </View>
        </View>
      <SearchBar loading={this.state.loading} onPressSearch={this.onPressSearch}/>
      <VideoList videos={this.state.videos}/>
    </View>
  );
}
}