<template>
  

    <v-dialog
      v-model="intDialogVisible"
      max-width="700"
    >
      <v-card>
        <v-card-title class="text-h5">
            <span class="">{{ item.attributes.name }}</span>
          
        </v-card-title>
        <v-form @submit.prevent="accept" ref="form" v-model="valid" >
        <v-card-text>
            

            <v-row class="">
                
                <v-col cols="12" sm="6">
                    <v-row class="">
                        <v-col class="pt-0">
                            <v-card class="">
                                <v-img
                                    contain
                                    class="white--text align-end"
                                    height="200px"
                                    src="https://picsum.photos/510/300?random"
                                >
                                </v-img>
                                </v-card>
                        </v-col>
                    </v-row>
                    
                </v-col>
                <v-col cols="12" sm="6" class="">
                    
                        <v-row class="">
                            <v-col cols="12" sm="4"  class=" pb-0 d-flex justify-sm-start">
                                <span class="font-weight-bold black--text">Cantidad</span>
                            </v-col>
                            <v-col cols="12" sm="8"  class=" pt-0 pb-0">
                                <v-text-field
                                    class="right-text-input"
                                    dense
                                    type="number"
                                    v-model="cantidad"
                                    ref="input_cantidad"
                                    :rules="cantidadRules"
                                    :error-messages="errorCantidadMessages"
                                    @keydown="errorCantidadMessages = ''"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="4"  class="pt-2 pb-0 d-flex justify-sm-start">
                                <span class="font-weight-bold black--text">Precio</span>
                            </v-col>
                            <v-col cols="12" sm="8"  class=" pt-0 pb-0">
                                <v-text-field
                                    class="right-text-input"
                                    dense
                                    type="number"
                                    v-model="precio"
                                    readonly
                                    
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="4"  class="pt-2 pb-0 d-flex justify-sm-start">
                                <span class="font-weight-bold black--text">Stock</span>
                            </v-col>
                            <v-col cols="12" sm="8"  class=" pt-0 pb-0">
                                <v-text-field
                                    class="right-text-input"
                                    dense
                                    type="number"
                                    v-model="stock"
                                    readonly
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="d-flex justify-end">
                                <v-btn
                                    color="green darken-1"
                                    text
                                    @click="intDialogVisible = false"
                                >
                                    Cancelar
                                </v-btn>

                                <v-btn
                                    color="green darken-1"
                                    text
                                    type="submit"
                                >
                                    Aceptar
                                </v-btn>
                            </v-col>
                        </v-row>
                    
                </v-col>

            </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>


        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
      mounted () {
        this.onload()
    },
    data () {
      return {
        cantidad: null,
        valid: true,
        cantidadRules: [
            v => ( v && v >= 0 ) || "Cantidad should be above 0",
        ],
        errorCantidadMessages: '',
      }
    },
    props: {
        dialogVisible: Boolean,
        item: Object
    
    },
    computed: {
        ...mapGetters({
            saleActive: 'sale/saleActive',
        }),
        stock: function (){
            return this.globalHelperCalculaStock(this.item.relationships.stockproduct.data.attributes.stock, this.item.attributes.rel_venta_stock)
        },
        precio: function (){
            if ( this.saleActive.client != null && this.saleActive.client.tipo == 'MAYORISTA' ) {
                return this.globalHelperFixeDecimalMoney(this.globalHelperCalculaPrecio(this.item.relationships.stockproduct.data.attributes.costo, this.item.attributes.porc_may, this.item.attributes.rel_venta_stock))
            }
            return this.globalHelperFixeDecimalMoney(this.globalHelperCalculaPrecio(this.item.relationships.stockproduct.data.attributes.costo, this.item.attributes.porc_min, this.item.attributes.rel_venta_stock))

        },
        intDialogVisible: {
            get: function () {
                if (this.dialogVisible) {
                    
                // Some dialog initialization code could be placed here
                // because it is called only when this.dialogVisible changes
                }

                return this.dialogVisible
            },
            set: function (value) {
                    if (!value) {
                    this.$emit('close')
                    }
            }
        }
    },
    methods: {
        validate () {
            this.$refs.form.validate()
        },
        accept() {
            this.validate()

            if ( this.valid ) {
                this.$emit('addItem', {
                    saleProductId: this.item.id,
                    name: this.item.attributes.name,
                    precio: this.precio,
                    stock: this.stock,
                    cantidad: this.cantidad,
                    img: "https://picsum.photos/510/300?random",
                    is_editing_cantidad: false,
                    is_editing_precio: false,
                    is_stock_unitario_kilo: this.item.relationships.stockproduct.data.attributes.is_stock_unitario_kilo,
                    stock_aproximado_unidad: this.item.relationships.stockproduct.data.attributes.stock_aproximado_unidad,
                    cantidad_total: null,
                    is_editing_cantidad_total: false,
                    relacion_venta_stock: this.item.attributes.rel_venta_stock

                })
            }
            
        },
        onload() {
            setTimeout(() => this.$refs.input_cantidad.$refs.input.focus(), 100); 
            
        },
    }
  }
</script>