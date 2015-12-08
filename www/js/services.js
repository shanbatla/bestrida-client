angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'AJ Mullins',
    lastText: 'Challenged you to Segment X',
    face: 'img/strava_profile_pic.png'
  }, {
    id: 1,
    name: 'David Lee',
    lastText: 'Challenged you to Segment Y',
    face: 'img/strava_profile_pic.png'
  }, {
    id: 2,
    name: 'Justin Zimmerman',
    lastText: 'Challenged you to Segment Z',
    face: 'img/strava_profile_pic.png'
  }, {
    id: 3,
    name: 'Shan Batla',
    lastText: 'Challenged you to Segment A',
    face: 'img/strava_profile_pic.png'
  }, {
    id: 4,
    name: 'Nick Balestra',
    lastText: 'Challenged you to Segment B',
    face: 'img/strava_profile_pic.png'
  }];

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
