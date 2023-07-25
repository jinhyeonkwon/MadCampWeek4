import express from "express";
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const router = express.Router();

// 요청

// 로그인 엔드포인트
router.post('/login', async (req, res) => {
  const { userid, password } = req.body;
 
  try {
    const user = await prisma.user.findUnique({
       where:{
          UserId:userid,
       }
    })
    const isPasswordCorrect = user && await bcrypt.compare(password, user.Password);
    if (isPasswordCorrect) { 
     const token =  jwt.sign({  name: user.Name, email:user.Email,class:user.Class, id:user.Id }, process.env.SECRET_KEY, { expiresIn: '1h' });
     console.log('로그인 성공: ', {  userid});
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


export default router;