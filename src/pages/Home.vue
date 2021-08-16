<template>
<div class="mt-3">
  <h3>Welcome To PMS</h3>
  <b-container class="bv-example-row">
  <b-row>
    <b-col v-for="(polls, index) in getPolls" v-bind:key="index">
      <b-card style="width: 20rem;" class="mb-2">
        <b-card-title>{{polls.title}}</b-card-title>
        <b-card-text v-for="(option, index) in polls.options" v-bind:key="index">
          {{option.option}}
        </b-card-text>
      </b-card>
    </b-col>

  </b-row>
</b-container>
  
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name:'Home',
    computed:{
      ...mapGetters('poll',['getPolls'])
    },
    methods:{
      ...mapActions('poll',['getAllPolls'])
    },
    mounted(){
      this.getAllPolls();
    }
}
</script>
