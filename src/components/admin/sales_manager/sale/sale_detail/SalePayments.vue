<template>
    <v-card>
        <v-card-title class="d-flex justify-space-between pb-2 pt-2">
            <span>Pagos</span>
            <v-btn 
                x-small 
                @click="newPaymentModalVisible = true"
                :disabled="saldoTotalSale <= 0"
            ><v-icon>mdi-plus</v-icon> </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-row v-for="(payment, index) in sale.relationships.payments" :key="index" >  
                <v-col cols="12" sm="5"  class="d-flex justify-start pt-1 pb-1">
                    <span class="">{{ payment.attributes.name }}</span>
                </v-col>
                <v-col cols="10" sm="5"  class="d-flex justify-end pt-1 pb-1">
                    <span
                    >{{ globalHelperFixeDecimalMoney(payment.attributes.valor) }}</span>
                </v-col>
                <v-col cols="2" sm="2" class="pt-1 pb-1 d-flex align-center">
                    <v-btn
                        icon

                        x-small
                        >
                        <v-icon>mdi-eye</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <NewPaymentModal
            :saldoSale="saldoTotalSale"
            :dialogVisible="newPaymentModalVisible"
            @close="newPaymentModalVisible = false"
            @addPayment="addPayment"
            />
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import NewPaymentModal from '@/components/admin/sales_manager/sale/sale_detail/NewPaymentModal'
export default {

    data () {
		return {
			newPaymentModalVisible: false
		}
    },

    components: {
        NewPaymentModal
    },

    computed: {
        ...mapGetters({
            sale: 'sales_manager/sale',
            saldoTotalSale: 'sales_manager/saldoTotalSale',
        })
    },

    methods: {
        ...mapActions({
            add_payment: 'sales_manager/add_payment'
        }),

        addPayment(payment) {
			this.newPaymentModalVisible = false,
			this.add_payment(payment)			
		}
    }

    
}
</script>

<style>

</style>