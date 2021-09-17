<template>
  <div>
    <!-- 头 -->
    <CommHead titile="添加模型" @cseach="cseach" @cbtn="cbtn"></CommHead>
    <div class="m-tb-10">
      <ModelTable ref="carousTable" @edit="edit"></ModelTable>
    </div>
    <!-- 弹框 -->
    <el-dialog :title="title" v-model="dialogFormVisible" width="40%" destroy-on-close>
      <el-form :model="form" ref="formmodel" :rules="rules" label-width="100px">
        <el-form-item label="模型名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入优惠券名称" autocomplete="off"></el-input>
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
import ModelTable from '../../components/goodsModel/ModelTable.vue'
import { ElMessage } from '_element-plus@1.1.0-beta.9@element-plus';
import dayjs from '_dayjs@1.10.6@dayjs';

interface Form {
  name: string,
  _id: string,
}
// 数据
let dialogFormVisible = ref(false)
let title = ref('添加模型')

let form = ref<Form>({
  name: '',
  _id: '',
})

let carousTable = ref<any>(null)
let formmodel = ref<any>(null)


let rules = {
  name: [
    { required: true, message: '模型名字不能为空', trigger: ['blur'] },
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
  form.value = {
    name: '',
    _id: '',
  }
  title.value = '添加模型'
}


// 编辑
let edit = (row: any) => {
  form.value = { ...row }
  title.value = '编辑模型'
  dialogFormVisible.value = true
}
// 确认添加
let submit = (e: any) => {
  formmodel.value.validate((e: boolean) => {
    if (e) {
      if (form.value._id) {
        // // 编辑
        api.updateModel({ ...form.value, id: form.value._id }).then((res: any) => {
          if (res.code == 200) {
            ElMessage.warning(res.msg)
            dialogFormVisible.value = false
            carousTable.value.getData(1, 10, '')
          }
        })
      } else {
        api.addModel(form.value).then((res: any) => {
          if (res.code === 200) {
            ElMessage.warning(res.msg)
            dialogFormVisible.value = false
            carousTable.value.getData(1, 10, '')
          }
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