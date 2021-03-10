<!-- 登陆界面 -->
<template>
  <div class="wrapper">
    <div class="wrap" :style="{ backgroundImage: `url(\'${require('@/assets/img/login/bg.png')}\')` }">
      <div class="loginBox" :style="{ backgroundImage: `url(\'${require('@/assets/img/login/bg_center.png')}\')` }">
        <!-- 左侧部分 -->
        <div class="loginLeft">
          <p>{{ this.systemName }}</p>
          <p class="secondP mar-top-5">Intelligent Control System</p>
          <p>Copyright © {{ this.systemName }} 2021</p>
        </div>

        <!-- 登陆账号填写部分 -->
        <div class="loginRight">
          <p class="firstP">用户登录</p>
          <p class="secondP mar-top-5">USER LOGIN</p>
          <p class="lineP mar-top-5"></p>

          <!-- 表单 -->
          <div class="formBox">
            <form method="post">
              <!-- 用户名 -->
              <section class="row">
                <div unless="${openIdLocalId}" class="usernameBox">
                  <img :src="require('@/assets/img/login/username.png')" alt="" />
                  <input
                    class="required"
                    id="username"
                    autocomplete="off"
                    :maxlength="20"
                    placeholder="请输入用户名"
                    v-model="loginForm.username"
                  />
                </div>
              </section>
              <p></p>

              <!-- 密码框 -->
              <section class="row">
                <div class="passwordBox">
                  <img :src="require('@/assets/img/login/password.png')" alt="" />
                  <input
                    class="required"
                    type="password"
                    id="password"
                    :maxlength="16"
                    placeholder="请输入密码"
                    v-model="loginForm.password"
                  />
                </div>
              </section>
              <p></p>

              <!-- 验证码 -->
              <section class="row">
                <div class="codeBox">
                  <img src="@/assets/img/login/password.png" alt="" />
                  <input
                    class="required"
                    type="text"
                    id="captcha"
                    :maxlength="16"
                    placeholder="请输入验证码"
                    v-model="loginForm.captcha"
                  />
                  <div class="code-img" @click="initCodeImg()">
                    <img :src="codeImage" alt="" />
                  </div>
                </div>
              </section>
              <p style="padding-top: 2px"></p>

              <!-- 登陆按钮 -->
              <section>
                <input
                  class="btn btn-submit btn-block"
                  id="button"
                  value="立即登录"
                  type="button"
                  @click="submitLogin()"
                />
              </section>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import { PageEnum } from '@/enum/pageEnum'
  import { isEmptyValue } from '@/utils/tools/Is'
  import { hookMessage } from '@/hooks/antd/hookMessage'
  import router from '@/router'
  // import md5 from 'js-md5'

  export default {
    data() {
      return {
        loginForm: {
          username: null,
          password: null,
          captcha: null,
        },
        codeImage: null,
        uuidTime: 0,
        modalVisible: false,
        roleList: [], // 登录用户的角色集合
        roleValue: null, // 登录用户当前角色
        systemName: null,
      }
    },
    created() {
      // 获取系统名称常量
      this.systemName = window.SYS_NAME.replace('/', '')

      //判断是否有token 如果有则直接去首页
      let token = Cookies.get('token') || null
      if (token) {
        this.$router.replace({ name: 'home' })
      }
    },
    mounted() {
      // this.initCodeImg() // 加载验证码
    },
    methods: {
      keyLogig(e) {
        e.keyCode === 13 ? this.submitLogin() : null
      },

      /**
       * 加载验证码
       */
      initCodeImg() {
        this.uuidTime = new Date().getTime()
        this.codeImage = window.config.baseUrl + '/verify/generate-image?verifyId=' + this.uuidTime
      },

      /**
       * 系统登陆
       */
      submitLogin() {
        const { Message } = hookMessage()
        if (isEmptyValue(this.loginForm.username)) {
          Message.error('请输入任意用户名')
          return
        }

        if (isEmptyValue(this.loginForm.password)) {
          Message.error('请输入任意登录密码')
          return
        }

        // if (isEmptyValue(this.loginForm.captcha)) {
        //   Message.error('请输入任意验证码')
        //   return
        // }

        // 登录接口服务
        this.$ModuleApis.base
          .userLogin({
            data: {
              username: this.loginForm.username,
              // password: this.$md5(this.loginForm.password),
              password: this.loginForm.password,
              verifyCode: this.loginForm.captcha, // 图片验证
              verifyId: this.uuidTime, // 验证ID
              client: 0, // 客户端类型
              uuid: this.uuidTime, // UUID 访问Key
            },
          })
          .then(res => {
            if (res.success) {
              const { data } = res
              Cookies.set('token', data.token, { expires: 100 }) // 保存系统登录 token
              Cookies.set('userInfo', data.userInfo, { expires: 100 }) // 存储用户资料

              router.push({ name: PageEnum.BASE_HOME_NAME })
            } else {
              this.loginForm.captcha = null
              this.initCodeImg()
            }
          })
      },
    },
  }
</script>

<style lang="scss" scope>
  @import './login.scss';
</style>
