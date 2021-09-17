<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
    <el-table-column label="订单时间" prop="pay_time" align="center"></el-table-column>
    <el-table-column label="商品数量" prop="count" align="center"></el-table-column>
    <el-table-column label="订单价格" prop="price" align="center">
      <template #default="scope">
        <span>￥{{ scope.row.price }}</span>
      </template>
    </el-table-column>
    <el-table-column label="订单地址" show-overflow-tooltip prop="address" align="center"></el-table-column>
  </el-table>
  <div class="m-tb-10 t-a-r">
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>-->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import api from '../../http/api'
import { OrderType } from '../../types/index'

// 数据
let current = ref<number>(1)
let pageSize = ref<number>(10)
let query = ref<string>('')
let tableData = ref<OrderType[]>([])
let total = ref(0)

// 请求表格数据
let getData = (current: number, pageSize: number, query: string) => {
  api.getOrder().
    then((res: any) => {
      tableData.value = res.data
      total.value = res.total
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

onMounted(() => {
  getData(current.value, pageSize.value, query.value)
})

</script>

<style scoped>
</style>