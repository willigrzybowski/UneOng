import express from "express";
import supabase from "../config/supabase.js";
import { listarPostsController,listarPostsOngController } from "../controllers/postSeg.controllers.js";

const router = express.Router();

router.get("/perfilSeg", listarPostsController);
router.get("/feedO", listarPostsOngController);

router.get("/feedU", async (req, res) => {
  const id = req.session.user ? req.session.user.id : null;
  if (!id) {
    return res.status(400).json({ error: "ID do usuário ausente" });
  }

  try {
    const { data: seguindo, error: error1 } = await supabase
      .from("seguidores")
      .select("ong_id")
      .eq("seguidor_id", id);

    if (error1) {
      console.error("Erro ao buscar seguidores:", error1);
      return res.status(500).json({ error: error1.message });
    }

    // Se não segue ninguém
    if (!seguindo || seguindo.length === 0) {
      return res.json([]); // array vazio
    }

    const ongIds = seguindo.map(s => s.ong_id);

    const { data: posts, error: error2 } = await supabase
      .from("post")
      .select("id_post, id_ong, conteudo_post, imagem_url, data_hora, ONG(nome_ong, foto_perfil_ong,id_ong), Curtidas(count)")
      .in("id_ong", ongIds)
      .order("data_hora", { ascending: false });


      const postsComCurtidas = posts.map(post => ({
      ...post,
      totalCurtidas: post.Curtidas[0]?.count || 0
    }));

    if (error2) {
      console.error("Erro ao buscar posts:", error2);
      return res.status(500).json({ error: error2.message });
    }

    res.json(postsComCurtidas || []); // 👈 devolve array puro
  } catch (err) {
    console.error("Erro geral:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;