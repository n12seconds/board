const httpStatus = require("http-status");

export default (res, data, boolean, code = httpStatus.OK) => {
  let response = {
    result: false,
  };

  if(boolean==undefined){
    response.result=true;
  }
  if (code > 399) {
    response.result = false;
  }

  if (typeof data === "object") {
    response = Object.assign(data, response);
  }

  return res.status(code).json(response);
};
