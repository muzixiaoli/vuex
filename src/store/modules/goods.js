import types from '../mutation-types.js'
import axios from 'axios'
const state = {
    goods: [],
    shopShow: false,
    foodDetail: false,
    fixedTitle: "",
    food: {}


}
const getters = {
    goods(state) {
        return state.goods;
    },
    shopShow(state) {
        return state.shopShow;
    },
    foodDetail(state) {
        return state.foodDetail;
    },
    fixedTitle(state) {
        return state.fixedTitle;
    },
    food(state) {
        return state.food;
    },

    // heights(state) {
    //     return state.heights;
    // },
    // scrollY(state) {
    //     return state.scrollY;
    // }

};
const actions = {

    getgoods({ commit, state }) {
        axios.get("/api/goods").then(res => {
            if (res.data.errno == 0) {
                console.log(res.data);
                commit(types.GET_GOODS, res.data.data)
            }
        })
    },
    showShop({ commit, state }) {
        commit(types.SHOW_SHOP)
    },
    hideShop({ commit, state }) {
        commit(types.HIDE_SHOP)
    },
    showFood({ commit, state }) {
        commit(types.SHOW_FOOD)
    },
    hideFood({ commit, state }) {
        commit(types.HIDE_FOOD)
    },
    saveMsg({ commit, state }, n) {
        commit(types.FIXED_T, n)
    },
    selectFood({ commit, state }, food) {
        commit(types.SELECTED_FOOD, food)
    },


};
const mutations = {
    [types.GET_GOODS](state, data) {
        state.goods = data;
    },

    [types.SHOW_SHOP](state) {
        state.shopShow = true;
    },
    [types.HIDE_SHOP](state) {
        state.shopShow = false;
    },
    [types.SHOW_FOOD](state) {
        state.foodDetail = true;
    },
    [types.HIDE_FOOD](state) {
        state.foodDetail = false;
    },
    [types.FIXED_T](state, fixedTitle) {
        state.fixedTitle = fixedTitle;
    },
    [types.SELECTED_FOOD](state, food) {
        state.food = food;
    }



}
export default {
    state,
    getters,
    actions,
    mutations

}
