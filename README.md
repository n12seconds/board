# board
expressjs로 프로젝트 골격을 잡고 sequelize에 sqlite3 연동하여 구현했습니다.<br/>
ES6에 따라 import를 사용해 모듈을 불러왔는데, sequelize를 연동하는 과정에서 require문을 혼용해야 하는 상황이 발생해서 babel을 적용했습니다.<br/><br/>


## 구현방법
회원가입 후 로그인 하면 jwt토큰이 발급되고, 토큰은 회원 식별이 필요한 게시글 등록, 수정, 삭제 api 호출 시에만 사용됩니다.<br/>
나머지 api는 누구나 접근이 가능하고 회원식별이 필요한 api만 제한적 접근이 가능하기 때문에, 회원 식별이 필요한 api들의 url 형태를 localhost:3000/user/~ 형태로 통일하고 api호출 시 url 형태를 판독하는 미들웨어를 추가하여 localhost:3000/user/~ 형태일 경우에만 본인회원이 맞는지 판별하도록 했습니다.<br/><br/>


## 실행방법
```
npm run build
npm start
```
<br/>

## api 명세와 호출 방법
아래 api문서 링크로 대체합니다.
https://documenter.getpostman.com/view/8136495/UV5XhH4e<br/>   
![Animation](https://user-images.githubusercontent.com/42341135/137855072-378ca89b-301b-44f3-bd60-f75bead00c71.gif)

<br/>

## 프로젝트 구조
```
├── README.md
├── node_modules
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│   │    └── style.css
├── src
│   ├── bin
│   │    └── www.js
│   ├── controllers
│   │    └── post.controller.js
│   │    └── user.controller.js
│   ├── middleware
│   │    └── jwt.middleware.js
│   ├── models
│   │    └── index.js
│   │    └── post.model.js
│   │    └── user.model.js
│   ├── repositories
│   │    └── post.reporitory.js
│   │    └── user.repository.js
│   ├── routes
│   │    └── index.js
│   ├── utils
│   │    └── response.js
│   └── app.js
└── package.json.lock
```
<br/>

## db구조
db는 회원(User) 테이블이 있고 회원pk를 외래키로 가지는 게시판(Post) 테이블이 있습니다.  회원 테이블은 id(pk), name, password, createdAt, updatedAt, deletedAt 칼럼으로 이루어져 있고 게시판 테이블은 id, userId(author pk), title, contents, createdAt, updatedAt, deletedAt 칼럼으로 이루어져 있습니다. 






