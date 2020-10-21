import React from 'react'
import { ScrollView, View } from 'react-native'
import VideoListItem from './VideoListItem'
import { WebView } from 'react-native-webview';

const VideoList = ({videos}) => {
    const videoItems = videos.map(video => (
        <VideoListItem 
        key={video.etag}
        video={video}
        />
    ));

    return (
        <ScrollView>
            <View style={styles.containerStyle}>
                {videoItems}
            </View>
        </ScrollView>
    );
};

const styles = {
    containerStyle: {
        marginBotttom: 10,
        marginLeft: 10,
        marginRight: 10
    }
};
export default VideoList;