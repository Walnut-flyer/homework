import { extend, localize } from 'vee-validate'
import { required, email, min, max, length, confirmed } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json' // 引入中文

extend('email', email)
extend('required', required)
extend('min', min)
extend('max', max)
extend('length', length)
extend('confirmed', confirmed)

localize('zh-CN', zh)
localize('zh_CN',
  {
    names: {
      email: '邮箱',
      password: '密码',
      name: '昵称',
      username: '账号',
      code: '验证码'
    },
    messages: {
      ...zh.messages,
      required: '请输入{_field_}',
      password: '不符合最小长度要求'
    },
    fields: {
      email: {
        required: '请输入账号',
        email: '请输入正确的{_field_}格式'

      },
      password: {
        required: '请输入{_field_}',
        min: '不符合最小长度要求'
      },
      code: {
        required: '请输入{_field_}',
        length: '验证码长度要求4'
      }
    }
  }
)
