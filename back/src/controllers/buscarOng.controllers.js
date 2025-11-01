import { buscarOngService } from '../services/buscarOng.service.js';

export const buscarOngController = async (req, res) => {
  const { nome } = req.query;

  try {
    if (!nome) {
      return res.status(400).json({ message: 'Informe o nome da ONG para busca.' });
    }

    const ongs = await buscarOngService(nome);

    return res.status(200).json(ongs);
  } catch (error) {
    console.error('Erro no controller:', error.message);
    return res.status(500).json({ message: 'Erro ao buscar ONGs.', error: error.message });
  }
};
