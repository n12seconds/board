import postRepo from "../repositories/post.repository.js";
import response from "../utils/response.js";

const post = async (req, res, next) => {
  //게시글 등록
  try {
    let params = {
      userId: req.user.id,
      title: req.body.title,
      contents: req.body.contents,
    };

    await postRepo.store(params);
    return response(res);
   
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
      contents: req.body.contents,
    };
    const post = await postRepo.findByPk(req.params.id);
    if (!post || (post && post[0] == 0)) {
      return response(res, { msg: "정보를 찾을 수 없습니다." }, false);
    }else{
      const postData = post.get({ plain: true });
      if(postData.userId!=req.user.id){
        return response(res, { msg: "수정 권한이 없습니다." }, false);
      }else{
        await postRepo.update(req.params.id,params);
        return response(res);
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
    const post = await postRepo.findByPk(req.params.id);
    if (post[0] == 0) {
      return response(res, { msg: "정보를 찾을 수 없습니다." }, false);
    } else {     
      const postData = post.get({ plain: true });
      if(postData.userId!=req.user.id){
        return response(res, { msg: "수정 권한이 없습니다." }, false);
      }else{
        await post.destroy();
        return response(res);
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
    data = await postRepo.findAndCountAll(req.query);
    if (!data) {
      return response(res, { msg: "정보를 찾을 수 없습니다." }, false);
    }
    return response(res, { data });
  } catch (e) {
    next(e);
  }
};

const getOne = async (req, res, next) => {
  //단건조회
  try {
    let data;
    data = await postRepo.findByPk(req.params.id);
    if (!data) {
      return response(res, { msg: "정보를 찾을 수 없습니다." }, false);
    }
    return response(res, { data });
  } catch (e) {
    next(e);
  }
};


export default {
  post,
  put,
  del,
  getList,
  getOne
};
