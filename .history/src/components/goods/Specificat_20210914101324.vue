<template>
  <div>
    <el-form>
      <el-form-item label="商品模型">
        <el-select v-model="modex" placeholder="请选择">
          <el-option v-for="item in data" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>

  <div class="m-tb-10">
    <div class="mb-10">商品规格：</div>
    <div v-for="(item,index) in spec" :key="index" class="bor-b">
      <el-checkbox
        @change="all(item.checklist, item.specitem, index)"
        v-model="item.checkAll"
        :label="item.name"
      ></el-checkbox>

      <div class="flex">
        <el-checkbox-group v-model="item.checklist" @change="dg(index)">
          <el-checkbox :label="i" v-for="(i,index1) in item.specitem" :key="index1"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>

  <div class="m-tb-10">
    <el-button @click="back">上一步</el-button>
    <el-button type="primary" @click="go">下一步</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import api from '../../http/api'
import { Spec } from '../../types/index'
let data = ref<any[]>([])
let spec = ref<Spec[]>([])
let modex = ref<any>('')
let form = ref({
  spec: '',
})
let emits = defineEmits(['go'])

onMounted(() => {
  api.getModel({ current: 1, pageSize: 10000, query: '' }).then((res: any) => {
    if (res.code === 200) {
      data.value = res.data
    }
  })
})

// 全选
let all = (e: any, e2: any, i: number) => {
  if (e.length === e2.length) {
    spec.value[i].checklist = []
  } else {
    spec.value[i].checklist = e2
  }
}


// 单选
let dg = (i: number) => {
  if (spec.value[i].checklist.length === spec.value[i].specitem.length) {
    spec.value[i].checkAll = true
  } else {
    spec.value[i].checkAll = false
  }
}


// 下一步
let go = () => {
  emits('go', 4)
  let checklist = [] as any
  if (spec.value.length) {

    checklist = spec.value.filter((item: Spec, index: number) => {
      return item.checklist.length > 0
    })
  }
  let specs = {
    spec: checklist
  }
  console.log(checklist)
  localStorage.setItem('spec', JSON.stringify(specs))
}
// 返回
let back = () => {
  emits('go', 3, 1)
}

watch(() => modex.value, val => {
  if (val) {
    api.getSpec({ parentId: val }).then((res: any) => {
      if (res.code === 200) {
        res.data.map((item: Spec) => {
          item.checklist = []
          item.checkAll = false
          item.specitem = item.spec_item.split('\n')
        })
        spec.value = res.data
      }
    })
  } else spec.value = []
}, { deep: true, immediate: true })

</script>

<style scoped>
</style>