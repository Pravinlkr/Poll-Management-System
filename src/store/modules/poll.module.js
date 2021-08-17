import axios from 'axios'
const state = {
    loggedIN:false,
    allPolls:[],
    role: '',
    message:'',
    selectedPoll:[]
}
const getters = {
    getPolls(state){
        return state.allPolls;
    },
    getSelectedPoll(state){
        return state.selectedPoll;
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
    },
    ADD_POLL(state){
        state.message = 'New Payload added'
    },
    FETCH_POLL_WITH_ID(state,payload){
        state.selectedPoll = payload
    },
    REMOVE_OPTION(state){
        state.message = 'option removed'
    },
    UPDATE_POLL_TITLE(state){
        state.message = 'poll title updated'
    },
    ADD_NEW_OPTION(state){
        state.message = 'new Options Added'
    },
    VOTE_A_POLL(state){
        state.message = 'Voted Successfully'
    },
    DELETE_POLL(state,payload){
        state.message = payload.id + 'Id no poll is deleted'
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
    },
    addPoll({commit, dispatch},payload){
        axios.get(`https://secure-refuge-14993.herokuapp.com/add_poll?title=${payload.title}&options=${payload.allOptions}`)
        .then(response=>{
            if(response.data.error == 0){
                dispatch('getAllPolls')
            }
        })
        .catch(error=>{
            console.log(error)
        })
        commit('ADD_POLL',payload)
    },
    fetchPollWithId({commit},payload){
        if(payload){
        axios.get(`https://secure-refuge-14993.herokuapp.com/list_poll?id=${payload}`)
        .then(response=>{
            commit('FETCH_POLL_WITH_ID',response.data.data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    },
    removeOption({commit, dispatch},payload){
        axios.get(`https://secure-refuge-14993.herokuapp.com/delete_poll_option?id=${payload.id}&option_text=${payload.optionText}`)
        .then(response=>{
            console.log(response)
            commit('REMOVE_OPTION')
            dispatch('fetchPollWithId',payload.id)
            dispatch('getAllPolls')
        })
        .catch(error=>{
            console.log(error)
        })
    },
    updatePollTitle({commit, dispatch},payload){
        axios.get(`https://secure-refuge-14993.herokuapp.com/update_poll_title?id=${payload.id}&title=${payload.title}`)
        .then(response=>{
            console.log(response)
            commit('UPDATE_POLL_TITLE');
            dispatch('getAllPolls')
        })
        .catch(error=>{
            console.log(error)
        })
    },
    addNewOptionAction({commit,dispatch},payload){
        for(let i=0; i<payload.data.length; i++){
            var opt = payload.data[i].value;
            console.log(opt)
            axios.get(`https://secure-refuge-14993.herokuapp.com/add_new_option?id=${payload.id}&option_text=${opt}`)
            .then(response=>{
                console.log(response)
                commit('ADD_NEW_OPTION')
                dispatch('getAllPolls')
            })
            .catch(error=>{
                console.log(error)
            })
        }
    },
    deletePoll({commit, dispatch},payload){
        axios.get(`https://secure-refuge-14993.herokuapp.com/delete_poll?id=${payload.id}`)
        .then(response=>{
            if(response.data.error == 0){
                dispatch('getAllPolls')
            }
        })
        .catch(error=>{
            console.log(error)
        })
        commit('DELETE_POLL', payload)
    },
    voteApoll({commit,dispatch},payload){
        axios.get(`https://secure-refuge-14993.herokuapp.com/do_vote?id=${payload.id}&option_text=${payload.option_text}`)
        .then(response=>{
            console.log(response)
            commit('VOTE_A_POLL')
            dispatch('fetchPollWithId',payload.id)
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