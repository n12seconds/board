"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _postRepository = _interopRequireDefault(require("../repositories/post.repository.js"));

var _response = _interopRequireDefault(require("../utils/response.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const post = async (req, res, next) => {
  //게시글 등록
  try {
    let params = {
      userId: req.user.id,
      title: req.body.title,
      contents: req.body.contents
    };
    await _postRepository.default.store(params);
    return (0, _response.default)(res);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const put = async (req, res, next) => {
  //게시글 수정
  try {
    let params = {
      title: req.body.title,
      contents: req.body.contents
    };
    const post = await _postRepository.default.findByPk(req.params.id);

    if (!post || post && post[0] == 0) {
      return (0, _response.default)(res, {
        msg: "정보를 찾을 수 없습니다."
      }, false);
    } else {
      const postData = post.get({
        plain: true
      });

      if (postData.userId != req.user.id) {
        return (0, _response.default)(res, {
          msg: "수정 권한이 없습니다."
        }, false);
      } else {
        await _postRepository.default.update(req.params.id, params);
        return (0, _response.default)(res);
      }
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const del = async (req, res, next) => {
  //게시글 삭제
  try {
    const post = await _postRepository.default.findByPk(req.params.id);

    if (post[0] == 0) {
      return (0, _response.default)(res, {
        msg: "정보를 찾을 수 없습니다."
      }, false);
    } else {
      const postData = post.get({
        plain: true
      });

      if (postData.userId != req.user.id) {
        return (0, _response.default)(res, {
          msg: "수정 권한이 없습니다."
        }, false);
      } else {
        await post.destroy();
        return (0, _response.default)(res);
      }
    }
  } catch (e) {
    next(e);
  }
};

const getList = async (req, res, next) => {
  //리스트조회
  try {
    let data;
    data = await _postRepository.default.findAndCountAll(req.query);

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

const getOne = async (req, res, next) => {
  //단건조회
  try {
    let data;
    data = await _postRepository.default.findByPk(req.params.id);

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
  post,
  put,
  del,
  getList,
  getOne
};
exports.default = _default;