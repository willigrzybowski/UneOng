import supabase  from "../config/supabase.js";
export const listarPosts = async (id_ong) => {
  if (!id_ong) return []; // protege contra undefined

  const { data: posts, error } = await supabase
    .from("post")
    .select(`
      id_post,
      conteudo_post,
      imagem_url,
      data_hora,
      num_curtidas,
      ONG(id_ong, nome_ong, foto_perfil_ong),
      Curtidas(count)
    `)
    .eq("id_ong", id_ong)
    .order("data_hora", { ascending: false });

  if (error) throw error;

  return posts.map(post => ({
    ...post,
    totalCurtidas: post.Curtidas?.[0]?.count || 0
  }));
};

export const listarPostsOng = async () => {
  const { data:posts, error } = await supabase
 .from("post")
    .select(`
      id_post,
      conteudo_post,
      imagem_url,
      data_hora,
      num_curtidas,
      ONG(id_ong, nome_ong, foto_perfil_ong),
      Curtidas(count)
    `)
    .order("data_hora", { ascending: false });

  if (error) throw error;

  return posts.map(post => ({
    ...post,
    totalCurtidas: post.Curtidas?.[0]?.count || 0
  }));
};


export const listarPostsUser = async (id_ong) => {
  if (!id_ong) throw new Error("id_ong ausente");

  const ongNumber = Number(id_ong); // converte para bigint
  const { data: posts, error } = await supabase
    .from("post")
    .select(`
      id_post,
      conteudo_post,
      imagem_url,
      data_hora,
      num_curtidas,
      ONG (
        id_ong,
        nome_ong,
        foto_perfil_ong
      ),
      Curtidas(count)
    `)
    .eq("id_ong", ongNumber)
    .order("data_hora", { ascending: false });

  if (error) throw error;

  return posts.map(post => ({
    ...post,
    totalCurtidas: post.Curtidas[0]?.count || 0
  }));
};

