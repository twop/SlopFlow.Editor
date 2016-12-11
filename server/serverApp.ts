import * as express from 'express';
import * as path from 'path';
//import {DataBaseConnector} from "./dataBaseConnector";
import {GitHubClient} from './gitHubClient'

export class ServerApp {

    private _App: express.Express;
   // private _dataBaseConnector: DataBaseConnector;
    private _gitHubClient:GitHubClient;
    private once:boolean = false;
    constructor() 
    {
        this._App = express(); 
        this._gitHubClient = new GitHubClient();
    //    this._dataBaseConnector = new DataBaseConnector();
   //     this._dataBaseConnector.connect();
    }

    public setRoutes() 
    {        
        this._App.get('/', (req,res)=> this.ShowContent(req,res)); 
        this._App.get('/callback',(req,res)=>this._gitHubClient.getToken(req,res));
    }

    public startServer() 
    {
        this._App.listen(3000, function () 
        {
            console.log('Server started');
        });
    }

    private ShowContent(req: express.Request, res: express.Response) 
    {
        if( !this._gitHubClient.isAuthorized(req))
        {
            this._gitHubClient.authorize(req,res);
            return;
        }
        
        res.sendFile('index.html', { root:path.join(__dirname+'/../') });
    }
}