import * as express from 'express';
import * as path from 'path'
export class ServerApp {

    private _App: express.Express;
    constructor() 
    {
        this._App = express(); 
        this._App.use('/',express.static(path.join(__dirname+'/../')));  
    }
    
    public setRoutes() 
    {        
      //  this._App.get('/', this.SendIndexHtml);     
    }

    public startServer() 
    {
        this._App.listen(3000, function () {
            console.log('Server started');
        });
    }

    private SendIndexHtml(req: express.Request, res: express.Response) {
      //  res.sendFile('index.html');
    }
}