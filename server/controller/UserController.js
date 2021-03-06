var User = require('./../models/UserModel.js');
var PreferenceController = require('./../controller/PreferenceController.js');

module.exports = {
  getUser: function (req, res) {
    var clientId = req.body.clientId;

    User.where({ clientId: clientId }).fetch()
      .then(function (user) {
        res.status(200).send(user);
      })
      .catch(function (err) {
        console.error('Error: Fetching user from db', err);
        res.status(500).send(err);
      })
  },

  getUsers: function (req, res) {
    User.where({}).fetchAll()
      .then(function (allUsers) {
        res.status(200).send(allUsers);
      })
      .catch(function (err) {
        console.error('Error: Fetching all users from db', err);
        res.status(500).send(err);
      });
  },

  /**
  * req.body =>
  * {
  *   name: ''
  *   email: ''
  *   clientId: ''
  *   review_count: integer
  *   password: ''
  *   isOnboarded: boolean
  *   preferences: []
  */

  updateUser: function (req, res) {
    var user = req.body;

    User.where({ clientId: user.clientId }).fetch()
      .then(function (matchedUser) {
        console.log('Old User before UPDATE =>', matchedUser);

        var newUser = {
          name: user.name || matchedUser.attributes.name ,
          email: user.email || matchedUser.attributes.email,
          clientId: matchedUser.attributes.clientId,
          review_count: user.review_count || matchedUser.attributes.review_count,
          password: user.password || matchedUser.attributes.password,
          isOnboarded: user.isOnboarded || matchedUser.attributes.isOnboarded
        };

        if (user.preferences.length > 0) {
          for (var preference = 0; preference < user.preferences.length; preference++) {
            PreferenceController
              ._savePreference(
                matchedUser.id,
                matchedUser.attributes.clientId,
                user.preferences[preference]
              );
          }
        }

        new User({ id: matchedUser.id }).save(newUser, { patch: true })
          .then(function (saved) {
            console.log('UPATED user =>', saved);
            res.status(201).send('Successfully Updated User Profile');
          })
          .catch(function (err) {
            console.error('Error: Updatin user info ', err);
            res.status(500).send(err);
          })
      })
      .catch(function (err) {
        console.error('Error: Matching user info, clientId ', user.clientId, 'does not exists', err);
        res.status(500).send(err);
      });
  },

  addUser: function (req, res) {
  //   var user = req.body;
  //   var newUser = {
  //     name: user.name,
  //     email: user.email,
  //     password
  //     clientId: user.clientId,
  //     isOnboarded: user.isOnboarded
  //   };

  //   new User(newUser).save()
  //     .then(function (saved) {
  //       if (user.preferences.length === 0) {
  //         console.log('Sucessfully saved => ', saved);
  //         res.status(201).send('Add success');
  //       } else {
  //         for (var preference = 0; preference < user.preferences.length; preference++) {
  //           var tmpRes = (preference === user.preferences.length -1) ? res : undefined;

  //           PreferenceController
  //             ._savePreference(
  //               saved.id,
  //               saved.attributes.clientId,
  //               user.preferences[preference],
  //               tmpRes
  //             );
  //         }
  //       }

  //     })
  //     .catch(function (err) {
  //       console.error('Error: Saving to database', err);
  //       res.status(500).send(err);
  //     });
  }
};
