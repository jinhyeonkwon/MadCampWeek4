import express from "express";
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const router = express.Router();

// 요청
router.post('/getcomments', async (req, res) => {
  console.log('/comment/getcomments');
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
    }
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userClass = decodedToken.class;
    const userId = decodedToken.id;

    const { questionId } = res.body;

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      }
    });

    const question = await prisma.question.findUnique(
      {
        where: {
          Id: questionId,
        }
      }
    )

    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    } else if (userClass !== question.Class) {
      return res.status(400).send('질문 아이디와 분반이 맞지 않습니다!');
    }

    const commentList = prisma.comment.findMany(
      {
        where: {
          QuestionId: questionId,
        }
      }
    );

    return res.status(200).json({ commentList: commentList });

  }
  catch (e) {
    res.status(500).json({error : e});
  }
});

router.post('/createcomments', async (req, res) => {
  console.log('/comment/createcomments');
  const curr = new Date();
  const utc = curr.getTime() + 9*60*60*1000; // 한국 시간대 맞추려고..
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
    }
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userClass = decodedToken.class;
    const userId = decodedToken.id;

    const { questionId, contents } = res.body;

    const user = await prisma.user.findUnique({
      where: {
        Id: userId,
      }
    });

    const question = await prisma.question.findUnique(
      {
        where: {
          Id: questionId,
        }
      }
    )

    if (user.Class !== userClass) {
      return res.status(400).send('유저 아이디와 분반이 맞지 않습니다!');
    } else if (userClass !== question.Class) {
      return res.status(400).send('질문 아이디와 분반이 맞지 않습니다!');
    }

    const newComment = await prisma.comment.create({
      data: {
        QuestionId: questionId,
        AuthorId: userId,
        Contents: contents,
        CreatedAt: new Date(utc).toISOString(),
        ModifiedAt: new Date(utc).toISOString(),
      },
    });

    return res.status(200).json({newCommentId: newComment.Id});
    
  }
  catch (e) {
    res.status(500).json({error : e});
  }
});


export default router;