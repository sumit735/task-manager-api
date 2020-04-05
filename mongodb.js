// crud

const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

mongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error) {
        return console.log('unable to connect to db')
    }
    const db = client.db(databaseName)

    // insert to db

    // db.collection('users').insertMany([
    //     {
    //         name: "dshdskf",
    //         age: 20
    //     },{
    //         name: "market",
    //         age: 45

    //     }, {
    //         name: "go to college",
    //         age: 69
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log("faailed to insert", error);
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('tasks').findOne({ _id: new ObjectID("5e5baf6ee09f231990a3362c") }, (error, result) => {
    //     if(error) {
    //         return console.log(error);
    //     } 

    //     console.log(result);
    // })

    // db.collection('tasks').find( {completed: false} ).toArray((error, task) => {
    //     if(error) {
    //        return console.log(error);
    //     }

    //     console.log(task);
    // })

    // ===================================================
    // update a document
    // ===================================================

    // db.collection('users').updateOne(
    //     {
    //         _id: new ObjectID('5e59bb9c7fb4fd04944ad6f6')
    //     }, {
    //         $set: {
    //             name: "Sonu"
    //         }
    //     }
    
    // ).then((result) => {
    //     console.log("updateed", result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // update many

    // db.collection("tasks").updateMany(
    //     {
    //         completed: false
    //     },
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }
    // ).then((result) => {
    //     console.log(result.modifiedCount);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // ======================================================
    // Delete documents
    // ======================================================

    db.collection('users').deleteMany(
        {
            age: 20 //filter
        }
    ).then((result) => {
        console.log(result.deletedCount);
    }).catch((error) => {
        console.log(error);
    })

    db.collection('tasks').deleteOne(
        {
            description: "dshdskf"
        }
    ).then((result) => {
        console.log(result.deletedCount);
    }).catch((error) => {
        console.log(error);
    })


} )