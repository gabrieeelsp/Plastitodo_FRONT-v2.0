export default {
    namespaced: true,
    state: {
        is_loading: true
    },
    getters: {
        is_loading ( state ) {
            return state.is_loading
          }

    },
    mutations: {
        SET_IS_LOADING ( state, payload ) {
            state.is_loading = payload
          }
    },
    actions: {
        set_is_loading ( { commit }, payload) {
            commit ( 'SET_IS_LOADING', payload )
          }
        
    }
}
