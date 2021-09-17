<template>
  <div class="header flex jcsb p-lr-10">
    <div class="flex">
      <div @click="toggle" class="mr-10">
        <el-icon-expand v-if="isCollapse"></el-icon-expand>
        <el-icon-fold v-else></el-icon-fold>
      </div>
      <div>
        <iframe
          width="200"
          height="24"
          frameborder="0"
          scrolling="no"
          hspace="0"
          src="https://i.tianqi.com/?c=code&id=11"
        ></iframe>
      </div>
    </div>
    <div class="flex">
      <div class="m-lr-10 flex shou" v-if="user">
        <el-popconfirm title="确定退出登录？" @confirm="logout">
          <template #reference>
            <div>
              <img :src="user.avatar" v-if="user.avatar" alt class="u-img" />
              <div class="m-l-10">{{ user.username }}</div>
            </div>
          </template>
        </el-popconfirm>
      </div>

      <div class="m-l-10">
        <el-dropdown>
          <span class="el-dropdown-link langs">
            {{ lan }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="click('zh-CN', '简体中文')">简体中文</el-dropdown-item>
              <el-dropdown-item @click="click('zh-TW', '繁体中文')">繁体中文</el-dropdown-item>
              <el-dropdown-item @click="click('en-US', 'English')">English</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { locale } = useI18n()

import { User } from '../../types/index'
import { useRouter } from 'vue-router'

// 接收参数
let props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})
// 分发事件 修改传递参数
let emits = defineEmits(['update:isCollapse'])

// 定义数据
let lan = ref('中文')
let user = ref<User | null>(JSON.parse(localStorage.getItem('pcUser_xm')!))
let router = useRouter()

// 定义方法

// 语言切换
let click = (e: string, v: string) => {
  lan.value = v
  locale.value = e
  localStorage.setItem('language', e);
}
// 伸缩侧边栏
let toggle = () => {
  emits('update:isCollapse', !props.isCollapse)
}
// 退出
let logout = () => {
  router.push('/Login')
  localStorage.removeItem('pcUser_xm')
  localStorage.removeItem('token')
}

</script>

<style lang='scss' scoped>
svg {
  width: 20px;
  height: 20px;
}
.header {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.langs {
  color: #1890ff;
}
.u-img {
  width: 30px;
  height: 30px;
}
</style>