<template>
  <div>
      <v-row>
            <v-col cols="12" sm="9">
                <v-row>
                    <v-col cols="12">
                        <DebitnoteEditingForm 
                            @guardar_debitnote="guardar_debitnote"
                            @cancelar_debitnote="cancelar_debitnote"
                        />
                    </v-col>
                </v-row>
                
                
            </v-col>
            <v-col cols="12" sm="3">
                <v-row>
                    <v-col>
                        <SaleClient />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <DebitnoteEditingTotal />
                    </v-col>
                </v-row>
                
            </v-col>
        </v-row>
  </div>
</template>

<script>
import { mapActions } from'vuex'

import SaleClient from '@/components/admin/sales_manager/sale/sale_detail/SaleClient'
import DebitnoteEditingForm from '@/components/admin/sales_manager/sale/debitnote_editing_detail/DebitnoteEditingForm'
import DebitnoteEditingTotal from '@/components/admin/sales_manager/sale/debitnote_editing_detail/DebitnoteEditingTotal'


export default {
    props: {
        debitnote: Object
    },
    components: {
        SaleClient,
        DebitnoteEditingForm,
        DebitnoteEditingTotal
    },

    data() {
        return {
            
        }
    },

    methods: {
        ...mapActions({
            save_debitnote: 'sales_manager/save_debitnote'
        }),

        async guardar_debitnote ( ) {

            await this.save_debitnote()
                .then((resp) => {
                    this.$emit('finalizar_debitnote', resp.data.data)
                })

        },

        cancelar_debitnote ( ) {
            this.$emit('cancelar_debitnote')
        }
    }
    
}
</script>

<style>

</style>