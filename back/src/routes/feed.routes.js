import express from "express";
import supabase from "../config/supabase.js";
import router from "./usuario.routes.js";

router.get("/", async ( req,res) => {

    try {
    const { data, error } = await supabase
    .from("post") 
    .select(`
      id_post,
      conteudo_post,
      imagem_url,
      data_hora,
      ONG (
        id_ong,
        nome_ong,
        foto_perfil_ong
      )
    `) 

    //Vai pegar todas as postagens e enviar o data para carregar o feed completo

    if (error) { return res.status(500).json({error: "Erro ao carregar postagens", details: error}) }

    return data;
    

    } catch (err) {
        return res.status(500).json({error: "Erro ao carregar postagens", details: err});
    }



    
})

export default router;
