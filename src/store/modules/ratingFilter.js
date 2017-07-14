// import types from '../mutation-types.js'

// const state = {
//     typeArr: ["全部", "推荐", '吐槽'],
//     selectedType: 2,
//     onlyText: false,
//     seletedRate: [],
//     ratingArr: []
// }
// const getters = {
//     ratingArr(state) {
//         return state.ratingArr;
//     },
//     onlyText(state) {
//         return state.onlyText;
//     },
//     onlyText(state) {
//         return state.onlyText;
//     },
//     typeArr(state) {
//         return state.typeArr;
//     },
//     seletedRate(state) {
//         return state.seletedRate;
//     },
//     selectedType(state) {
//         return state.selectedType;
//     },

// };
// const actions = {
//     getratingArr({ commit, state }, rateArr) {

//         commit(types.GET_RATIEARR, rateArr);

//     },
//     changeType({ commit, state }, _type) {

//         commit(types.CHANGE_TYPE, _type);

//     },
//     toggle({ commit }) {
//         commit(types.TOGGLE)
//     }
// }
// const mutations = {
//     [types.GET_RATIEARR](state, rateArr) {
//         state.ratingArr = rateArr;
//         console.log("hdkfkj");
//         console.log(rateArr);
//     },

//     [types.CHANGE_TYPE](state, _type) {

//         state.selectedType = _type;


//         state.seletedRate = state.ratingArr.filter(rating => {

//             if (state.selectedType === 2) {
//                 return state.onlyText ? rating.text : true;

//             } else {
//                 return rating.rateType === state.selectedType && (state.onlyText ? rating.text : true);
//             }

//         })

//     },
//     [types.TOGGLE](state) {
//         state.onlyText = !state.onlyText;
//         if (state.onlyText) {
//             state.seletedRate = state.seletedRate.filter(rating => {
//                 return state.onlyText ? rating.text : true
//             })

//         } else {
//             state.seletedRate = state.ratingArr.filter(rating => {

//                 if (state.selectedType === 2) {
//                     return state.onlyText ? rating.text : true;

//                 } else {
//                     return rating.rateType === state.selectedType;
//                 }

//             })
//         }
//     }


// }
// export default {
//     state,
//     getters,
//     actions,
//     mutations

// }
