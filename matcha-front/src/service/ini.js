import firebase from "firebase";
import { PostData } from './post';

export function initializePush() {
   const messaging = firebase.messaging();

   messaging.usePublicVapidKey('BHrkgYrBzUwaKd1pGseE_XZjhkN3H0omqqDjGNW965oy4k9MIjyWr7KNiWXmhdvRR9DdUB3yq6HrBJwmPLOVfjo');

   messaging
    .requestPermission()
    .then(() => {
        console.log("Have Permission");
        return messaging.getToken();
    })
    .then(token => {
        var state = {id: localStorage.getItem('uid'), fbtoken: token, action: 'set'};

        PostData('fbtoken', state).then((result) => {
            let responseJson = result;
            if (responseJson) {
                if (responseJson.status === 'token set') {
                    console.log('niiice');
                }
            }
        })
        localStorage.setItem('firebaseToken', token);
        console.log("FCM Token:", token);
        //you probably want to send your new found FCM token to the
        //application server so that they can send any push
        //notification to you.
    })
    .catch(error => {
        if (error.code === "messaging/permission-blocked") {
        console.log("Please Unblock Notification Request Manually");
        } else {
        console.log("Error Occurred", error);
        }
    });
    messaging.onMessage(payload => {
        console.log("Notification Received", payload);
        //this is the function that gets triggered when you receive a 
        //push notification while you’re on the page. So you can 
        //create a corresponding UI for you to have the push 
        //notification handled.
        // const messaging = firebase.messaging();
        });
    }
    