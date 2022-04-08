

export default {
    namespaced: true,
    state: {
        sucursal: null
    },
    getters: {
        sucursal ( state ) {
            return state.sucursal
        },

        is_sucursal_selected ( state ) {
            if ( state.sucursal != null ) {
                return true
            }
            return false            
        }

    },
    mutations: {
        SET_SUCURSAL ( state,  data) {
            state.sucursal = data
        }
    },
    actions: {
        
        set_sucursal ( { dispatch, commit }, data) {
            commit('SET_SUCURSAL', data)

            if ( data != null ) {
                dispatch('caja/buscar_caja', null, {root:true})
                dispatch('paymentMethod/buscar_paymentMethods', null, {root:true})
                dispatch('modelofact/buscar_modelofacts', null, {root:true})
                dispatch('ivacondition/buscar_ivaconditions', null, {root:true})
                dispatch('app/set_is_loading', false, {root:true})
            }
        }
        
    }
}
