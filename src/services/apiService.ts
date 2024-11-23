export const fetchTreatedImages = async (userId: number) => {
  try {
    const response = await fetch(`http://192.168.137.66:3002/imagemSatelite/imagens-tratadas/${userId}`);
    if (!response.ok) throw new Error('Erro ao buscar as imagens');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar as imagens:', error);
    throw error;
  }
}

export const buscarEstados = async () => {
  try {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    if (!response.ok) throw new Error('Erro ao buscar estados');  // Verificação da resposta
    const estadosData = await response.json();
    return estadosData;
  } catch (error) {
    console.error('Erro ao buscar estados:', error);
    throw error;
  }
};

export const buscarCidadesPorEstado = async (estadoId: number) => {
  try {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`,
      {
        headers: {
          'User-Agent': 'cloudSparkMobile/0.0.1',  // Remover caso não seja necessário
        },
      }
    );
    if (!response.ok) throw new Error('Erro ao buscar cidades');
    const cidadesData = await response.json();
    return cidadesData;
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    throw error;
  }
};

export const buscarCoordenadasCidade = async (cidade: string) => {
  const cityEncoded = encodeURIComponent(cidade).replace(/%20/g, '+');
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${cityEncoded}&format=json&polygon=1&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'cloudSparkMobile/0.0.1', // Mantenha o User-Agent como você já fez
        },
      }
    );

    if (!response.ok) {
      console.error(`Erro na resposta da API: Status ${response.status}`);
      throw new Error('Erro ao buscar coordenadas da cidade');
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      console.error('Nenhuma coordenada encontrada para a cidade.');
      return null; // Retorna null se não houver dados
    }

    return data[0].boundingbox;
  } catch (error) {
    console.error('Erro ao buscar coordenadas:', error);
    throw error; // Lança o erro novamente para ser tratado onde a função é chamada
  }
};
