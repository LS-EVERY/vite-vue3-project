import Axios from "axios";
import { ElMessage } from "element-plus";

const BASE_URL =
  process.env.NODE_ENV === "production" ? "http:xxx.xxxxx.xxx" : "/api";

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: 20000 // 请求超时20s
});

// 请求拦截 request
axios.interceptors.request.use(config => {
  const token = "";
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

// 响应拦截 response
axios.interceptors.response.use(
  response => {
    let token = localStorage.getItem("Authorization");
    let { code, msg } = response.data;
    switch (code) {
      case 400:
        return ElMessage.error({
          message: msg || "请求参数错误",
          type: "error"
        });
      case 401:
        if (token) {
          localStorage.clear();
          let timer = setTimeout(() => {
            clearTimeout(timer);
            window.location.href = "/login";
          }, 1000);
        }
        return ElMessage.error({
          message: msg || "用户token失效，请重新登录",
          type: "error"
        });
      case 403:
        return ElMessage.error(msg || "服务器拒绝本次访问");
      case 404:
        return ElMessage.error(msg || "请求资源未找到");
      case 500:
        return ElMessage.error({
          message: msg || "内部服务器错误",
          type: "error"
        });
      case 501:
        return ElMessage.error({
          message: msg || "服务器不支持该请求中使用的方法",
          type: "error"
        });
      case 502:
        return ElMessage.error({
          message: msg || "网关错误",
          type: "error"
        });
      case 504:
        return ElMessage.error({
          message: msg || "网关超时",
          type: "error"
        });
      default:
        break;
    }
    return response.data;
  },
  error => errorHandle(error)
);

function errorHandle(error: any) {
  if (error.response && error.response.data) {
    const code = error.response.status;
    const msg = error.response.data.message;
    ElMessage.error(`Code: ${code}, Message: ${msg}`);
    console.error(`[Axios Error]`, error.response);
  } else {
    ElMessage.error(`${error}`);
  }
  return Promise.reject(error);
}

export default axios;
