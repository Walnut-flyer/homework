<template>
  <div id="app">
    <div class="layui-container">
      <validation-observer>
        <form class="layui-form layui-form-pane"
              action="">
          <div class="layui-form-item">
            <label class="layui-form-label">用户名</label>
            <validation-provider name="email"
                                 rules="required|email"
                                 v-slot="{errors}">
              <div class="layui-input-inline">
                <input type="text"
                       v-model.trim="username"
                       placeholder="请输入用户名"
                       autocomplete="off"
                       class="layui-input" />
              </div>
              <div class="error layui-form-mid">{{errors[0]}}</div>
            </validation-provider>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">密码</label>
            <validation-provider name="password"
                                 rules="required|min:6"
                                 v-slot="{errors}">
              <div class="layui-input-inline">
                <input type="password"
                       v-model.trim="password"
                       placeholder='请输入密码'
                       autocomplete="off"
                       class="layui-input" />
              </div>
              <div class="error layui-form-mid">{{errors[0]}}</div>
            </validation-provider>
          </div>
          <div class="layui-form-item">
            <validation-provider name="code"
                                 rules="required|length: 4"
                                 v-slot="{errors}">
              <label class="layui-form-label">输入验证码</label>
              <div class="layui-input-inline">
                <input type="text"
                       name="title"
                       v-model.trim="code"
                       placeholder="请输入验证码"
                       autocomplete="off"
                       class="layui-input" />
              </div>
              <div class="error layui-form-mid">{{errors[0]}}</div>
              <div class="layui-form-mid svg"
                   v-html="svg">
              </div>
            </validation-provider>
          </div>
          <button type="button"
                  class="layui-btn"
                  @click="checkForm">
            点击登录
          </button>
          <a href="http://www.layui.com"
             class="imooc-link">
            忘记密码
          </a>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'app',
  data () {
    return {
      svg: '',
      email: '',
      password: '',
      code: '',
      username: '',
      errorMsg: []
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    getCaptcha () {
      axios.get('http://localhost:3000/getCaptcha').then((res) => {
        if (res.status === 200) {
          const obj = res.data
          if (obj.code === 200) {
            this.svg = obj.data
          }
        }
      })
    },
    checkForm () {
      this.errorMsg = []
      if (!this.name) {
        this.errorMsg.push('登录名为空！')
      }
      if (!this.password) {
        this.errorMsg.push('密码不得为空')
      }
      if (!this.code) {
        this.errorMsg.push('验证码为空')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  background: #f2f2f2;
}
.layui-container {
  background: #fff;
}
input {
  width: 190px;
}
.imooc-link {
  margin-left: 10px;
  &:hover {
    color: #009688;
  }
}
.svg {
  position: relative;
  top: -15px;
}
.error {
  color: red;
}
</style>
