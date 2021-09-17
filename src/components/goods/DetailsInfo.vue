<template>
  <div ref="edit" id="editor" style="z-index:0" class="m-tb-10"></div>

  <div>
    <el-button type="primary" @click="go">上一步</el-button>
    <el-button type="primary" @click="sumbit">添加商品</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import api from '../../http/api'
import { Goods } from '../../types/index'
import E from 'wangeditor'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

let emits = defineEmits(['go', 'back'])

let editor = ref<any>(null)
let contet = ref<string>('')

let router = useRouter()
// 上一步
let go = () => {
  emits('go', 3, 1)
}

// 
// 确认
let sumbit = () => {
  let a = JSON.parse(localStorage.getItem('basinfo')!)
  let b = JSON.parse(localStorage.getItem('pic')!)
  let c = JSON.parse(localStorage.getItem('spec')!)

  if (contet.value) {
    api.addGoods({
      ...a, ...b, ...c, productionDesc: contet.value, video: '',
      comment: [], discount: "", detail: contet.value,
    }).then((res: any) => {
      if (res.code === 200) {
        ElMessage.success(res.msg)
        editor.txt.clear()
        emits('back')
      }
    })
  } else ElMessage.error('请上传商品详情图')


  // productionDesc
}



onMounted(() => {
  editor = new E('#editor')
  editor.create()
  // editor.config.height = 500
  // 编辑器的值
  editor.config.onchange = (val: string) => {
    contet.value = val
  }
})



</script>

<style scoped lang="scss">
</style>
