<template>
  <div>
    <!-- 头 -->
    <CommHead titile="添加优惠券" @cseach="cseach" @cbtn="cbtn"></CommHead>
    <div class="m-tb-10">
      <CouponTable ref="carousTable" @edit="edit"></CouponTable>
    </div>
    <!-- 弹框 -->
    <el-dialog :title="title" v-model="dialogFormVisible" width="40%" destroy-on-close>
      <el-form :model="form" ref="formmodel" :rules="rules" label-width="100px">
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入优惠券名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用门槛" prop="threshold">
          <el-input
            v-model="form.threshold"
            placeholder="请输入优惠券使用门槛"
            type="number"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="优惠金额" prop="amount">
          <el-input v-model="form.amount" type="number" placeholder="请输入优惠券优惠金额" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="start_time">
          <el-date-picker
            v-model="form.start_time"
            type="datetime"
            class="width-100"
            placeholder="选择日期时间"
            :disabled-date="disabledDate"
            :shortcuts="[
            {
              text: '此刻',
              value: new Date(),
            }]"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker
            v-model="form.end_time"
            type="datetime"
            class="width-100"
            :disabled-date="disabledDate"
            placeholder="选择日期时间"
            :shortcuts="[
            {
              text: '此刻',
              value: new Date(),
            }]"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="发放数量" prop="number">
          <el-input v-model="form.number" placeholder="请输入优惠券发放数量" autocomplete="off"></el-input>
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
import CouponTable from '../../components/coupon/CouponTable.vue'
import { ElMessage } from '_element-plus@1.1.0-beta.9@element-plus';
import dayjs from '_dayjs@1.10.6@dayjs';

interface Form {
  name: string,
  amount: string,
  threshold: string,
  start_time: string,
  end_time: string,
  number: string,
  _id: string,
  isShow: boolean
}
// 数据
let dialogFormVisible = ref(false)
let title = ref('添加优惠券')
let url = ref('')

let form = ref<Form>({
  name: '',
  amount: '',
  threshold: "",
  start_time: "",
  end_time: '',
  number: "",
  _id: '',
  isShow: true
})

let carousTable = ref<any>(null)
let formmodel = ref<any>(null)

// 时间自定义校验
let checkend = (rule: any, value: any, callback: any) => {
  if (dayjs(value) < dayjs(form.value.start_time)) {
    return callback(new Error('结束时间不能小于开始时间'))
  } else callback()
}
// 时间自定义校验
let checkstart = (rule: any, value: any, callback: any) => {
  if (dayjs(value) > dayjs(form.value.end_time)) {
    return callback(new Error('开始时间不能大于结束时间'))
  } else callback()
}
let rules = {
  name: [
    { required: true, message: '优惠券名字不能为空', trigger: ['blur'] },
  ],
  amount: [
    { required: true, message: '优惠券金额不能为空', trigger: ['blur'] },
  ],
  threshold: [
    { required: true, message: '优惠券门槛不能为空', trigger: ['blur'] },
  ],
  start_time: [
    { required: true, message: '优惠券开始时间不能为空', trigger: ['blur'] },
    { validator: checkstart, trigger: 'blur' }
  ],
  end_time: [
    { required: true, message: '优惠券结束时间不能为空', trigger: ['blur'] },
    { validator: checkend, trigger: 'blur' }
  ],
  number: [
    { required: true, message: '优惠券数量不能为空', trigger: ['blur'] },
  ],
}
// 开始时间的结束时间的禁用时间
let disabledDate = (time: any) => {
  return time.getTime() < new Date
}
// 结束时间的结束时间的禁用时间
let disabledDate1 = (time: any) => {
  if (form.value.start_time) {
    return time.getTime() < new Date && time.getTime() < form.value.start_time
  }
  return time.getTime() < new Date
}

// 方法
// 头部搜索事件
let cseach = (e: string) => {
  carousTable.value.seach(e)
}
//头部按钮 添加
let cbtn = () => {
  dialogFormVisible.value = true
  url.value = ''
  form.value = {
    name: '',
    amount: '',
    threshold: "",
    start_time: "",
    end_time: '',
    number: "",
    _id: '',
    isShow: true
  }
  title.value = '添加优惠券'
}


// 编辑
let edit = (row: any) => {
  form.value = { ...row }
  url.value = row.url
  title.value = '编辑优惠券'
  dialogFormVisible.value = true
}
// 确认添加
let submit = (e: any) => {
  formmodel.value.validate((e: boolean) => {
    if (e) {
      if (form.value._id) {
        // 编辑
        api.updateCoupon({ ...form.value, id: form.value._id }).then((res: any) => {
          ElMessage.warning(res.msg)
          dialogFormVisible.value = false
          carousTable.value.getData(1, 10, '')
        })
      } else {
        api.addCoupon(form.value).then((res: any) => {
          ElMessage.warning(res.msg)
          dialogFormVisible.value = false
          carousTable.value.getData(1, 10, '')
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