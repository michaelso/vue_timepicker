import Day from './components/Day.vue'
import Time from './components/Time.vue'

const routers = [
  {
    path: '/day',
    name: 'day',
    component: Day
  },
  {
    path: '/time',
    name: 'time',
    component: Time
  }
]
export default routers
