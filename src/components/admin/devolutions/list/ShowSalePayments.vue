<template>

	<div v-if="sale">
			
            <v-row class=" mb-1 pl-2 pr-2">
				
				<v-col cols="12"  class="green lighten-5 d-flex justify-center pt-1 pb-1">
					<span class="title">Pagos</span>
				</v-col>
			</v-row>

		
        <v-row v-for="(payment, index) in sale.relationships.payments" :key="index"
            
        >
            <v-col cols="12" sm="5"  class="d-flex justify-start pt-1 pb-1">
                <span class="">{{ payment.attributes.name }}</span>
            </v-col>
            <v-col cols="10" sm="5"  class="d-flex justify-end pt-1 pb-1">
				
				<span
				>{{ globalHelperFixeDecimalMoney(payment.attributes.valor) }}</span>
            </v-col>
            <v-col cols="2" sm="2" class="pt-1 pb-1 d-flex">
                <v-btn
					icon
					x-small
					>
					<v-icon>mdi-eye</v-icon>
				</v-btn>
            </v-col>

        </v-row>
        <v-row class="">
			
            <v-col cols="12" sm="5"  class=" d-flex justify-end align-center">
                <span class="subtitle-1 darken-4">SALDO </span>
            </v-col>
            
            <v-col cols="10" sm="5"  class="d-flex justify-end" >
                
                <span class="title darken-4">{{ globalHelperCalculaSaldoSale(sale) | money_string  }}</span>
            </v-col>
            <v-col cols="2" sm="2">
            </v-col>
        </v-row>

    </div>

</template>

<script>
export default {
    props: {
        sale: Object
    },
	data () {
		return {
			
		}
    },


	components: {

	},
	computed: {

    },
	methods: {
		
	}
	
}
</script>

<style>

</style>