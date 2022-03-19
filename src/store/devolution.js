import axios from 'axios'
export default {
    namespaced: true,
    state: {
        devolution: null
    },
    getters: {
        devolution( state ) {
            return state.devolution
        },
        is_devolutionStockUnitario(state) {

            for ( let item of state.devolution.devitems) {
                if( item.is_stock_unitario_kilo ) {
                    return true
                }
            }
            return false
        },
        cantItemsDevolution (state) {

            return state.devolution.devitems.filter((e) => e.is_devolution_item).length
        },

        totalDevolution (state) {
            let total = 0
            for ( let item of state.devolution.devitems) {
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
        restoDevolution (state, getters) {
            let total = 0
            for ( let item of state.devolution.refounds) {
                total = total + item.valor
            }
            
            return getters.totalDevolution - total.toFixed(10)
        },

    },
    mutations: {
        SET_DEVOLUTION( state , devolution){
            state.devolution = devolution
        },
        ADD_REFOUND(state, refound) {
            state.devolution.refounds.push({
                id: Math.floor(Math.random() * 100000) +1,
                paymentmethod_id: refound.paymentmethod_id,
                name: refound.name,
                valor: refound.valor,
                is_editing_valor: false
            })
        },

        REMOVE_REFOUND(state, id) {
            state.devolution.refounds = state.devolution.refounds.filter((e) => {
                return e.id !== id
            })
        },
    },
    actions: {

        async new_devolution( { commit }, sale ) {
            await axios.get(`/sales/${sale.id}/make_devolution`)
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
                        sale: sale,
                        devitems: devitems,
                        refounds: []
                    }

                    commit('SET_DEVOLUTION', devolution)
                    
                })
        },
        new_devolution2({ commit },  sale ) {
            let items = []
            for (var item of sale.relationships.saleitems) {
                let devitem = {
                    saleitem: item,
                    is_devolution_item: false,
                    cantidad: item.attributes.cantidad,
                    is_editing_cantidad: false,
                    cantidad_total: item.attributes.cantidad_total,
                    is_editing_cantidad_total: false,
                    is_retorno_stock: false
                }
                items.push(devitem)
            }
            
            // TODO refounds

            let devolution = {
                sale: sale,
                devitems: items,
                refounds: []
            }
            commit('SET_DEVOLUTION', devolution)
        },

        add_refound( { commit }, refound) {
            commit('ADD_REFOUND', refound)
        },

        remove_refound( { commit }, id) {
            commit('REMOVE_REFOUND', id)
        },

        async save_devolution({ state, rootState, getters }) {
            let json_items = []

            for (var item of state.devolution.devitems) {
                if( item.is_devolution_item ) {
                    json_items.push({
                        saleitem_id: item.saleitem_id,
                        cantidad: item.cantidad,
                        cantidad_total: item.cantidad_total
                                            
                    })
                }
                
            }

            let json_refounds = []

            for (var refound of state.devolution.refounds) {
                json_refounds.push({
                    paymentmethod_id: refound.paymentmethod_id,
                    valor: refound.valor,
                })
            }

            let json_devolution = {
                sale_id: state.devolution.sale.id,
                caja_id: rootState.caja.caja.id,
                items: json_items,
                refounds: json_refounds,
                total: getters.totalDevolution
            }

            return axios.post('/devolutions', json_devolution);

            //remover saleActive
        }
        
    }
}
