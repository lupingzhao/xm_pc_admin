<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column type="index" label="#" width="50" align="center"></el-table-column>
    <el-table-column label="图片" width="180" align="center">
      <template #default="scope">
        <el-image
          v-if="scope.row.url"
          :preview-src-list="[scope.row.url]"
          style="width: 50px; height: 50px"
          :src="scope.row.url"
          fit="contain"
        ></el-image>
      </template>
    </el-table-column>
    <el-table-column label="参数名称" prop="name" align="center"></el-table-column>
    <el-table-column label="参数描述" show-overflow-tooltip prop="desc" align="center"></el-table-column>
    <el-table-column label="操作" align="center" width="180">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.row)" type="primary">编辑</el-button>
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
import { Params } from '../../types/index'

// 数据


let tableData = ref<Params[]>([])


let emits = defineEmits(['edit'])
// 方法
// 表格操作
let handleEdit = (row: any) => {
  emits('edit', row)
}
// 请求表格数据
let getData = (id: string) => {
  api.getParams({ parentId: id }).then((res: any) => {
    tableData.value = res.data
  })
}
let handleDelete = (pid: string, id: string) => {
  api.delParams({ parentId: pid, attrId: id }).then((res: any) => {
    ElMessage.success(res.msg)
    getData(pid)
  })
}




// 分发子组件的事件出去 父组件才可调用
defineExpose({ getData })

onMounted(() => {

})
</script>

<style lang="scss" scoped>
</style>