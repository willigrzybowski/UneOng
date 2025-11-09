import { listarPosts, listarPostsUser, listarPostsOng } from "../services/postSeg.service.js";

export const listarPostsController = async (req, res) => {
  try {
    const id_ong = req.query.ongId; // pega do query
    const posts = await listarPosts(id_ong); // passa para a service
    res.json(posts || []);
  } catch (err) {
    console.error("Erro ao buscar posts:", err);
    res.status(500).json({ error: "Erro ao buscar posts" });
  }
};


export const listarPostsUserController = async (req, res) => {
  try {
    const ongId = req.query.ongId;
    if (!ongId) {
      return res.status(400).json({ error: "ID da ONG ausente" });
    }

    console.log("OngId recebido no controller:", ongId);

    const posts = await listarPostsUser(ongId);
    res.json(posts);
  } catch (err) {
    console.error("Erro ao buscar posts:", err);
    res.status(500).json({ error: "Erro ao buscar posts" });
  }
};

export const listarPostsOngController = async (req, res) => {
  try {
    const id_ong = req.query.ongId; // pega do query
    const posts = await listarPostsOng(id_ong); // passa para a service
    res.json(posts || []);
  } catch (err) {
    console.error("Erro ao buscar posts:", err);
    res.status(500).json({ error: "Erro ao buscar posts" });
  }
};
