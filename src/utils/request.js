/**
 * @request 封装axios请求
 */

import axios from "axios";
import { BASE_URL } from "./url";
import { useUserStore } from "@/stores/user";
import router from "@/router";
import Message from "@/components/library/Message";

// axio 实例
const instance = axios.create({
  // 基地址
  baseURL: BASE_URL,
  // 超时时间
  timeout: 3000
});

/**
 * 使用axios实例发起请求
 * @param {*} options 请求实例配置项
 * @returns {Promise} 请求结果
 */
const baseRequest = options => {
  // 判断是否需要携带 token
  if (options.withToken) {
    const userStore = useUserStore()
    // 添加 鉴权 token
    options.headers = {
      Authorization: `Bearer ${userStore.profile.token}`
    };
  }

  // 返回实例请求结果
  return instance(options)
    .then(res => {
      // console.log(res);
      // console.log("options", options);
      const data = res.data || {};
      // 请求失败（http 请求的状态码判断）
      if (res.status !== 201 && res.status !== 200) {
        // 请求失败，在这里集中处理
        // Message({type: 'error', text: 'HTTP 请求发送失败，请检查网络！'})
        return Promise.reject({ res, data });
      }
      // 请求成功
      if (res.status === 200 || res.status === 201) {
        // 401 代表 token 出问题
        if ({ 400: 1, 401: 1 }[data.status]) {
          // 移除 token
          userStore.setToken("");
          router.push("/login").then(() => {});
          return Promise.reject(data);
        }
        // 返回获取数据
        return Promise.resolve(data);
      }
    })
    .catch(err => {
      // 这里捕获的 err
      // 如果是 instance(options) 中 reject 触发，则 err 是 instance(options) 中 reject 的 err
      // 如果是 Promise.reject({ res, data }) 中 rejiect 触发，则 err 是 { res, data }
      return Promise.reject({ msg: "请求失败", err });
    });
};

// 封装 请求方法
const request = ["post", "put", "patch", "delete"].reduce((request, method) => {
  /**
   * @param {string} url 请求地址
   * @param {object} data 请求数据
   * @param {object} option axios 配置项
   */
  request[method] = (url, data = {}, options = {}) => {
    // 调用 axios 实例
    return baseRequest(Object.assign({ method, url, data }, options));
  };
  return request;
}, {});

["get", "head"].forEach(method => {
    /**
     * 
     * @param {string} url 请求地址
     * @param {object} params get 请求参数
     * @param {object} options axios 配置项
     */
    request[method] = (url, params = {}, options = {}) => {
        return baseRequest(Object.assign({ url, params, method}, options));
    }
})

export default request;