const AWS = require("aws-sdk");

/*
  A linha abaixo é necessária para remover mensagem do pacote da AWS sugerindo a 
  migração da versão do pacote 'aws-sdk' para v3.
*/
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const {
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_API_VERSION,
} = require("../config");

class EmailService {
  constructor() {
    this.service = new AWS.SES({
      region: AWS_REGION,
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      apiVersion: AWS_API_VERSION,
    });
  }

  async send({ from, to, subject, text }) {
    const params = {
      Source: from,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: text,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
    };

    await this.service
      .sendEmail(params)
      .promise()
      .then(() => {
        console.log("E-mail enviado com sucesso!");
      })
      .catch(() => {
        console.error("Falha no envio de e-mail!");
      });
  }
}

module.exports = new EmailService();
