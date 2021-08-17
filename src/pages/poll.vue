<template>
  <div class="mt-3">
      <div class="headerOfPoll">
          <h3>All Active Polls</h3>
          <add-polls></add-polls>
      </div>
  <b-container class="bv-example-row">
  <b-row>
    <b-col v-for="(polls, index) in getPolls" v-bind:key="index">
      <b-card style="width: 20rem;" class="mb-2">
        <b-card-title>
            <span>{{polls.title}}</span>        
        </b-card-title>
        <b-card-text v-for="(option, index) in polls.options" v-bind:key="index">
          {{option.option}}
        </b-card-text>
        <b-card-footer>
                <edit-poll :editId="polls._id"></edit-poll>
                <b-button variant="outline-danger" size="sm" class="ml-3" @click="deleteSinglePoll({id:polls._id})">Delete</b-button>
        </b-card-footer>
      </b-card>
    </b-col>

  </b-row>
</b-container>
  
</div>
</template>

<script>
import editPoll from '../components/editPoll.vue'
import addPolls from '../components/addPolls.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
    name:'Poll',
    components:{
        addPolls,
        editPoll
    },
    computed:{
      ...mapGetters('poll',['getPolls'])
    },
    methods:{
      ...mapActions('poll',['getAllPolls','deletePoll']),
      deleteSinglePoll(payload){
          this.deletePoll(payload);
      }
    },
    mounted(){
      this.getAllPolls();
    }
}
</script>
