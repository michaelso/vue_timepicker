<template>
  <div id="app">
    <!--<div class="">-->
      <!--<router-link to="/day">date</router-link>-->
      <!--<router-link to="/time">time</router-link>-->
    <!--</div>-->
    <div class="">
      <!--<router-view></router-view>-->
      <span>fb_id: {{fb_id}}</span><br>
      <span>store_id: {{store_id}}</span><br>
    </div>
    <Day :fb_id="fb_id" :store_id="store_id" :input_dates="day_values" :dates_dict="day_dict" v-on:time_dict="handle_time"></Day>
    <Time :options="option2" v-model="selectedTime"></Time>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Day from './components/Day.vue'
import Time from './components/Time.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Day,
    Time
  },
  props: {

  },
  data() {
     return{
       query: this.$route.query,
       fb_id: this.$route.query.fb_id,
       store_id: this.$route.query.store_id,
       return_value: '9',
       day_values: [],
       day_dict: {},
       option2: [{
         value: '11:00',
         label: '11:00'
       },{
         value: '19:00',
         label: '19:00'
       }],
       selectedTime: null,
       time_display: false
     }
  },
  methods: {
    handle_time: function (payload) {
      console.log(payload)
      const keys = Object.keys(payload);
      const time_values = keys.map(function(v) { return payload[v]; });
      console.log(keys);
      console.log(time_values);
      let option2 = [];
      for (const [key, value] of Object.entries(payload)) {
        option2.push({
          value: key,
          label: value
        });
        console.log(key, value);
      }
      console.log(option2);
      this.option2 = option2;
      this.time_display = true;
    },

    get_days() {
      const local_this = this;
      fetch('http://ysl.dtwdigital.com.hk/demobooking/api?apikey=8h7dgbv865ubt9jajbv7&action=get_dates&store_id=' + this.store_id,
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

          const days = myJson['data'];
          const keys = Object.keys(days);
          local_this.day_values = keys.map(function(v) { return days[v]; });
          console.log(keys);
          console.log(local_this.day_values);

          local_this.day_dict = days;

        }).catch(function (error) {
          return error.response.json();
        }).then(function (errorData) {
          // errorData 裡面才是實際的 JSON 資料
          console.log("fetch error");
        });
    }
  },
  mounted: function () {
   this.get_days()
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
