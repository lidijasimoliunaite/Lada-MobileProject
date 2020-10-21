import React, {Component} from 'react';
import { View, TouchableOpacity, Button } from 'react-native';
import SearchBar from './components/SearchBar'
import AppHeader from './components/Header'
import YTSearch from 'youtube-api-search'
import VideoList from './components/VideoList'

const API_KEY = 'AIzaSyANir3Ut46XopoTZT31o8yWVl7zygBTD58';

export default class App extends Component {


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
      <AppHeader headerText='Find Track in Youtube'/>
      <SearchBar loading={this.state.loading} onPressSearch={this.onPressSearch}/>
      <VideoList videos={this.state.videos}/>
    </View>
  );
}
}

