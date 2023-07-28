import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

if (process.env.ENVIRONMENT === 'DEVELOPMENT') {
  dotenv.config({ path: '.env.development' });
} else {
  dotenv.config({ path: '.env.production' });
}

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;
const router = express.Router();

router.post('/getInfo', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).send('header가 없어요!');
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
      return res.status(200).json({ decodedToken: decodedToken });
    } catch (e) {
      return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다!');
    }
  } catch (e) {
    console.log(e);
  }
});
// 요청
router.post('/getquestions', async (req, res) => {
  //console.log('/question/getquestions');
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).send('header가 없어요!');
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (e) {
      return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다!');
    }
    const userClass = decodedToken.class;
    const userId = decodedToken.id;

    const { themeId } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      },
    });
    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    }

    const questionList = await prisma.question.findMany({
      where: {
        Class: userClass,
        ThemeId: themeId,
      },
      include: {
        author: true,
        comments: true,
      },
      orderBy: [
        {
          Id: 'asc',
        },
      ],
    });

    const questionListWithCommentCount = questionList.map((question) => ({
      ...question,
      commentCnt: question.comments.length,
    }));

    return res.status(200).json({ questionList: questionListWithCommentCount });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post('/getonequestion', async (req, res) => {
  //console.log('/question/getonequestion');
  try {
    const authHeader = req.headers.authorization;
    //console.log(authHeader);
    if (!authHeader) {
      return res.status(400).send('header가 없어요!');
    }
    const token = authHeader.split(' ')[1];
    //console.log('getonequestion) token ' + token);
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (e) {
      return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다!');
    }
    //console.log('getonequestion) decoded key ' + decodedToken);
    const userClass = decodedToken.class;
    const userId = decodedToken.id;
    //console.log(`getonequestion) userId: ${userId}, userClass: ${userClass}`);

    const { questionId } = req.body;
    //console.log(`getonequestion) questionId : ${questionId}`);

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      },
    });
    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    }

    const question = await prisma.question.findUnique({
      where: {
        Id: questionId,
      },
      include: {
        author: true,
      },
    });
    //console.log(`getonequestion) question.author.Name : ${question.author.Name}`);
    if (user.Class !== question.Class) {
      return res.status(400).send('유저 분반과 질문 분반이 맞지 않습니다!');
    }

    return res.status(200).json({ question: question });
  } catch (e) {
    //console.log(e);
    res.status(500).json({ error: e });
  }
});

