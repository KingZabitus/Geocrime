const { createPonto, getPontos, deletePonto } = require("../services/pontoService")

const store = async (req, res) => {
    const ponto = req.body
    const letPonto = await createPonto(ponto);
    return res.status(201).send(letPonto);
}

const index = async (req, res) => {
    const pontos = await getPontos();
    return res.send(pontos);
}

const apagar = async(req, res) => {
    const pontoId = req.params.id;
    const result = await deletePonto(pontoId);
    return res.result;
}

module.exports = {store, index, apagar}