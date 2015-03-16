/**
 * Created by theatanas on 17.03.15.
 *
 * Client-side code
 *
 */

Meteor.subscribe('thePlayers');

// Helper f(x) specific for the 'leaderboard' template:
Template.leaderboard.helpers({
    'player': function () {
        //console.log(PlayersList.find().fetch());

        var currentUserId = Meteor.userId();
        return PlayersList.find(
            // the .find function can be shortened, remove the 'createdBy' line
            // arg1 - filr. {} will retrieve ALL the data
            {
                createdBy: currentUserId
            },

            // arg2 - opts for the 'find' function. sort is one of them
            {
                sort: {
                    score: -1, // 1 -  ascending; -1 - descending
                    name: 1
                }
            });
    },

    'printString': function (stringToPrint) {
        return stringToPrint;
    },

    'selectedClass': function () {
        var playerId = this._id;
        var selectedPlayer = Session.get('selectedPlayer');
        if (playerId === selectedPlayer) {
            return 'selected';
        }
    },

    'showSelectedPlayer': function () {
        var selectedPlayer = Session.get("selectedPlayer");
        return PlayersList.findOne(selectedPlayer);
    }

    //'disqualified': function(event) {
    //    var selectedPlayer = Session.get('selectedPlayer');
    //    var playerScore = PlayersList.findOne(selectedPlayer);
    //    console.log(playerScore.score);
    //    if (playerScore.score < 0) {
    //        return 'disqualified';
    //    }
    //}

});


Template.leaderboard.events({

    'click li.player .name': function () {
        // Session.set(sess_name, value);
        // this = In this context, this refers to the player that has just been clicked
        var playerId = this._id;
        Session.set('selectedPlayer', playerId);
    },

    'click input.increment': function () {
        var selectedPlayer = Session.get("selectedPlayer"); // id
        Meteor.call('modifyPlayerScore', selectedPlayer, 1);
    },

    'click input.decrement': function () {
        var selectedPlayer = Session.get("selectedPlayer");
        Meteor.call('modifyPlayerScore', selectedPlayer, -1);
    },

    'click .remove': function () {
        var selectedPlayer = Session.get("selectedPlayer");
        if (!confirm("Do you really want to remove " + selectedPlayer.name + "?")) {
            return;
        }
        //PlayersList.remove(selectedPlayer);
        Meteor.call('removePlayerData', selectedPlayer);
    }

});

Template.addPlayerForm.events({

    'submit form': function (event) {
        event.preventDefault();
        var playerName = event.target.playerName.value;
        var playerScoreInput = event.target.playerScore.value;
        var playerScore = parseInt(playerScoreInput);
        //var currentUserId = Meteor.userId();


        if (playerName === "") {
            $(".playerLabel").show();
            return;
        }
        if (typeof playerScore != "number") {
            return;
        }

        // cannot be executed. No permissions on the client-side
        //PlayersList.insert({
        //    name: playerName,
        //    score: playerScore,
        //    createdBy: currentUserId
        //});

        Meteor.call('insertPlayerData', playerName, playerScore);

    }

});
