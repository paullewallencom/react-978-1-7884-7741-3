const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const cors = require('cors')

const admin = require('firebase-admin');

const serviceAccount = require('./firebase/serviceAccountKey.json');
const google = require('google-oauth-jwt');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://demoproject-7cc0d.firebaseio.com"
});

function getAccessToken(res, res) {

}

function createCustomToken(req, res) {
	const userId = req.body.uid
	admin.auth().createCustomToken(userId)
		.then(function (customToken) {
			res.send(customToken.toJSON());
		})
		.catch(function (error) {
			console.log("Error creating custom token:", error);
		});
}
function listAllUsers(req, res) {
	var nextPageToken;
	// List batch of users, 1000 at a time.
	admin.auth().listUsers(1000, nextPageToken)
		.then(function (data) {
			data = data.users.map((el) => {
				return el.toJSON();
			})
			res.send(data);
		})
		.catch(function (error) {
			console.log("Error fetching the users from firebase:", error);
		});
}
function getUserById(req, res) {
	const uid = req.body.userId;
	admin.auth().getUser(uid)
		.then(function (userData) {
			console.log("Successfully fetched user data:", userData.toJSON());
			res.send(userData.toJSON());
		})
		.catch(function (error) {
			console.log("Error fetching user data:", error);
		});
}
function getUserByEmail(req, res) {
	admin.auth().getUserByEmail(email)
		.then(function (userData) {
			console.log("Successfully fetched user data:", userData.toJSON());
			res.send(userData.toJSON());
		})
		.catch(function (error) {
			console.log("Error fetching user data:", error);
		});
}
function getUserByPhoneNumber(req, res) {
	admin.auth().getUserByPhoneNumber(phoneNumber)
		.then(function (userData) {
			console.log("Successfully fetched user data:", userData.toJSON());
		})
		.catch(function (error) {
			console.log("Error fetching user data:", error);
		});
}
function updateUserProfile(req, res) {
	const uid = req.body.userId;
	const data = rex.body.data

	admin.auth().updateUser(uid, { data })
		.then(function (userRecord) {
			// See the UserRecord reference doc for the contents of userRecord.
			console.log("Successfully updated user", userRecord.toJSON());
			res.send(JSON.stringify({ status: 'success', msg: "Successfully updated user" }));
		})
		.catch(function (error) {
			console.log("Error updating user:", error);
			res.send(JSON.stringify({ status: 'error', msg: error }));
		});
}
function createNewUser(req, res) {
	const data = req.body.data
	console.log(data);
	admin.auth().createUser(data)
		.then(function (result) {
			// See the UserRecord reference doc for the contents of userRecord.
			console.log("Successfully created new user:", result.uid);
			res.send({ status: "success", msg: "Successfully created new user: " + result.uid })
		})
		.catch(function (error) {
			console.log("Error creating new user:", error);
			res.send({ status: "error", msg: "Error creating new user:" })
		});
}
function deleteUser(req, res) {
	const userId = req.body.uid;
	admin.auth().deleteUser(userId)
		.then(function () {
			console.log("Successfully deleted user" + userId);
			res.send({ status: "success", msg: "Successfully deleted user" })
		})
		.catch(function (error) {
			console.log("Error deleting user:", error);
			res.send({ status: "error", msg: "Error deleting user:" })
		});
}
function viewUserProfile(req, res) {
	const userId = req.body.uid;
	admin.auth().getUser(userId)
		.then(function (userProfile) {
			console.log("Successfully fetched user" + userId);
			res.send({ status: "success", data: userProfile.toJSON() })
		})
		.catch(function (error) {
			console.log("Error deleting user:", error);
			res.send({ status: "error", msg: "Error deleting user:" })
		});
}
app.get('/login', function (req, res) {
	if (validCredentials(req.body.username, req.body.password)) {
		createCustomToken(req, res);
	}
})
app.get('/getAccessToken', function (req, res) {

	var { google } = require('googleapis');

	var key = require('./firebase/serviceAccountKey.json');
	var jwtClient = new google.auth.JWT(
		key.client_email,
		null,
		key.private_key,
		['https://www.googleapis.com/auth/firebase.messaging'], // an array of auth scopes
		null
	);
	jwtClient.authorize(function (err, tokens) {
		if (err) {
			console.log(err);
			res.send(JSON.stringify({
				"token": err
			}));
		}
		console.log("tokens", tokens);
		res.send(JSON.stringify({
			"token": tokens.access_token
		}));
	});


});


app.get('/users', function (req, res) {
	listAllUsers(req, res);
})
app.get('/deleteUser', function (req, res) {
	deleteUser(req, res);
})
app.post('/getUserid', function (req, res) {
	getUserById(req, res);
})
app.post('/updateUserProfile', function (req, res) {
	updateUserProfile(req, res);
})
app.post('/createNewUser', function (req, res) {
	createNewUser(req, res);
})
app.post('/getUserProfile', function (req, res) {
	viewUserProfile(req, res);
})

app.post('/setCustomClaims', (req, res) => {
	// Get the ID token passed by the client app.
	const idToken = req.body.idToken;
	console.log("accepted", idToken, req.body);
	// Verify the ID token
	admin.auth().verifyIdToken(idToken).then((claims) => {
		// Verify user is eligible for admin access or not
		if (typeof claims.email !== 'undefined' &&
			claims.email.indexOf('@adminhelpdesk.com') != -1) {
			// Add custom claims for admin access.
			admin.auth().setCustomUserClaims(claims.sub, {
				admin: true,
			}).then(function () {
				// send back to the app to refresh token and shows the admin UI.
				res.send(JSON.stringify({
					status: 'success',
					role: 'admin'
				}));
			});
		} else if (typeof claims.email !== 'undefined') {
			// Add custom claims for admin access.
			admin.auth().setCustomUserClaims(claims.sub, {
				admin: false,
			}).then(function () {
				// Tell client to refresh token on user.
				res.send(JSON.stringify({
					status: 'success',
					role: 'employee'
				}));
			});
		}
		else {
			// return nothing
			res.send(JSON.stringify({ status: 'ineligible' }));
		}
	}).catch(error => {
		// Invalid token or token was revoked:
		if (error.code == 'auth/id-token-revoked') {
			//Shows the alert to user to reauthenticate
			// Firebase Authentication API gives the API to reauthenticateWithCredential /reauthenticateWithPopup /reauthenticateWithRedirect
		}
	});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))