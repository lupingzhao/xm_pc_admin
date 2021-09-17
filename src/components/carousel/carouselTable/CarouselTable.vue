<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
    <el-table-column label="图片" width="180" align="center">
      <template #default="scope">
        <el-image
          :preview-src-list="[scope.row.url]"
          style="width: 150px; height: 50px"
          :src="scope.row.url"
          fit="contain"
        ></el-image>
        <img src alt />
      </template>
    </el-table-column>
    <el-table-column label="标题" prop="title" align="center"></el-table-column>
    <el-table-column label="路径" show-overflow-tooltip prop="url" width="200" align="center"></el-table-column>
    <el-table-column label="链接" show-overflow-tooltip prop="link" width="200" align="center"></el-table-column>

    <el-table-column label="是否显示" width="80" align="center">
      <template #default="scope">
        <el-switch v-model="scope.row.isShow" @change="swich(scope.row._id, scope.row.isShow)"></el-switch>
      </template>
    </el-table-column>

    <el-table-column label="操作" align="center" width="180">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.row)" type="primary">编辑</el-button>
        <el-popconfirm
          confirmButtonText="好的"
          cancelButtonText="取消"
          icon="el-icon-info"
          iconColor="red"
          title="确定将此数据删除吗？"
          @confirm="handleDelete(scope.row._id)"
        >
          <template #reference>
            <el-button size="mini" class="mt-5" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <div class="m-tb-10 t-a-r">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, getCurrentInstance, defineExpose } from 'vue'
import { ElMessage } from '_element-plus@1.1.0-beta.9@element-plus'
import api from '../../../http/api'
import { Carouse } from '../../../types/index'

// 数据
let current = ref<number>(1)
let pageSize = ref<number>(10)
let query = ref<string>('')
let tableData = ref<Carouse[]>([])
let total = ref(0)


let emits = defineEmits(['edit'])
// 方法
// 表格操作
let handleEdit = (row: any) => {
  emits('edit', row)
}
// 请求表格数据
let getData = (current: number, pageSize: number, query: string) => {
  api.getBanner({ current: current, pageSize: pageSize, query: query }).
    then((res: any) => {
      tableData.value = res.data
      total.value = res.total
    })
}
let handleDelete = (id: string) => {
  api.delBanner(id).then((res: any) => {
    ElMessage.success(res.msg)
    getData(current.value, pageSize.value, query.value)
  })
}
// 开关
let swich = (e: string, show: boolean) => {
  api.showBanner({ id: e, isShow: show }).then((res: any) => {
    res.code === 200 ? ElMessage.success(res.msg) : ElMessage.error(res.msg)
  })
}

// 分页
let handleSizeChange = (val: any) => {
  pageSize.value = val
  getData(current.value, pageSize.value, query.value)
}
let handleCurrentChange = (val: any) => {
  current.value = val
  getData(current.value, pageSize.value, query.value)
}

// 搜索
let seach = (e: string) => {
  query.value = e
  getData(1, 10, e)
}

// 分发子组件的事件出去 父组件才可调用
defineExpose({ getData, seach })

onMounted(() => {
  getData(current.value, pageSize.value, query.value)
})
</script>

<style lang="scss" scoped>
</style>