import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const serviceAccount = require('./special-offer-webhooks-firebase-adminsdk-b0e2f-6017569a38.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://special-offer-webhooks.firebaseio.com"
})

export const updateOffers = functions.https.onRequest((req, res) => {
  admin.database().ref('/special_offers').set(req.body)
})

export const setPlayersOffers = functions.https.onRequest((req, res) => {
  const players = req.body['customers'], data = req.body['data']
  for (let i = 0; i < players.length; i++) {
    if (!players[i]['ids']['registered']) {
      continue
    }

    admin.database().ref('/players').update({
      [players[i]['ids']['registered']]: data
    })
  }
})
