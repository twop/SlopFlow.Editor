import {ServerApp} from './server/serverApp'

var serverApp = new ServerApp();

serverApp.setRoutes();

serverApp.startServer();
