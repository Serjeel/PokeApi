export { }
const User = require("../models/userModel");
User.init();
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
import decode from "jwt-decode";
require('../config/passport')

module.exports.getAllUsers = async (req: any, res: any, next: any) => {
    User.find().then((result: any) => {
        res.send(result);
    });
};

module.exports.register = async (req: any, res: any, next: any) => {
    const user = new User({
        username: req.body.username.toLowerCase(),
        password: hashSync(req.body.password, 10),
        favorites: []
    })

    user.save().then((user: any) => {
        res.send({
            success: true,
            message: "User created successfully.",
            user: {
                username: user.username,
                favorites: user.favorites,
            }
        })
    }).catch((err: any) => {
        if (err.code === 11000) {
            res.send({
                success: false,
                message: "User with this username already exists",
                error: err
            })
        } else {
            res.send({
                success: false,
                message: "Something wrong",
                error: err
            })
        }
    })
};

module.exports.login = async (req: any, res: any, next: any) => {
    User.findOne({ username: req.body.username }).then((user: any) => {
        //No user found
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Could not find the user."
            })
        }

        //Incorrect password
        if (!compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password"
            })
        }

        const payload = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(payload, "SuperPuperSecret", { expiresIn: "1d" })

        return res.status(200).send({
            success: true,
            message: "Logged in successfully!",
            token: "Bearer " + token
        })
    })
};

module.exports.protect = async (req: any, res: any, next: any) => {
    const token = req.header('authorization');
    const decoded: any = decode(token);
    User.findOne({ username: decoded.username }).then((user: any) => {
        return res.status(200).send({
            success: true,
            favorites: user.favorites
        })
    })
};


module.exports.changeFavorites = async (req: any, res: any, next: any) => {
    const token = req.header('authorization');
    const decoded: any = decode(token);

    User.findOne({ username: decoded.username }).then((user: any) => {
        let favoritesArray = user.favorites;
        let status = "";
        
        if (user.favorites.includes(req.body.pokemon)) {
            favoritesArray.splice(favoritesArray.indexOf(req.body.pokemon), 1)
            status = "deleted";
        } else {
            favoritesArray.push(req.body.pokemon);
            status = "added";
        }
        User.updateOne({ username: decoded.username }, {
            favorites: favoritesArray
        }).then(() => {
            res.send({
                status: status,
                pokemon: req.body.pokemon,
                favorites: user.favorites
            });
        })
    });
}