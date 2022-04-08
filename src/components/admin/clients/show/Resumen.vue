<template>
    <div>
        <v-form @submit.prevent="submit" ref="form" v-model="valid" >
            <v-row>
                <v-col cols="12" sm="4"  class="pt-2 pb-0 d-flex justify-sm-end">
                    <span class="font-weight-bold black--text">Nombre</span>
                </v-col>
                <v-col cols="12" sm="4"  class=" pt-0 pb-0">
                    <v-text-field   
                        
                        dense
                        v-model="client_cache.name"
                        :rules="nameRules"
                        :error-messages="errorNameMessages"
                        @keydown="errorNameMessages = ''"
                        
                    ></v-text-field>
                </v-col>

            </v-row>
            <v-row>
                <v-col cols="12" sm="4"  class="pt-2 pb-0 d-flex justify-sm-end">
                    <span class="font-weight-bold black--text">Apellido</span>
                </v-col>
                <v-col cols="12" sm="4"  class=" pt-0 pb-0">
                    <v-text-field   
                        
                        dense
                        v-model="client_cache.surname"
                        :rules="surnameRules"
                        :error-messages="errorSurnameMessages"
                        @keydown="errorSurnameMessages = ''"
                        
                    ></v-text-field>
                </v-col>

            </v-row>
            <v-row>
                <v-col cols="12" sm="4"  class="pt-2 pb-0 d-flex justify-sm-end">
                    <span class="font-weight-bold black--text">Tipo</span>
                </v-col>
                <v-col cols="12" sm="4"  class=" pt-0 pb-0">
                    <v-select
                        dense
                        :items="items_tipo"
                        v-model="client_cache.tipo"
                    ></v-select>
                </v-col>

            </v-row>
            <v-row>
                <v-col cols="12" sm="4"  class="pt-2 pb-0 d-flex justify-sm-end">
                    <span class="font-weight-bold black--text">Dirección</span>
                </v-col>
                <v-col cols="12" sm="4"  class=" pt-0 pb-0">
                    <v-text-field                           
                        dense
                        v-model="client_cache.direccion"                       
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="4"  class="pt-2 pb-0 d-flex justify-sm-end">
                    <span class="font-weight-bold black--text">Teléfono</span>
                </v-col>
                <v-col cols="12" sm="4"  class=" pt-0 pb-0">
                    <v-text-field                           
                        dense
                        v-model="client_cache.telefono"                       
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="4"  class="pt-2 pb-0 d-flex justify-sm-end">
                    <span class="font-weight-bold black--text">CUIT</span>
                </v-col>
                <v-col cols="12" sm="4"  class=" pt-0 pb-0">
                    <v-text-field                           
                        dense
                        v-model="client_cache.cuit"                       
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" sm="4"  class="pt-2 pb-0 d-flex justify-sm-end">
                    <span class="font-weight-bold black--text">Condición frente al IVA</span>
                </v-col>
                <v-col cols="12" sm="4"  class=" pt-0 pb-0">
                    <v-select
                        dense
                        :items="items_ivacondition"
                        v-model="client_cache.ivacondition_id"
                        item-text="name"
                        item-value="id"
                    ></v-select>
                </v-col>

            </v-row>


            <v-row>
                <v-col cols="12" sm="4"  class="pt-2 pb-0 d-flex justify-sm-end">
                    <span class="font-weight-bold black--text">Dirección de Facturación</span>
                </v-col>
                <v-col cols="12" sm="4"  class=" pt-0 pb-0">
                    <v-text-field                           
                        dense
                        v-model="client_cache.direccion_fact"                       
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
            <v-col cols="12" sm="4"  class="pt-2 pb-0 d-flex justify-sm-end">
                <span class="font-weight-bold black--text">Comentarios</span>
            </v-col>
            <v-col cols="12" sm="7"  class=" pt-0 pb-0">
                <v-textarea
                    counter="200"
                    class=""
                    dense
                    solo
                    v-model="client_cache.coments"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="8">
                <v-btn
                    :loading="is_saving" 
                    type="submit"
                    color="primary"
                >Guardar</v-btn>
            </v-col>
        </v-row>

        </v-form>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    mounted() {
        //console.log(this.ivaconditions)

        for (let item of this.ivaconditions ) {
            this.items_ivacondition.push({
                name: item.attributes.name,
                id: item.id
                })
        }


    },
    data() {
        return {
            is_saving: false,
            valid: true,
            item: {
                name: '',
                surname: '',
                tipo: 'Minorista'
            },
            nameRules: [
                v => ( v && v.length > 0 ) || "Valor requerido",
            ],
            errorNameMessages: '',

            surnameRules: [
                v => ( v && v.length > 0 ) || "Valor requerido",
            ],
            errorSurnameMessages: '',

            selected_tipo: 'Minorista',
            items_tipo: ['MINORISTA', 'MAYORISTA'],

            items_ivacondition: [],
        }
    },
    computed: {
        ...mapGetters({
            client_cache: 'client/client_cache',
            client: 'client/client',
            ivaconditions: 'ivacondition/ivaconditions'
        }),
    },

    methods: {
        validate () {
            this.$refs.form.validate()
        },

        submit ( ) {
            this.validate()

            if ( this.valid ) {
                console.log('saa')
                //this.$emit('guardar_creditnote')
            }
        },
    }

}
</script>

<style>

</style>