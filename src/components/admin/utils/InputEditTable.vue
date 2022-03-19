<template>
    <v-text-field
        class="right-text-input "
        hide-details
        dense
        solo
        v-model="item.cantidad"
        ref="cant"
        @keydown.enter="aceptar"
        @keydown.esc="close"
        @focus="$event.target.select()"
    ></v-text-field>    
</template>

<script>
export default {
    mounted () {
        this.onload()
    },
    props: {
        item: Object,
    },

    methods: {
        onload() {
            setTimeout(() => this.$refs.cant.$refs.input.focus(), 100); 
            
        },

        aceptar () {
            this.$emit('accept', {                        
                id: this.item.saleProductId,
                cantidad: this.item.cantidad
            })
            
            
        },
        close () {
            this.$emit('close')
        }
    }
}
</script>

<style>

</style>