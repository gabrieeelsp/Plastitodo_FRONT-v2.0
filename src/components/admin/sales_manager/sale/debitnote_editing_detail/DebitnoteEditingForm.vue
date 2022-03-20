<template>
    <v-form @submit.prevent="submit" ref="form" v-model="valid" >
        <v-row>
            <v-col cols="12" sm="3"  class="pt-2 pb-0 d-flex justify-sm-end">
                <span class="font-weight-bold black--text">Valor</span>
            </v-col>
            <v-col cols="12" sm="2"  class=" pt-0 pb-0">
                <v-text-field
                    class="right-text-input"
                    
                    dense
                    v-model="debitnote_editing.valor"
                    :rules="valorRules"
                    :error-messages="errorValorMessages"
                    @keydown="errorValorMessages = ''"
                    type="number"
                    
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="3"  class="pt-2 pb-0 d-flex justify-sm-end">
                <span class="font-weight-bold black--text">Descripción</span>
            </v-col>
            <v-col cols="12" sm="9"  class=" pt-0 pb-0">
                <v-textarea
                    counter="200"
                    class=""
                    dense
                    solo
                    v-model="debitnote_editing.description"
                    :rules="descriptionRules"
                    :error-messages="errorDescriptionMessages"
                    @keyup="errorDescriptionMessages = ''"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn 
                    @click="cancelar"
                >Cancelar</v-btn>
                <v-btn
                    :loading="is_saving" 
                    type="submit"
                >Guardar</v-btn>
            </v-col>
        </v-row>

    </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        is_saving: Boolean
    },

    data () {
        return {
            valid: true,
            valorRules: [
                v => ( v && v >= 0 ) || "Costo should be above 0",
            ],
            errorValorMessages: '',

            descriptionRules: [
                v =>  ( v && v.length > 10 ) || 'Name must be more than 10 characters',
                v =>  !v || (v.length <= 200) || 'Name must be less than 200 characters',
            ],
            errorDescriptionMessages: '',
        }
    },
    computed: {
        ...mapGetters({
            debitnote_editing: 'sales_manager/debitnote_editing'
        })
    },

    methods: {
        validate () {
            this.$refs.form.validate()
        },

        submit ( ) {
            this.validate()

            if ( this.valid ) {
                this.$emit('guardar_debitnote')
            }
        },
        cancelar ( ) {
            this.$emit('cancelar_debitnote')
        }
    }

}
</script>

<style>

</style>