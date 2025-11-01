import {
  criarColecao,
  listarColecoesPorUsuario,
  deleteColecao,
  salvarItemColecao,
  removerItemColecao,
  listarColecao
} from "../services/colecao.service.js";

import supabase from "../config/supabase.js";

export const criarColecaoController = async (req, res) => {
  try {
    console.log("📥 Body recebido:", req.body); // <- Mostra o que chega do front

     const  { nomeColecao } = req.body;
     const id_criador = req.session.user?.id;
    

    // Verificação simples
    if (!nomeColecao || !id_criador) {
      return res.status(400).json({ error: "Os campos 'nomeColecao' e 'id_criador' são obrigatórios." });
    }

    const novaColecao = await criarColecao(nomeColecao, id_criador);

    console.log("✅ Coleção criada: ", novaColecao);
    res.status(201).json(novaColecao);

  } catch (error) {
    console.error("❌ Erro ao criar coleção: ", error);
    res.status(500).json({ error: error.message, detalhes: error.details });
  }
};

export const listarColecoesPorUsuarioController = async (req, res) => {
    try {
        const id_criador = parseInt(req.params.id_criador);
        const colecoes = await listarColecoesPorUsuario(id_criador);
        res.json(colecoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteColecaoController = async (req, res) => {
  try {
    const id_colecao = parseInt(req.params.id_colecao);

    await deleteColecao(id_colecao);
    return res.status(200).json({
      success: true,
      message: "Coleção excluída com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao excluir coleção:", error);
    return res.status(500).json({ error: error.message });
  }
};


export const salvarItemColecaoController = async (req, res) => {
  try {
    const { id_col, id_post } = req.body;

    console.log("Recebido no controller:", { id_col, id_post });

    // Converte para número para evitar problemas de tipo
    const itemSalvo = await salvarItemColecao(Number(id_col), Number(id_post));

    console.log("Item salvo:", itemSalvo);

    res.status(201).json(itemSalvo);
  } catch (error) {
    console.error("❌ Erro no listarPostsDaColecaoController:", error);
    res.status(500).json({ error: error.message });
  }
};


export const removerItemColecaoController = async (req, res) => {
  try {
    const { id_cItem } = req.params;

    if (!id_cItem) {
      return res.status(400).json({ error: "O ID do item da coleção é obrigatório." });
    }

    const { error } = await supabase
      .from("colecao_items")
      .delete()
      .eq("id_cItem", id_cItem);

    if (error) throw error;

    res.status(200).json({ message: "Item removido com sucesso!" });
  } catch (error) {
    console.error("Erro ao remover item da coleção:", error);
    res.status(500).json({ error: error.message });
  }
};





export const listarColecaoController = async (req, res) => {
    try {
        const id_col = parseInt(req.params.id_col);
        const colecao = await listarColecao(id_col);
        res.json(colecao);
    }   catch (error) {         
        res.status(500).json({ error: error.message });
    }               
};

