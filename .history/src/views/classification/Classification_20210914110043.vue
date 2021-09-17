<template>
  <div class="flex width-100 jcsb categ a-i-fs">
    <div style="width:520px">
      <div>
        <el-input placeholder="搜索分类" v-model="filterText"></el-input>
      </div>
      <div class="m-tb-10">
        <el-tree
          class="filter-tree"
          :data="datas"
          :props="defaultProps"
          :filter-node-method="filterNode"
          ref="tree"
          @node-click="treeCLICK"
          :check-on-click-node="false"
        >
          <template #default="{ node, data }">
            <div class="custom-tree-node fl-box flex jcsb width-100">
              <div>{{ node.label }}</div>
              <div
                v-if="data.list"
                class="btn-box"
                :style="isclick === data._id ? { 'display': 'block' } : ''"
              >
                <span class="mr-5" style="color:#409EFF" @click="add(data._id)">新增</span>
                <el-popconfirm title="确定删除该分类吗？" @confirm="del(data._id)">
                  <template #reference>
                    <span class="font-c-red">删除</span>
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </template>
        </el-tree>
      </div>
    </div>
    <div class="p-10 border">
      <div class="m-tb-10 flex jcsb">
        <div>新增分类</div>
        <div style="color:#409EFF" @click="submit" class="shou">确 定</div>
      </div>
      <el-form
        :model="Form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="Form.name"></el-input>
        </el-form-item>
        <el-form-item label="上级分类" prop="region">
          <el-select v-model="Form.parentId" placeholder="请选择上级分类">
            <el-option v-for="(item) in datas" :label="item.name" :value="item._id" :key="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类别名" prop="short_name">
          <el-input v-model="Form.short_name"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineComponent, watch } from 'vue'
import { ElMessage } from '_element-plus@1.1.0-beta.9@element-plus'
import api from '../../http/api'
import { Category } from '../../types/index'
let filterText = ref<string>('')

let tree = ref<any>(null)
let datas = ref<Category[]>([])
let ruleForm = ref<any>(null)
let isclick = ref<string>('')

let defaultProps = {
  children: 'list',
  label: 'name',
}
interface Type {
  name: string, parentId: string, isShow: boolean, short_name: string
}
let Form = ref<Type>(
  { name: '', parentId: '', isShow: true, short_name: '' }
)
let rules = {
  name: [{ required: true, message: '请输入用户名', trigger: ['blur'] }]
}

// 搜索数据
let filterNode = (value: string, datas: any) => {
  if (!value) return true
  return datas.label.indexOf(value) !== -1
}

let getData = (e: string) => {
  api.getCategory(e).then((res: any) => {
    if (res.code === 200) {
      datas.value = res.data
    }
  })
}
let treeCLICK = (e: any, e1: any, e2: any) => {
  isclick.value = e._id
}
// 添加
let add = (val: any) => {
  Form.value.parentId = val
}
// 删除
let del = (val: any) => {
  api.delCategory(val).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(res.msg)
      getData('')
    }
  })
}

// 确定
let submit = () => {
  ruleForm.value.validate((e: boolean) => {
    if (e) {
      if (Form.value.parentId) {
        api.addSecondCategory(Form.value).then((res: any) => {
          if (res.code === 200) {
            ElMessage.success(res.msg)
            getData('')
            Form.value = { name: '', parentId: '', isShow: true, short_name: '' }
          } else ElMessage.error(res.msg)
        })
      } else {
        api.addCategory(Form.value).then((res: any) => {
          if (res.code === 200) {
            ElMessage.success(res.msg)
            getData('')
            Form.value = { name: '', parentId: '', isShow: true, short_name: '' }
          } else ElMessage.error(res.msg)
        })
      }
    }
  })
}

onMounted(() => {
  getData('')
})


watch(() => filterText, val => {
  getData(filterText.value)
}, { deep: true, immediate: true })


</script>

<style lang="scss" scoped>
.fl-box {
  .btn-box {
    display: none;
  }
  &:hover {
    .btn-box {
      display: block;
    }
  }
}
</style>