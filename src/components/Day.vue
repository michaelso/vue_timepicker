<template>
    <div class="block">
      <DatePicker
        v-model="value2"
        align="right"
        type="date"
        placeholder="select date"
        default-value="2018-03-01"
        ref="datePicker"
        :picker-options="pickerOptions1">
      </DatePicker>
    </div>
</template>

<script>
// const dates = ["2018-03-01", "2018-03-02", "2018-03-03", "2018-03-04", "2018-03-05", "2018-03-06", "2018-03-07", "2018-03-08", "2018-03-09", "2018-03-10", "2018-03-11", "2018-03-12", "2018-03-13", "2018-03-14", "2018-03-15"]
//   .map(v => new Date(`${v} 00:00:00`).getTime());

import DatePicker from './DatePicker'
export default {
  name: 'Day',
  components: {DatePicker},
  props: {
    dates_dict: Object
  },
  data() {
      return {
        pickerOptions1: {
          disabledDate:(date)=> {
            return !this.dates.includes(date.getTime())
          },
        },
        value2: '',
      };
  },
  computed:{
    dates: function () {
      const days = this.dates_dict;
      const days_keys = Object.keys(days);
      const days_values = days_keys.map(function(v) { return days[v]; });
      console.log(days_keys);
      console.log(days_values);
      // console.log(_.invert(days));

      return days_values.map(v => new Date(`${v} 00:00:00`).getTime())
    },
    day_id_dict: function () {
      let ret = {};
      for(let key in this.dates_dict){
        ret[this.dates_dict[key]] = key;
      }
      return ret
    }
  },
  methods: {

  },
  watch: {
    value2: function (value, old_value) {
      let picked_date = value.toISOString().substring(0, 10);
        this.$emit('picked_date', picked_date);
    }
  },
  mounted(){
    this.$refs.datePicker.focus();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
