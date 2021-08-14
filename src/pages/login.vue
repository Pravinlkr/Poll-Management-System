<template>
<div class="mt-5">
  <b-container class="d-flex flex-wrap justify-content-center">
  <b-row>
    <b-col>
      <b-card title="Login" style="width:20rem">
    <b-card-text>
      <b-form-group>
        <b-form-input
          type="text"
          placeholder="Enter username"
          class="mt-3"
          v-model="userName"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          type="password"
          placeholder="Enter password"
          class="mt-3"
          v-model="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="mt-3" @click="login()">Login</b-button>
    </b-card-text>
    <b-card-text>
      {{message}}
    </b-card-text>
  </b-card>
    </b-col>

  </b-row>
</b-container>
</div>
</template>

<script>
import {mapGetters ,mapActions} from 'vuex'
export default {
    name:'Login',
    data(){
      return{
        userName:'',
        password:'',
        message:''
      }
    },
    computed:{
      ...mapGetters('poll',['getMessage'])
    },
    watch:{
      message(){
        this.message = this.getMessage;
      }
    },
    methods:{
      ...mapActions('poll',['loginUser']),
      login(){
        this.userName = this.userName.trim('')
        this.password = this.password.trim('')
        if(this.userName){
          if(this.password){
            this.loginUser({userName:this.userName,password:this.password})
          }
          else{
            this.message = 'Password can not be empty'
          }
        }
        else{
          this.message = 'UserName can not be empty'
        }
      }
    }
}
</script>

<style>

</style>