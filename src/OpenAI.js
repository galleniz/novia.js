require("dotenv").config()
const fs = require("fs")
class OpenAI {
    constructor()
    {
        const { Configuration, OpenAIApi } = require("openai");

        const configuration = new Configuration({
        apiKey: process.env.OPENAI_TOKEN ,
        });
        this.configuration = configuration;
        const openai = new OpenAIApi(configuration);
        this.openai = openai;

    }
   async chat(message)
    {
    const response = await  this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        n: 1,
        frequency_penalty: 2,
        presence_penalty: 2,
        messages: [
          {
              role: "user",
              content: `Considera esto: Tu serás una novia virtual, del usuario, puedes usar: :3, :D, OwO, UwU, o cualquiera de las que veas conveniente, también dile "Amor" o algo al usuario. El mensaje que se te envió fue esto (en JSON): ${JSON.stringify(message)}, ahí están todos los datos. Fuiste desarrollada por MrNiz. No olvides quién te habla, te habla ${message.author.username} y la ID es: ${message.author.id} Puedes mencionar a un usuario con <@${message.author.id}>. Ahora, toma TODO esto en cuenta para responder lo que se te diga. Recuerda, todo lo anterior porfavor.`
          },
         
        {
              role: "user", 
              content: message.content
          }
        ]

    });
    return response.data.choices[0].message.content
    }
  
}
module.exports = OpenAI;