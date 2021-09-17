<template>
  <div class="flex a-i-fs">
    <div class="mr-10">
      <el-form
        :model="ruleForm"
        :rules="rules1"
        label-width="100px"
        ref="formmodel1"
        class="demo-ruleForm"
      >
        <el-form-item label="所属模型：" prop="pid">
          <el-select v-model="ruleForm.pid" clearable size="medium" filterable placeholder="请选择模型">
            <el-option
              v-for="item in goods"
              :key="item._id"
              :label="item.name"
              :value="item._id"
              @click="select(item._id, item.name)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <el-button @click="refs" icon="el-icon-refresh-right">重置</el-button>
  </div>

  <div class="m-tb-10">
    <el-button type="primary" :disabled="dis" @click="add" icon="el-icon-plus">添加规格</el-button>
  </div>
  <SpecTable ref="ptable"></SpecTable>

  <el-dialog :title="title" v-model="dialogFormVisible" width="40%" destroy-on-close>
    <el-form :model="form" ref="formmodel" :rules="rules" label-width="100">
      <el-form-item label="规格名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入规格名称" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属模型" prop="model">
        <el-select v-model="form.model" placeholder="请选择所属模型">
          <el-option
            v-for="item in goods"
            :key="item._id"
            :label="item.name"
            :value="item._id"
            @click="select1(item._id, item.name)"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格项" prop="spec_item">
        <el-input
          v-model="form.spec_item"
          type="textarea"
          placeholder="请输入规格项，一行一个"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="展示方式" prop="mode">
        <el-radio-group v-model="form.mode" @change="rido">
          <el-radio label="文字"></el-radio>
          <el-radio label="图片"></el-radio>
          <el-radio label="颜色"></el-radio>
        </el-radio-group>
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
import SpecTable from '../../components/spec/SpecTable.vue'
import { ElMessage } from '_element-plus@1.1.0-beta.9@element-plus'
import { useRoute } from 'vue-router'
let ruleForm = ref<any>({
  pid: ''
})
let dialogFormVisible = ref(false)
let title = ref('添加规格')

let dis = ref<boolean>(true)

let goods = ref<Goods[]>([])
let ptable = ref<any>(null)
interface Form { name: string, model: string, spec_item: any, mode: string, parentId: string }
let form = ref<Form>({ name: '', model: '', spec_item: '', mode: '', parentId: '' })

let headers = {
  Authorization: localStorage.getItem('token')
}
let formmodel = ref<any>(null)
let formmodel1 = ref<any>(null)
let rules = {
  model: [
    { required: true, message: '模型不能为空', trigger: ['blur'] },
  ],
  name: [
    { required: true, message: '参数名称不能为空', trigger: ['blur'] },
  ],
  spec_item: [
    { required: true, message: '规格项不能为空', trigger: ['blur'] },
  ],
  mode: [
    { required: true, message: '展示方式不能为空', trigger: ['blur'] },
  ]
}
let name = ref<any>('')

// 重置
let refs = () => {
  ruleForm.value.pid = ''
  ptable.value.clear()
}
// 添加
let add = () => {
  dialogFormVisible.value = true
  form.value.name = ''
  form.value.spec_item = ''
  form.value.mode = ""
  form.value.model = ruleForm.value.pid
}
let select = (e: any, e1: string) => {
  console.log(e)
  if (e) {
    name.value = e1
    ptable.value.getData(e)
    form.value.model = e
    ruleForm.value.pid = e
    form.value.parentId = e
  } else {
    ptable.value.clear()
    form.value.model = ''
    ruleForm.value.pid = ''
    form.value.parentId = ''
  }
}
//弹框选择器
let select1 = (e: any, e1: string) => {
  form.value.model = e1
  name.value = e1
  form.value.parentId = e
}
// 单选事件
let rido = (e: any) => {
  form.value.mode = e
}


// 确认添加
let submit = (e: any) => {
  form.value.model = name.value
  formmodel.value.validate((e: boolean) => {
    if (e) {
      api.addSpec(form.value).then((res: any) => {
        if (res.code === 200) {
          ptable.value.getData(form.value.parentId)
          ElMessage.success(res.msg)
          dialogFormVisible.value = false
          ruleForm.value.pid = form.value.parentId
        } else ElMessage.error(res.msg)
      })
    }
  })
}

let rules1 = {
  pid: [
    { required: true, message: '请选择商品', trigger: 'blur' }
  ]
}



onMounted(() => {
  api.getModel({ current: 1, pageSize: 10000, query: '' }).then((res: any) => {
    if (res.code === 200) {
      goods.value = res.data
    }
  })
  if (useRoute().query.id) {
    name.value = useRoute().query.name
    ruleForm.value.pid = useRoute().query.id
    form.value.parentId = ruleForm.value.pid
    ptable.value.getData(useRoute().query.id)
  }
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
