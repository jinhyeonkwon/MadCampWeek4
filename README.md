# 몰입캠프 4주차 : 분반 사람들과 함께 공통 질문에 답하는 웹 사이트 만들기

### Collaborators
|  Name  |                     GitHub ID                     |          소속           |
| :----: | :-----------------------------------------------: | :---------------------: |
| 권진현 |  [jinhyeonkwon](https://github.com/jinhyeonkwon)  |    카이스트 전산학부    |
| 김민희 | [heeemin](https://github.com/heeemin) | 숙명여대 IT공학과 |

### 프로젝트 소개
몰입캠프 일정이 끝나가고 있습니다. 질문을 통해 4주간의 추억을 돌아보고, 분반 사람들과 생각을 나눠보아요!
![main](https://github.com/jinhyeonkwon/MadCampWeek4/assets/101591389/03adb47c-14f7-41f0-8219-476ad0d47533)
![Uploading signup.png…]()

<기능 목록>
- 로그인 및 회원가입 (몰입캠프 참가자 인증)
  
- 주제 선택
- 질문에 댓글 추가 및 삭제
- 기본 질문 외에 새로운 질문 추가 및 삭제

### 환경 설정 (Linux 기준)
- Node.js v18.12를 사용합니다.
- 서버에 이 repository를 clone합니다.
- Postgres DB 서버를 설정합니다.
  - 로컬에서는 .docker 폴더에서 `.env.example`을 복사하여 `.env`를 만들고 내용을 채운 후 `make run-dev`로 DB 컨테이너를 만들 수 있습니다. (docker 설치 필요, 컨테이너 삭제는 `make stop-dev`)
- server 폴더에  있는 `.env.example`을 복사하여 `.env.development` 와 `.env.production`을 생성하고, 내용을 채워넣습니다. 각각 개발 환경과 배포용입니다.
  - EXPRESS_PORT : 백엔드 서버를 띄울 포트
  - REACT_URL : API 통신을 허용할 프론트엔드 URL에서 http://을 제외한 부분
  - DATABASE_URL : DB 서버의 URL
  - SECRET_KEY : jwt token 검증에 쓸 key
- client 폴더에 있는 `.env.example`을 복사하여 `.env`를 만들고 API URL을 채워넣습니다.
- server 폴더에서 `npm run prisma:migrate-dev`로 DB migration을 합니다.
- prisma 폴더의 `seed.js.example`을 복사하여 `seed.js`를 만들고, 유저 인증 정보와 기본 질문을 입력한 후 server 폴더에서 `npm run prisma:seed`로 seed를 합니다.
- 최상위 폴더에서 `yarn dev`로 로컬 환경에서의 실행이 가능합니다.
- server 폴더에서 `yarn production`, client 폴더에서 `yarn build`로 배포 환경 테스트가 가능합니다.
- pm2를 이용한 배포 시 다음 과정을 거칩니다.
  - client 폴더에서 `yarn build` 후 `pm2 serve dist (포트)`
  - server 폴더에서 `pm2 start yarn --production`
