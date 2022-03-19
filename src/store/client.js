import axios from 'axios'

export default {
    namespaced: true,
    state: {
        client: null,

        movements_meta: {
            page: 1,
            limit: 10,
        },

    },
    getters: {
        client ( state ) {
            return state.client
        },

        movements_meta ( state ) {
            return state.movements_meta
        },

    },
    mutations: {
        SET_CLIENT( state, payload) {
            state.client = payload
        },

        SET_MOVEMENTS_META( state, payload) {
            state.movements_meta = payload
        },

    },
    actions: {       
        async search_client( _ , id ) {
            return await axios.get(`/clients/${id}`);
        },

        set_client ( { commit }, payload ) {
            commit('SET_CLIENT', payload )
        },

        set_movements_meta( { commit }, payload) {
            commit('SET_MOVEMENTS_META', payload)
        },

    }
}
