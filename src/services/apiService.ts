export const fetchTreatedImages = async () => {
    try {
        const response = await fetch('http://10.0.2.2:3002/imagemSatelite/imagens-tratadas');
        if (!response.ok) throw new Error('Erro ao buscar as imagens');
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar as imagens:', error);
        throw error;
    }
};
