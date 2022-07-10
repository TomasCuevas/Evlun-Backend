const express = require('express');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;

    this.middleware();
  }

  middleware() {
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server iniciado en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
