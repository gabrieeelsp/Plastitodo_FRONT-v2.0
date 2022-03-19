<template>
    <v-row >
        <v-col cols="12" sm="5"  class="d-flex justify-start pt-1 pb-1">
            <v-select
                v-model="select"

                :items="paymentMethods"
                item-text="attributes.name"
                item-value="id"
                label="Select"
                persistent-hint
                return-object
                single-line
                dense

            ></v-select>
        </v-col>
        <v-col cols="12" sm="5"  class="d-flex justify-end pt-1 pb-1">
            <InputEditTable 
                    :item="{
                        saleProductId: 0,
                        name: 'jj',
                        cantidad: valor
                    }"
                    :less_or_equal_than="'0'"

                    @close="item.is_editing_cantidad_total = false"
                    @accept="set_valor"
                />
        </v-col>
        <v-col cols="12" sm="2"  class="d-flex align-center justify-center pt-1 pb-1">
            <v-btn icon 
                @click="accept"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn icon 
                @click="cancel"
            >
                <v-icon>mdi-minus</v-icon>
            </v-btn>
        </v-col>
    </v-row> 
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import InputEditTable from '@/components/admin/utils/InputEditTable'
export default {
    components: {
        InputEditTable
    },
    data() {
        return{
            name: 'efectivo',

            select: { id: 1,  },
            valor: null,

        }
    },
    computed: {
        ...mapGetters({
            paymentMethods: 'paymentMethod/paymentMethods',
			
		}),
    },
    methods: {
        ...mapActions({
            add_payment: 'sale_showed/add_payment'
        }),
        async accept() {
            console.log('voy')
            if( this.valor != null ){
                await this.add_payment({
                    paymentmethod_id: this.select.id,
                    valor: this.valor
                }).then((resp) => {
                    console.log(resp)
                })

            }
            
        },
        cancel() {
            this.$emit('cancel');
        },
        set_valor( item ) {
            this.valor = item.cantidad
        }
    }
    
}
</script>

<style>

</style>