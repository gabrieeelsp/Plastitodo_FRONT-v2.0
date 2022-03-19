<template>

	<v-card class="">
		<v-card-text >
			<v-row class="lime lighten-5">
				<v-col cols="12" sm="4"  class=" d-flex justify-sm-end align-center">
					<span class="font-weight-bold black--text">Saldo: </span>
				</v-col>
				<v-col cols="12" sm="8"  class="d-flex justify-center align-center">
					<span class="title darken-4">{{ globalHelperFixeDecimalMoney(saldoSaleActive)  }}</span>
				</v-col>
			</v-row>
			
			<MenuDebPaymentsActive
				:saldoSaleActive="saldoSaleActive"
			/>
			
		</v-card-text>
	</v-card>

</template>

<script>
import MenuDebPaymentsActive from '../../../components/admin/sales/MenuDebPaymentsActive.vue'
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


	components: {
		MenuDebPaymentsActive
	},
	computed: {
		...mapGetters({
			

			saldoSaleActive: 'sale/saldoSaleActive',
			
		})
    },
	methods: {
		
	}
	
}
</script>

<style>

</style>