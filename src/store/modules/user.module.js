import axios from 'axios'
const state = {
    userList:[],
    message:''
}
const getters = {
    getUserList(state){
        return state.userList;
    }
}

const mutations = {
    GET_USERS_LIST(state,payload){
        state.userList = payload
    },
    CREATE_ACCOUNT(state){
        state.message = 'account created successfully'
    }
}
const actions = {
    createAccount({commit},payload){
        axios.get(`https://secure-refuge-14993.herokuapp.com/add_user?username=${payload.username}&password=${payload.password}&role=${payload.role}`)
        .then(response=>{
            console.log(response);
            commit('CREATE_ACCOUNT')
        })
        .catch(error=>{
            console.log(error)
        })
    },
    getUsersList({commit}){
        axios.get(`https://secure-refuge-14993.herokuapp.com/list_users`)
        .then(response=>{
            console.log(response.data.data)
            commit('GET_USERS_LIST', response.data.data)
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