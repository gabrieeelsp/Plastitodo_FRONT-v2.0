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
                        v-if="Object.prototype.hasOwnProperty.call(payment.attributes, 'is_confirmed')"
                        icon
                        @click="showEditPaymentModal ( payment )"
                        x-small
                        >
                        <v-icon>mdi-edit</v-icon>
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
        <EditPaymentModal
            :saldoSale="Number(saldoTotalSale)"
            :payment="paymentShowed"
            :dialogVisible="editPaymentModalVisible"
            @close="editPaymentModalVisible = false"
            @updatePayment="updatePayment"
            />
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import NewPaymentModal from '@/components/admin/sales_manager/sale/sale_detail/NewPaymentModal'
import EditPaymentModal from '@/components/admin/sales_manager/sale/sale_detail/EditPaymentModal'
export default {

    data () {
		return {
			newPaymentModalVisible: false,
            editPaymentModalVisible: false,

            paymentShowed: null
		}
    },

    components: {
        NewPaymentModal,
        EditPaymentModal
    },

    computed: {
        ...mapGetters({
            sale: 'sales_manager/sale',
            saldoTotalSale: 'sales_manager/saldoTotalSale',
        })
    },

    methods: {
        ...mapActions({
            save_payment: 'sales_manager/save_payment',
            add_payment: 'sales_manager/add_payment',
            update_payment: 'sales_manager/update_payment'
        }),

        addPayment(payment) {
            this.add_payment(payment)
            this.newPaymentModalVisible = false
			
		},
        updatePayment( payment ) {
            this.update_payment(payment)
            this.editPaymentModalVisible = false
        },

        showEditPaymentModal ( payment ) {
            this.paymentShowed = payment
            this.editPaymentModalVisible = true
        }
    }

    
}
</script>

<style>

</style>