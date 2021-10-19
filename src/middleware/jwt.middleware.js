import jwt from "jsonwebtoken";
import userRepo from "../repositories/user.repository.js";
import response from "../utils/response";

export default async (req, res, next) => {
  try {
    console.log(req.url);
    let url = req.url.slice(0, 6);
    if (url == "/user/") {
      if (req.headers.authorization) {
        let id;
        const secret = "youjin";
        jwt.verify(
          req.headers.authorization.split(" ")[1],
          secret,
          (err, payload) => {
            if (err) {
              return response(
                res,
                { msg: "토큰 정보가 유효하지 않습니다." },
                false
              );
            }

            id = payload.userId;
          }
        );

        const user = await userRepo.findByPk(id);

        if (!user) {
          return response(res, { msg: "사용자를 찾을 수 없습니다." }, false);
        }       

        req.user = user;
      } else {
        return response(res, { msg: "접근 권한이 없습니다." }, false);
      }
    }

    next();
  } catch (e) {
    next(e);
  }
};