router.post('/getoneuser', async (req, res) => {
  //console.log('/post/getoneuser');
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      return res.status(400).send('header가 없어요!');
    }
    const token = authHeader.split(' ')[1];
    console.log('getonequestion) token ' + token);
    const decodedToken = jwt.verify(token, SECRET_KEY);
    console.log('getonequestion) decoded key ' + decodedToken);
    const userClass = decodedToken.class;

    const { userId } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      },
    });
    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    }

    return res.status(200).json({ user: user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.post('/getonequestion', async (req, res) => {
  console.log('/question/getonequestion');
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      return res.status(400).send('header가 없어요!');
    }
    const token = authHeader.split(' ')[1];
    console.log('getonequestion) token ' + token);
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (e) {
      return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다!');
    }
    console.log('getonequestion) decoded key ' + decodedToken);
    const userClass = decodedToken.class;
    const userId = decodedToken.id;
    console.log(`getonequestion) userId: ${userId}, userClass: ${userClass}`);

    const { questionId } = req.body;
    console.log(`getonequestion) questionId : ${questionId}`);

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      },
    });
    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    }

    const question = await prisma.question.findUnique({
      where: {
        Id: questionId,
      },
      include: {
        author: true,
      },
    });
    if (user.Class !== question.Class) {
      return res.status(400).send('유저 분반과 질문 분반이 맞지 않습니다!');
    }

    return res.status(200).json({ question: question });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.post('/getoneuser', async (req, res) => {
  console.log('/post/getoneuser');
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      return res.status(400).send('header가 없어요!');
    }
    const token = authHeader.split(' ')[1];
    console.log('getonequestion) token ' + token);
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (e) {
      return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다!');
    }
    console.log('getonequestion) decoded key ' + decodedToken);
    const userClass = decodedToken.class;

    const { userId } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      },
    });
    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    }

    return res.status(200).json({ user: user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.post('/createquestions', async (req, res) => {
  console.log('/post/createquestions');
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).send('header가 없어요!');
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (e) {
      return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다!');
    }
    const userClass = decodedToken.class;
    const userId = decodedToken.id;

    const { themeId, contents } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      },
    });

    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    }

    console.log('인증까지 성공함!');

    const newQuestion = await prisma.question.create({
      data: {
        ThemeId: themeId,
        Contents: contents,
        Class: userClass,
        AuthorId: userId,
      },
    });

    return res.status(200).json({ isOk: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

router.post('/deletequestions', async (req, res) => {
  console.log('/question/deletequestions');
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).send('header가 없어요!');
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (e) {
      return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다!');
    }
    const userClass = decodedToken.class;
    const userId = decodedToken.id;

    const { questionId } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      },
    });

    const question = await prisma.question.findUnique({
      where: {
        Id: questionId,
      },
    });

    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    } else if (userId !== question.AuthorId) {
      return res.status(400).send('본인이 작성한 질문이 아닙니다!');
    }
    const deletedComments = await prisma.comment.deleteMany({
      where: {
        QuestionId: questionId,
      },
    });
    const deletedQuestion = await prisma.question.delete({
      where: {
        Id: questionId,
      },
    });

    return res.status(200).json({ isOk: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.post('/getcomments', async (req, res) => {
  console.log('/comment/getcomments');
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).send('header가 없어요!');
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (e) {
      return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다!');
    }
    const userClass = decodedToken.class;
    const userId = decodedToken.id;
    console.log(userClass);
    console.log(userId);

    const { questionId } = req.body;
    console.log(`getcomments) questionId : ${questionId}`);

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      },
    });

    const question = await prisma.question.findUnique({
      where: {
        Id: questionId,
      },
    });

    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    }
    if (userClass !== question.Class) {
      return res
        .status(400)
        .send(
          `질문 아이디와 분반이 맞지 않습니다! : userClass = ${userClass}, user.Class=${user.Class}`
        );
    }

    const commentList = await prisma.comment.findMany({
      where: {
        QuestionId: questionId,
      },
      include: {
        author: true,
      },
    });
    console.log(`commentList.length : ${commentList.length}`);
    return res.status(200).json({ commentList: commentList });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post('/createcomments', async (req, res) => {
  console.log('/comment/createcomments');
  const curr = new Date();
  const utc = curr.getTime() + 9 * 60 * 60 * 1000; // 한국 시간대 맞추려고..
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).send('header가 없어요!');
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (e) {
      return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다!');
    }
    const userClass = decodedToken.class;
    const userId = decodedToken.id;

    const { questionId, contents } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      },
    });

    const question = await prisma.question.findUnique({
      where: {
        Id: questionId,
      },
    });
    console.log(questionId);

    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    } else if (userClass !== question.Class) {
      return res.status(400).send('질문 아이디와 분반이 맞지 않습니다!');
    }
    console.log('dddddd');

    const newComment = await prisma.comment.create({
      data: {
        QuestionId: questionId,
        AuthorId: userId,
        Contents: contents,
        CreatedAt: new Date(utc).toISOString(),
        ModifiedAt: new Date(utc).toISOString(),
      },
    });

    return res.status(200).json({ newCommentId: newComment.Id });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.post('/deletecomment', async (req, res) => {
  console.log('/comment/deletecomment');
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).send('header가 없어요!');
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
    } catch (e) {
      return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다!');
    }
    const userClass = decodedToken.class;
    const userId = decodedToken.id;

    const { commentId } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      },
    });

    const comment = await prisma.comment.findUnique({
      where: {
        Id: commentId,
      },
    });

    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    } else if (userId !== comment.AuthorId) {
      return res.status(400).send('본인이 작성한 댓글이 아닙니다!');
    }

    const deletedComment = await prisma.comment.delete({
      where: {
        Id: commentId,
      },
    });

    return res.status(200).json({ isOk: true });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post('/getInfo', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).send('header가 없어요!');
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
      return res.status(200).json({ decodedToken: decodedToken });
    } catch (e) {
      return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다!');
    }
  } catch (e) {
    console.log(e);
  }
});

export default router;