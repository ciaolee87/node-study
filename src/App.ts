import express from 'express';
import * as path from 'path';
import morgan = require('morgan');
import cookieParser from "cookie-parser";
import {IndexRouter} from "./routes/IndexRouter";
import {NextFunction, Request, Response} from "express-serve-static-core";
import createHttpError from "http-errors";
import session from "express-session";
import flash from 'connect-flash';


class App {
    public app: express.Application;


    public static bootstrap(): App {
        return new App();
    }

    constructor() {
        this.app = express();
        this.setMiddleware();
        this.setRouters();
        this.setErrorHandler();
    }

    setMiddleware() {
        // 뷰 렌더링 엔진 선택
        this.app.engine('pug', require('pug').__express);
        this.app.set('views', path.join(__dirname, './views'));
        this.app.set('view engine', 'pug');

        // 로거 설정
        this.app.use(morgan('dev'));

        // json parser 설정
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));

        // cookie parser 설정
        this.app.use(cookieParser());

        // static 파일 위치 설정(그림 등)
        this.app.use(express.static(path.join(__dirname, './assets')));

        // session 설정
        this.app.use(session({
            secret: 'nodebirdsecre',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: false
            }
        }));


        // flash 이용
        this.app.use(flash());
    }

    setRouters() {
        this.app.use('/', new IndexRouter().getRouter());

        // 지정되지 않은 요청이라면 에러를 발생 시킨다
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            const err = new Error('Page not found');
            err.name = '404';
            next(err);
        });
    }

    setErrorHandler() {
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            res.locals['message'] = err['message'];
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(Number(err.name) || 500);
            res.render('error');
        });
    }
}

export default App;