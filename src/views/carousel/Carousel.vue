<template>
  <div>
    <!-- 头 -->
    <CommHead titile="添加轮播图" @cseach="cseach" @cbtn="cbtn"></CommHead>
    <div class="m-tb-10">
      <CarouselTable ref="carousTable" @edit="edit"></CarouselTable>
    </div>
    <!-- 弹框 -->
    <el-dialog :title="title" v-model="dialogFormVisible" width="40%" destroy-on-close>
      <el-form :model="form" ref="formmodel" :rules="rules">
        <el-form-item label="图片地址" required prop="url">
          <el-upload
            v-model="form.url"
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
            style="width: 350px; height: 150px"
            :src="url"
            :preview-src-list="[url]"
          ></el-image>
        </el-form-item>
        <el-form-item label="图片标题">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片链接">
          <el-input v-model="form.link" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineComponent } from 'vue'
import api from '../../http/api';
import CommHead from '../../components/commHead/CommHead.vue'
import CarouselTable from '../../components/carousel/carouselTable/CarouselTable.vue'
import { ElMessage } from '_element-plus@1.1.0-beta.9@element-plus';


// 数据
let dialogFormVisible = ref(false)
let title = ref('添加轮播图')
let url = ref('')
interface Form {
  url: string,
  title: string,
  link: string,
  _id: string,
}
let form = ref<Form>({
  url: '',
  title: '',
  link: '',
  _id: '',
})
let headers = {
  Authorization: localStorage.getItem('token')
}
let carousTable = ref<any>(null)
let formmodel = ref<any>(null)

let rules = {
  url: [
    { required: true, message: '请上传商品主图（1张）', trigger: ['blur'] },
  ]
}


// 方法
// 头部搜索事件
let cseach = (e: string) => {
  carousTable.value.seach(e)
}
//头部按钮 添加
let cbtn = () => {
  dialogFormVisible.value = true
  url.value = ''
  form.value = {
    url: '',
    title: '',
    link: '',
    _id: '',
  }
  title.value = '添加通知'
}
// 上传图片
let success = (e: any) => {
  // form.value.url = e.data
  url.value = e.data
}

// 编辑
let edit = (row: any) => {
  form.value = { ...row }
  url.value = row.url
  title.value = '编辑通知'
  dialogFormVisible.value = true
}
// 确认添加
let submit = (e: any) => {
  form.value.url = url.value
  formmodel.value.validate((e: boolean) => {
    if (e) {
      if (form.value._id) {
        // 编辑
        api.updateBanner({ ...form.value, id: form.value._id }).then((res: any) => {
          ElMessage.warning(res.msg)
          dialogFormVisible.value = false
          carousTable.value.getData(1, 10, '')
        })
      } else {
        api.addBanner(form.value).then((res: any) => {
          ElMessage.warning(res.msg)
          dialogFormVisible.value = false
          carousTable.value.getData(1, 10, '')
        })
      }

    }
  })
}



// 加载
onMounted(() => {

})

</script>

<style scoped lang="scss">
</style>