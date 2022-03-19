<template>
    <div>
      
        <template v-if="caja">            
            <cerrar />
        </template>
        <template v-else>
            <iniciar />

        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import iniciar from '../../../components/admin/cajas/iniciar.vue'
import cerrar from '../../../components/admin/cajas/cerrar.vue'

export default {
    components: {
        iniciar,
        cerrar
    },
    data: () => ({ 
        

    }),
    computed: {
        ...mapGetters({
            caja: 'caja/caja'
        })
    },
    

}
</script>

<style>

</style>