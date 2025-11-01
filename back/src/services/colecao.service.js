import supabase from "../config/supabase.js";

//COLEÇÃO

// Função para criar uma nova coleção
export const criarColecao = async (nomeColecao, idCriador) => {
  const { data, error } = await supabase
    .from("colecao")
    .insert({ nome_colecao: nomeColecao, id_criador: idCriador })
    .select()
    .single();

  if (error) {
    console.error("❌ Erro do Supabase:", error); // 👈 Mostra o erro real no console
    throw new Error(error.message); // 👈 mantém a mensagem do Supabase
  }

  return data;
};

// Função para listar todas as coleções de um usuário
export const listarColecoesPorUsuario = async (id_criador) => {
  const { data, error } = await supabase
    .from("colecao")
    .select("id_colecao, nome_colecao")
    .eq("id_criador", id_criador);
  if (error) {
    throw new Error("Erro ao listar coleções", { details: error });
  }

  return data;
};




// Função para deletar uma coleção por ID
export const deleteColecao = async (id_colecao) => {
  const { data, error } = await supabase
    .from("colecao")
    .delete()
    .eq("id_colecao", id_colecao);

  if (error) {
    throw new Error("Erro ao deletar coleção", { details: error });
  }

  return data;
};

//ITENS DA COLEÇÃO -- POSTAGENS

// Função para adicionar um item (postagem) a uma coleção
export const salvarItemColecao = async (id_col, id_post) => {
  const { data, error } = await supabase
    .from("colecao_items")
    .insert({
      id_colecao: Number(id_col),
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

export const removerItemColecao = async (id_citem) => {
  const { data, error } = await supabase
    .from("colecao_items")
    .delete()
    .eq("id_cItem", id_citem);

  if (error) {
    console.error("❌ Erro Supabase ao deletar item:", error);
    throw new Error("Erro ao deletar item da coleção: " + error.message);
  }

  console.log("✅ Item da coleção deletado com sucesso:", data);
  return data;
};




// Função para listar todos os itens (postagens) de uma coleção
export const listarColecao = async (id_col) => {
  const { data, error } = await supabase
    .from("colecao_items")
    .select(`
      id_cItem,
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
    .eq("id_colecao", id_col);

  console.log("🔍 Resultado Supabase:", data, error);

  if (error) {
    throw new Error("Erro ao listar coleção: " + error.message);
  }

  if (!data) return [];

  const posts = data.map(item => ({
    id_cItem: item.id_cItem,
    id_post: item.post.id_post,
    conteudo_post: item.post.conteudo_post,
    imagem_url: item.post.imagem_url,
    data_hora: item.post.data_hora,
    ONG: item.post.ONG
  }));

  return posts;
};


