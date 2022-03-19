<template>

	<div>
			
			<v-row v-for="(payment, index) in saleActive.payments" :key="index">
				<v-col cols="12" sm="4"  class=" d-flex justify-sm-end align-center">
					{{ payment.name }}
				</v-col>
				<v-col cols="12" sm="8"  class="d-flex justify-center align-center">
					{{ globalHelperFixeDecimalMoney(payment.valor) }}
				</v-col>
			</v-row>
			<v-row class="">
				<v-col cols="12" sm="4"  class=" d-flex justify-sm-end align-center">
					<span class="font-weight-bold black--text">Nuevo: </span>
				</v-col>
				<v-col cols="12" sm="8"  class="d-flex justify-center align-center pb-0 ">
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
			</v-row>
			<v-row class="">
				<v-col cols="12" sm="4"  class="pt-2 pb-0 d-flex justify-sm-end">
					<span class="font-weight-bold black--text">Monto: </span>
				</v-col>
				<v-col cols="12" sm="8"  class="d-flex justify-center align-center pb-0 pt-0">
					<v-text-field
						class="right-text-input"
						
						dense
						v-model="saldoSaleActive"
						:rules="valorRules"
						:error-messages="errorValorMessages"
						@keydown="errorValorMessages = ''"
						type="number"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row >
				<v-col cols="12" sm="4"  class="pt-2 pb-0 d-flex justify-sm-end">

				</v-col>
				<v-col cols="12" sm="8"  class="d-flex justify-start align-center ">
					<v-btn
					@click="addPayment"
						small
					>Agregar Pago</v-btn>
				</v-col>
			</v-row>
			
			</div>
		

</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
	data () {
      return {
        select: { id: 1,  },

		valor: '',
		valorRules: [
                v => ( v && v >= 0 ) || "Valor should be above 0",
            ],
            errorValorMessages: '',

      }
    },
	props: {
		saldoSaleActive: Number
	},

	components: {
		
	},
	computed: {
		...mapGetters({
			saleActive: 'sale/saleActive',
			paymentMethods: 'paymentMethod/paymentMethods'
		})
    },
	methods: {
		...mapActions({
            add_payment: 'sale/add_payment',
        }),
		
		addPayment () {
			let name = ''
			for( let item of this.paymentMethods) {
				if( item.id == this.select.id){
					name = item.attributes.name
					break
				}
			}
            this.add_payment({
				paymentMethod_id: this.select.id,
				name: name,
				valor: Number(this.saldoSaleActive)
			})
        }
	}
	
}
</script>

<style>

</style>