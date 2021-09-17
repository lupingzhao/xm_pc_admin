<template>
  <div class="flex width-100 commHead">
    <el-input placeholder="请输入内容" @change="seach" class="mr-10" v-model="input2">
      <template #append>
        <el-button icon="el-icon-search" @click="seach"></el-button>
      </template>
    </el-input>
    <el-button type="primary" size="medium" @click="btn">{{ titile }}</el-button>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 接收的数据
defineProps({
  titile: {
    type: String,
    required: true
  }
})


let input2 = ref<string>('')



// 分发事件
let emits = defineEmits(['cseach', 'cbtn'])

// 搜索事件
let seach = () => {
  emits('cseach', input2.value)
}

// 按钮事件
let btn = () => {
  emits('cbtn')
}

</script>

<style lang="scss" scoped>
</style>