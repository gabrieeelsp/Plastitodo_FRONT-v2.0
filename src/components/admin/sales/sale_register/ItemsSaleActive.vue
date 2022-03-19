<template>
    <v-simple-table>
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
            <th 
                style="width: 80px;"
                class="pl-1 text-center font-weight-bold text-subtitle-1 grey--text text--darken-3">
                Actions
            </th>
            
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="item in saleActive.items"
            :key="item.id"
            >
            <td>{{ item.name }}</td>

            <td 
                style="" 
                v-if="item.is_editing_precio"
                class=""
                >
                <InputEditTable 
                    :item="{
                        saleProductId: item.saleProductId,
                        name: item.name,
                        cantidad: item.precio
                    }"
                    :less_or_equal_than="'0'"

                    @close="item.is_editing_precio = false"
                    @accept="set_precio"
                />
            </td>
            <td 
                v-else 
                class="text-right"
                @dblclick="item.is_editing_precio = true"
                >{{ globalHelperFixeDecimalMoney(item.precio) }}</td>
            <td 
                style="" 
                v-if="item.is_editing_cantidad"
                class=""
                >
                <InputEditTable 
                    :item="{
                        saleProductId: item.saleProductId,
                        name: item.name,
                        cantidad: item.cantidad
                    }"
                    :less_or_equal_than="'0'"

                    @close="item.is_editing_cantidad = false"
                    @accept="set_cantidad"
                />
            </td>
            <td 
                v-else 
                class="text-right"
                @dblclick="item.is_editing_cantidad = true"
                >{{ globalHelperFixeDecimalCantidad(item.cantidad) }}</td>

            <template v-if="is_saleActiveStockUnitario">
                <td 
                v-if="item.is_stock_unitario_kilo && !item.is_editing_cantidad_total"
                class="text-right"
                @dblclick="item.is_editing_cantidad_total = true"
                >
                {{ globalHelperFixeDecimalCantidad(item.cantidad_total) }}
            </td>
            <td 
            
                v-else-if="item.is_stock_unitario_kilo && item.is_editing_cantidad_total"
                class="text-right"
                >
                <InputEditTable 
                    :item="{
                        saleProductId: item.saleProductId,
                        name: item.name,
                        cantidad: item.cantidad_total
                    }"
                    :less_or_equal_than="'0'"

                    @close="item.is_editing_cantidad_total = false"
                    @accept="set_cantidad_total"
                />
            </td>
            <td
                v-else
                class="text-right"
                >
                ----------------
            </td>

            </template>

            

            <td v-if="item.is_stock_unitario_kilo" class="text-right">{{ globalHelperFixeDecimalMoney(globalHelperCalculaSubTotalStockUnitario(item.precio, item.cantidad, item.stock_aproximado_unidad, item.cantidad_total)) }}</td>

            <td v-else class="text-right">{{ globalHelperFixeDecimalMoney(globalHelperCalculaSubTotal(item.precio, item.cantidad)) }}</td>
            <td>
                <v-btn
                    small
                    @click="remove_item(item.saleProductId)"
                >
                    Ed
                </v-btn>
            </td>
            </tr>
        </tbody>
        
        </template>
        
    </v-simple-table>
    
    
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import InputEditTable from '@/components/admin/utils/InputEditTable'
export default {


    computed: {
        ...mapGetters({
            saleActive: 'sale/saleActive',
            is_saleActiveStockUnitario: 'sale/is_saleActiveStockUnitario',
        })
    },
    components: {
        
        InputEditTable
    },

    data: () => ({
        item_editing: null,
    }),
    methods: {
        ...mapActions({
            remove_item: 'sale/remove_item'
        }),
        set_cantidad(itemEdited){            
            for ( let item of this.saleActive.items) {
                if ( item.saleProductId == itemEdited.id) {
                    item.cantidad = this.globalHelperFixeDecimalCantidad(itemEdited.cantidad)

                    item.is_editing_cantidad = false
                    break
                }
            }
        },
        set_precio(itemEdited){            
            for ( let item of this.saleActive.items) {
                if ( item.saleProductId == itemEdited.id) {
                    item.precio = this.globalHelperFixeDecimalMoney(itemEdited.cantidad)

                    item.is_editing_precio = false
                    break
                }
            }
        },

        set_cantidad_total(itemEdited){  
            
            for ( let item of this.saleActive.items) {
                if ( item.saleProductId == itemEdited.id) {
                    item.cantidad_total = this.globalHelperFixeDecimalCantidad(itemEdited.cantidad)

                    item.is_editing_cantidad_total = false
                    break
                }
            }
        },


    },
}
</script>

<style>

</style>