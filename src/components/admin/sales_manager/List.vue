<template>
    <div >

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
                    @click="$emit('getItems')"
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
                            
                            class="pl-1 text-start font-weight-bold text-subtitle-1 grey--text text--darken-3">
                            Sucursal
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
                        <td>{{ sale.relationships.sucursal.attributes.name }}</td>
                        <td class="text-right">{{ sale.attributes.created_at }}</td>
                        <td class="text-right">{{ globalHelperFixeDecimalMoney(sale.attributes.total) | money_string }}</td>
                        <v-btn
                            icon
                            @click="showSalePage(sale.id)"
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
        
    </div>
</template>

<script>

import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import DateRangePicker from '@/components/admin/utils/DateRangePicker'
import SelectClient from '@/components/admin/clients/SelectClient'
import SelectUser from '@/components/admin/users/SelectUser'
export default {
    

    data () {
        return {

            client_id: null,
            date_from: null,
            date_to: null,
            user_id: null,

            select_limit_items: [5, 10, 15, 20],
            limitSelected: 5,
            last_page: 1,
            page: 1,
        }
    },

    computed: {
        ...mapGetters({
            sales: 'sales_manager/sales'
        })
    },
    components: {
        DateRangePicker,
        SelectClient,
        SelectUser
    },
    methods: {
        ...mapActions({
            set_list_meta_limt: 'sales_manager/set_list_meta_limt',
            set_list_meta_page: 'sales_manager/set_list_meta_page',
            set_client_id: 'sales_manager/set_client_id',
            set_user_id: 'sales_manager/set_user_id'
        }),


        

        setClintId(id) {
            this.set_client_id(id)
        },
        setRangeDate(range) {
            this.date_from = range[0]
            this.date_to = range[1]
            //console.log(range)
        },
        setLimit() {
            this.set_list_meta_limt(this.limitSelected)
            this.$emit('getItems')
        },
        setPage() {
            this.set_list_meta_page(this.page)
            this.$emit('getItems')
        },
        setUserId(id) {
            this.set_user_id(id)
        },

        async showSalePage( sale_id ) {
            this.$emit('show_sale', sale_id)
               
        }
    }
}
</script>

<style>

</style>