import {ExpressRouter} from "./ExpressRouter";

export class IndexRouter extends ExpressRouter {
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