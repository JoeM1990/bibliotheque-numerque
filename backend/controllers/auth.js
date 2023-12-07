import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = (req, res) => {
  // CHECK EXISTING USER
  const query = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(
    query,
    [req.body.email, req.body.username, req.body.img],
    (err, data) => {
      if (err) return res.json(err);
      if (data.length)
        return res.status(409).json("L'utilisateur existe déjà.");

      // HASH THE PASSWORD & CREATE A USER
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const query =
        "INSERT INTO users(`username`, `email`, `password`, `img`) VALUES (?)";
      const values = [req.body.username, req.body.email, hash, req.body.img];
      db.query(query, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("L'utilisateur a bien été créé.");
      });
    }
  );
};

export const signin = (req, res) => {
  // CHECK IF USER EXIST
  const query = "SELECT * FROM users WHERE username= ?";
  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0)
      return res.status(404).json("Utilisateur non trouvé.");

    // CHECK PASSWORD
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password,
      req.body.img
    );
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json("Erreur dans le nom de l'utilisateur ou du mot de passe.");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("L'utilisateur a bien été déconnecté.");
};
