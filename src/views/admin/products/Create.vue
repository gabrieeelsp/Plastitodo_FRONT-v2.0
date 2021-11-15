<template>
  <div class="pa-sm-3">
      <v-card class="">
            <v-card-title class="d-flex justify-space-between align-center pt-1 pb-1">                
                <div>
                    <span class="text-h4 font-weight-light">Products</span>
                    <span class="grey--text text-h5 font-weight-light ml-3">Create</span>
                </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text >
                <v-row class="">
                    <v-col cols="12" class="">
                        <v-form @submit.prevent="submit" ref="form" v-model="valid">
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
                                        class=""
                                        dense
                                        v-model="item.attributes.category_name"
                                        :rules="categoryNameRules"
                                        :error-messages="errorCategoryNameMessages"
                                        @keyup="errorCategoryNameMessages = ''"
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
    data () {
        return {
            id: '',
            item: {
                type: '',
                attributes: {
                    name: '',
                    is_enable: false,
                    description: '',
                    category_id: '',
                    category_name: '',
                }
            },

            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 30) || 'Name must be less than 30 characters',
            ],
            errorNameMessages: '',

            categoryNameRules: [
                v => !!v || 'Category is required',
            ],
            errorCategoryNameMessages: '',

            descriptionRules: [
                v =>  !v || (v.length <= 200) || 'Name must be less than 200 characters',
            ],
            errorDescriptionMessages: '',

            loading: false,

            
        }
    },

    methods: {
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
                this.$toast.error(message, { timeout: 3000 });                   
                
            }
        },

        submit() {
            this.validate()
            if( this.valid ){
                this.loading = true
                axios.post(`products`, { 
                    'data': {
                        'type': 'products',
                        'attributes': {
                            'name': this.item.attributes.name,
                            'is_enable': this.item.attributes.is_enable,
                            'description': this.item.attributes.description
                        },
                        'relationships': {
                            'category': {
                                'data': {
                                    'id': this.item.attributes.category_id,
                                    'type': 'categories'
                                }
                            }
                        }
                        
                    }
                    }).then((resp) => {
                        this.loading = false
                        this.item = resp.data.data
                        this.$toast.success("Created!", {
                            timeout: 3000
                        });
                        this.$router.replace({
                            name: 'Products_Edit',
                            params: {
                                id: this.item.id
                            }
                        })
                    }).catch((error) => {
                        this.loading = false

                        if (error.response) {
                            // client received an error response (5xx, 4xx)
                            if ( error.response.status === 422) {
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

        select_category(category) {
            this.item.attributes.category_name = category.category_name;
            this.item.attributes.category_id = category.category_id;
        }
    },
  }
</script>

<style>

</style>