import axios from 'axios'

export default {
    namespaced: true,
    state: {
        client: null,
        client_cache: null,

        movements_meta: {
            page: 1,
            limit: 10,
        },

    },
    getters: {
        client ( state ) {
            return state.client
        },

        client_cache ( state ) {
            return state.client_cache
        },

        movements_meta ( state ) {
            return state.movements_meta
        },

    },
    mutations: {
        SET_CLIENT( state, payload) {
            state.client = payload
        },

        SET_CLIENT_CACHE( state, payload) {
            state.client_cache = payload
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
            let obj = {
                'name': payload.attributes.name,
                'surname': payload.attributes.surname,
                'tipo': payload.attributes.tipo,
                'direccion': payload.attributes.direccion,
                'telefono': payload.attributes.telefono,

                'direccion_fact': payload.attributes.direccion_fact,
                'cuit': payload.attributes.cuit
            }
            if ( payload.relationships.ivacondition ) {
                obj['ivacondition_id'] = payload.relationships.ivacondition.id
            }else {
                obj['ivacondition_id'] = null
            }
            commit('SET_CLIENT_CACHE',  obj)
        },

        set_movements_meta( { commit }, payload) {
            commit('SET_MOVEMENTS_META', payload)
        },

    }
}
