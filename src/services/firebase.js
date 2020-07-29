import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyBiFdlwPIdFiirGjjAtUQ5cHng8BiocGyM',
	authDomain: 'think-piece-ed400.firebaseapp.com',
	databaseURL: 'https://think-piece-ed400.firebaseio.com',
	projectId: 'think-piece-ed400',
	storageBucket: 'think-piece-ed400.appspot.com',
	messagingSenderId: '929807048020',
	appId: '1:929807048020:web:a57f1c680c537be710bcc1',
	measurementId: 'G-07EB7J83NX',
};

firebase.initializeApp(config)

export const db=firebase.firestore()
export const auth=firebase.auth
