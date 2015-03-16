/**
 * Created by theatanas on 17.03.15.
 */

Meteor.publish('thePlayers', function() {
    // we cannot use Meteor.userId() here. Error prompt:
    // Error: Meteor.userId can only be invoked in method calls. Use this.userId in publish functions.
    var currentUserId = this.userId;
    return PlayersList.find({createdBy: currentUserId});
});

Meteor.methods({
    'sendLogMessage': function () {
        console.log('log me yo');
    },

    'insertPlayerData': function(playerName, playerScore) {
        var currentUserId = Meteor.userId();
        PlayersList.insert({
            name: playerName,
            score: playerScore,
            createdBy: currentUserId
        });
        Meteor.call('sendLogMessage');
    },

    'removePlayerData': function(selectedPlayer) {
        PlayersList.remove(selectedPlayer);
    },

    'modifyPlayerScore': function(selectedPlayer, scoreValue){
        // Increase score by 1
        PlayersList.update(selectedPlayer, {$inc: {
            score: scoreValue
        }});
    }

});