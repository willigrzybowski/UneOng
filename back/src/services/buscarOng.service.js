import supabase from '../config/supabase.js';

export const buscarOngService = async (nome) => {
  try {
    const { data, error } = await supabase
      .from('ONG')
      .select('id_ong, nome_ong, foto_perfil_ong')
      .ilike('nome_ong', `%${nome}%`)
      .limit(10);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Erro no serviço buscarOng:', err.message);
    throw err;
  }
};
