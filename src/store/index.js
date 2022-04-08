import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import caja from './caja'
import sucursal from './sucursal'
import sale from './sale'
import paymentMethod from './paymentMethod'
import devolution from './devolution'
import sale_showed from './sale_showed'
import client from './client'
import sales_manager from './sales_manager'
import modelofact from './modelofact'
import ivacondition from './ivacondition'
import app from './app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      
    },
    getters: {
      
    },
    mutations: {
      
    },
    actions: {
      
    },
    modules: {
        auth,
        sucursal,
        caja,
        sale,
        paymentMethod,
        devolution,
        sale_showed,
        client,
        sales_manager,
        modelofact,
        ivacondition,
        app
    }
})
