import React, { useState, useCallback } from 'react'
import { Alert, View, Text, Linking, AsyncStorage } from 'react-native'
import Button from 'react-native-button'
import YoutubePlayer from "react-native-youtube-iframe"

let test2 = AsyncStorage.getItem('Key_29').then((value) => test2=value);
const VideoListItem = ({video}) => {

 const addSong =()=>{
    console.log(test2);
    AsyncStorage.getItem('Key_29').then((value) => test2=value);
    console.log(test2);
    fetch('https://finstudy.lt/react/add_song.php',
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    videoID: video.id.videoId,
                    videoTitle: video.snippet.title,
                    creatorEmail: test2
                })

        }).then((response) => response.json()).then((responseJson) => {
            alert(responseJson);
        }).catch((error) => {
            console.error(error);

        });
};

  

    const { imageStyle } = styles;
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setPlaying(false);
        Alert.alert("video has finished playing!");
      }
    }, []);
  
    const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
    }, []);

return (
    <View>
        <View style={{flexDirection: 'row'}}>
               
               <YoutubePlayer
        height={150}
        width={'50%'}
        play={playing}
        volume={100}
        videoId={video.id.videoId}
        onChangeState={onStateChange}
      />
          
      <Text style={{width: 200, marginLeft: 5, fontSize: 14, fontWeight: 'bold'}}>{video.snippet.title}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: -25}}>
      <Button
       style={{ width: 100, height: 30, backgroundColor: '#00BFFF', color: 'white', fontSize: 18, fontWeight: 'bold'}}
       onPress={togglePlaying}>{playing ? "PAUSE" : "PLAY"}
      </Button>
      <Button 
      style={{ marginLeft: 5, width: 100, height: 30, backgroundColor: 'green', color: 'white', fontSize: 18, fontWeight: 'bold'}}
      onPress={addSong}
     >ADD SONG
      </Button>
      <Button 
      style={{ marginLeft: 5, width: 100, height: 30, backgroundColor: 'red', color: 'white', fontSize: 18, fontWeight: 'bold'}}    
     onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${video.id.videoId}`).catch(err => console.error('An error occurred', err))}
     >YOUTUBE
      </Button>    
  </View>
        <View style={ {backgroundColor: '#A2A2A2',height: 2, width: '90%', marginTop: 10, marginBottom: 10} }></View>
    </View>
    
);
};


const styles = {
    imageStyle: {
        alignSelf: 'stretch',
        height: 180
    }
};


export default VideoListItem;