angular.module('starter.services', [])

.factory('ActiveChallenges', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var challengers = mockChallengers;

  return {
    all: function() {
      return challengers;
    },
    remove: function(chat) {
      challengers.splice(challengers.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < challengers.length; i++) {
        if (challengers[i].id === parseInt(chatId)) {
          return challengers[i];
        }
      }
      return null;
    }
  };
});
