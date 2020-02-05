const express = require('express')
const port = 3000
var cors = require('cors')
var bodyParser = require('body-parser')
const axios = require('axios');
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cricket999-ef2de.firebaseio.com"
});
const fastify = require('fastify')()
// Declare a route
fastify.use(cors())
fastify.get('/', (request, reply) => {
    reply.send({hello: 'world'})
})
fastify.listen(3001, '0.0.0.0')

const app = express()
app.use(cors())

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded());

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.get('/', (req, res) => {
    res.send('it is cricket999 backend')
})
app.post('/listEventTypes', (req, res) => {
    var body_data = {
        "filter": {
            "eventTypeIds": [
                "4"
            ],

            //"bspOnly": true,
            "turnInPlayEnabled": true,
            "inPlayOnly": req.body.inPlayOnly,

            /*"timeRange": {
                "from": from_date,
                "to": "2020-02-01T17:05:48.917Z"
            }*/
        }
    }

    axios.post('http://185.16.206.13:8080/api/listEventTypes', body_data, {
        headers: {
            'X-App': 'z7TKcwvVws'
        }
    }).then(({data}) => {
        //console.log('placed bet-testing ',data);
        res.status(200).send(
            //product
            data
        )
    }).catch(function (resp) {
        console.log('something error');
        res.status(200).send(
            body_data
        )
    });


})
app.post('/listCompetitions', (req, res) => {
    let from_date = new Date();
    var body_data = {
        "filter": {
            "eventTypeIds": [
                "4"
            ],
            "inPlayOnly": req.body.inPlayOnly==undefined?false:req.body.inPlayOnly,
            //"bspOnly": true,
            "turnInPlayEnabled": req.body.turnInPlayEnabled==undefined?true:req.body.turnInPlayEnabled,
            // "inPlayOnly": req.body.inPlayOnly,

            /*"timeRange": {
                "from": from_date,
                "to": "2020-02-01T17:05:48.917Z"
            }*/
        }
    }

    axios.post('http://185.16.206.13:8080/api/listCompetitions', body_data, {
        headers: {
            'X-App': 'z7TKcwvVws'
        }
    }).then(({data}) => {
        //console.log('placed bet-testing ',data);
        var send_data = [];
        data.result.forEach((item) => {
            var temp = {}
            temp.id = item.competition.id
            temp.name = item.competition.name
            temp.marketCount = item.marketCount
            temp.competitionRegion = item.competitionRegion
            send_data.unshift(temp)
        })
        res.status(200).send(
            //product
            send_data
        )
    }).catch(function (resp) {
        console.log('something error');
        res.status(200).send(
            resp
        )
    });


})

app.post('/listEvents', (req, res) => {
    let from_date = new Date();
    var body_data = {
        "filter": {
            "eventTypeIds": [
                "4"
            ],
            "competitionIds": req.body.competitionIds,
            "inPlayOnly": req.body.inPlayOnly==undefined?false:req.body.inPlayOnly,
            //"bspOnly": true,
            "turnInPlayEnabled": req.body.turnInPlayEnabled==undefined?true:req.body,

            /*"timeRange": {
                "from": from_date,
                "to": "2020-02-01T17:05:48.917Z"
            }*/
        }
    }

    axios.post('http://185.16.206.13:8080/api/listEvents', body_data, {
        headers: {
            'X-App': 'z7TKcwvVws'
        }
    }).then(({data}) => {
        //console.log('placed bet-testing ',data);
        var send_data = [];
        data.result.forEach((item) => {
            var temp = {}
            temp = item.event
            temp.marketCount = item.marketCount
            send_data.unshift(temp)
        })
        res.status(200).send(
            //product
            send_data
        )
    }).catch(function (resp) {
        console.log('something error');
        res.status(200).send(
            resp
        )
    });


})
app.post('/listMarketCatalogue', (req, res) => {
    let from_date = new Date();
    var body_data = {
        "filter": {
            "eventTypeIds": [
                "4"
            ],
            "eventIds": req.body.eventIds,

            /*"timeRange": {
                "from": from_date,
                "to": "2020-02-01T17:05:48.917Z"
            }*/
        },
        "maxResults": 1000,
        "marketProjection": [
            "COMPETITION","EVENT","EVENT_TYPE","MARKET_START_TIME","MARKET_DESCRIPTION","RUNNER_DESCRIPTION"
        ]
    }

    axios.post('http://185.16.206.13:8080/api/listMarketCatalogue', body_data, {
        headers: {
            'X-App': 'z7TKcwvVws'
        }
    }).then(({data}) => {
        console.log(req.body.eventIds,data)
        res.status(200).send(
            //product
            data.result
        )
    }).catch(function (resp) {
        console.log('something error');
        res.status(200).send(
            resp
        )
    });


})
app.post('/listMarketBook', (req, res) => {
    let from_date = new Date();
    var body_data = {
        "marketIds": req.body.marketIds
    }

    axios.post('http://185.16.206.13:8080/api/listMarketBook', body_data, {
        headers: {
            'X-App': 'z7TKcwvVws'
        }
    }).then(({data}) => {
        res.status(200).send(
            //product
            data.result
        )
    }).catch(function (resp) {
        console.log('something error');
        res.status(200).send(
            resp
        )
    });
})

