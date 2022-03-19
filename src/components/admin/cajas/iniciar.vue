<template>
    <div class="pa-sm-3">
        <v-card class="">
                <v-card-title class="d-flex justify-space-between align-center pt-1 pb-1">                
                    <div>
                        <span class="text-h4 font-weight-light">Iniciar Caja</span>
                    </div>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text >
                    <v-row class="">
                        <v-col cols="12" class="">
                            <v-form @submit.prevent="submit" ref="form" v-model="valid">
                                <v-row>
                                    <v-col cols="12" sm="3"  class="pt-2 pb-0 d-flex justify-sm-end">
                                        <span class="font-weight-bold black--text">Dinero Inicial</span>
                                    </v-col>
                                    <v-col cols="12" sm="2"  class=" pt-0 pb-0">
                                        <v-text-field
                                            class="right-text-input"
                                            
                                            dense
                                            v-model="caja.dinero_inicial"
                                            :rules="dinero_inicialRules"
                                            :error-messages="errorDinero_inicialMessages"
                                            @keydown="errorDinero_inicialMessages = ''"
                                            type="number"
                                            
                                        ></v-text-field>
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
import { mapActions } from 'vuex'
export default {
    mounted() {
        this.buscar_caja()
    },
    data: () => ({ 
        loading: false,
        caja: {
            dinero_inicial: ''
        },
        valid: true,

        dinero_inicialRules: [
            v => ( v && v >= 0 ) || "Dinero Inicial should be above 0"
        ],
        errorDinero_inicialMessages: '',

    }),
    methods:{
        ...mapActions({
            iniciar_caja: 'caja/iniciar_caja',
            set_caja: 'caja/set_caja',
            buscar_caja: 'caja/buscar_caja'
        }),
        validate () {
            this.$refs.form.validate()
        },

        async submit() {
            this.validate()
            if( this.valid ){
                this.loading = true
                
                await this.iniciar_caja(this.caja)
                .then((resp) => {
                    
                    this.set_caja({
                            'id': resp.data.data.id,
                            'created_at': resp.data.data.attributes.created_at
                        })
                    this.$toast.success('Se ha iniciado una caja correctamente.', { timeout: 3000 });

                })
                .catch((error) => {
                    
                    if (error.response) {
                        
                        this.$toast.error(error.response.data.message, { timeout: 3000 });
                        this.buscar_caja()  
                    } else if (error.request) {
                        // client never received a response, or request never left
                        this.$toast.error('Network error connection.', { timeout: 3000 });
                    } else {
                        // anything else
                    }
                })
                
                this.loading = false
                

            }
        }
    }
}
</script>

<style>

</style>