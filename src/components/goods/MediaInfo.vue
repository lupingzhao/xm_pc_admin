<template>
  <div>
    <el-form :model="form" ref="formmodel" :rules="rules">
      <el-form-item label="图片地址" required prop="pic">
        <el-upload
          v-model="form.pic"
          multiple
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          class="upload-demo"
          action="http://localhost:5000/admin/upload"
          :headers="headers"
          list-type="picture-card"
          :file-list="fileList"
          :on-success="success"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
  <div class="m-tb-10">
    <el-button @click="back">上一步</el-button>
    <el-button type="primary" @click="go">下一步</el-button>
  </div>

  <el-dialog v-model="dialogVisible">
    <img width="100%" style="height:300px;width:600px" :src="url" alt />
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineComponent } from 'vue'
let url = ref('')
let fileList = ref([])

let form = ref({
  pic: '',
})
let headers = {
  Authorization: localStorage.getItem('token')
}


let dialogVisible = ref<boolean>(false)
let formmodel = ref<any>(null)
let pic = ref<string[]>([])
// 上传图片
let success = (e: any,) => {
  pic.value.push(e.data)
}

// 返回列表
let back = () => {
  emits('go', 1, 1)
  pic.value = []
}
let emits = defineEmits(['go'])

// 下一步
let go = () => {
  if (pic.value.length > 0) {
    form.value.pic = '90'
  } else {
    form.value.pic = ''
  }
  formmodel.value.validate((e: any) => {
    if (e) {
      let a = {
        pic: pic.value
      }
      localStorage.setItem('pic', JSON.stringify(a))
      emits('go', 3)
      pic.value = []
    }

  })
}

// 移除图片
let handleRemove = (file: any, fileList: any) => {
  pic.value = []
  fileList.map((i: any) => {
    pic.value.push(i.response.data)
  })
}
// 预览图片
let handlePictureCardPreview = (file: any) => {
  url.value = file.response.data
  dialogVisible.value = true
}
let rules = {
  pic: [
    { required: true, message: '请上传商品图片', trigger: ['blur'] },
  ]
}
</script>

<style scoped>
</style>