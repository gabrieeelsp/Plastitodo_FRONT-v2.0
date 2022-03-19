<template>
    <div>
        

        <v-row>
            <v-col cols="12" sm="3"  class=" d-flex justify-sm-end">
                <span class="font-weight-bold black--text">Descripción</span>
            </v-col>
            <v-col cols="12" sm="9"  class=" ">
                <v-textarea
                    class=""
                    dense
                    solo
                    readonly
                    v-model="creditnote.attributes.description"
                ></v-textarea>
            </v-col>
        </v-row>
        
    </div>
</template>

<script>
export default {

    props: {
        creditnote: Object
    }

}
</script>

<style>

</style>