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

// CORS 관련 부분
app.use(cors())
// BODY-PARSER
app.use(bodyParser.json());

app.use('/signup', signupRouter);
// app.use('/question', questionRouter);
app.use('/', homeRouter);
// app.use('/comment', commentRouter);
app.use('/post', postRouter);


// app.get("/", (req, res) => {
// 	res.send("Hello, World!");
// });

app.listen(port, () => {
	console.log(`Express Listening @ http://localhost:${ port }`);
});

