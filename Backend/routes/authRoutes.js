  import express from "express";
  import passport from "passport";
  import bcrypt from "bcrypt";
  import { createUser, findUserByEmail } from "../models/userModel.js";

  const router = express.Router();

  // ===== LOCAL AUTH ROUTES ===== //

  // Registration (Manual setup)
  router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.send({
        success: false,
        message: "Please fill in all fields, eror from authRoutes",
      });
    }

    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser)
        res.send({ success: false, message: "User already exist via authRoute" });

      const hashedPassword = await bcrypt.hash(password, 10); // 10 is number of salt rounds
      const newUser = await createUser(username, email, hashedPassword);

      // Automatically login the user after registration
      req.login(newUser, (error) => {
        if (error) {
          return res.send({
            success: false,
            message: "Error logging in user after registration via authRoute",
          });
        }
        return res.send({ success: true, message: "Registration successful" });
      });
    } catch (error) {
      console.log("Error creating a new user via authRoutes" + error);
      res.send({
        success: false,
        message: "Error creating a new user via authRoutes",
      });
    }
  });

  // Login (Local strategy)
  router.post("/login", (req, res, cb) => {
      passport.authenticate("local", (error, user, info) => {
          if (error) return cb(error);
          if(!user) return res.send({ success: false, message: "Invalid credentials via authRoute" });

          req.login(user, (error) => {
              if (error) return cb(error)
              return res.send({ success: true, message: "Login successful", user });
          })
      }) (req, res, cb)
  });

  // ===== GOOGLE AUTH ROUTES ===== //

  // Redirect to google
  router.get("/auth/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
  )

  // Google callback
  router.get("/auth/google/callback",
      passport.authenticate("google", {
          failureRedirect: "/login",
          session: true
      }), 
      (req, res) => {
          // On successful authentication by google, redirect to the dashboard
          res.redirect("/profile");
      }
  )

  // ===== LOGOUT ROUTE ===== //
  router.get("/logout", (req, res) => {
    req.logout((error) => {
      if (error) {
        console.log("Error logging out" + error);
        return res.send({
          success: false,
          message: "Error logging out user via authRoute",
        });
      }
      res.redirect("/");
    });
  });

  // ===== Active session checking route ===== //
  router.get("/auth/check", (req, res) => {
    if (req.isAuthenticated()) {
      res.send({ success: true, message: "Active session found via authRoute", user: req.user})
    } else {
      res.send({ success: false, message: "Error finding active sesssion via authRoute" })
    }
  })