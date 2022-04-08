import axios from 'axios'

export default {
    namespaced: true,
    state: {
        loading: false,
        sales: null,
        list_meta: {
            page: 1,
            limit: 10,
        },
        client_id: null,
        user_id: null,

        sale: null,
        devolution_editing: null,
        creditnote_editing: null,
        debitnote_editing: null
    },
    getters: {
        loading ( state ) {
            return state.loading
        },

        list_meta ( state ) {
            return state.list_meta
        },

        sales ( state ) {
            return state.sales
        },

        client_id ( state ) {
            return state.client_id
        },
        user_id ( state ) {
            return state.user_id
        },
        sale ( state ) {
            return state.sale
        },
        devolution_editing ( state ) {
            return state.devolution_editing
        },

        is_saleStockUnitario( state ) {
            for ( let item of state.sale.relationships.saleitems) {
                if( item.attributes.is_stock_unitario_kilo ) {
                    return true
                }
            }
            return false
        },

        totalPagosSale ( state ) {
            let total = 0
            for ( let item of state.sale.relationships.payments) {
                total = total + Number(item.attributes.valor)
            }
            
            return total.toFixed(10)
        },
        totalRefondsSale ( state ) {
            let total = 0
            for ( let item of state.sale.relationships.refonds) {
                total = total + Number(item.attributes.valor)
            }
            
            return total.toFixed(10)
        },
        
        
        saldoTotalSale ( state ) {
            let total = state.sale.attributes.total
            for ( let devolution of state.sale.relationships.devolutions ) {
                    total = total - Number(devolution.attributes.total)
            }

            for ( let creditnote of state.sale.relationships.creditnotes ) {
                total = total - Number(creditnote.attributes.valor)
            }

            for ( let debitnote of state.sale.relationships.debitnotes ) {
                total = Number(total) + Number(debitnote.attributes.valor)
            }

            for ( let refond of state.sale.relationships.refonds ) {
                total = total + Number(refond.attributes.valor)
            }

            for ( let payment of state.sale.relationships.payments ) {
                total = total - Number(payment.attributes.valor)
            }
            
            return Number(Number(total).toFixed(10))
        },

        totalDisponibleCredito ( state ) {
            let total = state.sale.attributes.total
            for ( let devolution of state.sale.relationships.devolutions ) {
                    total = total - Number(devolution.attributes.total)
            }

            for ( let creditnote of state.sale.relationships.creditnotes ) {
                total = total - Number(creditnote.attributes.valor)
            }

            for ( let debitnote of state.sale.relationships.debitnotes ) {
                total = Number(total) + Number(debitnote.attributes.valor)
            }
            
            return Number(Number(total).toFixed(10))
        },

        cantItemsDevolution (state) {
            return state.devolution_editing.devitems.filter((e) => e.is_devolution_item).length
        },

        totalDevolution (state) {
            let total = 0
            for ( let item of state.devolution_editing.devitems) {
                if ( item.is_devolution_item ){
                    if( item.is_stock_unitario_kilo ) {
                        total = total + (item.precio * item.cantidad_total)
                    }else {
                        total = total + (item.precio * item.cantidad)
                    }
                }         
            }
            return total.toFixed(10)
        },

        creditnote_editing ( state ) {
            return state.creditnote_editing
        },

        debitnote_editing ( state ) {
            return state.debitnote_editing
        },

    },
    mutations: {
        SET_SALES( state, payload) {
            state.sales = payload
        },
        SET_LIST_META( state, payload) {
            state.list_meta = payload
        },

        SET_LIST_META_LIMIT( state, payload) {
            state.list_meta.limit = payload
        },
        SET_CLIENT_ID( state, payload) {
            state.client_id = payload
        },
        SET_USER_ID( state, payload) {
            state.user_id = payload
        },
        SET_SALE( state, payload) {
            state.sale = payload
        },
        SET_LOADING( state, payload) {
            state.loading = payload
        },
        ADD_PAYMENT ( state, payload ) {
            state.sale.relationships.payments.push(payload)
        },
        UPDATE_PAYMENT ( state, payload ) {
            for ( let payment of state.sale.relationships.payments ) {
                if( payment.id == payload.id ) {
                    payment.attributes.valor = payload.valor
                }
            }  
        },
        REMOVE_PAYMENT ( state, payload ) {
            state.sale.relationships.payments = state.sale.relationships.payments.filter((item) => item.id != payload.id)
        },

        ADD_REFOND ( state, payload ) {
            state.sale.relationships.refonds.push(payload)
        },

        UPDATE_REFOND ( state, payload ) {
            for ( let refond of state.sale.relationships.refonds ) {
                if( refond.id == payload.id ) {
                    refond.attributes.valor = payload.valor
                }
            }  
        },
        REMOVE_REFOND ( state, payload ) {
            state.sale.relationships.refonds = state.sale.relationships.refonds.filter((item) => item.id != payload.id)
        },
        ADD_DEVOLUTION ( state, payload ) {
            state.sale.relationships.devolutions.push(payload)
        },


        SET_DEVOLUTION_EDITING( state , devolution){
            state.devolution_editing = devolution
        },

        SET_CREDITNOTE_EDITING ( state, creditnote ) {
            state.creditnote_editing = creditnote
        },

        ADD_CREDITNOTE ( state, payload ) {
            state.sale.relationships.creditnotes.push(payload)
        },

        SET_DEBITNOTE_EDITING ( state, debitnote ) {
            state.debitnote_editing = debitnote
        },

        ADD_DEBITNOTE ( state, payload ) {
            state.sale.relationships.debitnotes.push(payload)
        },

        SET_COMPROBANTE ( state, payload ) {
            state.sale.relationships.comprobante = payload
        },

    },
    actions: {
        set_sales( { commit }, payload) {
            commit('SET_SALES', payload)
        },
        set_list_meta( { commit }, payload) {
            commit('SET_LIST_META', payload)
        },

        async search_sales( state ) {
            return await axios.get('/sales', {
                params: {
                    limit: state.getters.list_meta.limit,
                    page: state.getters.list_meta.page,
                    client_id: state.getters.client_id,
                    user_id: state.getters.user_id
                }
            });
        },

        set_list_meta_limt ( { commit }, payload) {
            commit('SET_LIST_META_LIMIT', payload)
        },
        set_client_id ( { commit }, payload) {
            commit('SET_CLIENT_ID', payload)
        },
        set_user_id ( { commit }, payload) {
            commit('SET_USER_ID', payload)
        },
        set_sale ( { commit }, payload) {
            commit('SET_DEVOLUTION_EDITING', null)
            commit('SET_CREDITNOTE_EDITING', null)
            commit('SET_DEBITNOTE_EDITING', null)
            commit('SET_SALE', payload)
        },

        async search_sale( state, id ) {
            return await axios.get(`/sales/${id}`);
        },

        set_loading ( { commit }, payload) {
            commit('SET_LOADING', payload)
        },

        async save_payment ( {  getters, rootState }, payload ) {
            return axios.post('/payments', {
                'data': {
                    'type': 'payments',
                    'attributes': {
                        'valor': payload.attributes.valor,
                        
                    },
                    'relationships': {
                        'paymentmethod': {
                            'data': {
                                'id': payload.relationships.paymentmethod.id
                            }
                        },
                        'caja': {
                            'data': {
                                'id': rootState.caja.caja.id
                            }
                        },
                        'sale': {
                            'data': {
                                'id': getters.sale.id
                            }
                        },
                    }
                }
            })
        },

        add_payment ( { commit }, payload) {
            commit('ADD_PAYMENT', {
                id: Math.floor(Math.random() * 100000) +1,
                type: 'payments',
                attributes: {
                    valor: payload.valor,
                    name: payload.name,
                    is_confirmed: payload.is_confirmed
                },
                relationships: {
                    paymentmethod: {
                        id: payload.paymentmethod_id
                    }
                }
            })
        },
        update_payment ( {  commit }, payload ) {
            commit ( 'UPDATE_PAYMENT', payload )
        },
        remove_payment ( { commit }, payload ) {
            commit ( 'REMOVE_PAYMENT', payload )
        },
        add_refond ( { commit }, payload) {
            commit('ADD_REFOND', {
                id: Math.floor(Math.random() * 100000) +1,
                type: 'refonds',
                attributes: {
                    valor: payload.valor,
                    name: payload.name,
                    is_confirmed: payload.is_confirmed
                },
                relationships: {
                    paymentmethod: {
                        id: payload.paymentmethod_id
                    }
                }
            })
        },
        async save_refond ( {  getters, rootState }, payload ) {
            return axios.post('/refonds', {
                'data': {
                    'type': 'refonds',
                    'attributes': {
                        'valor': payload.attributes.valor,
                        
                    },
                    'relationships': {
                        'paymentmethod': {
                            'data': {
                                'id': payload.relationships.paymentmethod.id
                            }
                        },
                        'caja': {
                            'data': {
                                'id': rootState.caja.caja.id
                            }
                        },
                        'sale': {
                            'data': {
                                'id': getters.sale.id
                            }
                        },
                    }
                }
            })
        },
        update_refond ( {  commit }, payload ) {
            commit ( 'UPDATE_REFOND', payload )
        },
        remove_refond ( { commit }, payload ) {
            commit ( 'REMOVE_REFOND', payload )
        },

        async new_devolution( { commit, state } ) {
            await axios.get(`/sales/${state.sale.id}/make_devolution`)
                .then((resp) => {
                    let devitems = []
                    for ( var item of resp.data.devitems ) {
                        let devitem = {
                            saleitem_id: item.saleitem_id,
                            name: item.name,
                            precio: item.precio,
                            is_devolution_item: false,
                            cantidad: item.cant_disponible_devolucion,
                            cant_disponible_devolucion: item.cant_disponible_devolucion,
                            is_stock_unitario_kilo: item.is_stock_unitario_kilo,
                            is_editing_cantidad: false,
                            cantidad_total: item.cant_total_disponible_devolucion,
                            cant_total_disponible_devolucion: item.cant_total_disponible_devolucion,
                            is_editing_cantidad_total: false,
                        }
                        devitems.push(devitem)
                    }

                    let devolution = {
                        devitems: devitems,
                        is_saved: false
                    }

                    commit('SET_DEVOLUTION_EDITING', devolution)
                    
                })
        },

        async save_devolution({ state, getters, rootState }) {
            let json_items = []

            for (var item of state.devolution_editing.devitems) {
                if( item.is_devolution_item ) {
                    json_items.push({
                        saleitem_id: item.saleitem_id,
                        cantidad: item.cantidad,
                        cantidad_total: item.cantidad_total
                                            
                    })
                }
                
            }

            let json_devolution = {
                sale_id: getters.sale.id,
                items: json_items,
                total: getters.totalDevolution,
                sucursal_id: rootState.sucursal.sucursal.id,
            }

            return axios.post('/devolutions', json_devolution);

            //remover saleActive
        },

        add_devolution ( { commit }, payload ) {            
            commit('ADD_DEVOLUTION', payload)
        },

        set_devolution_editing ( { commit }, payload) {
            commit('SET_DEVOLUTION_EDITING', payload)
        },

        new_creditnote ( { commit } ) {
            let creditnote = {
                id: Math.floor(Math.random() * 100000) +1,
                name: '',
                valor: null
            }

            commit('SET_CREDITNOTE_EDITING', creditnote)
        },

        set_creditnote_editing ( { commit }, payload) {
            commit('SET_CREDITNOTE_EDITING', payload)
        },

        async save_creditnote ({ getters, rootState }) {

            return axios.post('/creditnotes', {
                'data': {
                    'type': 'creditnotes',
                    'attributes': {
                        'valor': getters.creditnote_editing.valor,
                        'description': getters.creditnote_editing.description,
                        
                    },
                    'relationships': {
                        'sucursal': {
                            'data': {
                                'id': rootState.sucursal.sucursal.id
                            }
                        },
                        'sale': {
                            'data': {
                                'id': getters.sale.id
                            }
                        }
                    }
                }
            });

            //remover saleActive
        },

        add_creditnote ( { commit }, payload ) {            
            commit('ADD_CREDITNOTE', payload)
        },




        new_debitnote ( { commit } ) {
            let debitnote = {
                id: Math.floor(Math.random() * 100000) +1,
                name: '',
                valor: null
            }

            commit('SET_DEBITNOTE_EDITING', debitnote)
        },

        set_debitnote_editing ( { commit }, payload) {
            commit('SET_DEBITNOTE_EDITING', payload)
        },

        async save_debitnote ({ getters, rootState }) {

            return axios.post('/debitnotes', {
                'data': {
                    'type': 'debitnotes',
                    'attributes': {
                        'valor': getters.debitnote_editing.valor,
                        'description': getters.debitnote_editing.description,
                        
                    },
                    'relationships': {
                        'sucursal': {
                            'data': {
                                'id': rootState.sucursal.sucursal.id
                            }
                        },
                        'sale': {
                            'data': {
                                'id': getters.sale.id
                            }
                        }
                    }
                }
            });

            //remover saleActive
        },

        add_debitnote ( { commit }, payload ) {            
            commit('ADD_DEBITNOTE', payload)
        },

        async generate_comprobante ( { getters }, modelofact_id ) {

            if ( modelofact_id == 1 ) {
                return axios.post('/sales/make_comprobante_factura', {
                    'sale_id': getters.sale.id
                })
            }
        },

        set_comprobante ( { commit }, payload ) {
            commit('SET_COMPROBANTE', payload)
        }
        
    }
}
