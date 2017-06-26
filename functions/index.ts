import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const serviceAccount = require('./special-offer-webhooks-firebase-adminsdk-b0e2f-6017569a38.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://special-offer-webhooks.firebaseio.com"
})

export const addMessage = functions.https.onRequest((req, res) => {
  admin.database().ref('/messages').push({original: req.query.text}).then(snapshot => {
    res.redirect(303, snapshot.ref)
  })
})
