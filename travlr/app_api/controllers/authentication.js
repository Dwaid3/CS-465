const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async (req, res) => {
    try {
      if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ "message": "All fields required" });
      }
  
      const user = new User({
        name: req.body.name,
        email: req.body.email
      });
  
      user.setPassword(req.body.password);
  
      // Save the user asynchronously using the save method that returns a promise
      await user.save();
  
      const token = user.generateJwt();
      res.status(200).json({ token });
    } catch (error) {
      // Handle any errors during the registration process
      res.status(400).json(error);
    }
  };
  const login = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ "message": "All fields required" });
        }

        // Wrap passport.authenticate in a Promise
        const user = await new Promise((resolve, reject) => {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    console.error('Authentication Error:', err);
                    reject(err);
                }

                resolve(user);
            })(req, res, next); // Invoke the authenticate middleware
        });

        if (user) {
            const token = user.generateJwt();
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ "message": "Unauthorized" });
        }
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ "message": "Internal Server Error" });
    }
};



module.exports = {
    register,
    login
};