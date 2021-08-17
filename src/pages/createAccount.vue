<template>
<div class="mt-5">
    <b-container class="d-flex flex-wrap justify-content-center">
        <b-row>
            <b-col>
                <b-card title="Create an Account" style="width:20rem">
                    <b-card-text>
                        <b-form-group>
                            <b-form-input type="text" placeholder="Enter username" class="mt-3" v-model="userName"></b-form-input>
                        </b-form-group>

                        <b-form-group>
                            <b-form-input type="password" placeholder="Enter password" class="mt-3" v-model="password"></b-form-input>
                        </b-form-group>

                        <b-form-group>
                            <b-form-input type="password" placeholder="Confirm password" class="mt-3" v-model="cpassword"></b-form-input>
                        </b-form-group>
                        
                        <b-form-group
                            label="Role"
                            label-for="title-input" class="mt-3">
                            <b-form-select id="role" v-model="userRole" :options="role" style="width:90%"></b-form-select>
                        </b-form-group>

                        <b-button type="submit" variant="primary" class="mt-3" @click="signup()">Create</b-button>
                    </b-card-text>
                    <b-card-text>
                       <router-link :to="{path:'/login'}"> Have Account? Login </router-link>
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
import {mapActions} from 'vuex'
export default {
    name: 'createAccount',
    data(){
        return{
            userName:'',
            password:'',
            cpassword:'',
            userRole:'',
            message:'',
            role:[
                {value:null, text:'Please Select An Option', disabled: true},
                { value: 'admin', text: 'Admin' },
                { value: 'guest', text: 'Guest' }
        ]
        }
    },
    methods:{
        ...mapActions('user',['createAccount']),
        signup(){
            this.userName = this.userName.trim('')
            this.password = this.password.trim('')
            this.cpassword = this.cpassword.trim('')
            this.userRole = this.userRole.trim('')

            if(this.userName){
                if(this.password){
                    if(this.cpassword){
                        if(this.userRole){
                            if(this.password == this.cpassword){
                                this.createAccount({username:this.userName, password:this.password, role:this.userRole})
                                this.$router.push('/login')
                            }
                            else{
                                this.message = 'Password Did not Match, Try Again.'
                            }
                        }else{
                            this.message = 'Please Select a Role'
                        }
                    }
                    else{
                        this.message = 'Please Confirm Password'
                    }
                }
                else{
                    this.message = 'Password is Mendatory'
                }
            }
            else{
                this.message = 'User Name is Mendatory'
            }
        }
    }
}
</script>
