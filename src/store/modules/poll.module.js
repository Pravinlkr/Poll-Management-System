import axios from 'axios'

const state = {
    loggedIN:false,
    role:'',
    allPolls:[],
    message:''
}
const getters = {
    getPolls(state){
        console.log(state.allPolls)
        return state.allPolls;
    },
    getMessage(state){
        return state.message;
    }
}
const mutations = {
    GET_ALL_POLLS(state, payload){
        state.allPolls = payload;
        return state.allPolls
    },
    LOGIN_USER(state,payload){
        if(payload == 0){
            state.loggedIN = true
            state.message = 'Logged In Successfully'
        }
        else{
            state.loggedIN = false
            state.message = 'Incorrect Username or Password'
        }
    }
}
const actions = {
    getAllPolls({commit}){
        axios
        .get('https://secure-refuge-14993.herokuapp.com/list_polls?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWEwMTgyYzU5NTI3ZmUwMDEyMzcwN2IyIiwiaWF0IjoxNTEwMDQ4NDY4LCJleHAiOjE1MTM2NDg0Njh9.DG93Hq-Fde9kNZbgnr34l2dZyeEYyJ0OfD_9yZK1JCQ')
        .then(response =>{
            let data = response.data.data
            commit('GET_ALL_POLLS',data)
        })
        .catch(error =>{
            console.log(error)
        })
    },
    loginUser({commit},state, payload){
        axios.get(`https://secure-refuge-14993.herokuapp.com/login?username=${payload.userName}&password=${payload.password}`)
        .then(response=>{
            commit('LOGIN_USER', response.data.error);
        })
        .catch(error=>{
          console.log(error)
        })
    }
}

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}