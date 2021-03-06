import axios from 'axios'

export default {
    namespaced: true,
    state: {
        token: null,
        user: null
    },
    getters: {
        authenticated (state) {
            return state.token && state.user
        },

        user (state) {
            return state.user
        },
        is_empleado(state) {
            return state.user.role != 5
        }

    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },

        SET_USER(state, data) {
            state.user = data
        },
    },
    actions: {
        async signIn ( { dispatch }, credential) {
            let response = await axios.post('login', {
                'email': credential.email,
                'password': credential.password
            });

            return dispatch('attempt', response.data.access_token)

        },

        async attempt ({ commit, state }, token) {
            if(token) {
                commit('SET_TOKEN', token)
            }

            if (!state.token) {
                return
            }
            try {
                let response = await axios.get('me')

                commit('SET_USER', response.data)
                
            } catch (e) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)

            }

            
        },

        signOut ({ commit }) {
            return axios.post('logout').then(() => {
                
                commit('SET_TOKEN', null)
                commit('SET_USER', null)


            })
        },

        
    }
}
