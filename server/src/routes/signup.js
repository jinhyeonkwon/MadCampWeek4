import express from "express";
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

const router = express.Router();

// 요청
router.post('/', async (req, res) => {
  const { name, email, password,userid,userclass} = req.body; // 요청으로부터 사용자 데이터 받기
 //비밀번호 해시
 const saltRounds = 10;
 const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
     //중복 체크
     const duplication =  await prisma.user.findUnique({
        where: {
          UserId:userid,
        },
       });
       if(duplication){
        return res.status(400).json({message:"이미 가입된 사용자입니다."})
       }
    const user = await prisma.user.create(
     // 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id',
     // [name, email, hashedPassword]
     {
        data:{
           Name:name,
           Email:email,
           Password:hashedPassword,
           UserId:userid,
           Class:parseInt(userclass),
        }
     }
    );

 
    // 토큰 생성
    const token = jwt.sign({ id:user.Id,name:user.Name,email:user.Email,class:user.Class}, process.env.SECRET_KEY, {
     expiresIn: '12h',})
    console.log('회원가입 성공: ', { name, email, password });
    res.status(200).json({ token }); // 토큰 전달
  } catch (error) {
    console.error('회원가입 실패: ', error);
    res.status(500).send();
  }

 }

);

router.post('/verify', async (req, res) => {
  try {
    console.log("렉바디"+req.body);
    const email = req.body.email;
    const name = req.body.name;
    const userClass = req.body.userClass;
 
    const user = await prisma.verify.findUnique({
     where: {
       Email:email,
     },
    });
    const already_user = await prisma.user.findUnique({
     where: {
       Email:email,
     },
    });
    if(user && already_user){
       res.json({match:false,message:"이미 등록된 사용자 입니다."})
    }
    if (user && user.Name === name && user.Class === parseInt(userClass)) {
     res.json({ match: true,message:"몰입 캠프 사용자 인증에 성공하였습니다." });
     
    } else {
     res.json({ match: false,message:"몰입 캠프 사용자가 아닙니다." });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
 });

export default router;