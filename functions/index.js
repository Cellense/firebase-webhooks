"use strict";
exports.__esModule = true;
var functions = require("firebase-functions");
var admin = require("firebase-admin");
var serviceAccount = require('./special-offer-webhooks-firebase-adminsdk-b0e2f-6017569a38.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://special-offer-webhooks.firebaseio.com"
});
exports.addMessage = functions.https.onRequest(function (req, res) {
    admin.database().ref('/messages').push({ original: req.query.text }).then(function (snapshot) {
        res.redirect(303, snapshot.ref);
    });
});
