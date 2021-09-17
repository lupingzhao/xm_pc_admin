<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
// 提示

// 挂载图表
import * as echarts from 'echarts'
import { provide } from 'vue'
provide('ec', echarts)//provide


</script>

<style lang="scss" >
@import "./style/common.scss";
@import "./style/ui.scss";
html,
body,
#app,
.el-container,
.el-menu {
  height: 100%;
}
// .el-main {
//   z-index: 2;
// }
</style>