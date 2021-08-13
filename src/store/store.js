import Vue from 'vue'
import Vuex from 'vuex'

import poll from './modules/poll.module'


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        poll
    }
})