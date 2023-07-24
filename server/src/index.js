import express from "express";
import dotenv from "dotenv";

/* DO NOT REMOVE */
/* Configure Environment Variables */
if (process.env.ENVIRONMENT === "DEVELOPMENT") {
	dotenv.config({ path: ".env.development" })
} else {
	dotenv.config({ path: ".env.production" })
}

import signupRouter from './routes/signup.js';
import postRouter from './routes/post.js';
import homeRouter from './routes/home.js';


const app = express();
const port = process.env.EXPRESS_PORT;

// CORS 관련 부분

app.use('/signup', signupRouter);
app.use('/post', postRouter);
app.use('/', homeRouter);


// app.get("/", (req, res) => {
// 	res.send("Hello, World!");
// });

app.listen(port, () => {
	console.log(`Express Listening @ http://localhost:${ port }`);
});

