import passport from "passport";

export const userAuth = async (req, res, next) => {
  
  await passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      let message = "Authentication failed";
      if (info && info.name === "TokenExpiredError") {
        message = "Your session has expired. Please log in again.";
           return res.status(401).json({ message });
      }
      return res.status(401).json({ message });
    }

    console.log("User authenticated");
    req.user = user;
    next();
  })(req, res, next);
};