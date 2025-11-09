import { 
    criarColecaoOngController,
    listarColecoesPorUsuarioOngController,
    deleteColecaoOngController,
    salvarItemColecaoOngController,
    removerItemColecaoOngController,
    listarColecaoOngController
} from "../controllers/colecao_ong.controllers.js";

import express from "express";

const router = express.Router();

// Rota para criar uma nova coleção
router.post("/colecaoOng", criarColecaoOngController);

// Rota para listar todas as coleções de um usuário
router.get("/colecoesOng/:id_criador", listarColecoesPorUsuarioOngController);



// Rota para adicionar um item (postagem) a uma coleção
router.post("/colecaoOng/item", salvarItemColecaoOngController);

// Rota para remover um item (postagem) de uma coleção
router.delete("/colecaoOng/item/:id_cItem", removerItemColecaoOngController);


// Rota para deletar uma coleção por ID
router.delete("/colecaoOng/:id_colecao", deleteColecaoOngController);

// Rota para listar os itens de uma coleção
router.get("/colecaoOng/:id_col", listarColecaoOngController);


export default router;