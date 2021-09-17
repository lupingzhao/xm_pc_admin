<template>
  <div class="w jcc">
    <div class="img">
      <img src="../../assets/404.jpg" alt />

      <div @click="click" class="btn m-c shou">返回首页</div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

let router = useRouter()
// 定义方法
let click = () => {
  router.push('/Login')
}

</script>


<style lang="scss" scoped>
.img {
  transform: translateY(50%);
  img {
    width: 600px;
  }
}
.btn {
  font-size: 18px;
  padding: 10px;
  color: white;
  border-radius: 10px;
  width: fit-content;
  background-color: rgb(113, 166, 209);
}
</style>