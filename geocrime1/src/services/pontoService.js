const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();

const createPonto = async (pointData) => {
    try {
        const novoPonto = await prisma.Ponto.create({
            data: {
                titulo: pointData.titulo,
                tipo: pointData.tipo,
                dataHora: pointData.dataHora,
                lat: pointData.lat,
                lng: pointData.lng
            }
    })
    if(!novoPonto) {
        return {message: "Erro ao criar o ponto"}
    }
    return novoPonto;
    } catch (error) {
        return {message: "Erro no servidor"}
    }
}

const getPontos = async () => {
    let ponto;
    try {
        ponto = await prisma.Ponto.findMany();
    } catch (error) {
        return{message: "Erro no servidorr"}
    }
    
    if(!ponto) {
        return {message: "Erro ao buscar o ponto"}
    }
    return ponto;
}

const deletePonto = async (id) => {
    let deletedPonto
    try {
        deletedPonto = await prisma.Ponto.delete({
            where: {
                id: parseInt(id) // Se o id for uma string, você pode precisar convertê-lo para um tipo numérico
            }
        });
        if (!deletedPonto) {
            return { message: "O ponto não foi encontrado ou não pôde ser excluído" };
        }
        return { message: "Ponto excluído com sucesso" };
    } catch (error) {
        return { message: "Erro no servidor ao excluir o ponto" };
    }
}

module.exports = {
    createPonto,
    getPontos,
    deletePonto
}