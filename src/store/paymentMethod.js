import axios from 'axios'

export default {
    namespaced: true,
    state: {
        paymentsMethods: []
    },
    getters: {
        paymentMethods (state) {
            return state.paymentsMethods
        }

    },
    mutations: {
        SET_PAYMENTMETHODS(state, data) {
            state.paymentsMethods = data
        }
    },
    actions: {
        buscar_paymentMethods({ commit }) {
            axios.get(`/paymentmethods`)
                .then((result) => {
                    commit('SET_PAYMENTMETHODS', result.data.data)
                })
                .catch(() => {
                    commit('SET_PAYMENTMETHODS', null)
                })                
        },

        

        set_paymentsMethods({ commit }, data) {
            commit('SET_PAYMENTMETHODS', data)
        },
        
    }
}
