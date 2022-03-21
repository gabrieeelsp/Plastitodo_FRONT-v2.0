<template>
    <v-card>
        <v-card-title class="d-flex justify-space-between pb-2 pt-2">
            <span>Reintegros</span>
            <v-btn 
                x-small 
                @click="newRefondModalVisible = true"
                :disabled="saldoTotalSale >= 0"
            ><v-icon>mdi-plus</v-icon> </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-row v-for="(refond, index) in sale.relationships.refonds" :key="index" >  
                <v-col cols="12" sm="5"  class="d-flex justify-start pt-1 pb-1">
                    <span class="">{{ refond.attributes.name }}</span>
                </v-col>
                <v-col cols="10" sm="4"  class="d-flex justify-end pt-1 pb-1">
                    <span
                    >{{ globalHelperFixeDecimalMoney(refond.attributes.valor) }}</span>
                </v-col>
                <v-col cols="2" sm="3" class="pt-1 pb-1 d-flex justify-start align-center">
                    <v-btn
                        v-if="Object.prototype.hasOwnProperty.call(refond.attributes, 'is_confirmed') && !refond.attributes.is_confirmed"
                        icon
                        @click="showEditRefondModal ( refond )"
                        x-small
                        >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>

                    <v-btn
                        v-else
                        icon
                        
                        x-small
                        >
                        <v-icon>mdi-eye</v-icon>
                    </v-btn>

                    <v-btn
                        v-if="Object.prototype.hasOwnProperty.call(refond.attributes, 'is_confirmed') && !refond.attributes.is_confirmed"
                        icon
                        @click="removeRefond ( refond )"
                        x-small
                        >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn
                        :loading="is_saving && refond_saving.id == refond.id"
                        v-if="Object.prototype.hasOwnProperty.call(refond.attributes, 'is_confirmed') && !refond.attributes.is_confirmed"
                        icon
                        @click="saveRefond ( refond )"
                        x-small
                        >
                        <v-icon>save</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <NewRefondModal
            :saldoSale="saldoTotalSale"
            :dialogVisible="newRefondModalVisible"
            @close="newRefondModalVisible = false"
            @addRefond="addRefond"
            />
        <EditRefondModal
            :saldoSale="Number(saldoTotalSale)"
            :refond="refondShowed"
            :dialogVisible="editRefondModalVisible"
            @close="editRefondModalVisible = false"
            @updateRefond="updateRefond"
            />
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import NewRefondModal from '@/components/admin/sales_manager/sale/sale_detail/NewRefondModal'
import EditRefondModal from '@/components/admin/sales_manager/sale/sale_detail/EditRefondModal'
export default {

    data () {
		return {
            is_saving: false,
            payment_saving: null,
			newRefondModalVisible: false,
            editRefondModalVisible: false,

            refondShowed: null
		}
    },

    components: {
        NewRefondModal,
        EditRefondModal
    },

    computed: {
        ...mapGetters({
            sale: 'sales_manager/sale',
            saldoTotalSale: 'sales_manager/saldoTotalSale',
        })
    },

    methods: {
        ...mapActions({
            save_refond: 'sales_manager/save_refond',
            add_refond: 'sales_manager/add_refond',
            update_refond: 'sales_manager/update_refond',
            remove_refond: 'sales_manager/remove_refond'
        }),

        addRefond(refond) {
            this.add_refond(refond)
            this.newRefondModalVisible = false
			
		},
        updateRefond( refond ) {
            this.update_refond(refond)
            this.editRefondModalVisible = false
        },

        showEditRefondModal ( refond ) {
            this.refondShowed = refond
            this.editRefondModalVisible = true
        },

        removeRefond ( refond ) {
            this.remove_refond ( refond )
        },
        async saveRefond ( refond ) {
            this.refond_saving = refond
            this.is_saving = true
            await this.save_refond ( refond )
                .then((resp) => {
                    refond.id = resp.data.data.id
                    refond.attributes.is_confirmed = true
                    this.$toast.success('El reintegro se ha guardado correctamente', { timeout: 3000 });
                })
                .catch(() => {
                    this.$toast.error('Se ha producido un error.', { timeout: 3000 });
                })
            this.prefond_saving = false
            this.is_saving = false
        }
    }

    
}
</script>

<style>

</style>