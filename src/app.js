const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

// 패스포트 (로그인) 모듈 연결
const passport = require('passport');
const passportConfig = require('./passport');

// 데이터베이스 설정 가저오기
const {sequelize} = require('./models');

// 환경설정 파일 불러오기
require('dotenv').config();

const pageRouter = require('./routes/page');

const app = express();

// 데이터베이스 연결
sequelize.sync();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));

// 세션 사용
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

// 플래시 사용
app.use(flash());

// 패스포트 사용
app.use(passport.initialize());
app.use(passport.session());


app.use('/', pageRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
