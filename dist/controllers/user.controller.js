"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _userRepository = _interopRequireDefault(require("../repositories/user.repository.js"));

var _response = _interopRequireDefault(require("../utils/response.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//토큰발급
const createToken = id => {
  const payload = {
    userId: id
  };
  const secret = "youjin";
  const expiresin = 36000000;

  const token = _jsonwebtoken.default.sign(payload, secret, {
    expiresIn: expiresin
  });

  return token;
}; //비밀번호 암호화


const hash = async plainText => {
  const saltOrRounds = 10;
  return await _bcrypt.default.hash(plainText.toString(), saltOrRounds);
};

const signUp = async (req, res, next) => {
  //회원가입
  try {
    const user = await _userRepository.default.findByName(req.body.name);

    if (!user) {
      let params = {
        name: req.body.name,
        joinConfirm: 0
      };
      params.password = await hash(req.body.password);
      await _userRepository.default.store(params);
      return (0, _response.default)(res);
    } else {
      return (0, _response.default)(res, {
        msg: "이미 가입된 회원입니다."
      }, false);
    }
  } catch (e) {
    next(e);
  }
}; //로그인-토큰발급


const signIn = async (req, res, next) => {
  try {
    const user = await _userRepository.default.findByName(req.body.name);

    if (!user) {
      return (0, _response.default)(res, {
        msg: "사용자를 찾을 수 없습니다."
      }, false);
    } else {
      // 비밀번호 compare
      const userData = user.get({
        plain: true
      });
      const match = await _bcrypt.default.compare(req.body.password, userData.password);

      if (!match) {
        return (0, _response.default)(res, {
          msg: "비밀번호를 확인 해주세요."
        }, false);
      }

      const token = createToken(user.id);
      return (0, _response.default)(res, {
        data: {
          id: user.id,
          name: user.name,
          createdAt: user.createdAt,
          token: token
        }
      });
    }
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  //리스트조회
  try {
    let data;
    data = await _userRepository.default.all(req.query);

    if (!data) {
      return (0, _response.default)(res, {
        msg: "정보를 찾을 수 없습니다."
      }, false);
    }

    return (0, _response.default)(res, {
      data
    });
  } catch (e) {
    next(e);
  }
};

var _default = {
  signUp,
  signIn,
  getList
};
exports.default = _default;