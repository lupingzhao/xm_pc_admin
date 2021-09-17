<template>
  <div>
    <!-- 头 -->
    <CommHead titile="添加秒杀商品" @cseach="cseach" @cbtn="cbtn"></CommHead>
    <div class="m-tb-10">
      <SeckillTable ref="carousTable" @edit="edit"></SeckillTable>
    </div>
    <!-- 弹框 -->
    <el-dialog :title="title" v-model="dialogFormVisible" width="40%" destroy-on-close>
      <el-form :model="form" ref="formmodel" :rules="rules" label-width="100px">
        <el-form-item label="秒杀商品" prop="goods">
          <el-select v-model="form.goods" @change="select" filterable placeholder="请选择秒杀商品">
            <el-option
              v-for="item in goodOptions"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
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
            placeholder="选择日期时间"
            :disabled-date="disabledDate"
            :shortcuts="[
            {
              text: '此刻',
              value: new Date(),
            }]"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="秒杀价格" prop="price">
          <el-input
            v-model="form.price"
            min="0"
            type="number"
            placeholder="请输入秒杀价格"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="秒杀数量" prop="goods_number">
          <el-input
            v-model="form.goods_number"
            min="1"
            type="number"
            placeholder="请输入秒杀数量"
            autocomplete="off"
          ></el-input>
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
import SeckillTable from '../../components/seckill/SeckillTable.vue'
import { ElMessage } from '_element-plus@1.1.0-beta.9@element-plus';
import dayjs from '_dayjs@1.10.6@dayjs';
import { Goods } from '../../types/index'

interface Form {
  price: string,
  start_time: string,
  end_time: string,
  goods_number: string,
  goods: any,
  isShow: boolean,
  _id: string
}
// 数据
let dialogFormVisible = ref(false)
let title = ref('添加秒杀商品')
let url = ref('')

let form = ref<Form>({
  price: '',
  start_time: '',
  end_time: '',
  goods_number: "",
  goods: '',
  isShow: true,
  _id: ''
})

let carousTable = ref<any>(null)
let formmodel = ref<any>(null)
let goodOptions = ref<Goods[]>([])

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
  goods: [
    { required: true, message: '秒杀商品不能为空', trigger: ['blur'] },
  ],
  goods_number: [
    { required: true, message: '秒杀数量不能为空', trigger: ['blur'] },
  ],
  start_time: [
    { required: true, message: '开始时间不能为空', trigger: ['blur'] },
    { validator: checkstart, trigger: 'blur' }
  ],
  end_time: [
    { required: true, message: '结束时间不能为空', trigger: ['blur'] },
    { validator: checkend, trigger: 'blur' }
  ],
  price: [
    { required: true, message: '秒杀价格不能为空', trigger: ['blur'] },
  ],
}
// 开始时间的结束时间的禁用时间
let disabledDate = (time: any) => {
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
    price: '',
    start_time: '',
    end_time: '',
    goods_number: "",
    goods: '',
    isShow: true,
    _id: ''
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

// 选择器
let select = (e: any) => {
  form.value.goods = goodOptions.value.filter((i: any) => {
    return i._id === e
  })[0]
}
// 确认添加
let submit = (e: any) => {
  formmodel.value.validate((e: boolean) => {
    if (e) {
      if (form.value._id) {
        // 编辑
        api.updateSeckill({ ...form.value, id: form.value._id }).then((res: any) => {
          ElMessage.warning(res.msg)
          dialogFormVisible.value = false
          carousTable.value.getData(1, 10, '')
        })
      } else {
        api.addSeckill(form.value).then((res: any) => {
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
  api.getGoods({ current: 1, pageSize: 10000, query: '' }).then((res: any) => {
    if (res.code === 200) {
      goodOptions.value = res.data
    }
  })
})

</script>

<style scoped lang="scss">
</style>