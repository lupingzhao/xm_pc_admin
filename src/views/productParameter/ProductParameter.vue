<template>
  <div class="flex a-i-fs">
    <div class="mr-10">
      <el-form :model="ruleForm" :rules="rules1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="所属商品：" prop="pid">
          <el-select
            v-model="ruleForm.pid"
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

    <el-button type="primary" :disabled="dis" @click="add">添加参数</el-button>
  </div>

  <ParaTable @edit="edit" ref="ptable"></ParaTable>

  <el-dialog :title="title" v-model="dialogFormVisible" width="40%" destroy-on-close>
    <el-form :model="form" ref="formmodel" :rules="rules">
      <el-form-item label="图片地址" prop="url">
        <el-upload
          class="upload-demo"
          action="http://localhost:5000/admin/upload"
          :headers="headers"
          :show-file-list="false"
          :on-success="success"
        >
          <span style="color: #1890FF;">点击上传</span>
        </el-upload>
        <el-image v-if="url" style="width: 50px; height: 50px" :src="url" :preview-src-list="[url]"></el-image>
      </el-form-item>
      <el-form-item label="参数名字" prop="name">
        <el-input v-model="form.name" placeholder="请输入参数名字" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="参数描述" prop="desc">
        <el-input v-model="form.desc" placeholder="请输入参数描述" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import api from '../../http/api'
import { Params, Goods } from '../../types/index'
import ParaTable from '../../components/parameter/ParaTable.vue'
import { ElMessage } from '_element-plus@1.1.0-beta.9@element-plus'

let ruleForm = ref<any>({
  pid: ''
})
let dialogFormVisible = ref(false)
let title = ref('添加导航')

let dis = ref<boolean>(true)

let goods = ref<Goods[]>([])
let ptable = ref<any>(null)
let form = ref({ parentId: '', url: '', name: '', desc: '', _id: '' })
let url = ref('')
let headers = {
  Authorization: localStorage.getItem('token')
}
let formmodel = ref<any>(null)
let rules = {
  url: [
    { required: true, message: '请上传导航图片', trigger: ['blur'] },
  ],
  name: [
    { required: true, message: '参数名称不能为空', trigger: ['blur'] },
  ],
  desc: [
    { required: true, message: '参数描述不能为空', trigger: ['blur'] },
  ]
}
let add = () => {
  dialogFormVisible.value = true
}
let select = (e: any) => {
  if (e) {
    ptable.value.getData(e)
    form.value.parentId = e
  } else {
    ptable.value.tableData = []
  }
}

// 上传图片
let success = (e: any) => {
  url.value = e.data
}

// 编辑
let edit = (row: any) => {
  form.value = { ...row }
  url.value = row.url
  title.value = '编辑导航'
  dialogFormVisible.value = true
}
// 确认添加
let submit = (e: any) => {
  form.value.url = url.value
  console.log(form.value)
  formmodel.value.validate((e: boolean) => {
    if (e) {
      if (form.value._id) {
        api.updateParams({ ...form.value, id: form.value._id }).then((res: any) => {
          if (res.code === 200) {
            ElMessage.success(res.msg)
          } else ElMessage.error(res.msg)
        })
      } else {
        api.addParams(form.value).then((res: any) => {
          if (res.code === 200) {
            ElMessage.success(res.msg)
          } else ElMessage.error(res.msg)
        })
      }
      dialogFormVisible.value = false
      ptable.value.getData(form.value.parentId)
    }
  })
}

let rules1 = {
  pid: [
    { required: true, message: '请选择商品', trigger: 'blur' }
  ]
}



onMounted(() => {
  api.getGoods({ current: 1, pageSize: 10000, query: '' }).then((res: any) => {
    if (res.code === 200) {
      goods.value = res.data
    }
  })
})
watch(() => ruleForm.value.pid, val => {
  val ? dis.value = false : dis.value = true
},
  {
    deep: true, immediate: true
  })

</script>
<style scoped lang="scss">
</style>