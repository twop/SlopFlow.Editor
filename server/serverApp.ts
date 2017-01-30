import * as express from 'express';
import * as path from 'path';
//import {DataBaseConnector} from "./dataBaseConnector";
import { GitHubClient } from './gitHubClient'
import * as bodyParser from 'body-parser'

const dirPath = path.join(__dirname + '/../')

export class ServerApp
{

    private app: express.Express;
    // private _dataBaseConnector: DataBaseConnector;
    private githubClient: GitHubClient;
    //private router :express.Router;
    constructor() 
    {
        this.app = express();
        this.githubClient = new GitHubClient();
        //this.router = express.Router();

        //    this._dataBaseConnector = new DataBaseConnector();
        //     this._dataBaseConnector.connect();

        
        this.app.use('/', express.static(dirPath));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

    }

    public startServer() 
    {
        this.app.listen(3000, function () 
        {
            console.log('Server started');
        });
    }

    public setRoutes() 
    {
        this.app.get('/auth', (req, res) => this.authorizeOnGitHub(req, res))
        this.app.get('/callback', (req, res) => this.githubClient.getToken(req, res));
        this.app.get('*', (req, res) => this.ShowContent(req, res));
    }

    private ShowContent(req: express.Request, res: express.Response) 
    {
        res.sendFile('index.html', { root: dirPath });
    }

    private authorizeOnGitHub(req: express.Request, res: express.Response)
    {
        if (this.githubClient.isAuthorized())
        {
            res.redirect('/');
            return;
        }

        this.githubClient.authorize(req, res);
    }
}