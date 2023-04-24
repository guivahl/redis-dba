const MailQueue = require("./queue/MailQueue");

MailQueue.add({
    to: "gdsvahl@inf.ufpel.edu.br",
    from: "gdsvahl@inf.ufpel.edu.br",
    subject: "DBA",
    text: "POC Redis"
})