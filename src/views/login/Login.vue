<template>
  <div class="flex jcc box_login">
    <el-card shadow="always" style="width:50%">
      <template #header>
        <div class="font-s-18 font-w-7 t-a-c">小米Lite</div>
      </template>
      <div class="title t-a-c">欢迎来到小米Lite后台管理系统</div>
      <el-form
        :model="from"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="from.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="from.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" class="width-100">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import api from '../../http/api'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
interface From {
  username: string,
  password: string
}
// 定义数据
let router = useRouter()
let from = ref<From>({
  username: '',
  password: ''
})
let ruleForm = ref<any>(null)

let rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 3,
      max: 6,
      message: '长度在 3 到 6 个字符',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 3,
      max: 6,
      message: '长度在 3 到 6 个字符',
      trigger: 'blur',
    },
  ]
}

// 方法
let submitForm = () => {
  ruleForm.value!.validate((valid: boolean) => {
    if (valid) {
      api.login(from.value).then((res: any) => {
        if (res.code === 200) {
          localStorage.setItem('token', res.token)
          localStorage.setItem('pcUser_xm', JSON.stringify(res.data))
          ElMessage.success(res.msg)
          router.push("/")
        }
      })
    }
  })
  // console.log(from.value)
}

</script>

<style lang="scss" scoped>
.box_login {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  .box_login {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
  .title {
    margin-bottom: 25px;
  }
}
</style>