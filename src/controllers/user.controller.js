import createError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepo from "../repositories/user.repository.js";
import response from "../utils/response.js";

//토큰발급
const createToken = (id) => {
  const payload = {
    userId: id,
  };
  const secret = "youjin";
  const expiresin = 36000000;
  const token = jwt.sign(payload, secret, {
    expiresIn: expiresin,
  });
  return token;
};

//비밀번호 암호화
const hash = async (plainText) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(plainText.toString(), saltOrRounds);
};

const signUp = async (req, res, next) => {
  //회원가입
  try {
    const user = await userRepo.findByName(req.body.name);
    if (!user) {
      let params = {
        name: req.body.name,
        joinConfirm:0
      };
      params.password = await hash(req.body.password);

      await userRepo.store(params);
      return response(res);
    } else {
      return response(res, { msg: "이미 가입된 회원입니다." }, false);
    }
  } catch (e) {
    next(e);
  }
};


//로그인-토큰발급
const signIn = async (req, res, next) => {
  try {  
    const user = await userRepo.findByName(req.body.name);

    if (!user) {
      return response(res, { msg: "사용자를 찾을 수 없습니다." }, false);
    }else{
      // 비밀번호 compare
      const userData = user.get({ plain: true });

      const match = await bcrypt.compare(req.body.password, userData.password);
      if (!match) {
        return response(res, { msg: "비밀번호를 확인 해주세요." }, false);
      }
      const token = createToken(user.id);

      return response(res, {
        data: {
          id: user.id,
          name: user.name,
          createdAt: user.createdAt,
          token: token,
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
    data = await userRepo.all(req.query);
    if (!data) {
      return response(res, { msg: "정보를 찾을 수 없습니다." }, false);
    }
    return response(res, { data });
  } catch (e) {
    next(e);
  }
};

export default { signUp, signIn, getList};
