<template>
    <div class="pa-sm-3" >
        <v-row>
            <v-col cols="12" md="12">
                <v-card class="" :loading="loadingTable">
                    <v-card-title class="d-flex justify-space-between align-center pt-1 pb-1">                
                        <span class="text-h4 font-weight-light">Sales MANAGER</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text >
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-col cols="12" sm="2" class="d-flex align-center">
                                <SelectClient 
                                    label="Cliente"
                                    @setClientId="setClintId"
                                />
                            </v-col>
                            <v-col cols="12" sm="2" class="d-flex align-center">
                                <SelectUser 
                                    label="Usuario"
                                    @setUserId="setUserId"
                                />
                            </v-col>
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
                                        <th 
                                            style="width: 50px;"
                                            class="pl-1 text-start font-weight-bold text-subtitle-1 grey--text text--darken-3">
                                            Número
                                        </th>

                                        <th 
                                            
                                            class="pl-1 text-start font-weight-bold text-subtitle-1 grey--text text--darken-3">
                                            Cliente
                                        </th>
                                        <th 
                                            
                                            class="pl-1 text-start font-weight-bold text-subtitle-1 grey--text text--darken-3">
                                            Usruario
                                        </th>
                                        <th 
                                            style="width: 180px;"
                                            class="pl-1 text-start font-weight-bold text-subtitle-1 grey--text text--darken-3">
                                            Fecha
                                        </th>
                                        <th 
                                            style="width: 100px;"
                                            class="pl-1 text-start font-weight-bold text-subtitle-1 grey--text text--darken-3">
                                            Total
                                        </th>
                                        <th 
                                            style="width: 100px;"
                                            class="pl-1 text-start font-weight-bold text-subtitle-1 grey--text text--darken-3">
                                            Actions
                                        </th>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                        v-for="sale in sales"
                                        :key="sale.id"
                                        >
                                        <td>{{ sale.id }}</td>
                                        <td v-if="sale.relationships.client">{{ sale.relationships.client.attributes.name }}</td>
                                        <td v-else>---</td>
                                        <td>{{ sale.relationships.user.attributes.name }}</td>
                                        <td class="text-right">{{ sale.attributes.created_at }}</td>
                                        <td>{{ globalHelperFixeDecimalMoney(sale.attributes.total) | money_string }}</td>
                                        <v-btn
                                            icon
                                            @click="showSale(sale)"
                                        >
                                            <v-icon>mdi-eye</v-icon>
                                        </v-btn>
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

                        <ShowSaleModal 
                            :dialogVisible="showSaledialogVisible"
                            :sale="saleShowed"
                            @close="showSaledialogVisible = false"
                        />                        
                        
                    </v-card-text>
                </v-card>
            </v-col>
            
        </v-row>
        
    </div>

</template>

<script>
import axios from 'axios'
import DateRangePicker from '../../../components/admin/utils/DateRangePicker'
import SelectClient from '../../../components/admin/clients/SelectClient'
import SelectUser from '../../../components/admin/users/SelectUser'

import ShowSaleModal from '@/components/admin/sales/sale_modal/ShowSaleModal.vue'

export default {
    mounted() {
        this.getItems()
    },
    components: {
        DateRangePicker,
        SelectClient,
        SelectUser,
        ShowSaleModal
    },
    data() {
        return {
            select_limit_items: [5, 10, 15, 20],
            limitSelected: 5,
            last_page: 1,
            page: 1,
            loadingTable: false,
            sales: [],
            client_id: null,
            date_from: null,
            date_to: null,
            user_id: null,

            saleShowed: null,
            showSaledialogVisible: false,

        }
    },
    methods: {
        async getItems(){
            this.loadingTable = true
            await axios.get('/sales',{
                params: {
                    client_id: this.client_id,
                    user_id: this.user_id,
                    date_from: this.date_from,
                    date_to: this.date_to,
                    limit: this.limitSelected,
                    page: this.page
                }
                
            })
                .then((resp) => {
                    this.sales = resp.data.data
                    this.last_page = resp.data.meta.last_page
                    
                    
                }).catch((e) => {
                    console.log(e)
                })
            this.loadingTable = false
        },

        setClintId(id) {
            this.client_id = id
            //console.log(this.client_id)
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
        setUserId(id) {
            this.user_id = id
            //console.log(this.client_id)
        },

        async showSale(sale) {

            await axios.get(`/sales/${sale.id}`)
            .then((resp) => {

                this.saleShowed = resp.data.data
                this.showSaledialogVisible = true
                
            })       
            
        },
        showSalePage(sale) {

            this.$router.push({
                name: 'sale',
                query: {
                    id: sale.id
                }
            })
        }

    }

}
</script>

<style>

</style>