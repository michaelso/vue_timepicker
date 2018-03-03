<template>
<div class="Time el-select-dropdown el-popper" x-placement="bottom-start">
  <div class="el-select-dropdown__wrap">
    <ul class="el-scrollbar__view el-select-dropdown__list" style="position: relative;">
      <li class="el-select-dropdown__item"
        v-for="item in options"
        :class="{hover: item.value === value}"
        @click="$emit('input', item.value)"
      >
        <span>{{item.label}}</span>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  props: {
    options: {},
    value: {},
  },
  data() {
    return {}
  }
}
</script>

<style>
.Time{
  position: static;
  display: inline-block;
  box-shadow: none;
}
.Time .el-select-dropdown__wrap{
  max-height: none;
}
</style>
