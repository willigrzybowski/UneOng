import { 
    criarColecaoController,
    listarColecoesPorUsuarioController,
    deleteColecaoController,
    salvarItemColecaoController,
    removerItemColecaoController,
    listarColecaoController
} from "../controllers/colecao.controllers.js";

import express from "express";

const router = express.Router();

// Rota para criar uma nova coleção
router.post("/colecao", criarColecaoController);

// Rota para listar todas as coleções de um usuário
router.get("/colecoes/:id_criador", listarColecoesPorUsuarioController);



// Rota para adicionar um item (postagem) a uma coleção
router.post("/colecao/item", salvarItemColecaoController);

// Rota para remover um item (postagem) de uma coleção
router.delete("/colecao/item/:id_cItem", removerItemColecaoController);


// Rota para deletar uma coleção por ID
router.delete("/colecao/:id_colecao", deleteColecaoController);

// Rota para listar os itens de uma coleção
router.get("/colecao/:id_col", listarColecaoController);


export default router;