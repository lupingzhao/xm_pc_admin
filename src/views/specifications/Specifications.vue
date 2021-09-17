<template>
  <div class="spec">
    <el-form :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="所属商品：" prop="goods">
        <el-select
          v-model="ruleForm.goods"
          clearable
          size="medium"
          @change="select"
          filterable
          placeholder="请选择商品"
        >
          <el-option v-for="item in goods" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>

  <div ref="edit" id="editor" style="z-index:0" class="m-tb-10"></div>

  <div>
    <el-button type="primary" :disabled="dis" @click="sumbit">确认</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import api from '../../http/api'
import { Goods } from '../../types/index'
import E from 'wangeditor'
import { ElMessage } from 'element-plus'

let ruleForm = ref<any>({
  goods: ''
})
let dis = ref<boolean>(true)
let attr = ref<any>({
  parentId: '',
  specParams: ''
})

let goods = ref<Goods[]>([])
let editor = ref<any>(null)

let rules = {
  goods: [
    { required: true, message: '请选择商品', trigger: 'blur' }
  ]
}


// 确认
let sumbit = () => {
  api.addSpecParams(attr.value).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(res.msg)
      ruleForm.value.goods = ''
      attr.value = {
        parentId: '',
        specParams: ''
      }
      editor.txt.clear()
    } else ElMessage.error(res.msg)
  })
}

let select = (e: any) => {
  attr.value.parentId = e
}

onMounted(() => {
  editor = new E('#editor')
  editor.create()
  // editor1.create()
  // editor.config.height = 500
  // 编辑器的值
  editor.config.onchange = (val: string) => {
    attr.value.specParams = val
  }

  api.getGoods({ current: 1, pageSize: 10000, query: '' }).then((res: any) => {
    if (res.code === 200) {
      goods.value = res.data
    }
  })
})

watch(() => attr.value, val => {
  val.parentId && val.specParams ? dis.value = false : dis.value = true
}, { deep: true, immediate: true })


</script>

<style scoped lang="scss">
#editor {
  position: relative;
  z-index: 0;
}
</style>