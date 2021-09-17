<template>
  <div>
    <!-- 头 -->
    <CommHead titile="添加通知" @cseach="cseach" @cbtn="cbtn"></CommHead>
    <div class="m-tb-10">
      <NoticeTables ref="noticeTables" @edit="edit"></NoticeTables>
    </div>
    <!-- 弹框 -->
    <el-dialog :title="title" v-model="dialogFormVisible" width="40%" destroy-on-close>
      <el-form :model="form" ref="formmodel" :rules="rules">
        <el-form-item label="通知内容" prop="content">
          <el-input v-model="form.content" autocomplete="off"></el-input>
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
import api from '../../http/api'
import CommHead from '../../components/commHead/CommHead.vue'
import NoticeTables from '../../components/notice/NoticeTables.vue'
import { ElMessage } from '_element-plus@1.1.0-beta.9@element-plus'


// 数据
let dialogFormVisible = ref(false)
let title = ref('添加通知')
let form = ref({
  content: '',
  _id: '',
})

let headers = {
  Authorization: localStorage.getItem('token')
}
let noticeTables = ref<any>(null)
let formmodel = ref<any>(null)
let fileList = ref<any>([])

let rules = {
  content: [
    { required: true, message: '通知内容不能为空', trigger: ['blur'] },
  ]
}


// 方法
// 头部搜索事件
let cseach = (e: string) => {
  noticeTables.value.seach(e)
}
//头部按钮 添加
let cbtn = () => {
  dialogFormVisible.value = true
  fileList.value = []
  form.value = {
    content: '',
    _id: ''
  }
  title.value = '添加通知'
}

// 编辑
let edit = (row: any) => {
  form.value = { ...row }
  fileList.value = [{
    name: row.title,
    url: row.url
  }]
  title.value = '编辑通知'
  dialogFormVisible.value = true
}
// 确认添加
let submit = (e: any) => {
  formmodel.value.validate((e: boolean) => {
    if (e) {
      if (form.value._id) {
        // 编辑
        api.updateNotice({ ...form.value, id: form.value._id }).then((res: any) => {
          ElMessage.warning(res.msg)
          dialogFormVisible.value = false
          noticeTables.value.getData()
        })
      } else {
        api.addNotice(form.value).then((res: any) => {
          ElMessage.warning(res.msg)
          dialogFormVisible.value = false
          noticeTables.value.getData()
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