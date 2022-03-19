<template>
  <div>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="2" class="d-flex align-center">
                <DateRangePicker 
                    @setRangeDate="setRangeDate"
                />
            </v-col>
            <v-col cols="12" sm="2" class="d-flex align-center">
                <v-btn small
                    @click="getItems"
                >Search</v-btn>
                
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-simple-table
                    dense
                >
                    <template v-slot:default>
                    <thead>
                        <tr>
                            
                        
                        <tr>
                            <th 
                            style="width: 50px;"
                            class="pl-1 text-start font-weight-bold text-subtitle-1 grey--text text--darken-3">
                            ID
                            </th>
                            <th 
                            style="width: 180px;"
                            class="pl-1 text-center font-weight-bold text-subtitle-1 grey--text text--darken-3">
                            Fecha
                        </th>
                        <th 
                            style=""
                            class="pl-1 text-start font-weight-bold text-subtitle-1 grey--text text--darken-3">
                            Movimiento
                        </th>
                        
                        <th 
                            style="width: 100px;"
                            class="pl-1 text-end font-weight-bold text-subtitle-1 grey--text text--darken-3">
                            Valor
                        </th>
                        <th 
                            style="width: 100px;"
                            class="pl-1 text-end font-weight-bold text-subtitle-1 grey--text text--darken-3">
                            Saldo
                        </th>
                        <th 
                            style="width: 50px;"
                            class="pl-1 text-start font-weight-bold text-subtitle-1 grey--text text--darken-3">
                            Actions
                        </th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(item, index) in items"
                        :key="index"
                        >
                        <td >{{ item.id }}</td>
                        <td class="text-right">{{ item.created_at }}</td>
                        <td >{{ getTipo(item.tipo) }}</td>
                        
                        <td class="text-end">{{ globalHelperFixeDecimalMoney(item.valor)  }}</td>
                        <td class="text-end">{{ globalHelperFixeDecimalMoney(item.saldo)  }}</td>
                        <td>
                        <v-btn
                            icon
                            @click="showItemPage(item)"
                        >
                            <v-icon>mdi-eye</v-icon>
                        </v-btn>
                        </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>

        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" md="4" class="d-flex align-center justify-center justify-md-end   pt-1 pb-1">
                <span class=" font-weight-bold text-caption grey--text font-weight-light">Items per page:</span>
                <div style="width: 75px; ">                                
                    <v-select
                        :items="select_limit_items"
                        v-model="limitSelected"
                        label="Standard"
                        hide-details=""
                        single-line
                        class="rounded-sm ml-1 text-caption font-weight-light"
                        solo
                        dense
                        @input="setLimit"
                    ></v-select>
                </div>
            </v-col>
            <v-col cols="12" md="4" class="d-flex align-center justify-center justify-md-end  pt-1 pb-1">
                <v-pagination
                    v-model="page"
                    :length="last_page"
                    :total-visible="5"
                    @input="setPage"
                    :disabled="last_page <2"
                    prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"
                ></v-pagination>
            </v-col>
        </v-row>

  </div>
</template>

<script>
import axios from 'axios'

import { mapGetters } from 'vuex'



import DateRangePicker from '@/components/admin/utils/DateRangePicker'

export default {
    mounted() {
        this.getItems()
    },
    computed: {
        ...mapGetters({
            client: 'client/client',
        })
    },
    components: {
        DateRangePicker,
        
    },
    data() {
        return {
            select_limit_items: [5, 10, 15, 20],
            limitSelected: 10,
            last_page: 1,
            page: 1,
            loadingTable: false,
            items: [],
            date_from: null,
            date_to: null,
            
            showSaledialogVisible: false,

        }
    },
    methods: {

        async getItems(){
            this.loadingTable = true
            await axios.get(`/clients/${this.client.id}/movements`,{
                params: {
                    date_from: this.date_from,
                    date_to: this.date_to,
                    limit: this.limitSelected,
                    page: this.page
                }
                
            })
                .then((resp) => {
                    this.items = resp.data.data
                    this.last_page = resp.data.last_page
                    
                    
                }).catch((e) => {
                    console.log(e)
                })
            this.loadingTable = false
        },

        getTipo(tipo) {
            if ( tipo == 'sale' ) {
                return 'Venta'
            }
            if ( tipo == 'payment' ) {
                return 'Pago'
            }
            if ( tipo == 'refound' ) {
                return 'Reinegro'
            }
            if ( tipo == 'devolution' ) {
                return 'Devolución'
            }
        },

        setRangeDate(range) {
            this.date_from = range[0]
            this.date_to = range[1]
            //console.log(range)
        },
        setLimit() {
            this.getItems()
        },
        setPage() {
            this.getItems()
        },


        showItemPage( item ) {
            if ( item.tipo == 'sale' ) {
                this.$emit('show_sale', item.id)
            }
        }

    }

}
</script>

<style>

</style>