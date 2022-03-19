<template>
    <div class="pa-sm-3" v-if="sale">
        <v-row>
            <v-col cols="12" md="9">
                <v-card class="">
                    <v-card-title class="d-flex justify-space-between align-center pt-1 pb-1">                
                        <div class="">
                            <span class="text-h4 font-weight-light">Sale #{{ id }}</span>

                            
                        </div>
                        
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text >
                        
                        <v-row>
                            <v-col cols="12">
                                <ItemsSale 
                                    :sale="sale"
                                /> 
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-row class="">
                    <v-col cols="12">
                        <MenuClientSale 
                            :sale="sale"
                        /> 
                    </v-col>
                    <v-col cols="12">
                        
                    </v-col>
                    <v-col cols="12">
                        
                    </v-col>
                </v-row>
                
            </v-col>
        </v-row>
    </div>
</template>

<script>
import axios from 'axios'
import ItemsSale from '@/components/admin/sales/sale/ItemsSale'
import MenuClientSale from '@/components/admin/sales/sale/MenuClientSale'

export default {
    mounted() {
        this.getSale()
    },
    data() {
        return {
            id: parseInt(this.$route.query.id),
            sale: null
        }
    },

    components: {
        ItemsSale,
        MenuClientSale
    },

    methods: {
        async getSale ( ) {
            await axios.get(`/sales/${this.id}`)
            .then((resp) => {
                this.sale = resp.data.data
            })
        }
    }

}
</script>

<style>

</style>