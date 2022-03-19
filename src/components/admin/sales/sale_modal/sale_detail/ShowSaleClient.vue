<template>
    <div v-if="sale">
        <v-row>
            <v-col>
                <div class="green lighten-5 d-flex justify-center">
                    <span class="title">Cliente</span>
                </div>
            </v-col>
        </v-row>
        

        <v-row class="mt-1">
            <v-col cols="12" md="3" class="pt-1 pb-1">
                <span>Nombre:</span>
            </v-col>
            <v-col cols="12" md="9" class="pt-1 pb-1">
                <span v-if="sale.relationships.client">{{ sale.relationships.client.attributes.name }}</span>
            </v-col>
        </v-row>
        <v-row class="">
            <v-col cols="12" md="3" class="pt-1 pb-1">
                <span>Tipo:</span>
            </v-col>
            <v-col cols="12" md="9" class="pt-1 pb-1">
                <span v-if="sale.relationships.client">{{ sale.relationships.client.attributes.tipo }}</span>
            </v-col>
        </v-row>
            
            
                
    </div>
</template>

<script>
export default {
    props: {
        sale:Object
    }
}
</script>

<style>

</style>