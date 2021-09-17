<template>
  <div>
    <!-- 头 -->
    <CommHead titile="添加推荐导航" @cseach="cseach" @cbtn="cbtn"></CommHead>
    <div class="m-tb-10">
      <RecoTable ref="carousTable" @edit="edit"></RecoTable>
    </div>
    <!-- 弹框 -->
    <el-dialog :title="title" v-model="dialogFormVisible" width="40%" destroy-on-close>
      <el-form :model="form" ref="formmodel" :rules="rules" label-width="100px">
        <el-form-item label="导航名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航描述" prop="desc">
          <el-input v-model="form.desc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="下属商品" prop="goods">
          <el-select
            style="width:100%"
            v-model="form.goods"
            filterable
            @change="select"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in goodsList"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
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
import { onMounted, reactive, ref, onUnmounted, defineComponent } from 'vue'
import api from '../../http/api';
import CommHead from '../../components/commHead/CommHead.vue'
import RecoTable from '../../components/recommend/RecoTable.vue'
import { ElMessage } from '_element-plus@1.1.0-beta.9@element-plus';

interface From { name: string, desc: string, goods: any, _id: string }

// 数据
let dialogFormVisible = ref(false)

let title = ref('添加推荐导航')
let url = ref('')

let form = ref<From>({ name: '', desc: '', goods: '', _id: '' })
let headers = {
  Authorization: localStorage.getItem('token')
}
let carousTable = ref<any>(null)
let list = ref<any[]>([])
let formmodel = ref<any>(null)
let goodsList = ref<any[]>([])

let rules = {
  name: [
    { required: true, message: '名称不能为空', trigger: ['blur'] },
  ],
  desc: [
    { required: true, message: '描述不能为空', trigger: ['blur'] },
  ],
  goods: [
    { required: true, message: '下属商品不能为空', trigger: ['blur'] },
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
  form.value = { name: '', desc: '', goods: '', _id: '' }
  title.value = '添加推荐导航'
}
let select = (e: any) => {
  list.value = []
  e.map((item: string) => {
    goodsList.value.map((i: any) => {
      i._id === item ? list.value.push(i) : ''
    })
  })
}

// 编辑
let edit = (row: any) => {
  list.value = []
  // 
  form.value = { ...row }
  row.goods.map((i: any) => {
    list.value.push(i._id)
  })
  form.value.goods = list.value
  title.value = '编辑推荐导航'
  dialogFormVisible.value = true
}
// 确认添加
let submit = (e: any) => {
  formmodel.value.validate((e: boolean) => {
    if (e) {
      if (form.value._id) {
        // 编辑
        api.updateRecommendNav({ ...form.value, id: form.value._id, goods: list.value }).then((res: any) => {
          ElMessage.warning(res.msg)
          dialogFormVisible.value = false
          carousTable.value.getData(1, 10, '')
        })
      } else {
        api.addRecommendNav({ ...form.value, goods: list.value }).then((res: any) => {
          ElMessage.warning(res.msg)
          dialogFormVisible.value = false
          carousTable.value.getData(1, 10, '')
        })
      }
      list.value = []
    }
  })
}



// 加载
onMounted(() => {
  api.getGoods({ current: 1, pageSize: 10000, query: '' }).then((res: any) => {
    if (res.code === 200) {
      goodsList.value = res.data
    }
  })
})

</script>

<style scoped lang="scss">
</style>