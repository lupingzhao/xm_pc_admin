<template>
  <div>
    <el-form :model="form" ref="formmodel" :rules="rules">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入商品名称" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="category">
        <el-cascader
          :options="options"
          placeholder="选择商品分类"
          v-model="form.category"
          :props="props"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="商品现价" prop="presentPrice">
        <el-input
          v-model="form.presentPrice"
          placeholder="请输入商品现价"
          type="number"
          min="0"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品原价" prop="originalPrice">
        <el-input
          v-model="form.originalPrice"
          placeholder="请输入商品原价"
          type="number"
          min="0"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="封面图" prop="cover">
        <el-upload
          v-model="form.cover"
          class="upload-demo"
          action="http://localhost:5000/admin/upload"
          :headers="headers"
          :show-file-list="false"
          :on-success="success"
        >
          <span style="color: #1890FF;">点击上传</span>
        </el-upload>
        <el-image
          v-if="url"
          style="width: 100px; height: 100px"
          :src="url"
          :preview-src-list="[url]"
        ></el-image>
      </el-form-item>
      <el-form-item prop="company" label="商品单位">
        <el-input v-model="form.company" placeholder="请输入商品单位i" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="stock" label="商品库存">
        <el-input
          v-model="form.stock"
          type="number"
          placeholder="请输入商品库存"
          min="0"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="商品简介" prop="introduction">
        <el-input v-model="form.introduction" placeholder="请输入商品简介" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="推荐介绍" prop="sellDesc">
        <el-input
          v-model="form.sellDesc"
          placeholder="请输入推荐介绍，一行一个"
          type="textarea"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否新品" prop="isNewGood">
        <el-switch v-model="form.isNewGood"></el-switch>
      </el-form-item>
      <el-form-item label="是否热卖" prop="isHot">
        <el-switch v-model="form.isHot"></el-switch>
      </el-form-item>
      <el-form-item label="是否推荐" prop="isRecommend">
        <el-switch v-model="form.isRecommend"></el-switch>
      </el-form-item>
    </el-form>
  </div>
  <div class="m-tb-10">
    <el-button @click="back">取消</el-button>
    <el-button type="primary" @click="go">下一步</el-button>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import api from '../../http/api'
import { Category } from '../../types/index'
let url = ref('')

interface Form {
  name: string, category: string, cover: string, originalPrice: string,
  presentPrice: string,
  introduction: string, company: string,
  stock: string, isNewGood: boolean, isHot: boolean,
  isRecommend: boolean, isShow: boolean,
  sellDesc: any,
}
let form = ref<Form>({
  name: '', category: '', cover: '', originalPrice: '',
  presentPrice: '', introduction: '', company: '',
  stock: '', isNewGood: true, isHot: true, isRecommend: true, isShow: true, sellDesc: ''
})
let headers = {
  Authorization: localStorage.getItem('token')
}
// 自定义节点
let props = {
  value: '_id',
  label: 'name',
  children: 'list'
}
let options = ref<Category[]>([])
let formmodel = ref<any>(null)

let rules = {
  cover: [
    { required: true, message: '请上传商品主图（1张）', trigger: ['blur'] },
  ],
  name: [
    { required: true, message: '商品名称不能为空', trigger: ['blur'] },
  ],
  category: [
    { required: true, message: '商品分类不能为空', trigger: ['blur'] },
  ],
  originalPrice: [
    { required: true, message: '商品原价不能为空', trigger: ['blur'] },
  ],
  presentPrice: [
    { required: true, message: '商品现价不能为空', trigger: ['blur'] },
  ],
  introduction: [
    { required: true, message: '商品简介不能为空', trigger: ['blur'] },
  ],
  company: [
    { required: true, message: '商品单位不能为空', trigger: ['blur'] },
  ],
  stock: [
    { required: true, message: '商品库存不能为空', trigger: ['blur'] },
  ],
  sellDesc: [
    { required: true, message: '商品推荐介绍不能为空', trigger: ['blur'] },
  ],
}
let emits = defineEmits(['back', 'go'])

// 返回列表
let back = () => {
  emits('back')
}

// 下一步
let go = () => {
  formmodel.value.validate((e: any) => {
    form.value.category = form.value.category[1]
    localStorage.setItem('basinfo', JSON.stringify(form.value))
    emits('go', 2)
  })
}
// 上传图片
let success = (e: any) => {
  form.value.cover = e.data
  url.value = e.data
}

onMounted(() => {
  api.getCategory('').then((res: any) => {
    if (res.code === 200) {
      options.value = res.data
    }
  })
})

</script>

<style lang="scss" scoped>
</style>