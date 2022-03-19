<template>
    <v-simple-table v-if="sale">
        <template v-slot:default>
        <thead>
            <tr>
            <th class="pl-1 text-left font-weight-bold text-subtitle-1 grey--text text--darken-3">
                Producto 
            </th>
            <th 
                style="width: 150px;"
                class="pl-1 text-center font-weight-bold text-subtitle-1 grey--text text--darken-3">
                Precio
            </th>
            <th
                style="width: 150px;"
             class="pl-1 text-center font-weight-bold text-subtitle-1 grey--text text--darken-3">
                Cantidad
            </th>
            <template v-if="is_saleActiveStockUnitario">
            <th
                style="width: 150px;"
             class="pl-1 text-center font-weight-bold text-subtitle-1 grey--text text--darken-3">
                Peso
            </th>
            </template>
            <th 
                style="width: 150px;"
                class="pl-1 text-center font-weight-bold text-subtitle-1 grey--text text--darken-3">
                SubTotal
            </th>
            
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="item in sale.relationships.saleitems"
            :key="item.id"
            >
                <td>{{ item.attributes.name }}</td>

                <td
                    class="text-right"
                    >{{ globalHelperFixeDecimalMoney(item.attributes.precio) }}</td>

                <td 
                    class="text-right"
                    >{{ globalHelperFixeDecimalCantidad(item.attributes.cantidad) }}</td>

                <template v-if="is_saleActiveStockUnitario">
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
                    ----------------
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

export default {


    computed: {
        
    },
    components: {
        
       
    },
    props: {
        sale: Object
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