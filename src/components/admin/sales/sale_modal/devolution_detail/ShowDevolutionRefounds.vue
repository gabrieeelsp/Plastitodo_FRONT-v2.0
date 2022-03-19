<template>
    <div v-if="devolution">
        <v-row>
            <v-col>
                <div class="green lighten-5 d-flex justify-center">
                    <span class="title">Devoluciones</span>
                </div>
            </v-col>
        </v-row>

        
        

        <v-row v-for="(refund, index) in devolution.relationships.refounds" :key="index" 
            :class="(index == 0) ? 'mt-1': ''"
        >
            <v-col cols="12" sm="5"  class="d-flex justify-start pt-1 pb-1">
                <span class="">{{ refund.attributes.name }}</span>
            </v-col>
            <v-col cols="12" sm="5"  class="d-flex justify-end pt-1 pb-1">
				<span>{{ globalHelperFixeDecimalMoney(refund.attributes.valor) }}</span>
            </v-col>
            <v-col cols="12" sm="2"  class="d-flex justify-center pt-1 pb-1">
                <v-btn icon x-small>
					<v-icon>mdi-eye</v-icon>
				</v-btn>
            </v-col>
        </v-row>   

        <v-row class="">
			
            <v-col cols="12" sm="5"  class=" d-flex justify-end align-start">
                <span class="subtitle-1 darken-4">SALDO </span>
            </v-col>
            
            <v-col cols="10" sm="5"  class="d-flex justify-end" >
                
                <span class="title darken-4">{{ globalHelperGetTotalDevolution(devolution) | money_string  }}</span>
            </v-col>
            <v-col cols="2" sm="2">
            </v-col>
        </v-row>      
            
                
    </div>
</template>

<script>
export default {
    props: {
        devolution:Object
    }
}
</script>

<style>

</style>