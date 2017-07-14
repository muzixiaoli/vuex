
import types from '../mutation-types.js'
const state = {
    count: 0

}
const getters = {
    count(state) {
        return state.count;
    }

}
const actions = {
   increment({ commit, state }) {
       commit(types.INCREMENT);
    },
    decrement({ commit, state }) {
       commit(types.DECREMENT);
    }


};
const mutations = {
    [types.INCREMENT](state) {
        state.count ++;
    },
    [types.DECREMENT](state) {
        state.count --;
    }



}
export default {
    state,
    getters,
    actions,
    mutations

}