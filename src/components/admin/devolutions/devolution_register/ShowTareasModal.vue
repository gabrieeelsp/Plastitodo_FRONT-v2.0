<template>
  

    <v-dialog
      v-model="intDialogVisible"
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5">
            
          
        </v-card-title>
        
        <v-card-text>
            
          <v-row>
            <v-col cols="12" class="d-flex justify-space-between align-center">
              <span>Registrando Devolucion</span>
              <v-progress-circular
                v-if="is_registrandoDevolution"
                indeterminate
                color="amber"
              ></v-progress-circular>
              <v-icon large
                v-if="!is_registrandoDevolution"
                color="green"
               >
                mdi-check
              </v-icon>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          
        </v-card-text>
      </v-card>
    </v-dialog>
  
</template>

<script>

export default {
    mounted () {
          
    },
    data () {
      return {

      }
    },
    props: {
        dialogVisible: Boolean,
        guardando_devolution: Boolean,
        is_registrandoDevolution: Boolean
    
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
        

    }
  }
</script>