import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import EventEmitter from 'events';

import logger from './config/logger.config.js';
import { configureEvents } from './controllers/events.controller.js';
import { defaultError404, defaultError500 } from './middleware/default.errors.handler.middleware.js';

export const eventEmitter = new EventEmitter();

export class App {

  constructor() {

    this.app = express();
    this.app.disable('x-powered-by');
    this.port = process.env.PORT || 3000;

    //Routes declarations
    this.paths = [
      // {
      //   path: '/example/v1/example',
      //   route: exampleRoute
      // },
    ]

    //Events Handler
    this.eventsConfig();
    //Middleware's
    this.middleware();
    //Routes
    this.routes();
  }

  eventsConfig() {
    configureEvents();
  }

  middleware() {
    //Cors
    this.app.use(cors());
    //Helmet
    this.app.use(helmet());
    //Json Parser
    this.app.use(express.json());
  }

  routes() {
    this.paths.forEach(async (routeItem) => {
      this.app
      this.app.use(routeItem.path , routeItem.route);
    });
    this.app.use(defaultError404);
    this.app.use(defaultError500);
  }

  start() {
    this.app.listen(this.port, () => {
      logger.info(`Server listening at http://0.0.0.0:${this.port}`);
    });
  }
}