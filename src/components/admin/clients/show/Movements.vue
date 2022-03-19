<template>
    <div>
        <List
            v-if="tab_showed == 'list'"
            @show_sale="show_sale"
        />
        <Sale
            v-if="tab_showed == 'sale'"
            :id="showed_id"
            @cancelar_show_sale="cancelar_show_sale"
            
        />
    </div>
</template>

<script>

import List from './movements/List'
import Sale from './movements/Sale'
export default {
    components: {
        List,
        Sale
    },
        
    data() {
        return {
            tab_showed: 'list',
            showed_id: null
        }
    },

    methods: {
        show_sale ( id ) {
            this.tab_showed = 'sale'
            this.showed_id = id
        },
        cancelar_show_sale () {
            this.tab_showed = 'list'
        }
    }
}
</script>

<style>

</style>