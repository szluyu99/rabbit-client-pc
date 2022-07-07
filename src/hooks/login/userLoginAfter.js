import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import Message from "@/components/library/Message";

export default function userLoginAfter() {
    const router = useRouter()
    const route = useRoute()
    const userStore = useUserStore()

    // 登录成功
    const loginSuccessFn = async ({ result }) => {
        console.log('登录成功', result);
        userStore.setUser({
            id: result.id, // 用户id
            avatar: result.avatar, // 用户头像
            nickname: result.nickname, // 用户昵称
            account: result.account, // 用户账号
            mobile: result.mobile, // 用户手机号
            token: result.token, // 用户登录令牌
        })
        // 获取目标地址
        const redirectURL = route.query.redirectURL || userStore.redirectURL

        // 跳转到目标地址 如果没有目标地址就跳转到首页
        await router.push(redirectURL || "/")
        //TODO 登录成功提示信息
        Message({ type: "success", text: "登录成功" })

        //TODO 合并购物车
        //TODO 将服务端购物车数据同步到本地
    }

    // 登录失败
    const loginFailedFn = error => {
        console.log('登录失败', error);
        // const msg = error.err.response.data.message
        Message({ type: "error", text: error })
    }

    return { loginSuccessFn, loginFailedFn }
};
