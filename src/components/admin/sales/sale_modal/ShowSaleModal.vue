<template>
  
    <div v-if="sale_showed">
        <v-dialog
        v-model="intDialogVisible"
        max-width="900"
        >
            <v-card>    
                <v-card-title class="d-flex justify-space-between">
                    <v-btn 
                        text
                        @click="showSaleDetailMethod"    
                    >Venta #{{ sale_showed.id }}</v-btn>
                    <div>
                        <v-btn
                            v-for="(devolution, index) in sale_showed.relationships.devolutions" :key="index"
                            text
                            class="red--text text--lighten-2"
                            @click="showDevolutionDetail(devolution)"
                            
                        >
                            Devolucion #{{ devolution.id }}
                        </v-btn>
                    </div>
                    
                </v-card-title>  
                <v-card-text>
                    <ShowSaleDetail 
                        v-if="is_show_sale"
                    />
                    <ShowDevolutionDetail
                        v-if="devolutionShowed"
                        :devolution="devolutionShowed"
                    />
                </v-card-text>
                <v-card-actions>
                
                </v-card-actions>
            </v-card>
        
        </v-dialog>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ShowSaleDetail from '@/components/admin/sales/sale_modal/sale_detail/ShowSaleDetail'
import ShowDevolutionDetail from '@/components/admin/sales/sale_modal/devolution_detail/ShowDevolutionDetail'
export default {
    mounted () {

    },
    components: {
        ShowSaleDetail,
        ShowDevolutionDetail
    },
    data () {
      return {
          devolutionShowed: null,
          is_show_sale: true
      }
    },
    props: {
        dialogVisible: Boolean, 
    },
    computed: {
        
        ...mapGetters({
            sale_showed: 'sale_showed/sale_showed',
        }),
        intDialogVisible: {
            get: function () {
                if (this.dialogVisible) {
                    //ii
                }

                return this.dialogVisible
            },
            set: function (value) {
                    if (!value) {
                    this.$emit('close')
                    }
            }
        },
    },
    methods: {
        showDevolutionDetail(devolution) {
            this.is_show_sale = false
            this.devolutionShowed = devolution
        },   
        showSaleDetailMethod() {
            this.devolutionShowed = null
            this.is_show_sale = true
        }
    }
    
  }
</script>