<template>
  
    <div v-if="devolution">
    <v-dialog
      v-model="intDialogVisible"
      max-width="900"
    >
      <v-card>    
          <v-card-title></v-card-title>    
        <v-card-text class="">
            <v-row class=" ">
                <v-col cols="12" md="6" class="">
                    <v-row>
                        <v-col cols="12"> 
                            

                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col cols="12">
                            
                        </v-col>
                    </v-row>

                    
                    
                </v-col>
                <v-col cols="12" md="6" class="">
                   
                    
                </v-col>
            </v-row>
            <v-row class=" ">
                <v-col cols="12" md="12" class=" pl-0 pr-0">
                    
                    
                </v-col>
            </v-row>
            <v-row class="">
                <v-col cols="4" class="d-flex align-center justify-start pb-0">
                    <v-btn text @click="create_devolution">CREAR DEVOLUCION</v-btn>
                </v-col>
                <v-col cols="8" class="d-flex align-center justify-end pb-0">
                    <span class="title ">Total:</span>
                    <span class="headline  blue--text darken-4 ml-1">{{ globalHelperFixeDecimalMoney(devolution.attributes.total) | money_string }}</span>
                </v-col>
            </v-row>
            
        
          
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          

          
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'


export default {
    mounted () {
        
    },
    components: {

    },
    data () {
      return {

      }
    },
    props: {
        dialogVisible: Boolean,
        devolution:Object

    
    },
    computed: {
        
        intDialogVisible: {
            get: function () {
                if (this.dialogVisible) {
                    //ii
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
        ...mapActions({
            new_devolution: 'devolution/new_devolution'
        }),

        
    }
  }
</script>