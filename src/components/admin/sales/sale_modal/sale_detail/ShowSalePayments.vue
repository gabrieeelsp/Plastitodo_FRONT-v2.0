<template>
    <div v-if="sale_showed">
        <v-row>
            <v-col>
                <div class="green lighten-5 d-flex justify-center align-center">
                    <span class="title">Pagos</span>
                    <v-btn icon small class="ml-1"
                        @click="setAddPayment"
                        >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </div>
            </v-col>
        </v-row>

        
        

        <v-row v-for="(payment, index) in sale_showed.relationships.payments" :key="index" 
            :class="(index == 0) ? 'mt-1': ''"
        >
            <v-col cols="12" sm="5"  class="d-flex justify-start pt-1 pb-1">
                <span class="">{{ payment.attributes.name }}</span>
            </v-col>
            <v-col cols="12" sm="5"  class="d-flex justify-end pt-1 pb-1">
				<span>{{ globalHelperFixeDecimalMoney(payment.attributes.valor) }}</span>
            </v-col>
            <v-col cols="12" sm="2"  class="d-flex justify-center pt-1 pb-1">
                <v-btn icon x-small>
					<v-icon>mdi-eye</v-icon>
				</v-btn>
            </v-col>
        </v-row> 

        <AddPaymentMenu 
            v-if="is_add_payment_showed"

            @cancel="cancel_add_payment"
        />  

        <v-row class="">
			
            <v-col cols="12" sm="5"  class=" d-flex justify-end align-start">
                <span class="subtitle-1 darken-4">SALDO </span>
            </v-col>
            
            <v-col cols="10" sm="5"  class="d-flex justify-end" >
                
                <span class="title darken-4">{{ globalHelperCalculaSaldoSale(sale_showed) | money_string  }}</span>
            </v-col>
            <v-col cols="2" sm="2">
            </v-col>
        </v-row>      
            
                
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AddPaymentMenu from '@/components/admin/sales/sale_modal/sale_detail/AddPaymentMenu'
export default {
    mounted() {
        this.is_add_payment_showed= false
    },
    props: {

    },
    data() {
        return {
            is_add_payment_showed: false
        }
    },
    components: {
        AddPaymentMenu
    },
    computed: {
        ...mapGetters({
            sale_showed: 'sale_showed/sale_showed',
        }),
    },
    methods: {
        setAddPayment() {
            this.is_add_payment_showed = true
        },
        cancel_add_payment() {
            this.is_add_payment_showed = false
        }
    }

}
</script>

<style>

</style>