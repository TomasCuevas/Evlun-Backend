const express = require('express');

/**
 * @dbConnection
 */
const databaseConnect = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.paths = {
      user: '/api/user',
    };

    this.dbConnection();
    this.middleware();
    this.routes();
  }

  dbConnection() {
    databaseConnect();
  }

  middleware() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.user, require('../APIs/user/user-routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server iniciado en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
