import express from "express";
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;
const router = express.Router();

// 요청
router.post('/getquestions', async (req, res) => {
  console.log('/question/getquestions');
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
    }
    let decodedToken; try { decodedToken = jwt.verify(token, SECRET_KEY); } catch (e) { return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다!') }
    const userClass = decodedToken.class;
    const userId = decodedToken.id;

    const { themeId } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      }
    });
    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    }

    const questionList = prisma.question.findMany(
      {
        where: {
          Class: userClass,
          ThemeId: themeId,
        }
      }
    );

    return res.status(200).json({ questionList: questionList });

  }
  catch (e) {
    res.status(500).json({error : e});
  }
});

router.post('/createquestions', async (req, res) => {
  console.log('/question/createquestions');
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
    }
    let decodedToken; try { decodedToken = jwt.verify(token, SECRET_KEY); } catch (e) { return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다!') }
    const userClass = decodedToken.class;
    const userId = decodedToken.id;

    const { themeId, contents } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      }
    });

    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    }

    const newQuestion = await prisma.question.create({
      data: {
        ThemeId: themeId,
        Contents: contents,
        Class: userClass,
        AuthorId: userId,
      }
    })
    

    return res.status(200).json({isOk : true});
    
  }
  catch (e) {
    res.status(500).json({error : e});
  }
});
  
router.post('/deletequestions', async (req, res) => {
  console.log('/question/deletequestions');
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
    }
    let decodedToken; try { decodedToken = jwt.verify(token, SECRET_KEY); } catch (e) { return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다!') }
    const userClass = decodedToken.class;
    const userId = decodedToken.id;

    const { questionId } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      }
    });

    const question = await prisma.question.findUnique({
      where: {
        Id: questionId,
      }
    })

    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    } else if (userId !== question.AuthorId) {
      return res.status(400).send('본인이 작성한 질문이 아닙니다!');
    }

    const deletedQuestion = await prisma.question.delete({
      where: {
        Id: questionId,
      },
    });

    return res.status(200).json({newQuestionId: newQuestion.Id});
    
  }
  catch (e) {
    res.status(500).json({error : e});
  }
});



export default router;