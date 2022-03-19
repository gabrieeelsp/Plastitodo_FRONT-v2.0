<template>
    <v-simple-table class="">
        <template v-slot:default>
        <thead class="lighten-5">
            <tr>
            <th class="pl-1 text-left font-weight-bold text-subtitle-1 grey--text text--darken-2">
                Producto 
            </th>
            <th 
                style="width: 100px;"
                class="pl-1 text-center font-weight-bold text-subtitle-1 grey--text text--darken-2">
                Precio
            </th>
            <th
                style="width: 100px;"
             class="pl-1 text-center font-weight-bold text-subtitle-1 grey--text text--darken-2">
                Cantidad
            </th>
            <template v-if="is_saleStockUnitario">
            <th
                style="width: 100px;"
             class="pl-1 text-center font-weight-bold text-subtitle-1 grey--text text--darken-2">
                Peso
            </th>
            </template>
            <th 
                style="width: 100px;"
                class="pl-1 text-center font-weight-bold text-subtitle-1 grey--text text--darken-2">
                SubTotal
            </th>            
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="item in devolution.relationships.devolutionitems"
            :key="item.id"
            >
            <td>{{ item.attributes.name }}</td>

            
            <td 
                class="text-right"
                >{{ globalHelperFixeDecimalMoney(item.attributes.precio) }}</td>
            
            <td 
                class="text-right"
                >{{ globalHelperFixeDecimalCantidad(item.attributes.cantidad) }}</td>

            <template v-if="is_saleStockUnitario">
                <td 
                v-if="item.attributes.is_stock_unitario_kilo"
                class="text-right"

                >
                {{ globalHelperFixeDecimalCantidad(item.attributes.cantidad_total) }}
            </td>
    
            <td
                v-else
                class="text-right"
                >
                -------
            </td>

            </template>            
            <td v-if="item.attributes.is_stock_unitario_kilo" class="text-right">{{ globalHelperFixeDecimalMoney(globalHelperCalculaSubTotalStockUnitario(item.attributes.precio, item.attributes.cantidad, item.attributes.stock_aproximado_unidad, item.attributes.cantidad_total)) }}</td>
            <td v-else class="text-right">{{ globalHelperFixeDecimalMoney(globalHelperCalculaSubTotal(item.attributes.precio, item.attributes.cantidad)) }}</td>
            
            </tr>
        </tbody>
        
        </template>
        
    </v-simple-table>
    
    
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        devolution: Object
    },
    computed: {
        ...mapGetters({
            sale: 'sales_manager/sale',
            is_saleStockUnitario: 'sales_manager/is_saleStockUnitario'
        })
    },    
    components: {
        
        
    },

    data: () => ({
        
    }),
    methods: {

    },
}
</script>

<style>

</style>