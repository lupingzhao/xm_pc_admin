<template>
  <div class="flex jcsb p-10">
    <div>添加商品</div>
    <div @click="back" class="shou">X</div>
  </div>

  <div class="p-10 about-tab">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基础信息" :disabled="step < 1" name="1">
        <BasicsInfo @back="back" @go="go"></BasicsInfo>
      </el-tab-pane>
      <el-tab-pane label="媒体信息" :disabled="step < 2" name="2">
        <MediaInfo @go="go"></MediaInfo>
      </el-tab-pane>
      <el-tab-pane label="商品规格" :disabled="step < 3" name="3">
        <Specificat @go="go"></Specificat>
      </el-tab-pane>
      <el-tab-pane label="商品详情" :disabled="step < 1" name="4">
        <DetailsInfo @go="go" @back="back"></DetailsInfo>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BasicsInfo from '../../components//goods/BasicsInfo.vue'
import MediaInfo from '../../components/goods/MediaInfo.vue'
import Specificat from '../goods/Specificat.vue'
import DetailsInfo from '../../components/goods/DetailsInfo.vue'

let emits = defineEmits(['back'])
let activeName = ref<string>('1')
let step = ref<number>(1)
// 返回
let back = () => {
  emits('back')
}


// 下一步
let go = (e: number, e2: number) => {
  // 返回上一步
  if (e2) {
    activeName.value = String(e)
  } else {
    activeName.value = String(e)
    step.value = e
  }

}
</script>

<style scoped>
</style>