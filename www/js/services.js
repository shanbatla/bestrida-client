angular.module('starter.services', [])

.factory('ActiveChallenges', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = mockChallengers;

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
