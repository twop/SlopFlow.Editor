import * as querystring from 'querystring';
import * as https from 'https';
import * as url from 'url';
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';

interface GitUserData
{
	 accessToken:string
}
///https://developer.github.com/v3/oauth/ not finished
export class GitHubClient 
{
		private id: string = "e134bb82b0e0c904e57e";
		private secret: string = "685af6e6435e61f04cbdbf6bdc54452178b48f7a";
		private user: GitUserData;
		private originalUrl: string;
		private _stateString: string;

		constructor()
		{
		}

		public authorize(request: express.Request, response: express.Response)
		{
				this.originalUrl = request.originalUrl;
				this._stateString = Math.random().toString(36).substring(7);
				response.redirect("https://github.com/login/oauth/authorize?" + querystring.stringify({ client_id: this.id, state: this._stateString }));
		}

		public isAuthorized(request: express.Request):Boolean
		{
				return this.user!=undefined;
		};

		public getToken(request: express.Request, response: express.Response)
		{
				if (!request.query.code)
				{
						return this.onError(request,response, new Error("No code provided in request from GitHub."));
				}

				if (this._stateString != request.query.state)
				{
						return this.onError(request, response, new Error("getToken not corrected state "));
				}

				var options = {
					url: "https://github.com/login/oauth/access_token",
					method: "POST",
					data: {
						client_id: this.id,
						client_secret: this.secret,
						code: request.query.code,
						state: this._stateString
					}
				}

				this.sendRequest(options, (error, githubResponse) => this.onTokenResponce(request, response, error, githubResponse));
		}

		private onTokenResponce(request: express.Request, response: express.Response, error: Error, githubResponse: any)
		{
				if (error)
				{
						return this.onError(request, response, error);
				}

				if (this._stateString != request.query.state)
				{
						return this.onError(request, response, new Error("onTokenResponce not corrected state"));
				}

				var data = querystring.parse(githubResponse.body);
				var accessToken = data.access_token;
				console.log(data);

				if (!accessToken)
				{
						return this.onError(request, response, new Error("No access token in response from GitHub."));
				}

				var gitUserData:GitUserData = 
				{
						accessToken: accessToken
				}
				
				this.user = gitUserData;
				this.onSuccess(request, response, gitUserData);
		}

		private onError(request: express.Request, response: express.Response, error: Error)
		{
				console.log(error.message);
				response.sendStatus(500);
		}

		private onSuccess(request: express.Request, response: express.Response, gitUserData:GitUserData)
		{
				var dirPath = path.join(__dirname + '/../')
				request.app.use('/', express.static(dirPath));
				console.log("success "+this.user.accessToken);
				response.redirect(this.originalUrl);
		};

		private sendRequest(options: any, callback: any) 
		{
				var parcedUrl: url.Url = url.parse(options.url);
				var data = options.data;

				var requestOption = {
					hostname: parcedUrl.hostname,
					path: parcedUrl.pathname,
					method: options.method || "GET"
				};

				var request: http.ClientRequest = https.request(requestOption, (response: any) => this.onResponce(response, callback));
				request.on("error", function (error){callback(error);});

				if (data && typeof data !== "string")
				{
						data = querystring.stringify(data);
				}

				request.write(data);
				request.end();
		}
		private onResponce(response: any, callback: any)
		{
				if (response.statusCode === 302)
				{
					return this.sendRequest({ url: response.headers.location }, callback);
				}

				response.setEncoding("utf8");
				response.body = "";
				response.on("data", function (data){response.body += data;});
				response.on("end", function (){callback(null, response)});
		};
}