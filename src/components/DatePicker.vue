<template>
  <div
    class="DatePicker el-date-editor el-range-editor "
    :class="[
      'el-date-editor--' + type,
      pickerSize ? `el-range-editor--${ pickerSize }` : '',
      pickerDisabled ? 'is-disabled' : '',
      pickerVisible ? 'is-active' : ''
    ]"
    ref="reference">
  </div>
</template>

<script>
import { DatePicker } from 'element-ui'

export default {
  extends: DatePicker,
  data() {
    return {
    }
  },
  mounted() {
    this.showPicker();
  },
  methods: {
    showPicker() {
     if (this.$isServer) return;
     if (!this.picker) {
       this.mountPicker();
     }
     this.pickerVisible = this.picker.visible = true;
     // this.updatePopper();
     this.picker.value = this.parsedValue;
     this.picker.resetView && this.picker.resetView();
     this.$nextTick(() => {
       this.picker.adjustSpinners && this.picker.adjustSpinners();
     });
   },
  },
}
</script>

<style lang="css">
.DatePicker .el-date-picker{
  transition: none;
}
.DatePicker  .popper__arrow{
  display: none;
}
.DatePicker .el-picker-panel{
  box-shadow: none;
}
</style>
