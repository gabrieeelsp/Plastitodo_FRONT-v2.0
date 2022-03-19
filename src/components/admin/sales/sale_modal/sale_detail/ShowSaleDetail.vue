<template>
    <div v-if="sale_showed">
        <v-row>
            <v-col cols="12" md="6">
                <v-row>
                    <v-col cols="12">
                        <ShowSaleClient 
                            :sale="sale_showed"
                        />
                    </v-col>
                    <v-col cols="12">
                        <ShowSaleUser 
                            :sale="sale_showed"
                        />
                    </v-col>
                </v-row>
                
            </v-col>
            <v-col cols="12" md="6">
                <ShowSalePayments 
                />
            </v-col>
        </v-row>
        <v-row class=" ">
            <v-col cols="12" md="12" class=" pl-0 pr-0">
                <ShowSaleItems 
                    :sale="sale_showed"
                />
                
            </v-col>
        </v-row>

        <v-row class="mt-0">
            <v-col cols="6" class="d-flex align-start flex-column pb-0">
                <v-btn text @click="create_devolution">CREAR DEVOLUCION</v-btn>
                <v-btn text @click="create_devolution">CREAR Nota de crédito</v-btn>
                <v-btn text @click="create_devolution">CREAR Nota de débito</v-btn>
            </v-col>
            <v-col cols="6">
                <div class=" d-flex justify-end">
                    <span class="title ">Total:</span>
                    <span class="headline  blue--text darken-4 ml-1">{{ globalHelperFixeDecimalMoney(sale_showed.attributes.total) | money_string }}</span>
                </div>
                <div class=" d-flex justify-space-between"
                    v-for="(devolution, index) in sale_showed.relationships.devolutions" :key="index"
                >
                    <span class="subtitle-1">Devolución #{{devolution.id}}:</span>
                    <span class="subtitle-1  blue--text darken-4 ml-1">({{ globalHelperFixeDecimalMoney(devolution.attributes.total) | money_string }})</span>
                </div>
                <div class=" d-flex justify-end">
                    <span class="title ">Total Real:</span>
                    <span class="headline  blue--text darken-4 ml-1">{{ globalHelperFixeDecimalMoney(globalHelperGetTotalFinalSale(sale_showed)) | money_string }}</span>
                </div>
            </v-col>
        </v-row>
        
    </div>
    
</template>

<script>

import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import ShowSaleClient from '@/components/admin/sales/sale_modal/sale_detail/ShowSaleClient'
import ShowSalePayments from '@/components/admin/sales/sale_modal/sale_detail/ShowSalePayments'
import ShowSaleUser from '@/components/admin/sales/sale_modal/sale_detail/ShowSaleUser'
import ShowSaleItems from '@/components/admin/sales/sale_modal/sale_detail/ShowSaleItems'

export default {
    props: {

    },
    components: {
        ShowSaleClient,
        ShowSalePayments,
        ShowSaleUser,
        ShowSaleItems
    },
    computed: {
        ...mapGetters({
            sale_showed: 'sale_showed/sale_showed',
        }),
    },

    methods: {
        ...mapActions({
            new_devolution: 'devolution/new_devolution'
        }),

        async create_devolution() {
            await this.new_devolution(this.sale_showed)
            
            this.$router.push({
                  name: 'devolution_register'
              })
        },


    }

}
</script>

<style>

</style>