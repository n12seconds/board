"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _userRepository = _interopRequireDefault(require("../repositories/user.repository.js"));

var _response = _interopRequireDefault(require("../utils/response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async (req, res, next) => {
  try {
    console.log(req.url);
    let url = req.url.slice(0, 6);

    if (url == "/user/") {
      if (req.headers.authorization) {
        let id;
        const secret = "youjin";

        _jsonwebtoken.default.verify(req.headers.authorization.split(" ")[1], secret, (err, payload) => {
          if (err) {
            return (0, _response.default)(res, {
              msg: "토큰 정보가 유효하지 않습니다."
            }, false);
          }

          id = payload.userId;
        });

        const user = await _userRepository.default.findByPk(id);

        if (!user) {
          return (0, _response.default)(res, {
            msg: "사용자를 찾을 수 없습니다."
          }, false);
        }

        req.user = user;
      } else {
        return (0, _response.default)(res, {
          msg: "접근 권한이 없습니다."
        }, false);
      }
    }

    next();
  } catch (e) {
    next(e);
  }
};

exports.default = _default;