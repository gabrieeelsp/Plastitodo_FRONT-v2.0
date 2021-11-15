<template>
  <div class="pa-sm-3">
      <v-card class="">
            <v-card-title class="d-flex justify-space-between align-center pt-1 pb-1">                
                <div>
                    <span class="text-h4 font-weight-light">Products</span>
                    <span class="grey--text text-h5 font-weight-light ml-3">Edit</span>
                </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text >
                <v-row class="">
                    <v-col cols="12" class="">
                        <v-form @submit.prevent="submit" ref="form" v-model="valid" >
                            <v-row class="" >
                                <v-spacer></v-spacer>
                                <v-col cols="12" sm="9">
                                    <v-tabs
                                        class=""
                                    >
                                    
                                        <v-tab @click="tab = 'edit'" >
                                        Edit
                                        </v-tab>
                                        <v-tab @click="tab = 'valores'">
                                        Valores
                                        </v-tab>
                                        
                                    </v-tabs>
                                </v-col>
                            </v-row>
                            <div v-show="tab == 'edit'">
                                <v-row>
                                    <v-col cols="12" sm="3"  class="pt-2 pb-0 d-flex justify-sm-end">
                                        <span class="font-weight-bold black--text">Name</span>
                                    </v-col>
                                    <v-col cols="12" sm="9"  class=" pt-0 pb-0">
                                        <v-text-field
                                            counter="30"
                                            class=""
                                            dense
                                            v-model="item.attributes.name"
                                            :rules="nameRules"
                                            :error-messages="errorNameMessages"
                                            @keyup="errorNameMessages = ''"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                <v-col cols="12" sm="3"  class="pt-2 pb-0 d-flex justify-sm-end">
                                    <span class="font-weight-bold black--text">Category</span>
                                </v-col>
                                <v-col cols="10" sm="8"  class=" pt-0 pb-0">
                                    <v-text-field
                                    readonly
                                    disabled
                                        class=""
                                        dense
                                        v-model="item.relationships.category.data.attributes.name"
                                        
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="1" sm="1"  class="pt-1 pb-0">                                
                                    <selectorDialog @select="select_category"></selectorDialog>
                                </v-col>
                            </v-row>

                                <v-row>
                                    <v-col cols="0" sm="3" class="pt-0 pb-0">

                                    </v-col>
                                    <v-col cols="12" sm="9">
                                        <v-checkbox class="mt-0 mb-0 pt-0 pb-0"
                                            v-model="item.attributes.is_enable"
                                            dense
                                            hide-details="true"
                                            label="is enable?"
                                            required
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" sm="3"  class="pt-2 pb-0 d-flex justify-sm-end">
                                        <span class="font-weight-bold black--text">Description</span>
                                    </v-col>
                                    <v-col cols="12" sm="9"  class=" pt-0 pb-0">
                                        <v-textarea
                                            counter="200"
                                            class=""
                                            dense
                                            solo
                                            v-model="item.attributes.description"
                                            :rules="descriptionRules"
                                            :error-messages="errorDescriptionMessages"
                                            @keyup="errorDescriptionMessages = ''"
                                        ></v-textarea>
                                    </v-col>
                                </v-row>
                            </div>
                            
                            <div v-show="tab == 'valores'">
                                <v-row>
                                    <v-col cols="12" sm="3"  class="pt-2 pb-0 d-flex justify-sm-end">
                                        <span class="font-weight-bold black--text">Costo</span>
                                    </v-col>
                                    <v-col cols="12" sm="2"  class=" pt-0 pb-0">
                                        <v-text-field
                                            class="right-text-input"
                                            
                                            dense
                                            v-model="item.attributes.costo"
                                            @input="type_costo"
                                            :rules="costoRules"
                                            :error-messages="errorCostoMessages"
                                            @keydown="errorCostoMessages = ''"
                                            type="number"
                                            
                                        ></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" sm="3"  class="pt-2 pb-0 d-flex justify-sm-end">
                                        <span class="font-weight-bold black--text">Precio min</span>
                                    </v-col>
                                    <v-col cols="10" sm="2"  class=" pt-0 pb-0"> 
                                        <v-text-field
                                            class="right-text-input"
                                            
                                            dense
                                            v-model="item.attributes.precio_min"
                                            @input="type_precio_min"
                                            :rules="precio_minRules"
                                            :error-messages="errorPrecio_minMessages"
                                            @keydown="errorPrecio_minMessages = ''"
                                            type="number"

                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="1" sm="1"  class="pt-1 pb-0">                                    
                                        <v-btn 
                                            small
                                            color="success"
                                            >
                                            <v-icon>
                                                mdi-pencil
                                            </v-icon>                                            
                                        </v-btn>                                       
                                        
                                    </v-col>
                                    <v-col cols="12" sm="2"  class="pt-1 pb-0 text-right">
                                        <span>( {{ item.attributes.porc_min | round2decimal }} %)</span>
                                    </v-col>
                                    
                                    <v-spacer></v-spacer>

                                </v-row>

                                <v-row>
                                    <v-col cols="12" sm="3"  class="pt-2 pb-0 d-flex justify-sm-end">
                                        <span class="font-weight-bold black--text">Precio may</span>
                                    </v-col>
                                    <v-col cols="10" sm="2"  class=" pt-0 pb-0"> 
                                        <v-text-field
                                            class="right-text-input"
                                            
                                            dense
                                            v-model="item.attributes.precio_may"
                                            @input="type_precio_may"
                                            :rules="precio_mayRules"
                                            :error-messages="errorPrecio_mayMessages"
                                            @keydown="errorPrecio_mayMessages = ''"
                                            type="number"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="1" sm="1"  class="pt-1 pb-0">
                                    
                                        <v-btn 
                                            small
                                            color="success"
                                            >
                                            <v-icon>
                                                mdi-pencil
                                            </v-icon>
                                            
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="12" sm="2"  class="pt-1 pb-0 text-right">
                                    <span>( {{ item.attributes.porc_may | round2decimal }} %)</span>
                                </v-col>
                                    
                                <v-spacer></v-spacer>

                                </v-row>
                                                       
                            </div>
                            <v-row>
                                <v-col cols="0" sm="3" class="pt-0 pb-0">

                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-btn color="success" type="submit" class=""
                                        :loading="loading"
                                        :disabled="loading"
                                        small
                                    >Save</v-btn>
                                    <v-btn color="warning" class=" ml-2"
                                        :disabled="loading"
                                        small
                                    >Cancel</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card-text>
      </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import selectorDialog from '@/components/utils/selectorDialog'
