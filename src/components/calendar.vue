<!--  -->
<template>
  <div>
    <Calendar
 v-model="calendarShow"
 :defaultDate="defaultDate"
 @change="handelChange">
</Calendar>
  </div>
</template>

<script>
import Calendar from 'vue-mobile-calendar'
export default {
  data () {
    return {
    }
  },
  components: {
    Calendar
  },
  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
