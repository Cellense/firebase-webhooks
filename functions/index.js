"use strict";
exports.__esModule = true;
var functions = require("firebase-functions");
var admin = require("firebase-admin");
var serviceAccount = require('./special-offer-webhooks-firebase-adminsdk-b0e2f-6017569a38.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://special-offer-webhooks.firebaseio.com"
});
exports.updateOffers = functions.https.onRequest(function (req, res) {
    admin.database().ref('/special_offers').set(req.body);
});
exports.setPlayersOffers = functions.https.onRequest(function (req, res) {
    var players = req.body['customers'], data = req.body['data'];
    for (var i = 0; i < players.length; i++) {
        if (!players[i]['ids']['registered']) {
            continue;
        }
        admin.database().ref('/players').update((_a = {},
            _a[players[i]['ids']['registered']] = data,
            _a));
    }
    var _a;
});