export default {
    components: {
        selectorDialog
    },
    mounted() {
        this.getItem()
    },
    data () {
        return {
            id: parseInt(this.$route.params.id),
            item: {
                id: '',
                type: '',
                attributes: {
                    name: '',
                    is_enable: false,
                    description: '',
                    costo: '',
                    porc_min: '',
                    precio_min: '',
                    porc_may: '',
                    precio_may: '',
                    created_at: '',
                    updated_at: ''
                },
                relationships: {
                    category: {
                        data: {
                            id: '',
                            attributes: {
                                name: ''
                            }
                        }
                    }
                }
            },

            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 30) || 'Name must be less than 30 characters',
            ],
            errorNameMessages: '',

            descriptionRules: [
                v =>  !v || (v.length <= 200) || 'Name must be less than 200 characters',
            ],
            errorDescriptionMessages: '',

            costoRules: [
                v => ( v && v >= 0 ) || "Costo should be above 0",
                v => ( v && this.lessDecimal(v, 2) ) || "Costo debe tener como máximo 2 decimales",
            ],
            errorCostoMessages: '',



            precio_minRules: [
                v => ( v && v > 0 ) || "Precio min should be above 0",
                v => ( v && this.lessDecimal(v, 2) ) || "Precio min debe tener como máximo 2 decimales",
            ],
            errorPrecio_minMessages: '',



            precio_mayRules: [
                v => ( v && v > 0 ) || "Precio may should be above 0",
                v => ( v && this.lessDecimal(v, 2) ) || "Precio may debe tener como máximo 2 decimales",
            ],
            errorPrecio_mayMessages: '',

            loading: false,

            tab: 'edit',
        }
    },

    methods: {
        init_values() {
            this.limitDecimalCosto();
            this.addCeroCosto();

            //this.limitDecimalPorc_min();

            this.set_precio_min();

            //this.limitDecimalPorc_may();

            this.set_precio_may();
        },
        
        getItem () {
            axios.get(`/products/${this.id}` + '?include_category_name=true' )
            .then((result) => {
                this.item = result.data.data
                this.init_values();

            }).catch(() => {
                //console.log(error)
            })            
        },
        validate () {
            this.$refs.form.validate()
        },

        errorHandler(error) {
            let message = ''
            if('data.attributes.name' in error.response.data.errors) {
                let errors = error.response.data.errors                
                for( let k in errors['data.attributes.name']){                                
                    message = message + errors['data.attributes.name'][k]
                    this.errorNameMessages = errors['data.attributes.name'][k]
                }   
                //this.$toast.error(message, { timeout: 3000 });
            }
            if('data.attributes.porc_min' in error.response.data.errors) {
                let errors = error.response.data.errors                
                for( let k in errors['data.attributes.porc_min']){                                
                    message = message + errors['data.attributes.porc_min'][k] + '\n'
                    //this.errorNameMessages = errors['data.attributes.name'][k]
                }   
                
            }

            if('data.attributes.porc_may' in error.response.data.errors) {
                let errors = error.response.data.errors                
                for( let k in errors['data.attributes.porc_may']){                                
                    message = message + errors['data.attributes.porc_may'][k]+ '\n'
                    //this.errorNameMessages = errors['data.attributes.name'][k]
                }   
                
            }

            this.$toast.error(message, { timeout: 3000 });
    
        },
        submit_set_category(category_id) {
            this.loading = true
            axios.patch(`products/${this.item.id}/set_category?include_category_name=true`, { 
                    'data': {
                        'id': (this.item.id).toString(),
                        'type': 'products',
                        'relationships': {
                            'category': {
                                'data': {
                                    'id': category_id
                                }
                            }
                        }
                        
                    }
                    }).then((resp) => {
                        
                        this.loading = false
                        this.item = resp.data.data
                        this.init_values();
                        this.$toast.success("Updated!", {
                            timeout: 3000
                        }); 
                    }).catch((error) => {
                        this.loading = false

                        if (error.response) {
                            // client received an error response (5xx, 4xx)
                            if ( error.response.status === 422) {
                                console.log('error')
                                this.errorHandler(error)
                            }
                        } else if (error.request) {
                            // client never received a response, or request never left
                            this.$toast.error('Network error connection.', { timeout: 3000 });
                        } else {
                            // anything else
                        }
                    })
        },
        
        submit() {
            this.validate()
            if( this.valid ){
                this.loading = true
                axios.patch(`products/${this.item.id}` + '?include_category_name=true', { 
                    'data': {
                        'id': (this.item.id).toString(),
                        'type': 'products',
                        'attributes': {
                            'name': this.item.attributes.name,
                            'is_enable': this.item.attributes.is_enable,
                            'description': this.item.attributes.description,
                            'costo': this.item.attributes.costo,
                            'porc_min': this.item.attributes.porc_min,
                            'porc_may': this.item.attributes.porc_may
                        }
                        
                    }
                    }).then((resp) => {
                        this.loading = false
                        this.item = resp.data.data
                        this.init_values();
                        this.$toast.success("Updated!", {
                            timeout: 3000
                        });
                    }).catch((error) => {
                        this.loading = false

                        if (error.response) {
                            // client received an error response (5xx, 4xx)
                            if ( error.response.status === 422) {
                                console.log('error')
                                this.errorHandler(error)
                            }
                        } else if (error.request) {
                            // client never received a response, or request never left
                            this.$toast.error('Network error connection.', { timeout: 3000 });
                        } else {
                            // anything else
                        }
                    })
                
            }
        }, 
        limitDecimalCosto() {
            this.item.attributes.costo = this.globalHelperLimit2Decimal(this.item.attributes.costo);           
        }, 
        addCeroCosto() {
            this.item.attributes.costo = Number(this.item.attributes.costo).toFixed(2)
        }, 
        limitDecimalPorc_min() {
            this.item.attributes.porc_min = this.globalHelperLimitNDecimal(this.item.attributes.porc_min, 10);           
        },         

        set_precio_min() {
            let num = ( this.item.attributes.porc_min / 100 ).toFixed(10);
            if ( num <= 2 ) { num = Number(num) + 1 }
            this.item.attributes.precio_min = ( num * this.item.attributes.costo ).toFixed(2);
        },

        set_porc_min() {
            let num = ( this.item.attributes.precio_min / this.item.attributes.costo ).toFixed(10);
            if ( num <= 2 ) { num = Number(num) - 1 }
            this.item.attributes.porc_min = ( num * 100 ).toFixed(10);
        },

        type_costo() {
            this.set_precio_min();
            this.set_precio_may();
        },

        type_precio_min() {
            this.set_porc_min();
        },


        limitDecimalPorc_may() {
            this.item.attributes.porc_may = this.globalHelperLimitNDecimal(this.item.attributes.porc_may, 10);           
        },        

        set_precio_may() {
            let num = ( this.item.attributes.porc_may / 100 ).toFixed(10);
            if ( num <= 2 ) { num = Number(num) + 1 }
            this.item.attributes.precio_may = ( num * this.item.attributes.costo ).toFixed(2);
        },

        set_porc_may() {
            let num = ( this.item.attributes.precio_may / this.item.attributes.costo ).toFixed(10);
            if ( num <= 2 ) { num = Number(num) - 1 }
            this.item.attributes.porc_may = ( num * 100 ).toFixed(10);
        },  



        type_precio_may() {
            this.set_porc_may();
        },
        lessDecimal(num, n) {
            if ( num ){
                let temp = num.split('.');
                if ( temp[1] ) {
                    if ( temp[1].length > n ) {
                        return false;
                    }                    
                }
            }
            return true;            
        },
        select_category(category) {
            this.submit_set_category(category.category_id);
        }       
    },
    
  }
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}

/* Firefox */
input[type=number] {
-moz-appearance: textfield;
}

</style>