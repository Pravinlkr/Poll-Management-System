import axios from 'axios'
const state = {
    loggedIN:false,
    allPolls:[],
    role: '',
    message:''
}
const getters = {
    getPolls(state){
        return state.allPolls;
    },
    getMessage(state){
        return state.message;
    },
    isLoggedIn(state){
        var localUserDetails = JSON.parse(localStorage.getItem('LoginCredentials'));
        if(localUserDetails){
            state.loggedIN = localUserDetails.loggedIN;
        }
        return state.loggedIN
    }
}
const mutations = {
    GET_ALL_POLLS(state, payload){
        state.allPolls = payload;
        return state.allPolls
    },
    LOGIN_USER(state,payload){
        if(payload.error == 0){
            state.loggedIN = true;
            state.role = payload.data.role;
            state.message = 'Logged In Successfully';

            let user = {userDetails: payload.data,loggedIN: true}
            const parsed = JSON.stringify(user);
            localStorage.setItem('LoginCredentials',parsed);
        }
        else{
            state.message = 'Wrong UserName Or Password'
        }
        
    },
    LOGOUT(state){
        state.loggedIN = false
        localStorage.clear();
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
    loginUser({commit}, payload){
        axios.get(`https://secure-refuge-14993.herokuapp.com/login?username=${payload.userName}&password=${payload.password}`)
        .then(response=>{
            let userFilteredData = []
                axios.get(`https://secure-refuge-14993.herokuapp.com/list_users`)
                .then(response2=>{
                    let i=0;
                    for(i=0; i<response2.data.data.length; i++){
                        if(response2.data.data[i].username == payload.userName && response2.data.data[i].password == payload.password){
                            userFilteredData = response2.data.data[i]
                        }
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
                commit('LOGIN_USER', {error:response.data.error ,data:userFilteredData})
        })
        .catch(error=>{
          console.log(error)
        })
    },
    logOut({commit}){
        commit('LOGOUT');
    }
}

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}