/* NODEJS 필수 설정 */
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

//const moment = require("moment");
const helmet = require("helmet");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const http = require("http").createServer(app);
const mongoose = require("mongoose");
const {boardRouter} = require('./routes/boardCRUD');
const { Server } = require("socket.io");
const io = new Server(http);



/* NODEJS 필수 미들웨어 설정 */
// app.use(morgan('dev'));
app.use(express.static((path.join(__dirname, 'public'))));

/* NODEJS 기본 세팅 */
dotenv.config();
app.set('port', 4040);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//moment.tz.setDefault("Asia/Seoul");

/* NODEJS HTTP 보안 설정 */
//app.use(helmet());

/* NODEJS 데이터베이스 Connection */
let databaseNam = "HspBoard";
const databaseOption = "retryWrites=true&w=majority";

//mongodb+srv://craham:dlHn1V8I1uzK4FvA@clustermongo.cwzee.mongodb.net/
const id = 'craham';
const pwd = 'dlHn1V8I1uzK4FvA';
const uri = `mongodb+srv://${id}:${pwd}@clustermongo.cwzee.mongodb.net/${databaseNam}?${databaseOption}`;

/* 라우터 설정 */

/* MONGODB SERVER START */
const server = async() =>{
    try{
        await mongoose.connect(uri, {
            useNewUrlParser :true, 
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify:false
        });
        console.log("mongoDB connection success");

        /* JSON PARSING SETTING */
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        
        /* 라우터 설정 */
        app.use("/board", boardRouter);

        app.get('/', function(req, res) {
            res.render("index.ejs");
        });

        http.listen(app.get("port"), async() => {
            console.log(app.get("port"), 'port start')
        });
    }catch(err){
        console.log(err);
    }
}

io.on("connection", (socket)=>{
    console.log("연결되었습니다.");
    socket.on("sendMsg", (data)=>{
        io.emit('broadcast', data);
    });
});

server();