<template>
  <div class="index">
    <div class="flex jcsb width-100 font-s-12 font-c-w">
      <!-- {/* 头部 */} -->
      <div class="width-30 p-10 box1">
        <div>{{ data.orderCount }}</div>
        <div>订单总数</div>
      </div>
      <div class="width-30 p-10 box2">
        <div>{{ data.goodsCount }}</div>
        <div>商品总数</div>
      </div>
      <div class="width-30 p-10 box3">
        <div>{{ data.userCount }}</div>
        <div>用户总数</div>
      </div>
    </div>
    <!-- {/* 数据折线图 */} -->
    <div class="flex jcsb m-tb-25 width-100">
      <div class="width-49 p-t-10" ref="eCharts1" style="height: 300px;"></div>
      <div class="width-49 p-t-10" ref="eCharts2" style="height: 300px;"></div>
    </div>

    <div class="p-t-10" ref="eCharts3" style="height: 400px;"></div>
  </div>
</template>

<script setup lang="ts">
import api from '../../http/api'
import { onMounted, ref, inject } from 'vue'
import { OrderType } from '../../types/index'
import dayjs from 'dayjs'

let echarts = ref<any>(inject("ec"));//引入


let data = ref<any>('')
let eCharts1 = ref<any>(null)
let eCharts2 = ref<any>(null)
let eCharts3 = ref<any>(null)

onMounted(() => {
  api.getIndex().then((res: any) => {
    if (res.code === 200) {
      data.value = res.data
    }
  })

  // 订单
  // 订单数据

  let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  let sumprice = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  let myChart = echarts.value.init(eCharts1.value!);
  let myChart1 = echarts.value.init(eCharts2.value!);

  api.getOrder().then((res: any) => {
    res.data.map((i: OrderType) => {
      if (new Date().toDateString() === new Date(i.pay_time).toDateString()) {
        sum[dayjs(i.pay_time).hour()] += 1
        sumprice[dayjs(i.pay_time).hour()] += Number(i.price)
      }
    })
    let option = {
      title: {
        text: '今日订单',
        textStyle: {
          fontSize: 12
        }
      },
      color: ['#73C0DE'],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['今日订单总计']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '今日订单总计',
          type: 'line',
          stack: '总量',
          data: sum
        },
      ]
    };
    option && myChart.setOption(option);

    // 销售额
    let option1 = {
      title: {
        text: '今日销售额',
        textStyle: {
          fontSize: 12
        }
      },
      color: ['#FFECAD'],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['今日销售额总计']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '今日销售额总计',
          type: 'line',
          stack: '总量',
          data: sumprice
        },
      ]
    };
    option1 && myChart1.setOption(option1);
  })


  // 获取分类
  var myChart2 = echarts.value.init(eCharts3.value!);
  api.getCategory('').then((res: any) => {
    let data = [] as any
    res.data.map((item: any) => {
      data.push({ value: item.list.length, name: item.name },)
    })
    let option2 = {
      title: {
        text: '商品分类',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        padding: [50, 0, 10, 10]
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    option2 && myChart2.setOption(option2);
  })

})
</script>

<style lang="scss" scoped>
.index {
  .box1 {
    background-color: red;
  }
  .box2 {
    background-color: #00ba61;
  }
  .box3 {
    background-color: #1e2d3c;
  }
}
</style>