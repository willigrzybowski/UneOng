import express from "express";

const router = express.Router();
import supabase from "../config/supabase.js";

router.get("/checkU", async (req, res) => {
  const { id_post, id_user } = req.query;

  if (!id_post || !id_user) {
    return res.status(400).json({ error: "Faltam parâmetros" });
  }

  const { data, error } = await supabase
    .from("Curtidas")
    .select("*")
    .eq("id_post", id_post)
    .eq("id_user", id_user)
    .maybeSingle();

  if (error) return res.status(500).json({ error: error.message });

  res.json({ jaCurtiu: !!data });
});


// Curtir ou descurtir post
router.post("/curtidas", async (req, res) => {
  const { id_user, id_post } = req.body;
  console.log(id_user, id_post);
  if (!id_user || !id_post) {
    return res.status(400).json({ error: "IDs ausentes ou não válidos" });
  }
console.log(id_user, id_post);
  try {
    // Verificar se já curtiu
    const { data: jaCurtiu, error: errorCheck } = await supabase
      .from("Curtidas")
      .select("*")
      .eq("id_user", id_user)
      .eq("id_post", id_post)
      .maybeSingle();
console.log(jaCurtiu);
    if (errorCheck) {
      return res.status(500).json({ error: "Erro ao verificar curtidas", details: errorCheck });
    }

    if (jaCurtiu) {
      // Remove curtida
      const { error: errorDelete } = await supabase
        .from("Curtidas")
        .delete()
        .eq("id_user", id_user)
        .eq("id_post", id_post);

      if (errorDelete) {
        return res.status(500).json({ error: "Erro ao remover curtida", details: errorDelete });
      }

      return res.status(200).json({ message: "Curtida removida", curtido: false, reload: true,jaCurtiu: false });
    }

    // Adiciona curtida
    const { error: errorInsert } = await supabase
      .from("Curtidas")
      .insert({ id_user, id_post });

    if (errorInsert) {
      return res.status(500).json({ error: "Erro ao curtir", details: errorInsert });
    }

    return res.status(200).json({ message: "Post curtido com sucesso", curtido: true, reload: true, jaCurtiu: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

router.get("/curtidas/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const { data, error } = await supabase
      .from("Curtidas")
      .select("id_curtidas", { count: "exact" })
      .eq("id_post", postId);

    if (error) throw error;

    res.json({ postId, totalCurtidas: data.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao contar curtidas" });
  }
});

export default router;