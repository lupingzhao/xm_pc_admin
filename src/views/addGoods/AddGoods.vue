<template>
  <div v-if="!isadd">
    <!-- 头 -->
    <CommHead titile="添加商品" @cseach="cseach" @cbtn="cbtn"></CommHead>
    <div class="m-tb-10">
      <GoodTable @edit="cbtn" ref="tables"></GoodTable>
    </div>
  </div>
  <Add v-else @back="back"></Add>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineComponent } from 'vue'
import api from '../../http/api';
import CommHead from '../../components/commHead/CommHead.vue'
import GoodTable from '../../components/goods/GoodTable.vue'
import Add from '../../components/goods/Add.vue'
import { ElMessage } from '_element-plus@1.1.0-beta.9@element-plus';


// 数据
let tables = ref<any>(null)
let isadd = ref<boolean>(false)



// 方法
// 头部搜索事件
let cseach = (e: string) => {
  tables.value.seach(e)
}
//头部按钮 添加
let cbtn = () => {
  isadd.value = true
}

// 返回
let back = () => {
  isadd.value = false
}


// 加载
onMounted(() => {

})

</script>

<style scoped lang="scss">
</style>