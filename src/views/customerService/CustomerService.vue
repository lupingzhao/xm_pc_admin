<template>
  <div class="height-100" style=" margin-bottom: 10px;">
    <div class="t-a-c bgc-low-gray p-tb-10">聊天记录</div>
    <div class="jlbox">
      <div
        v-for="(i,index) in chatList"
        :key="index"
        class="width-100 m-tb-10"
        :id="'chatItem' + index"
      >
        <div class="flex" :class="i.type === 'PC' ? 'jce' : 'jcs'">
          <span>{{ i.value.name ? i.value.name : '游客用户' }}</span>
          <span class="m-lr-10 font-s-12">{{ i.time }}</span>
        </div>
        <div class="flex" :class="i.type === 'PC' ? 'jce' : 'jcs'">
          <div class="flex">
            <div class="triangle_left" v-if="i.type !== 'PC'"></div>
            <div class="width-100" :class="i.type === 'PC' ? 'jce' : 'jcs'">
              <div
                class="chatinfo p-10 b-radius-10"
                :class="i.type === 'PC' ? 'bgc_g' : 'bgc-low-gray '"
              >{{ i.value.data }}</div>
            </div>
            <div class="triangle_bottomleft" v-if="i.type === 'PC'"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="m-tb-10 flex">
      <el-input v-model="value" clearable @change="send"></el-input>
      <div class="m-lr-10">
        <el-button type="primary" @click="send">发送</el-button>
      </div>
      <div>
        <img src="../../assets/qb.png" class="img" alt @click="drawer = true" />
      </div>
    </div>
  </div>

  <el-drawer title="表情" v-model="drawer" direction="rtl" destroy-on-close>
    <div class="p-10 flex flex-wrap jcsa em-box">
      <div
        v-for="(i,index) in em"
        :key="index"
        class="shou"
        style="font-size: 30px; margin-right: 6px;
  margin-bottom: 10px;"
        @click="djbq(i)"
      >{{ i }}</div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import emoji from '../../lib/emoji'
import dayjs from 'dayjs'

// 实时聊天
import io from 'socket.io-client';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus'
const socket = io('http://localhost:3000');

let value = ref<string>('')
let em = emoji
let drawer = ref<boolean>(false)

let chatList = ref<any[]>([])
// 发送信息
let send = () => {
  drawer.value = false
  console.log(socket)
  // socket.emit('event', {
  //   time: dayjs().format('YYYY-MM-DD HH:mm'),
  //   type: 'PC',
  //   value: {
  //     data: value,
  //     name: JSON.parse(localStorage.getItem('pcUser_xm')!).username
  //   }
  // })
  // value.value = ''
}
// 点击表情
let djbq = (i: string) => {
  value.value = value.value + i
}


onMounted(() => {
  // 接收消息
  socket.on('broadcast', (res) => {
    chatList.value.push(res)
  })
  // 断开链接
  socket.on('disconnect', (res) => {
    ElMessage.error('已断开连接')
  })
})

</script>

<style scoped lang='scss'>
.jlbox {
  background-color: #fff;
  height: 80%;
  overflow-y: scroll;
}

.emj {
  width: ceil((100% - 11%)/8);
}

.bgc_g {
  background-color: #93ed69;
}

// 右三角
.triangle_bottomleft {
  width: 0;
  height: 0;
  border-bottom: 15px solid #93ed69;
  border-right: 15px solid transparent;
}

// 左三角
.triangle_left {
  width: 0;
  height: 0;
  border-bottom: 15px solid #f5f5f5;
  border-left: 15px solid transparent;
}
.img {
  width: 30px;
  height: 30px;
}
// 信息盒子
.chatinfo {
  width: auto;
  min-width: 80px;
  min-height: 25px;
  max-width: 60%;
  word-wrap: break-word;
  white-space: normal;
  word-break: break-all;
  white-space: pre-wrap;
  word-wrap: break-word;
}
.em-box {
  overflow-y: scroll;
  height: 800px;
  .shou:hover {
    background-color: #f5f5f5;
  }
}
</style>