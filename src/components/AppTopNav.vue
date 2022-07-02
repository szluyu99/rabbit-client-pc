<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="user.token">
          <li>
            <RouterLink to="/member/home">
              <i class="iconfont icon-user"></i>{{ user.account }}
            </RouterLink>
          </li>
          <li><a href="javascript:" @click="logout(this)">退出登录</a></li>
        </template>
        <template v-else>
          <li>
            <RouterLink to="/login">请先登录</RouterLink>
          </li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup name="AppTopNav">
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()

// 获取用户信息
const user = userStore.profile

const logout = async (instance) => {
  userStore.setUser({}) // 清空用户信息
  //TODO 清空购物车
  await router.push('/login') // 跳转到登录页面
  instance.$message({ type: 'success', text: '退出成功' })
}

</script>

<style scoped lang="less">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>