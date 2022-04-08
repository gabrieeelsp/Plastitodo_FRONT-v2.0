import axios from 'axios'

export default {
    namespaced: true,
    state: {
        modelofacts: []
    },
    getters: {
        modelofacts (state) {
            return state.modelofacts
        },
        modelofacts_select ( state ) {
            let items = [{
                name: '',
                id: 0
            }]
            for (let item of state.modelofacts ) {
                items.push({
                    name: item.attributes.name,
                    id: item.id
                    })
            }
            return items
        }

    },
    mutations: {
        SET_MODELOFACTS(state, data) {
            state.modelofacts = data
        }
    },
    actions: {
        buscar_modelofacts({ commit }) {
            axios.get(`/modelofacts`)
                .then((result) => {
                    commit('SET_MODELOFACTS', result.data.data)
                    //console.log(result.data.data)
                })
                .catch(() => {
                    commit('SET_MODELOFACTS', null)
                })
                            
        },

        

        set_modelofacts({ commit }, data) {
            commit('SET_MODELOFACTS', data)
        },
        
    }
}
