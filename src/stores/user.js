import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  persist: true, // 持久化存储
  state: () =>  ({
    // 用户信息
    profile: {
      id: "", //用户id
      avatar: "", //用户头像
      nickname: "", //用户你猜
      account: "", //用户账号
      mobile: "", //用户手机号
      token: "" //用户登录令牌
    },
    // 重定向地址
    redirectURL: ""
  }),
  actions: {
    setUser(profile = {}) {
      this.profile = profile;
    },
    setToken(token = "") {
      this.profile.token = token;
    },
    // 设置重定向地址
    setRedirectURL(url) {
      this.redirectURL = url
    }
  }
});
