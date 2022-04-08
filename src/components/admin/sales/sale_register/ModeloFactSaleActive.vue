<template>

	<v-card class="">
		<v-card-text >
			<v-row class="blue lighten-5 ">
				<v-col cols="12" sm="5"  class="pt-2 d-flex justify-sm-end align-center">
					<span class="font-weight-bold black--text">Facturación: </span>
				</v-col>
				<v-col cols="12" sm="7"  class="d-flex justify-center align-center">
					<v-select
						v-if="!(saleActive.client && saleActive.client.modelofact)"
						dense
						:items="modelofacts_select"
						item-text="name"
						item-value="id"
						v-model="saleActive.modelofact_id"
					>

					</v-select>

					<v-select
						v-else
						dense
						:items="[
							{
								name: '',
								id: 0
							},
							{
								name: saleActive.client.modelofact.name,
								id: saleActive.client.modelofact.id
							}
						]"
						item-text="name"
						item-value="id"
						v-model="saleActive.modelofact_id"
					>

					</v-select>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
	mounted() {
	},
	data: () => ({

    }),

	components: {
		
	},
	computed: {
		...mapGetters({
			modelofacts_select: 'modelofact/modelofacts_select',
			saleActive: 'sale/saleActive'
		})
    },
	methods: {
		
	}
	
}
</script>

<style>

</style>