"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _postController = _interopRequireDefault(require("../controllers/post.controller.js"));

var _userController = _interopRequireDefault(require("../controllers/user.controller.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();
/* 회원 */


router.route("/signUp").post(_userController.default.signUp); //회원가입

router.route("/signIn").post(_userController.default.signIn); //로그인

router.route("/userList").get(_userController.default.getList); //회원리스트 조회

/* 아이템 */

router.route("/postList").get(_postController.default.getList); //게시글 리스트 조회

router.route("/post/:id").get(_postController.default.getOne); //게시글 단건 조회

router.route("/user/post").post(_postController.default.post); //게시글 등록

router.route("/user/post/:id").put(_postController.default.put); //게시글 수정

router.route("/user/post/:id").delete(_postController.default.del); //게시글 삭제

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
var _default = router;
exports.default = _default;