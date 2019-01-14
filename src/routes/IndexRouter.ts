import {Router} from "./Router";

export class IndexRouter extends Router {
	constructor() {
		super();
	}

	initRouter(): any {
		this.router.get('/', (req, res, next) => {
			res.render('index', {title: 'Express'});
			res.send("Hello world");
		});
	}
}