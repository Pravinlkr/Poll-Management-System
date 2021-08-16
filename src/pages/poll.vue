<template>
  <div class="mt-3">
  <h3>All Active Polls</h3>
  <b-container class="bv-example-row">
  <b-row>
    <b-col v-for="(polls, index) in getPolls" v-bind:key="index">
      <b-card style="width: 20rem;" class="mb-2">
        <b-card-title>{{polls.title}}</b-card-title>
        <b-card-text v-for="(option, index) in polls.options" v-bind:key="index">
          {{option.option}}
        </b-card-text>
        <b-card-footer>
                <b-button variant="outline-primary" size="sm">Edit</b-button>
                <b-button variant="outline-danger" size="sm" class="ml-3">Delete</b-button>
        </b-card-footer>
      </b-card>
    </b-col>

  </b-row>
</b-container>
  
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name:'Poll',
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
