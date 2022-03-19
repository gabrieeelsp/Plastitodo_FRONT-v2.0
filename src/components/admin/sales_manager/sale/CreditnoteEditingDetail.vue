<template>
  <div>
      <v-row>
            <v-col cols="12" sm="9">
                <v-row>
                    <v-col cols="12">
                        <CreditnoteEditingForm 
                            @guardar_creditnote="guardar_creditnote"
                            @cancelar_creditnote="cancelar_creditnote"
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
                        <CreditnoteEditingTotal />
                    </v-col>
                </v-row>
                
            </v-col>
        </v-row>
  </div>
</template>

<script>
import { mapActions } from'vuex'

import SaleClient from '@/components/admin/sales_manager/sale/sale_detail/SaleClient'
import CreditnoteEditingForm from '@/components/admin/sales_manager/sale/creditnote_editing_detail/CreditnoteEditingForm'
import CreditnoteEditingTotal from '@/components/admin/sales_manager/sale/creditnote_editing_detail/CreditnoteEditingTotal'


export default {
    props: {
        creditnote: Object
    },
    components: {
        SaleClient,
        CreditnoteEditingForm,
        CreditnoteEditingTotal
    },

    data() {
        return {
            
        }
    },

    methods: {
        ...mapActions({
            save_creditnote: 'sales_manager/save_creditnote'
        }),

        async guardar_creditnote ( ) {

            await this.save_creditnote()
                .then((resp) => {
                    this.$emit('finalizar_creditnote', resp.data.data)
                })

        },

        cancelar_creditnote ( ) {
            this.$emit('cancelar_creditnote')
        }
    }
    
}
</script>

<style>

</style>