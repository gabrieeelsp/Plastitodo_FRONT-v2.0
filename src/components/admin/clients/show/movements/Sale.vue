<template>
  <div v-if="sale_showed">
        <div class="d-flex justify-space-between mb-3">
            <v-btn 
                text  
            >Venta #{{ sale_showed.id }}</v-btn>
            <div>
                <v-btn
                    v-for="(devolution, index) in sale_showed.relationships.devolutions" :key="index"
                    text
                    class="red--text text--lighten-2"
                    
                >
                    Devolucion #{{ devolution.id }}
                </v-btn>
            </div>
        </div>

        <ShowSaleDetail 

        />

        <v-row>
            <v-col cols="12" sm="9" class="d-flex justify-end">
                <v-btn
                    text
                    @click="voler"
                >
                    Volver
                </v-btn>
            </v-col>
        </v-row>

      
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import ShowSaleDetail from './sale_detail/ShowSaleDetail'
export default {
    mounted() {
        this.getSale()
    },

    props: {
        id: Number
    },
    components: {
        ShowSaleDetail
    },

    computed: {
        ...mapGetters({
            sale_showed: 'sale_showed/sale_showed'
        })
        
    },

    methods: {
        ...mapActions({
            search_sale_showed: 'sale_showed/search_sale_showed',
            set_sale_showed: 'sale_showed/set_sale_showed',
        }), 

        async getSale () {
            await this.search_sale_showed(this.id)
                .then((resp) => {
                    this.set_sale_showed(resp.data.data)
                })
        },
        voler () {
            this.$emit('cancelar_show_sale')
            this.set_sale_showed(null)
        }
    }
}
</script>

<style>

</style>