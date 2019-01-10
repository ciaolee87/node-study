import express from 'express';

export abstract class ExpressRouter {
	protected router: express.Router;

	protected constructor() {
		this.router = express.Router();
		this.initRouter();
	}

	getRouter(): express.Router {
		return this.router;
	}

	abstract initRouter(): any;
}