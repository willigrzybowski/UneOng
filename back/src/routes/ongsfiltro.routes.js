import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

// GET /api/ongs?nome=...&cidade=...&categoria=...&ordem=asc
router.get("/", async (req, res) => {
  try {
    const { nome, cidade, categoria, ordem } = req.query;

    let query = supabase
      .from("ONG")
      .select("id_ong, nome_ong, cidade, categoria_ong, foto_perfil_ong");

    if (nome) query = query.ilike("nome_ong", `%${nome}%`);
    if (cidade) query = query.eq("cidade", cidade);
    if (categoria) query = query.eq("categoria_ong", categoria);

    if (ordem === "asc") query = query.order("nome_ong", { ascending: true });
    else if (ordem === "desc") query = query.order("nome_ong", { ascending: false });

    const { data, error } = await query;
    console.log(data);

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
  } catch (err) {
    console.error("Erro no filtro:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
