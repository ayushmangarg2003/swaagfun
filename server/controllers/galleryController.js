import { db } from "../db.js";

export const getGallery = (req, res) => {
    const q = req.query.cat
        ? "SELECT * FROM posts WHERE cat=?"
        : "SELECT * FROM posts";

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(data);
    });
};