/*
This file contains the setup of the passport used for authentication.
Local strategy and Google strategy are implemented for authentication.
*/

import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import {
  findUserById,
  findUserByEmail,
  createUserFromGoogle,
  findUserByGoogleId,
} from "../models/userModel.js";

import {
  createSession,
  deleteSessions,
} from "../models/sessionModel.js";

// Local strategy setup for enabling the local sessions and user management
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async (email, password, cb) => {
    try {
      // Finding user by using the email and checking if the user exist or not
      const user = await findUserByEmail(email);
      if (!user)
        return cb(null, false, {
          message: "Invalid credentials. User not found!",
        });

      // Checking the pass enterd by the user with the password stored in the database
      const isValid = await bcrypt.compare(password, user.pass);
      if (!isValid) return cb(null, false, { message: "Invalid Password" });

      // deleting any old sessions and creating a fresth new session
      await deleteSessions(user.id);
      const session = await createSession(user.id);

      user.session_token = session.session_token;
      return cb(null, user);
    } catch (error) {
      console.log("Error using the local strategy for management" + error);
      return cb(error);
    }
  })
);

// Google strategy setup for enabling the google sessions and user management
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, rereshToken, profile, cb) => {
      try {
        const googleId = profile.id
        let user = await findUserByGoogleId(googleId);
        if (!user) {
          user = await createUserFromGoogle(profile);
        }

        await deleteSessions(user.id);
        const session = await createSession(user.id);
        user.session_token = session.session_token;
        return cb(null, user);
      } catch (error) {
        console.log("Error authenticating with google" + error);
        return cb(error);
      }
    }
  )
);

// Serialization: store onlt the session token
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// Deserialization: get the user from the session token
passport.deserializeUser(async (id, cb) => {
  try {
    const user = await findUserById(id);
    if (!user)
      return cb(null, false, {
        message: "Error finding the user for Deserialization",
      });
    return cb(null, user);
  } catch (error) {
    console.log("Error Deserialization of the user  " + error);
    return cb(error);
  }
});
