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
      <span>{{value2}}</span><br>
      <span>new_days: {{new_days}}</span><br>
      <span>dates_dict: {{dates_dict}}</span><br>
      <span>day_id_dict: {{day_id_dict}}</span><br>
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
    fb_id: String,
    store_id: String,
    input_dates: Array,
    dates_dict: Object
  },
  data() {
      return {
        pickerOptions1: {
          disabledDate:(date)=> {
            return !this.dates.includes(date.getTime())
          },
        },
        value1: '',
        value2: '',
        return_value: '',
        old_days:'',
        new_days:''
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
      var ret = {};
      for(var key in this.dates_dict){
        ret[this.dates_dict[key]] = key;
      }
      return ret
    }
  },
  methods: {
    get_time() {
      const date_id = this.day_id_dict[this.new_days];
      const local_this = this;
      fetch('http://ysl.dtwdigital.com.hk/demobooking/api?apikey=8h7dgbv865ubt9jajbv7&action=get_times&store_id='+this.store_id+'&date_id='+date_id,
        {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
        })
        .then(function (response) {
          console.log("fetch callback");
          return response.json();
        })
        .then(function (myJson) {
          console.log(myJson);
          local_this.$emit('time_dict', myJson['data']);

        }).catch(function (error) {
        return error.response.json();
      }).then(function (errorData) {
        // errorData 裡面才是實際的 JSON 資料
        console.log("fetch error");
      });
    }
  },
  watch: {
    value2: function (value, old_value) {
      this.old_days = old_value;
      this.new_days = value.toISOString().substring(0, 10);
      this.get_time();
    }
  },
  mounted(){
    this.$refs.datePicker.focus()
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
