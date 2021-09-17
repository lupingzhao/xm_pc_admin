<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column type="index" label="#" width="50" align="center"></el-table-column>

    <el-table-column label="模型名称" show-overflow-tooltip prop="name" align="center" width="100"></el-table-column>
    <el-table-column label="所属模型" show-overflow-tooltip prop="model" width="100" align="center"></el-table-column>
    <el-table-column label="展示方式" show-overflow-tooltip prop="mode" width="100" align="center"></el-table-column>
    <el-table-column label="规格项" show-overflow-tooltip prop="spec_item" align="center">
      <template #default="scope">
        <span v-for="(i,index) in scope.row.spec_item" :key="index">{{ i }},</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="180">
      <template #default="scope">
        <el-popconfirm
          confirmButtonText="确定"
          cancelButtonText="取消"
          icon="el-icon-info"
          iconColor="red"
          title="确定将此数据删除吗？"
          @confirm="handleDelete(scope.row.parentId, scope.row._id)"
        >
          <template #reference>
            <el-button size="mini" class="mt-5" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { onMounted, ref, getCurrentInstance, defineExpose } from 'vue'
import { ElMessage } from '_element-plus@1.1.0-beta.9@element-plus'
import api from '../../http/api'
import { Spec } from '../../types/index'

// 数据
let tableData = ref<Spec[]>([])

// 方法

// 请求表格数据
let getData = (id: string) => {
  api.getSpec({ parentId: id }).then((res: any) => {
    if (res.code === 200) {
      res.data.map((i: Spec) => {
        i.spec_item = i.spec_item.split('\n')
      })
    }
    tableData.value = res.data
  })
}
let handleDelete = (pid: string, id: string) => {
  api.delSpec({ parentId: pid, attrId: id }).then((res: any) => {
    ElMessage.success(res.msg)
    getData(pid)
  })
}

let clear = () => {
  tableData.value = []
}


// 分发子组件的事件出去 父组件才可调用
defineExpose({ getData, clear })

onMounted(() => {

})
</script>

<style lang="scss" scoped>
</style>