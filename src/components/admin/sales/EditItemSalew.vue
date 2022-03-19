<template>
  

    <v-dialog
      v-model="intDialogVisible"
      max-width="700"
    >
      <v-card>
        <v-card-title class="text-h5">
            {{ item.name }}
          
        </v-card-title>
        
        <v-card-text>

          
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="intDialogVisible = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="accept"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
</template>

<script>

  export default {
    data () {
      return {
        cantidad: null
      }
    },
    props: {
        dialogVisible: Boolean,
        item: Object
    
    },
    computed: {
        
        intDialogVisible: {
            get: function () {
                if (this.dialogVisible) {
                    
                // Some dialog initialization code could be placed here
                // because it is called only when this.dialogVisible changes
                }

                return this.dialogVisible
            },
            set: function (value) {
                    if (!value) {
                        this.$emit('close')
                    }
            }
        }
    },
    methods: {
        accept() {
            this.$emit('addItem', {
                saleProductId: this.item.id,
                name: this.item.attributes.name,
                precio: this.precio,
                stock: this.stock,
                cantidad: this.cantidad,
                img: "https://picsum.photos/510/300?random",
                is_editing_cantidad: false
            })
        }
    }
  }
</script>