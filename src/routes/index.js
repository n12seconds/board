import express from "express";

import Post from "../controllers/post.controller.js";
import User from "../controllers/user.controller.js";

const router = express.Router();

/* 회원 */
router.route("/signUp").post(User.signUp); //회원가입
router.route("/signIn").post(User.signIn); //로그인
router.route("/userList").get(User.getList); //회원리스트 조회

/* 아이템 */
router.route("/postList").get(Post.getList); //게시글 리스트 조회
router.route("/post/:id").get(Post.getOne); //게시글 단건 조회
router.route("/user/post").post(Post.post); //게시글 등록
router.route("/user/post/:id").put(Post.put); //게시글 수정
router.route("/user/post/:id").delete(Post.del); //게시글 삭제

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });


export default router;
