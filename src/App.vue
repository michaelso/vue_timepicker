<template>
  <div id="app">
    <!--<div class="">-->
      <!--<router-link to="/day">date</router-link>-->
      <!--<router-link to="/time">time</router-link>-->
    <!--</div>-->
    <div class="">
      <!--<router-view></router-view>-->
      <!--<span>fb_id: {{fb_id}}</span><br>-->
      <!--<span>store_id: {{store_id}}</span><br>-->
    </div>
    <Day :dates_dict="dates_dict" v-on:picked_date="handle_picked_date"></Day>
    <Time v-if="time_display" :options="time_dict" v-model="selectedTime"></Time>
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
  data: function() {
     return{
       fb_id: this.$route.query.fb_id,
       store_id: this.$route.query.store_id,

       dates_dict: {},
       picked_date: '',

       available_time: {},
       time_dict: [{
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
  computed: {
    day_id_dict: function () {
      const ret = {};
      for(let key in this.dates_dict){
        ret[this.dates_dict[key]] = key;
      }
      return ret
    },

    date_id: function () {
      return this.day_id_dict[this.picked_date];
    }
  },
  watch : {
    selectedTime: function (value, old_value) {
      console.log('selectedTime');
      console.log(this.available_time[value]);
      console.log(value);
    }
  },
  methods: {
    handle_picked_date: async function (payload) {
      console.log('handle_picked_date');
      console.log(payload);
      this.picked_date = payload;

      const myJson = await this.get_cms('get_times')
      const available_time = myJson['data'];
      console.log('available_time');
      console.log(available_time);
      this.available_time = available_time;
      let time_dict = [];
      for (const [key, value] of Object.entries(available_time)) {
        time_dict.push({
          value: key,
          label: value
        });
        console.log(key, value);
      }
      console.log(time_dict);
      this.time_dict = time_dict;
      this.time_display = true;

    },

    get_cms: async function (action) {
      // const host = 'https://ysl.dtwdigital.com.hk/demobooking/api?apikey=8h7dgbv865ubt9jajbv7';
      // let url = host + '&action=' + action + '&store_id=' + this.store_id;

      const host = 'https://us-central1-ysl-hand-massage-booking-2018.cloudfunctions.net/request_cms';
      let url = host + '?action=' + action + '&store_id=' + this.store_id;

      if(action === 'get_times'){
        const date_id = this.day_id_dict[this.picked_date];
        url = url + '&date_id=' + date_id;
      }
      console.log(url);
      try{
        // await response of fetch call
        console.log('before await fetch()');
        let response = await fetch(url);
        // only proceed once promise is resolved
        let data = await response.json();
        // only proceed once second promise is resolved
        console.log(data);
        return data;
      }catch (e) {
        console.error('fetch error:', e.message);
      }
    },

  },
  mounted: async function () {
    const myJson = await this.get_cms('get_dates')
    const days = myJson['data'];
    const keys = Object.keys(days);
    const day_values = keys.map(v => days[v]);
    // console.log(keys);
    // console.log(this.day_values);

    this.dates_dict = days;
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
