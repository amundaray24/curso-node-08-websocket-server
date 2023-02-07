import logger from '../config/logger.config.js';
import { eventEmitter } from '../app.js';

export const configureEvents = () => {
  
  eventEmitter.on('INIT_EVENT',() => {
    logger.debug('event "INIT_EVENT" Captured');
  });

}