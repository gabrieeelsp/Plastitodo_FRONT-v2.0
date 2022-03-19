<template>
    <div class="pa-sm-3" v-if="client" >
        <v-row>
            <v-col cols="12" md="12">
                <v-card class="">
                    <v-card-title class="d-flex justify-space-between align-center">                
                        <span class="text-h4 font-weight-light">Cliente: {{ client.attributes.name }}</span>
                        <div>
                        <v-tabs>
                            <v-tab @click="tab_showed = 'resumen'">Resumen</v-tab>
                            <v-tab @click="tab_showed = 'movements'">Movimientos</v-tab>
                        </v-tabs>
                        </div>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text >
                        <Resumen
                            v-if="tab_showed == 'resumen'"
                        />
                        <Movements
                            v-if="tab_showed == 'movements'"
                        />
                        
                      
                        
                    </v-card-text>
                </v-card>
            </v-col>
            
        </v-row>
        
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import Movements from '@/components/admin/clients/show/Movements'
import Resumen from '@/components/admin/clients/show/Resumen'

export default {
    mounted() {
        this.getClient()
    },
    components: {
        Movements,
        Resumen
    },
    computed: {
        ...mapGetters({
            client: 'client/client',
        }),
    },

    data() {
        return {
            tab_showed: 'resumen'
        }
    },
    methods: {
        ...mapActions({
            search_client: 'client/search_client',
            set_client: 'client/set_client',
        }), 

        async getClient () {
            await this.search_client(this.$route.params.id)
                .then((resp) => {
                    this.set_client(resp.data.data)
                })
        }
    }

}
</script>

<style>

</style>