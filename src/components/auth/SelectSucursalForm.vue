<template>
  <v-simple-table >
      <template v-slot:default>
          
          <tbody>
              <tr
                  v-for="(item, index) in items"
                  :key="index"
              >
                  <td class=" 'pl-1'" >{{ item.attributes.name }}</td>

                  <td class="pr-1">                                            
                      <v-btn small
                          @click="setSucursal(item)"
                          color="success"
                          elevation="2"
                          
                          outlined
                      >
                          Seleccionar
                      </v-btn>
                      
                      
                  </td>   
              </tr>
          </tbody>
      </template>
  </v-simple-table>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import axios from 'axios'
  export default {
    mounted() {
        this.getItems()
        
    },
    data: () => ({
      
        items: [],
        loadingTable: false,
    }),

    computed: {
      ...mapGetters({
        is_sucursal_selected: 'sucursal/is_sucursal_selected'
      })
    },

    methods: {
      ...mapActions({
        set_sucursal: 'sucursal/set_sucursal',
      }),

      async getItems () {
        this.loadingTable = true,
        await axios.get('/sucursals')
        
        .then((result) => {
            this.items = result.data.data

        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            this.loadingTable = false
        })           
      },
      setSucursal(data) {
        //console.log(data)
        this.set_sucursal({
          'id': data.id,
          'name': data.attributes.name
        })

        // tengo que buscar si hay una caja abierta en el backend
        //attempt buscar 
        
        this.$router.replace({
          name: 'Dashboard'
        })
        
      }
    },
  }
</script>

