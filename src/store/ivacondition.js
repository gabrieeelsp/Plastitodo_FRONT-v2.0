import axios from 'axios'

export default {
    namespaced: true,
    state: {
        ivaconditions: []
    },
    getters: {
        ivaconditions (state) {
            return state.ivaconditions
        }

    },
    mutations: {
        SET_IVACONDITIONS(state, data) {
            state.ivaconditions = data
        }
    },
    actions: {
        buscar_ivaconditions({ commit }) {
            axios.get(`/ivaconditions`)
                .then((result) => {
                    commit('SET_IVACONDITIONS', result.data.data)
                    //console.log(result.data.data)
                })
                .catch(() => {
                    commit('SET_IVACONDITIONS', null)
                })
                            
        },

        

        set_ivaconditions({ commit }, data) {
            commit('SET_IVACONDITIONS', data)
        },
        
    }
}
