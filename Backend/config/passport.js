/*
This file contains the setup of the passport used for authentication.
Local strategy and Google strategy are implemented for authentication.
*/

import bcrypt from "bcrypt";
import passport from "passport";
import { LocalStrategy } from "passport-local";
import { GoogleStrategy } from "passport-google-oauth20";

import {
  findUserById,
  findUserByEmail,
  createUserFromGoogle,
  findUserByGoogleId,
} from "../models/userModel.js";

// Local strategy setup for enabling the local sessions and user management
passport.use("local", 
    new LocalStrategy(async (email, password, cb) => {
        try {
            // Finding user by using the email and checking if the user exist or not
            const user = await findUserByEmail(email);
            if(!user) return cb(null, false, { message: "Invalid credentials. User not found!" });

            // Checking the pass enterd by the user with the password stored in the database
            const isValid = await bcrypt.compare(password, user.pass)
            if(!isValid) return cb(null, false, { message: "Invalid Password"})

            // deleting any old sessions and creating a fresth new session
        } catch (error) {
            console.log("Error using the local strategy for management" + error);
            return cb(error);
        }
    })
);
