import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import Youch from 'youch';
import 'express-async-errors';
import cors from 'cors';
import Routes from './Routes';

import './database';

dotenv.config();

require('dotenv').config();

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(Routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        res.status(500).json(errors);
      } else {
        res.status(500).json({ err, errors: ['internal server errors'] });
      }

      next(false);
    });
  }
}

export default new App().server;
