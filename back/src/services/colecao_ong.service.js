import supabase from "../config/supabase.js";

//COLEÇÃO

// Função para criar uma nova coleção
export const criarColecaoOng = async (nomeColecao, idCriador) => {
  const { data, error } = await supabase
    .from("colecao_ongs")
    .insert({ nome_colecao_ong: nomeColecao,  id_ong: idCriador })
    .select()
    .single();

  if (error) {
    console.error("❌ Erro do Supabase:", error); // 👈 Mostra o erro real no console
    throw new Error(error.message); // 👈 mantém a mensagem do Supabase
  }

  return data;
};

// Função para listar todas as coleções de um usuário
export const listarColecoesPorUsuarioOng = async (id_criador) => {
  const { data, error } = await supabase
    .from("colecao_ongs")
    .select("id_colecao_ong, nome_colecao_ong")
    .eq("id_ong", id_criador);
  if (error) {
    throw new Error("Erro ao listar coleções", { details: error });
  }

  return data;
};




// Função para deletar uma coleção por ID
export const deleteColecaoOng = async (id_colecao) => {
  const { data, error } = await supabase
    .from("colecao_ongs")
    .delete()
    .eq("id_colecao_ong", id_colecao);

  if (error) {
    throw new Error("Erro ao deletar coleção", { details: error });
  }

  return data;
};

//ITENS DA COLEÇÃO -- POSTAGENS

// Função para adicionar um item (postagem) a uma coleção
export const salvarItemColecaoOng = async (id_col, id_post) => {
  const { data, error } = await supabase
    .from("colecao_ongs_items")
    .insert({
      id_colecao_ong: Number(id_col),
      id_post: Number(id_post)
    })
    .select()
    .single();

  if (error) {
    console.error("Erro Supabase ao inserir item:", error); // <-- log completo
    console.error("Dados enviados:", { id_col, id_post });    // <-- mostra o que foi enviado
    throw new Error(`Erro ao salvar item na coleção: ${error.message}`);
  }

  return data;
};


// Função para remover um item (postagem) de uma coleção

export const removerItemColecaoOng = async (id_citem) => {
  const { data, error } = await supabase
    .from("colecao_ongs_items")
    .delete()
    .eq("id_citem_ong", id_citem);

  if (error) {
    console.error("❌ Erro Supabase ao deletar item:", error);
    throw new Error("Erro ao deletar item da coleção: " + error.message);
  }

  console.log("✅ Item da coleção deletado com sucesso:", data);
  return data;
};




// Função para listar todos os itens (postagens) de uma coleção
export const listarColecaoOng = async (id_col) => {
  const { data, error } = await supabase
    .from("colecao_ongs_items")
    .select(`
      id_citem_ong,
      id_post,
      post:id_post(
        id_post,
        conteudo_post,
        imagem_url,
        data_hora,
        ONG (
          id_ong,
          nome_ong,
          foto_perfil_ong
        )
      )
    `)
    .eq("id_colecao_ong", id_col);

  console.log("🔍 Resultado Supabase:", data, error);

  if (error) {
    throw new Error("Erro ao listar coleção: " + error.message);
  }

  if (!data) return [];

  const posts = data.map(item => ({
    id_citem_ong: item.id_citem_ong,
    id_post: item.post.id_post,
    conteudo_post: item.post.conteudo_post,
    imagem_url: item.post.imagem_url,
    data_hora: item.post.data_hora,
    ONG: item.post.ONG
  }));

  return posts;
};


