import axios from 'axios'

export default {
    namespaced: true,
    state: {
        caja: null
    },
    getters: {
        caja (state) {
            return state.caja
        }

    },
    mutations: {
        SET_CAJA(state, caja) {
            state.caja = caja
        }
    },
    actions: {
        buscar_caja({ commit, rootState }) {
            axios.get(`/cajas/find/${rootState.sucursal.sucursal.id}`)
                .then((result) => {
                    commit('SET_CAJA', {
                        'id': result.data.data.id,
                        'created_at': result.data.data.attributes.created_at
                    })
                })
                .catch(() => {
                    commit('SET_CAJA', null)
                })                
        },

        async iniciar_caja ( { rootState }, data ){
            return await axios.post('/cajas', {
                'data': {
                    'type': 'cajas',
                    'attributes': {
                        'dinero_inicial': data.dinero_inicial
                    },
                    'relationships': {
                        'sucursal': {
                            'data': {
                                'id': rootState.sucursal.sucursal.id,
                                'type': 'sucursals'
                            }
                        }
                    }
                }
            })
        },
        async cerrar_caja ( { state }, data ) {
            return axios.post(`/cajas/${state.caja.id}/close`, {
                'data': {
                    'id': (state.caja.id).toString(),
                    'type': 'cajas',
                    'attributes': {
                        'dinero_final': data.dinero_final
                    }
                }
            })
        },

        set_caja({ commit }, data) {
            commit('SET_CAJA', data)
        },
        
    }
}
