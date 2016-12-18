import * as express from 'express';
import * as path from 'path';
//import {DataBaseConnector} from "./dataBaseConnector";
import {GitHubClient} from './gitHubClient'
import * as bodyParser from 'body-parser'
export class ServerApp {

    private _App: express.Express;
   // private _dataBaseConnector: DataBaseConnector;
    private _gitHubClient:GitHubClient;
    private router :express.Router;
    constructor() 
    {
        this._App = express(); 
        this._gitHubClient = new GitHubClient();
        this.router = express.Router();

    //    this._dataBaseConnector = new DataBaseConnector();
   //     this._dataBaseConnector.connect();

        var dirPath = path.join(__dirname + '/../')
        this._App.use('/', express.static(dirPath));
        this._App.use(bodyParser.json());
        this._App.use(bodyParser.urlencoded({extended: false}));  
        
    }

    public startServer() 
    {
        this._App.listen(3000, function () 
        {
            console.log('Server started');
        });
    }

    public setRoutes() 
    {        
        this._App.get('/', (req,res)=> this.ShowContent(req,res)); 
        this._App.get('/auth',(req,res)=> this.authorizeOnGitHub(req,res))
        this._App.get('/callback',(req,res)=>this._gitHubClient.getToken(req,res));   
    }

    private ShowContent(req: express.Request, res: express.Response) 
    {
        res.render('index.html', { root:path.join(__dirname+'/../') });
    }

    private authorizeOnGitHub(req: express.Request, res: express.Response)
    {   
        if( this._gitHubClient.isAuthorized())
        {
            res.redirect('/');
            return;
        }  
       
        this._gitHubClient.authorize(req,res); 
    }
}