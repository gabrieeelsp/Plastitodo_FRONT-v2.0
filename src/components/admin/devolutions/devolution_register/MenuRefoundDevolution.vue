<template>

	<v-card class="">
		<v-card-text >
			
            <v-row class="green lighten-5 mb-1">
				
				<v-col cols="12"  class="d-flex justify-center align-center">
					<span class="title">DEVOLUCIONES</span>
					<v-btn
						icon
						color="green"
						class="ml-2"
						@click="newRefoundModalVisible = true"
						>
						<v-icon>mdi-plus</v-icon>
						
					</v-btn>
					<NewRefoundModal
						:restoDevolution="restoDevolution"
						:dialogVisible="newRefoundModalVisible"
						@close="newRefoundModalVisible = false"
						@addRefound="addRefound"
						/>
					
				</v-col>
			</v-row>

		
        <v-row v-for="(refound, index) in devolution.refounds" :key="index"
            
        >
            <v-col cols="12" sm="5"  class="d-flex justify-start pt-1 pb-1">
                <span class="">{{ refound.name }}</span>
            </v-col>
            <v-col cols="10" sm="5"  class="d-flex justify-end pt-1 pb-1">
				<span
					v-if="refound.is_editing_valor"	
				>
					<InputEditTable 
						:item="{
							saleProductId: refound.id,
							name: refound.name,
							cantidad: refound.valor
						}"
						:less_or_equal_than="0"
						@close="refound.is_editing_valor = false"
						@accept="set_valor"
					/>
				</span>
				<span
					v-else
					@dblclick="refound.is_editing_valor = true"
				>{{ globalHelperFixeDecimalMoney(refound.valor) }}</span>
            </v-col>
            <v-col cols="2" sm="2" class="pt-1 pb-1">
                <v-btn
					icon
					@click="remove_refound(refound.id)"
					x-small
					>
					<v-icon>mdi-delete</v-icon>
				</v-btn>
            </v-col>

        </v-row>
		<v-divider class="mt-2"></v-divider>
        <v-row class="">
			
				<v-col cols="12" sm="5"  class=" d-flex justify-start">
					<span class="title darken-4">RESTO </span>
				</v-col>
				
				<v-col cols="10" sm="5"  class="d-flex justify-end" >
					
					<span class="title darken-4">{{ globalHelperFixeDecimalMoney(restoDevolution) | money_string  }}</span>
				</v-col>
				<v-col cols="2" sm="2">
				</v-col>
			</v-row>
			
					
		</v-card-text>
	</v-card>

</template>

<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import InputEditTable from '@/components/admin/utils/InputEditTable.vue'
import NewRefoundModal from './NewRefoundModal.vue'
export default {
	data () {
		return {
			newRefoundModalVisible: false
		}
    },


	components: {
		InputEditTable,
		NewRefoundModal
	},
	computed: {
		...mapGetters({
			devolution: 'devolution/devolution',
			restoDevolution: 'devolution/restoDevolution'
			
		})
    },
	methods: {
		...mapActions({
			remove_refound: 'devolution/remove_refound',
			add_refound: 'devolution/add_refound'

        }),

		set_valor(itemEdited){            
            for ( let item of this.devolution.refounds) {
                if ( item.id == itemEdited.id) {
                    item.valor = Number(itemEdited.cantidad)
                    item.is_editing_valor = false
                    break
                }
            }
        },

		addRefound(refound) {
			this.newRefoundModalVisible = false,
			this.add_refound(refound)
			
		}

		
	}
	
}
</script>

<style>

</style>