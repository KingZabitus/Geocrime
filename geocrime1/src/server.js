
const app = require("./index.js")

const porta = process.env.API_PORT

app.listen(porta, () => {console.log(`aplicativo rodando na porta ${porta}`)})