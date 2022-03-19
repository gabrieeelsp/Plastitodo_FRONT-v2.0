import axios from 'axios'

export default {
    namespaced: true,
    state: {
        sale_showed: null
    },
    getters: {
        sale_showed ( state ) {
            return state.sale_showed
        }

    },
    mutations: {
        SET_SALE_SHOWED( state, sale) {
            state.sale_showed = sale
        }

    },
    actions: {
        async search_sale_showed( _ , id ) {
            return await axios.get(`/sales/${id}`);
        },
        set_sale_showed( { commit }, sale) {
            commit('SET_SALE_SHOWED', sale)
        },

        add_payment( {  state, rootState }, payment) {
            console.log(state.sale_showed)
            return axios.post('payments', {
                'data': {
                    'type': 'payments',
                    'attributes': {
                        'valor': payment.valor,
                        
                    },
                    'relationships': {
                        'paymentmethod': {
                            'data': {
                                'id': payment.paymentmethod_id
                            }
                        },
                        'caja': {
                            'data': {
                                'id': rootState.caja.caja.id
                            }
                        },
                        'sale': {
                            'data': {
                                'id': state.sale_showed.id
                            }
                        },
                    }
                }
            })
        }
        
    }
}
