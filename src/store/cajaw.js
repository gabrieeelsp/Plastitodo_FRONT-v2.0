import axios from 'axios'
export default {
    namespaced: true,
    state: {
        caja: null
    },
    getters: {

        caja (state) {
            return state.caja
        },
        is_opened(state) {
            return state.caja != null
        },


        sucursal (rootGetters) {
            rootGetters.sucursal
            // rootGetters['namesapce/getterName'] 
        }

    },
    mutations: {
        SET_CAJA(state, caja) {
            state.caja = caja
        }

    },
    actions: {
        iniciar_caja ( { commit, rootGetters }, data) {
            axios.post('/cajas', {
                'data': {
                    'type': 'cajas',
                    'attributes': {
                        'dinero_inicial': data.dinero_inicial
                    },
                    'relationships': {
                        'sucursal': {
                            'data': {
                                'id': rootGetters.sucursal.id,
                                'type': 'sucursals'
                            }
                        }
                    }
                }
            }).
                then((result) => {
                    commit('SET_CAJA', {
                        'id': result.data.data.id,
                        'created_at': result.data.data.attributes.created_at

                    })
                    return true
                })
                .catch(() => {
                    return false
                })
        },
        cerrar_caja ( { commit, state }, data) {
            axios.patch(`/cajas/${state.caja.id}/close`, {
                'data': {
                    'id': (state.caja.id).toString(),
                    'type': 'cajas',
                    'attributes': {
                        'dinero_final': data.dinero_final
                    }
                }
            }).
                then(() => {
                    commit('SET_CAJA')
                })
                
        },
        set_caja({ commit }, data) {
            commit('SET_CAJA', data)
        },

        // crear el metodo attempt buscar caja para una sucursal especificada en el store
        buscar_caja({ commit, rootGetters }) {
            axios.get(`/cajas/find/${rootGetters.sucursal.id}`)
                .then((result) => {
                    commit('SET_CAJA', {
                        'id': result.data.data.id,
                        'created_at': result.data.data.attributes.created_at

                    })
                })
                .catch(() => {
                    commit('SET_CAJA', null)
                })                
        }
    }
}
