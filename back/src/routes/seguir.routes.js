import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();


router.get("/check", async (req, res) => {
  const { seguidor_id, ong_id } = req.query;
  console.log("Check seguindo:", { seguidor_id, ong_id });

  if (!seguidor_id || !ong_id) {
    return res.status(400).json({ error: "IDs ausentes ou não válidos" });
  }

  try {
    const { data: jaSegue, error } = await supabase
      .from("seguidores")
      .select("*")
      .eq("seguidor_id", Number(seguidor_id))
      .eq("ong_id", Number(ong_id))
      .limit(1) // evita erro se tiver mais de um
      .maybeSingle();

    if (error) {
      console.error("Erro Supabase:", error);
      return res.status(500).json({ error: "Erro ao verificar seguidores", details: error });
    }

    return res.status(200).json({
      seguindo: !!jaSegue,
      label: jaSegue ? "Deixar de seguir" : "Seguir"
    });
  } catch (err) {
    console.error("Erro rota /check:", err);
    res.status(500).json({ error: "Erro no servidor", details: err });
  }
});

router.post("/checkUser", async (req, res) => {
  const { seguidor_id } = req.body;

  if (!seguidor_id) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  try {
    // Contar o número de ONGs que o seguidor segue
    const { data, error } = await supabase
      .from("seguidores")
      .select("ong_id", { count: 'exact' }) // Conta o número de registros
      .eq("seguidor_id", seguidor_id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Retorna o número de contas que o seguidor tem
    return res.status(200).json({ count: data.length });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});


router.get("/verSeguindo", async (req, res) => {
  const { seguidor_id } = req.query;

  if (!seguidor_id) {
    return res.status(400).json({ error: "Parâmetro 'seguidor_id' é obrigatório" });
  }

  try {
    // Primeiro, pega os IDs das ONGs que o usuário segue
    const { data: seguidores, error: error1 } = await supabase
      .from("seguidores")
      .select("ong_id")
      .eq("seguidor_id", seguidor_id);

    if (error1) {
      return res.status(500).json({ error: error1.message });
    }

    const ongIds = seguidores.map(item => item.ong_id);

    if (ongIds.length === 0) {
      return res.status(200).json({ ongs: [] });
    }

    // Agora busca os nomes e fotos das ONGs com base nos IDs
    const { data: ONG, error: error2 } = await supabase
      .from("ONG")
      .select("id_ong, nome_ong, foto_perfil_ong")
      .in("id_ong", ongIds);

    if (error2) {
      return res.status(500).json({ error: error2.message });
    }

    return res.status(200).json({ ONG });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});




router.post("/", async (req, res) => {
  const { seguidor_id, ong_id } = req.body;

  if (seguidor_id === ong_id) {
    return res.status(400).json({ error: "Não pode seguir a si mesmo" });
  }

  if (!seguidor_id || !ong_id){
    return res.status(400).json({error: "IDs ausentes ou não válidos"})
  }

  try {
    // Verificando se há registro
    const { data: jaSegue, error: errorCheck } = await supabase
      .from("seguidores")
      .select("*")
      .eq("seguidor_id", seguidor_id)
      .eq("ong_id", ong_id)
      .maybeSingle();

      if(errorCheck){
        return res.status(500).json({error: "Erro ao verificar seguidores 1", details: errorCheck})
      }

      if (jaSegue !== null) {
         // Deletar
        const { error: errorDelete } = await supabase
        .from("seguidores")
        .delete()
        .eq("seguidor_id", seguidor_id)
        .eq("ong_id", ong_id);

        if (errorDelete) {
          return res.status(500).json({ error: "Erro ao deixar de seguir", details: errorDelete });
        }

      return res.status(200).json({ message: "Deixou de seguir", seguindo: false, reload: true });
}

// Inserir
    const { error: errorInsert } = await supabase
    .from("seguidores")
    .insert({ seguidor_id, ong_id });

    if (errorInsert) {
    return res.status(500).json({ error: "Erro ao seguir", details: errorInsert });
  }

  return res.status(200).json({ message: "Seguiu com sucesso", seguindo: true, reload: true });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro no servidor" });
    }
});

export default router;
