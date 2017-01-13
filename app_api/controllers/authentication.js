var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var app = require('../index.js');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports = {
    changePassword: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                res.status(404).json(err);
                return;
            }

            if (user) {
                user.setPassword(req.body.newPassword);

                User.findOneAndUpdate({ _id: user._id }, {
                        salt: user.salt,
                        hash: user.hash
                    },
                    function(err) {
                        if (err)
                            res.status(409).json({ "message": err });
                        else
                            res.status(200).json();
                    }
                );
            } else {
                res.status(401).json(info);
            }
        })(req, res);
    },
    register: function(req, res) {

        console.log(`FROM AUTH`);

        // if(!req.body.name || !req.body.email || !req.body.password) {
        //   sendJSONresponse(res, 400, {
        //     "message": "All fields required"
        //   });
        //   return;
        // }

        var user = new User();

        user.name = req.body.firstname + ' ' + req.body.lastname;
        user.email = req.body.email;
        user.usertype = req.body.usertype;

        user.setPassword(req.body.password);

        user.save(function(err) {
            if (err) {
                res.status(409).json(err.message);
                return;
            }

            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        });

    },
    login: function(req, res) {

        // if(!req.body.email || !req.body.password) {
        //   sendJSONresponse(res, 400, {
        //     "message": "All fields required"
        //   });
        //   return;
        // }

        passport.authenticate('local', function(err, user, info) {
            var token;

            // If Passport throws/catches an error
            if (err) {
                res.status(404).json(err);
                return;
            }

            // If a user is found
            if (user) {
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token": token
                });
            } else {
                // If user is not found
                res.status(401).json(info);
            }
        })(req, res);
    }
};