<template>
    <div class="d-flex justify-start">
        <v-text-field
            label="BARCODE"
            dense
        ></v-text-field>
        
        <SelectProductModal 
            @set="selectProductModalSET"/>
        <selectProductCantidadModal
            v-if="itemSelected" 
            :item="itemSelected"
            :dialogVisible="selectProductCantidadModalVisible"
            @close="selectProductCantidadModalClose"
            @addItem="addItem" />
    </div>
</template>

<script>
import SelectProductModal from '@/components/admin/sales/sale_register/selectProductModal.vue'
import selectProductCantidadModal from '@/components/admin/sales/sale_register/selectProductCantidadModal.vue'

import { mapActions } from 'vuex'
export default {
    components: {
        SelectProductModal,
        selectProductCantidadModal
    },

    data () {
        return {
            selectProductCantidadModalVisible: false,
            itemSelected: null
        }
    },
    methods: {
        ...mapActions({
            add_item: 'sale/add_item',
        }),
        selectProductModalSET (item) {
            this.itemSelected = item
            this.selectProductCantidadModalVisible = true
        },
        selectProductCantidadModalClose () {
            this.selectProductCantidadModalVisible = false
            this.itemSelected = null
            // other code
        },

        addItem (item) {
            this.selectProductCantidadModalVisible = false
            this.itemSelected = null
            this.add_item(item)
        }
    }

}
</script>

<style>

</style>