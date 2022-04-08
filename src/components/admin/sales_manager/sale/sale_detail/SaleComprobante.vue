<template>
<div>
    <v-card>
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="5"  class="d-flex align-center justify-start pt-1 pb-1">
                    <span>Comprobante:</span>
                </v-col>
                <v-col cols="12" sm="7"
                    class="d-flex align-center justify-end pt-1 pb-1"
                    v-if="sale.relationships.comprobante"
                >
                    <span>{{ sale.relationships.comprobante.attributes.tipo }} {{ sale.relationships.comprobante.attributes.punto_venta | punto_venta_string }} - {{ sale.relationships.comprobante.attributes.numero | numero_factura_string }}</span>
                </v-col>
                <v-col cols="12" sm="7"  class="d-flex align-center justify-start pt-1 pb-1">
                    <div v-if="!sale.relationships.comprobante">
                        <v-select
                            v-if="!(sale.relationships.client && sale.relationships.client.relationships.modelofact)"
                            dense
                            :items="modelofacts_select"
                            item-text="name"
                            item-value="id"
                            v-model="modelofact_id"
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
                                    name: sale.relationships.client.relationships.modelofact.attributes.name,
                                    id: sale.relationships.client.relationships.modelofact.id
                                }
                            ]"
                            item-text="name"
                            item-value="id"
                            v-model="modelofact_id"
                        >

                        </v-select>
                    </div>
                </v-col>
            </v-row>
            <v-btn 
                v-if="!sale.relationships.comprobante"
                block 
                small 
                :loading="is_saving"   
                @click="generarComprobante"        
            >
                Enviar
            </v-btn>
            <v-btn 
                v-else
                block 
                small 
                :loading="is_saving"   
                @click="generateReport"
            >
                Ver
            </v-btn>
        </v-card-text>
    </v-card> 
    <vue-html2pdf 

        :show-layout="false" 
        :float-layout="true" 
        :enable-download="false" 
        :preview-modal="true" 
        :paginate-elements-by-height="1400" 
        filename="hee hee" 
        :pdf-quality="2" 
        :manual-pagination="false" 
        pdf-format="a4" 
        pdf-orientation="portrait" 
        pdf-content-width="800px" 
        ref="html2Pdf" 
    
    > 

        <section slot="pdf-content"> 
            <!-- PDF Content Here --> 

            <comprobanteA 
                v-if="sale.relationships.comprobante && sale.relationships.comprobante.attributes.tipo == 'A'"
                :sale="sale"
            />

        </section> 

    </vue-html2pdf> 

</div>  
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import VueHtml2pdf from 'vue-html2pdf' 
import comprobanteA from '@/components/admin/comprobantes/comprobanteA'
export default {
    mounted ( ) {
        if ( this.sale.relationships.client ){
            if ( this.sale.relationships.client.relationships.modelofact ) {
                if ( this.sale.relationships.client.attributes.fact_default ) {
                    this.modelofact_id = this.sale.relationships.client.relationships.modelofact.id
                }else{
                    this.modelofact_id = 0
                }
                
            } else {
                this.modelofact_id = 0
            }
        }
            
    },
    components: {
        VueHtml2pdf,
        comprobanteA
    },
    computed: {
        ...mapGetters({
            modelofacts_select: 'modelofact/modelofacts_select',
            sale: 'sales_manager/sale'
        })
    },
    data () {
        return {
            is_saving: false,
            modelofact_id: null
        }        
    },
    methods: {
        ...mapActions({
            generate_comprobante: 'sales_manager/generate_comprobante',
            set_comprobante: 'sales_manager/set_comprobante',
        }),
        async generarComprobante ( ) {
            this.is_saving = true
            await this.generate_comprobante ( this.modelofact_id )
                .then((resp) => {
                    //console.log(resp.data.data)
                    this.set_comprobante(resp.data.data)
                    this.$toast.success('El reintegro se ha guardado correctamente', { timeout: 3000 });
                })
                .catch(() => {
                    //console.log(error.message)
                    this.$toast.error('Se ha producido un error.', { timeout: 3000 });
                })
            this.is_saving = false
        },

        generateReport () { 
            this.$refs.html2Pdf.generatePdf() 
        } 
    }

}
</script>

<style>
    .factura {
        margin: 25px 25x;
    }

</style>