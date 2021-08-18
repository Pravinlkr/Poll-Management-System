<template>
  <div class="mt-5">
    <b-container class="d-flex flex-wrap justify-content-center">
      <b-table :items="getUserList" class="mt-3" outlined caption-top>
      <template #table-caption>All User's List</template>
    </b-table>
    </b-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
 name:'addUser',
    computed:{
      ...mapGetters('user',['getUserList'])
    },
    methods:{
      ...mapActions('user',['getUsersList']),
      Delete(id){
        console.log(id);
      }
    },
    mounted(){
      this.getUsersList();
    }
}
</script>
