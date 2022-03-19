<template>
    <div class="pa-sm-3" v-if="devolution">
        <v-row>
            <v-col cols="12" md="9">
                <v-card class="">
                    <v-card-title class="d-flex justify-space-between align-center pt-1 pb-1">                
                        <div class="">
                            <span class="text-h4 font-weight-light">Devolution Register</span>

                            
                        </div>
                        
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text >
                        
                        <v-row>
                            <v-col cols="12">
                                <ItemsDevolution/> 
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn
                                    
                                >
                                    Cancelar
                                </v-btn>
                                <v-btn
                                    @click="saveDevolution"
                                >
                                    Guardar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-row class="">
                    <v-col cols="12">
                        <MenuClientDevolution />
                    </v-col>
                    <v-col cols="12">
                        <TotalDevolution />
                    </v-col>
                    <v-col cols="12">
                        <MenuRefoundDevolution />
                    </v-col>
                </v-row>
                
            </v-col>
        </v-row>
        <ShowTareasModal
            :dialogVisible="cargandoModalVisible"
            :is_registrandoDevolution="is_registrandoDevolution"

            @close="showTareasModal_closed"
            />
        
        {{ devolution}}
    </div>

</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import ItemsDevolution from '@/components/admin/devolutions/devolution_register/ItemsDevolution.vue'
import MenuClientDevolution from '../../../components/admin/devolutions/devolution_register/MenuClientDevolution.vue'
//import SelectProduct from '@/components/admin/sales/sale_register/SelectProduct'

import TotalDevolution from '@/components/admin/devolutions/devolution_register/TotalDevolution'
import MenuRefoundDevolution from '../../../components/admin/devolutions/devolution_register/MenuRefoundDevolution.vue'
import ShowTareasModal from '../../../components/admin/devolutions/devolution_register/ShowTareasModal'



export default {

    mounted() {
        
        if ( !this.devolution ) {
            this.$router.push({
                name: 'sale_list'
            })
        }
        
    },
    components: {
        ItemsDevolution,
        MenuClientDevolution,
        //SelectProduct,
        TotalDevolution,
        MenuRefoundDevolution,
        ShowTareasModal
    },
    data: () => ({
        cargandoModalVisible: false,
        is_registrandoDevolution: false
    }),
    computed: {
        ...mapGetters({
            devolution: 'devolution/devolution',
            caja: 'caja/caja'
            
        })
    },
    methods: {
        ...mapActions({


            //remove_sale: 'sale/remove_sale',
            save_devolution: 'devolution/save_devolution'
        }),

        showTareasModal_closed() {
            this.cargandoModalVisible = false

            this.$router.push({
                name: 'sale_list'
            })
        },



        /* delete_sale(sale_id) {
            this.remove_sale(sale_id)
            if( this.sales.length == 0){
                this.new_sale()
            }else {
                const id = this.sales[0].id
                this.set_sale_active(id)
            }
        }, */

        async saveDevolution() {
            this.cargandoModalVisible = true
            this.is_registrandoRevolution = true
            await this.save_devolution().then(() => {                
                this.is_registrandoDevolution = false
            }) 


        }
        
        
    }
}
</script>

<style>

</style>