// routes/sugestoes.routes.js
import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

// Rota para buscar contas sugeridas
router.get("/", async (req, res) => {
  try {
    // Busca todas as ONGs
    const { data, error } = await supabase
      .from("ONG")
      .select("id_ong, nome_ong, foto_perfil_ong");

    if (error) throw error;

    // Embaralha os resultados e pega apenas 3
    const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 3);

    res.json(shuffled);
  } catch (err) {
    console.error("Erro ao buscar sugestões:", err);
    res.status(500).json({ error: "Erro ao buscar sugestões" });
  }
});

export default router;
