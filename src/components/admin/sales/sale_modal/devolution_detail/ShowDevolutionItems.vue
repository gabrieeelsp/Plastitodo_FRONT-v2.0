<template>
    <v-simple-table class="">
        <template v-slot:default>
        <thead class="green lighten-5">
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
            <template v-if="is_saleActiveStockUnitario()">
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

            <template v-if="is_saleActiveStockUnitario()">
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

            <td class="text-right">{{ globalHelperFixeDecimalMoney(globalHelperCalculaSubTotal(item.attributes.precio, item.attributes.cantidad)) }}</td>
            
            </tr>
        </tbody>
        
        </template>
        
    </v-simple-table>
    
    
</template>

<script>

export default {

    props: {
        devolution: Object,
        sale: Object
    },

    
    components: {
        
        
    },

    data: () => ({
        
    }),
    methods: {
        
        is_saleActiveStockUnitario() {
            for ( let item of this.sale.relationships.saleitems) {
                if( item.attributes.is_stock_unitario_kilo ) {
                    return true
                }
            }
            return false
        }

    },
}
</script>

<style>

</style>