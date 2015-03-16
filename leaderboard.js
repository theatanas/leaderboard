// Create a MongoDB Collection
PlayersList = new Mongo.Collection("players");


/**
 * Notes
 */
// Not using the 'var' keyword lets us create a global var
var LocalPlayersList;
LocalPlayersList = new Mongo.Collection("localPlayersList"); // local - can't be called from the console;

// + Inserting a record to the DB.
//PlayersList.insert({
//    player: "Joe",
//    score: 15
//});

// + Fetching a record
// Following an insert, an automatic ID is generated.
// the 'find' function is used to retrieve all the records (documents) from the DB;
// Use 'find' with 'fetch', as here:
// PlayersList.find().fetch(); // Damn, I have every Joe on the planet in this dB now :X

// The client's console runs in the browser and the server's one runs in the terminal

// helper function is a regular JavaScript function that’s attached to a template, allowing us to execute code from within our interface

// + Helper functions old syntax:
// Template.nameOfTemplate.nameOfFunction
// + Hepler functions new syntax:
// Template.nameOfTemplate.helpers({
//      'nameOfFunction' : function(){}
// })
// Beautiful

// +Sessions
// sessions are used to store small pieces of data that isn’t saved to the database
// and won’t be remembered on return visits

// + Updating DB Entries
// arg1 - the document we want to modify
// arg2 - how we want to modify it
// PlayersList.update(selectedPlayer, {score: 5});
// {score: 5} erases everything but the 'score'. Use {$set: {score: 5}} for proper effect
// $set, $inc and the other dollar notation operators are part of MongoDB

// + Autopublish
// Always delete this module before going live, as it allows users to see all the data in the DB
// Remove the 'insecure' package as well.

// + Publications
// At this point, we want to publish the data that’s inside our
// “PlayersList” collection, and conceptually, you can think of this
// process as transmitting some data from the server and into the ether.
// We’re just looking to specify what data should be available to the users.

// + Methods
// methods are blocks of code that are executed on the server after
// being triggered from the client

