<p align="center">
  <h1>Geocrime</h1>
</p>


A aplicação Geocrime feita para a disciplina de Banco de Dados II do curso de Ánalise e Desenvolvimento de Sistemas, tem como objetivo utilizar a API do google maps para registrar ocorrências criminais dada suas localizações, oferecendo detalhamento da ocorrência além de opções de listagem e exclusão.

# Funcionalidades

## Adicionar Ocorrência

- **Endpoint:** `/pontos`
- **Método:** `POST`
- **Descrição:** Adiciona uma nova ocorrência.
- **Corpo da Requisição (JSON):**

```json
{
  "titulo": "Assalto",
  "tipo": "Crimes",
  "dataHora": "2023-10-13T14:00:00",
  "lat": -6.889531952896556,
  "lng": -38.54527473449707,
}
```
## Obter Todas as Ocorrências

- **Endpoint:** `/pontos`
- **Método:** `GET`
- **Descrição:** Obtém todas as ocorrências registradas.

## Deletar Ocorrência

- **Endpoint:** `/pontos/:ocorrenciaId`
- **Método:** `DELETE`
- **Descrição:** Deleta uma ocorrência específica.

# Interface do Usuário

- O formulário permite adicionar uma nova ocorrência, fornecendo o título, tipo, data e hora, latitude e longitude.

- A lista de ocorrências é exibida junto ao formulário, mostrando o título, tipo, data e hora e local no mapa de cada ocorrência. Botão "Deletar" está disponível em cada ocorrência listada para interação.
