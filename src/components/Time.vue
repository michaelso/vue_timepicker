<template>
  <el-select v-model="value" placeholder="select time">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    props: {
      options_time: Array
    },
    data() {
      return {
        options: [{
          value: '选项1',
          label: '11:00'
        },{
          value: '选项6',
          label: '19:00'
        }],
        value: ''
      }
    }
  }
</script>
