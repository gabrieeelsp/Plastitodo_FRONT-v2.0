<template>
  <div>
      <v-row>
            <v-col cols="12" sm="9">
                <v-row>
                    <v-col cols="12">
                        <DebitnoteForm
                            :debitnote="debitnote" 
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
                        <DebitnoteTotal 
                            :debitnote="debitnote"
                        />
                    </v-col>
                </v-row>
                
            </v-col>
        </v-row>
  </div>
</template>

<script>

import SaleClient from '@/components/admin/sales_manager/sale/sale_detail/SaleClient'
import DebitnoteForm from '@/components/admin/sales_manager/sale/debitnote_detail/DebitnoteForm'
import DebitnoteTotal from '@/components/admin/sales_manager/sale/debitnote_detail/DebitnoteTotal'

export default {
    props: {
        debitnote: Object,
    },
    components: {
        SaleClient,
        DebitnoteForm,
        DebitnoteTotal,
    }

}
</script>

<style>

</style>