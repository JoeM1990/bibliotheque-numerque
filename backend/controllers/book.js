import { db } from "../db.js";
import jwt from "jsonwebtoken";

// READ
export const getBooks = (req, res) => {
  const query = req.query.cat
    ? "SELECT * FROM books WHERE cat=?"
    : "SELECT * FROM books";

  db.query(query, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

// READ
export const getBook = (req, res) => {
  const query =
    "SELECT b.id, `username`, `title`, `desc`, `author`, `opinion`, b.img, u.img AS userImg, `cat`,`date` FROM users u JOIN books b ON u.id = b.uid WHERE b.id = ? ";

  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

// CREATE
export const addBook = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("L'utilisateur n'est pas connecté.");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Le token est invalide");

    const query =
      "INSERT INTO books(`title`, `desc`, `author`, `publisher`, `opinion`, `img`, `cat`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.author,
      req.body.publisher,
      req.body.opinion,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(query, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Le livre a bien été créé.");
    });
  });
};

// DELETE
export const deleteBook = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("L'utilisateur n'est pas connecté");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Le token est invalide.");

    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE `id` = ? AND `uid` = ?";

    db.query(query, [bookId, userInfo.id], (err, data) => {
      if (err)
        return res
          .status(403)
          .json("Vous ne pouvez supprimer que vos propres livres.");

      return res.json("Le livre a bien été supprimé.");
    });
  });
};

// UPDATE
export const updateBook = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("L'utilisateur n'est pas connecté.");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Le token est invalide");

    const bookId = req.params.id;
    const query =
      "UPDATE books SET `title`=?,`desc`=?,`img`=?, `author`=?, `publisher`=?, `cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.author,
      req.body.publisher,
      req.body.cat,
    ];

    db.query(query, [...values, bookId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Le livre a bien été modifié.");
    });
  });
};
