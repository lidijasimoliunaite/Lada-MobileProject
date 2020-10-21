import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBmZdDPQrKdmXFPh4_oLlxyGtsquClFCuQ",
    authDomain: "music-ca075.firebaseapp.com",
    databaseURL: "https://music-ca075.firebaseio.com",
    projectId: "music-ca075",
    storageBucket: "music-ca075.appspot.com",
    messagingSenderId: "410141639410",
    appId: "1:410141639410:web:29e8337a6290bbc723c66b"
};


export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();