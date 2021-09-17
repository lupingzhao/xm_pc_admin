<template>
  <el-container>
    <el-aside width="auto">
      <NavLeft :isCollapse="isCollapse"></NavLeft>
    </el-aside>
    <el-container>
      <el-header>
        <NavHeader v-model:isCollapse="isCollapse"></NavHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import NavHeader from '../../components/navHeader/NavHeader.vue'
import NavLeft from '../../components/navLeft/NavLeft.vue'

interface Data {
  name: string,
  age: number
}

let isCollapse = ref<boolean>(false)
// 定义的数据不用。value 可直接用
let data = reactive<Data>({
  name: 'jack',
  age: 20
})
</script>

<style scoped lang="scss">
.el-header {
  height: 50px;
  padding: 0;
}
</style>