fastify.post('/listMarketBook', (req, res) => {
    let from_date = new Date();
    var body_data = {
        "marketIds": req.body.marketIds
    }
    var markets=req.body.markets;

    if (req.body.markets===undefined){
        console.log('nomarket',markets)
        res.status(400).send(
            //product
            {msg:'none markets'}
        )
        return
    }

    axios.post('http://185.16.206.13:8080/api/listMarketBook', body_data, {
        headers: {
            'X-App': 'z7TKcwvVws'
        }
    }).then(({data}) => {
        data.result.forEach((item1) => {
            var index=markets.findIndex(m1=>m1.marketId==item1.marketId)
            markets[index].status=item1.status
            markets[index].updateTime=item1.updateTime
            item1.runners.forEach(runner1=>{
                var r_index=markets[index].runners.findIndex(runner0=>runner0.selectionId==runner1.selectionId)
                markets[index].runners[r_index].status=runner1.status
                markets[index].runners[r_index].lastPriceTraded=runner1.lastPriceTraded
                markets[index].runners[r_index].ex=runner1.ex

            })
            console.log(index);
            //console.log(item1);
            var filterMarket=markets[index]
            admin.firestore().collection("markets").doc(filterMarket.marketId).set(filterMarket).then(function() {

            })
        })
        res.status(200).send(
            //product
            {msg:'updated'}
        )
    }).catch(function (resp) {
        console.log(resp);
        res.status(200).send(
            resp
        )
    });


})

app.post('/addUser', (req, res) => {
    if (req.body.uid == undefined || req.body.user_data==undefined) {
        res.status(400).send(
            {msg: 'Unauthorized'}
        )
    }
    var user_data = req.body.user_data;
    admin.auth().getUser(req.body.uid)
        .then(function (userRecord) {
            var account = userRecord.toJSON();
            if (account.email != user_data.parent) {
                res.status(400).send(
                    {
                        msg:'wrong request',
                       data:[ account.email,user_data.parent]
                    }
                )
            }
            admin.auth().createUser({
                email: user_data.email,
                emailVerified: false,
                //phoneNumber: user_data.phone,
                password: user_data.password,
                displayName: user_data.displayName,
                // photoURL: 'http://www.example.com/12345678/photo.png',
                disabled: false
            })
                .then(function (userRecord) {
                    // See the UserRecord reference doc for the contents of userRecord.
                    user_data.uid=userRecord.uid
                    admin.firestore().collection("users").doc(user_data.email).set(user_data)
                        .then(function() {
                            res.status(200).send(
                                {msg: 'Added user successfully'}
                            )
                            //console.log("Document successfully written!");
                        })
                        .catch(function(error) {
                            res.status(400).send(
                                {msg: 'Error writing document:', detail: error}
                            )
                            console.error("Error writing document: ", error);
                        });
                })
                .catch(function (error) {
                    res.status(400).send(
                        {msg: error.message, detail: error}
                    )
                });

        })
        .catch(function (error) {
            res.status(400).send(
                {msg:error.message,detail:error}
            )
        });
})

// Start listing users from the beginning, 1000 at a time.
