import types from '../mutation-types.js'
import axios from 'axios'
const state = {
    ratings: [],
    typeArr: ["全部", "推荐", '吐槽'],
    selectedType: 2,
    onlyText: false,
    seletedRate: [],
    ratingArr: []
}
const getters = {

    ratings(state) {
        return state.ratings;
    },
    onlyText(state) {
        return state.onlyText;
    },
    typeArr(state) {
        return state.typeArr;
    },
    seletedRate(state) {
        return state.seletedRate;
    },
    selectedType(state) {
        return state.selectedType;
    },
    ratingArr(state) {
        return state.ratingArr;
    },


};
const actions = {
    getratings({ commit, state }) {
        axios.get("/api/ratings").then(res => {
            if (res.data.errno == 0) {
                commit(types.GET_RATINGS, res.data.data);

            }
        })
    },
    changeType({ commit, state }, _type) {

        commit(types.CHANGE_TYPE, _type);

    },
    toggle({ commit }) {
        commit(types.TOGGLE)
    },
    getfoodsFilter({ commit }, foodsFilter) {
        console.log(foodsFilter, "ghj");

        commit(types.GET_FOODFILTER, foodsFilter)
    },
}
const mutations = {
    [types.GET_RATINGS](state, data) {
        state.ratings = data;
        state.ratingArr = data;
        state.seletedRate = data;
    },
    //
    [types.GET_FOODFILTER](state, foodsFilter) {
        state.ratingArr = foodsFilter;
        state.seletedRate = foodsFilter;
        console.log(state.ratingArr, "jhh");
        console.log(state.seletedRate, "jdsdjsjf");
    },
    [types.CHANGE_TYPE](state, _type) {

        state.selectedType = _type;

        state.seletedRate = state.ratingArr.filter(rating => {

            if (state.selectedType === 2) {
                return state.onlyText ? rating.text : true;

            } else {
                return rating.rateType === state.selectedType && (state.onlyText ? rating.text : true);
            }

        })

    },
    [types.TOGGLE](state) {
        state.onlyText = !state.onlyText;
        if (state.onlyText) {
            state.seletedRate = state.seletedRate.filter(rating => {
                return state.onlyText ? rating.text : true
            })

        } else {
            state.seletedRate = state.ratingArr.filter(rating => {

                if (state.selectedType === 2) {
                    return state.onlyText ? rating.text : true;

                } else {
                    return rating.rateType === state.selectedType;
                }

            })
        }



    }


}
export default {
    state,
    getters,
    actions,
    mutations

}
