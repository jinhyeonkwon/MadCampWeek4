import express from "express";
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const router = express.Router();

// 요청

// 로그인 엔드포인트
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await prisma.user.findUnique({
        where:{
          email,
        }
    })
    const isPasswordCorrect = user && await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) { 
      const token =  jwt.sign({  name: user.name, email:user.email }, SECRET_KEY, { expiresIn: '1h' });
      console.log('로그인 성공: ', { id: user.id, email });
      res.status(200).json({ token });
    } else {
      console.error('로그인 실패: 없거나 잘못된 사용자 아이디/비밀번호입니다.');
      res.status(403).send('잘못된 사용자 아이디나 비밀번호입니다.');
    }
  } catch (error) {
    console.error('로그인 실패: ', error);
    res.status(500).send();
  }
  });

router.get('/debug', async(req, res) => {
  res.status(200).send('Home router!');
})

export default router;