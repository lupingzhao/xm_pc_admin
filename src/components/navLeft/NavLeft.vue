<template>
  <el-menu
    :uniqueOpened="true"
    class="navleft about_left"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
    :router="true"
    :default-active="$route.meta.index"
  >
    <template v-for="(item,index) in navs" :key="index">
      <el-menu-item :index="item.path" v-if="item.child?.length === 0">
        <component :is="item.icon"></component>
        <template #title>{{ $t(item.t) }}</template>
      </el-menu-item>
      <el-sub-menu :index="item.path" v-if="item.child?.length">
        <template #title>
          <component :is="item.icon"></component>
          <span>{{ $t(item.t) }}</span>
        </template>
        <el-menu-item :index="i.path" v-for="(i,index1) in item.child" :key="index1">
          <component :is="i.icon"></component>
          {{ $t(i.t) }}
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang='ts' setup>
// 引入类型
import { ref } from 'vue';
import { iconsNav } from '../../types/index'
import i18n from '../../language/index'

let props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

let navs = ref(iconsNav)


</script>

<style lang='scss' scoped>
.el-menu:not(.el-menu--collapse) {
  min-width: 200px;
}
svg {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>