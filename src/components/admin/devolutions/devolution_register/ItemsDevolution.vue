<template>
    <v-simple-table>
        <template v-slot:default>
        <thead>
            <tr>
            <th style="width: 40px;"></th>
            <th class="pl-1 text-left font-weight-bold text-subtitle-1 grey--text text--darken-3">
                Producto 
            </th>
            <th 
                style="width: 150px;"
                class="pl-1 text-center font-weight-bold text-subtitle-1 grey--text text--darken-3">
                Precio
            </th>
            <th
                style="width: 100px;"
             class="pl-1 text-center font-weight-bold text-subtitle-1 grey--text text--darken-3">
                Cant disp
            </th>
            <th
                style="width: 150px;"
             class="pl-1 text-center font-weight-bold text-subtitle-1 grey--text text--darken-3">
                Cantidad
            </th>
            <template v-if="is_devolutionStockUnitario">
            <th
                style="width: 150px;"
             class="pl-1 text-center font-weight-bold text-subtitle-1 grey--text text--darken-3">
                Peso disp
            </th>
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
            v-for="item in devolution.devitems"
            :key="item.id"

            :class="[(item.is_devolution_item ) ? 'blue lighten-5': '', (item.cant_disponible_devolucion == 0) ? 'text--disabled' : '']"
            >
            <td class=" d-flex align-center pl-1 pr-1 pt-0">
                <v-checkbox
                class="  mt-0 pt-0   "
                    v-model="item.is_devolution_item"
                    hide-details=""
                    :disabled="item.cant_disponible_devolucion == 0"
                >                    
                </v-checkbox>
            </td>
            <td class="pl-0">{{ item.name }}</td>
            
            
            <td 
                class="text-right"
                >{{ globalHelperFixeDecimalMoney(item.precio) }}</td>

            <td 
                class="text-right"
                >{{ globalHelperFixeDecimalCantidad(item.cant_disponible_devolucion) }}</td>


            <td 
                style="" 
                v-if="item.is_editing_cantidad && item.cant_disponible_devolucion != 0"
                class=""
                >
                <InputEditTableMAX
                    :item="{
                        saleProductId: item.saleitem_id,
                        name: item.name,
                        cantidad: item.cantidad,
                        cantidad_max: item.cant_disponible_devolucion
                    }"
                    

                    @close="item.is_editing_cantidad = false"
                    @accept="set_cantidad"
                />
            </td>
            <td 
                v-else 
                class="text-right"
                @dblclick="item.is_editing_cantidad = true"
                >{{ globalHelperFixeDecimalCantidad(item.cantidad) }}</td>




            <template v-if="is_devolutionStockUnitario">
                <td 
                    v-if="item.is_stock_unitario_kilo"
                    class="text-right"
                >{{ globalHelperFixeDecimalCantidad(item.cant_total_disponible_devolucion) }}</td>
                <td
                    v-else
                    class="text-right"
                    >
                    ----------------
                </td>


                <td 
                    v-if="(item.is_stock_unitario_kilo && !item.is_editing_cantidad_total) || item.cant_disponible_devolucion == 0"
                    class="text-right"
                    @dblclick="item.is_editing_cantidad_total = true"
                    >
                    {{ globalHelperFixeDecimalCantidad(item.cantidad_total) }}
                </td>
                <td 
                
                    v-else-if="item.is_stock_unitario_kilo && item.is_editing_cantidad_total"
                    class="text-right"
                    >
                    <InputEditTableMAX 
                        :item="{
                            saleProductId: item.saleitem_id,
                            name: item.name,
                            cantidad: item.cantidad_total,
                            cantidad_max: item.cant_total_disponible_devolucion
                        }"

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

            
            <template v-if="item.cant_disponible_devolucion != 0">
                <td v-if="item.is_stock_unitario_kilo" class="text-right">{{ globalHelperFixeDecimalMoney(globalHelperCalculaSubTotalStockUnitario(item.precio, item.cantidad, item.stock_aproximado_unidad, item.cantidad_total)) }}</td>

                <td v-else class="text-right">{{ globalHelperFixeDecimalMoney(globalHelperCalculaSubTotal(item.precio, item.cantidad)) }}</td>
            </template>
            <template v-else>
                <td
                    class="text-right"
                >------</td>
            </template>
            </tr>
        </tbody>
        
        </template>
        
    </v-simple-table>
    
    
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import InputEditTableMAX from '@/components/admin/utils/InputEditTableMAX'
export default {


    computed: {
        ...mapGetters({
            devolution: 'devolution/devolution',
            is_devolutionStockUnitario: 'devolution/is_devolutionStockUnitario',
        })
    },
    components: {
        
        InputEditTableMAX
    },

    data: () => ({
        item_editing: null,
    }),
    methods: {
        ...mapActions({

        }),
        set_cantidad(itemEdited){ 
            for ( let item of this.devolution.devitems) {
                if ( item.saleitem_id == itemEdited.id) {
                    item.cantidad = itemEdited.cantidad

                    item.is_editing_cantidad = false
                    break
                }
            }
        },


        set_cantidad_total(itemEdited){              
            for ( let item of this.devolution.devitems) {
                if ( item.saleitem_id == itemEdited.id) {
                    item.cantidad_total = itemEdited.cantidad

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