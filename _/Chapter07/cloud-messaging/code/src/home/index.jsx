import React, { Component } from 'react';
import firebase from '../firebase/firebase-config';

class Home extends Component {
    constructor(props) {
        super(props);
        this.refreshToken();
        firebase.messaging().onMessage(function (payload) {
            console.log("Message received. ", payload);
           
            // [START_EXCLUDE]
            // Update the UI to include the received message.
            console.log("msg", payload);
            // appendMessage(payload);
            // [END_EXCLUDE]
        });
    }
    componentWillMount() {

        console.log("firebase msg");
        const _this = this;
        firebase.messaging().requestPermission()
            .then(function () {
                console.log('Notification permission granted.');
                // TODO(developer): Retrieve an Instance ID token for use with FCM.
                _this.getToken();
                // ...
            })
            .catch(function (err) {
                console.log('Unable to get permission to notify.', err);
            });


    }

    getToken() {
        console.log("get token");
        firebase.messaging().getToken()
            .then(function (currentToken) {
                if (currentToken) {
                    console.log("current token", currentToken)
                    // sendTokenToServer(currentToken);
                    //updateUIForPushEnabled(currentToken);
                } else {
                    // Show permission request.
                    console.log('No Instance ID token available. Request permission to generate one.');
                    // Show permission UI.
                    //  updateUIForPushPermissionRequired();
                    //  setTokenSentToServer(false);
                }
            })
            .catch(function (err) {
                console.log('An error occurred while retrieving token. ', err);
                //  showToken('Error retrieving Instance ID token. ', err);
                // setTokenSentToServer(false);
            });
    }

    refreshToken() {
        firebase.messaging().onTokenRefresh(function () {
            firebase.messaging().getToken()
                .then(function (refreshedToken) {
                    console.log('Token refreshed.');
                    // Indicate that the new Instance ID token has not yet been sent to the
                    // app server.
                    //setTokenSentToServer(false);
                    // Send Instance ID token to app server.
                    //sendTokenToServer(refreshedToken);
                    // ...
                })
                .catch(function (err) {
                    console.log('Unable to retrieve refreshed token ', err);
                    //showToken('Unable to retrieve refreshed token ', err);
                });
        });
    }

    render() {
        var heading = { display: "inline-block", margin: "0px" };
        var userPhoto = { float: "left", marginRight: "25px" };
        var marginBtm = { marginBottom: "15px" };
        var admin = this.props.role.admin;
        return (
            <div>
                {
                    this.props.userInfo.map((profile, index) => {
                        return (
                            <div className="clearfix" style={marginBtm} key={index}>
                                <h2 style={heading}>{profile.displayName} - Welcome to Helpdesk Application {admin ? 'Admin' : ''}</h2>
                                <img style={userPhoto} src={profile.photoURL} alt="user" width="100" />
                                <br />
                                <span><b>Eamil:</b></span> {profile.email}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Home;
