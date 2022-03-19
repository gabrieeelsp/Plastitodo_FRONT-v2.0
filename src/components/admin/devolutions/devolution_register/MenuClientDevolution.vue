<template>

	<v-card class="">
		<v-card-text >
			<v-row class="">
				<v-col cols="12" sm="3"  class="pt-2 pb-0 d-flex justify-sm-end">
					<span class="font-weight-bold black--text">Cliente</span>
				</v-col>
				<v-col cols="12" sm="9"  class=" pt-0 pb-0">
					<v-text-field 
						v-if="devolution.sale.relationships.client"
						dense
						v-model="devolution.sale.relationships.client.attributes.name"
						readonly
					>						
					</v-text-field>
					
				</v-col>
				<v-col cols="12" sm="3"  class="pt-2 pb-0 d-flex justify-sm-end">
					<span class="font-weight-bold black--text">Tipo</span>
				</v-col>
				<v-col cols="12" sm="9"  class=" pt-0 pb-0">
					<v-text-field 
						v-if="devolution.sale.relationships.client"
						dense
						v-model="devolution.sale.relationships.client.attributes.tipo"
						readonly
					>						
					</v-text-field>
					<v-text-field 
						v-else
						dense
						readonly
					>						
					</v-text-field>
					<span ></span>
				</v-col>

			</v-row>
		</v-card-text>
	</v-card>

</template>

<script>
import { mapGetters } from 'vuex'

export default {

	components: {
		
	},
	computed: {
      ...mapGetters({
        devolution: 'devolution/devolution',
      })
    },
	methods: {

		
		
	}
	
}
</script>

<style>

</style>