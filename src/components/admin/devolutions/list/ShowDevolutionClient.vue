<template>
  <div v-if="sale">
        
        
        
            <v-row class=" mb-1 pl-2 pr-2">
				
				<v-col cols="12"  class="green lighten-5 d-flex justify-center pt-1 pb-1">
					<span class="title">Cliente</span>
				</v-col>
			</v-row>

            <v-row>
                <v-col cols="12" sm="3"  class="d-flex justify-start pt-1 pb-1">
                    <span>Nombre:</span>
                </v-col>
                <v-col cols="12" sm="9"  class="d-flex justify-start pt-1 pb-1">
                    <span v-if="sale.relationships.client">{{ sale.relationships.client.attributes.name }}</span>
                </v-col>

            </v-row>
            <v-row>
                <v-col cols="12" sm="3"  class="d-flex justify-start pt-1 pb-1">
                    <span>Tipo:</span>
                </v-col>
                <v-col cols="12" sm="9"  class="d-flex justify-start pt-1 pb-1">
                    <span v-if="sale.relationships.client">{{ sale.relationships.client.attributes.tipo }}</span>
                </v-col>

            </v-row>
  </div>
</template>

<script>
export default {
    props: {
        sale: Object
    }
}
</script>

<style>

</style>