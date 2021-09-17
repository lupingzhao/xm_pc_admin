<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
    <el-table-column label="商品名称" show-overflow-tooltip width="180" prop="name" align="center"></el-table-column>
    <el-table-column label="原价（元）" prop="originalPrice" align="center"></el-table-column>
    <el-table-column label="现价（元）" show-overflow-tooltip prop="presentPrice" align="center"></el-table-column>
    <el-table-column label="库存" show-overflow-tooltip prop="stock" align="center"></el-table-column>

    <el-table-column label="是否热卖" align="center">
      <template #default="scope">
        <span>{{ scope.row.isHot ? '是' : '否' }}</span>
      </template>
    </el-table-column>

    <el-table-column label="是否推荐" align="center">
      <template #default="scope">
        <span>{{ scope.row.isRecommend ? '是' : '否' }}</span>
      </template>
    </el-table-column>

    <el-table-column label="是否新品" align="center">
      <template #default="scope">
        <span>{{ scope.row.isNewGood ? '是' : '否' }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作" align="center" width="150">
      <template #default="scope">
        <!-- <el-button size="mini" @click="handleEdit(scope.row)" type="primary">编辑</el-button> -->
        <el-button size="mini" @click="view(scope.row)">详情</el-button>
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

  <!-- 弹框 -->
  <el-dialog title="商品详情" v-model="dialogVisible" width="45%">
    <div class="flex m-tb-10">
      <div class="mr-5" style="white-space: nowrap;">商品介绍:</div>
      <div class="font-s-12">{{ goods.introduction }}</div>
    </div>
    <div class="flex m-tb-10">
      <div class="mr-5">商品原价:</div>
      <div>￥{{ goods.originalPrice }}</div>
    </div>
    <div class="flex m-tb-10">
      <div class="mr-5">商品现价:</div>
      <div>￥{{ goods.presentPrice }}</div>
    </div>
    <div class="flex m-tb-10">
      <div class="mr-5">商品主图:</div>
      <div class="t-a-l">
        <img style="width:100px;height:100px" :src="goods.cover" />
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, getCurrentInstance, defineExpose } from 'vue'
import { ElMessage } from '_element-plus@1.1.0-beta.9@element-plus'
import api from '../../http/api'
import { Goods } from '../../types/index'

// 数据
let current = ref<number>(1)
let pageSize = ref<number>(10)
let query = ref<string>('')
let dialogVisible = ref<boolean>(false)
let tableData = ref<Goods[]>([])
let goods = ref()
let total = ref(0)


let emits = defineEmits(['edit'])
// 方法
// 表格操作
let handleEdit = (row: any) => {
  emits('edit', row)
}
// 请求表格数据
let getData = (current: number, pageSize: number, query: string) => {
  api.getGoods({ current: current, pageSize: pageSize, query: query }).
    then((res: any) => {
      tableData.value = res.data
      total.value = res.total
    })
}
let handleDelete = (id: string) => {
  api.delGoods(id).then((res: any) => {
    ElMessage.success(res.msg)
    getData(current.value, pageSize.value, query.value)
  })
}

let view = (e: any) => {
  dialogVisible.value = true
  goods.value = e
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