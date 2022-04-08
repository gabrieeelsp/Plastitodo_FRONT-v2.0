<template>
  <div>
      <v-row>
            <v-col cols="12" sm="9">
                <v-row class="">
                    <v-col cols="12"><SaleItems /></v-col>
                </v-row>
                <v-row class="">
                    <v-col cols="12" class="pt-1">
                        <SaleResumen 
                            @showDevolutionEditingDetailMethod="$emit('showDevolutionEditingDetailMethod')"
                            @showCreditnoteEditingDetailMethod="$emit('showCreditnoteEditingDetailMethod')"
                            @showDebitnoteEditingDetailMethod="$emit('showDebitnoteEditingDetailMethod')"
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
                        <SaleComprobante />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <SaleUser />
                    </v-col>
                </v-row>
                <v-row v-if="caja">
                    <v-col>
                        <SalePayments />
                    </v-col>
                </v-row>
                <v-row v-if="caja">
                    <v-col>
                        <SaleRefonds />
                    </v-col>
                </v-row>
                
            </v-col>
        </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import SaleItems from '@/components/admin/sales_manager/sale/sale_detail/SaleItems'
import SalePayments from '@/components/admin/sales_manager/sale/sale_detail/SalePayments'
import SaleRefonds from '@/components/admin/sales_manager/sale/sale_detail/SaleRefonds'
import SaleResumen from '@/components/admin/sales_manager/sale/sale_detail/SaleResumen'
import SaleUser from '@/components/admin/sales_manager/sale/sale_detail/SaleUser'
import SaleClient from '@/components/admin/sales_manager/sale/sale_detail/SaleClient'
import SaleComprobante from '@/components/admin/sales_manager/sale/sale_detail/SaleComprobante'
export default {

    components: {
        SaleItems,
        SalePayments,
        SaleRefonds,
        SaleResumen,
        SaleUser,
        SaleClient,
        SaleComprobante
    },

    computed: {
        ...mapGetters({
            caja: 'caja/caja'
        })
    }

}
</script>

<style>

</style>