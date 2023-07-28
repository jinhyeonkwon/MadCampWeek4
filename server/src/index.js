import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/* DO NOT REMOVE */
/* Configure Environment Variables */
if (process.env.ENVIRONMENT === "DEVELOPMENT") {
	dotenv.config({ path: ".env.development" })
} else {
	dotenv.config({ path: ".env.production" })
}

import signupRouter from './routes/signup.js';
// import questionRouter from './routes/question.js';
import homeRouter from './routes/home.js';
// import commentRouter from './routes/comment.js';
import postRouter from './routes/post.js';


const app = express();
const port = process.env.EXPRESS_PORT;
const reactUrl = process.env.REACT_URL;

// CORS 관련 부분
app.use(cors())
// BODY-PARSER
app.use(bodyParser.json());

app.use('/signup', signupRouter);
// app.use('/question', questionRouter);
app.use('/', homeRouter);
// app.use('/comment', commentRouter);
app.use('/post', postRouter);

// -------- 서버용 ------------

const whitelist = [`http://${reactUrl}`];

const corsOptions = {
  origin: (origin, callback) => {
    console.log('[REQUEST-CORS] Request from origin: ', origin);
    if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error('Not Allowed by CORS'));
  },
  credentials: true,
	AllowCredentials: true, // 쿠키 사용하려면 필요!
};

// -------- 서버용 끝 ------------

// app.get("/", (req, res) => {
// 	res.send("Hello, World!");
// });

app.listen(port, () => {
	console.log(`Express Listening @ http://localhost:${ port }`);
});

