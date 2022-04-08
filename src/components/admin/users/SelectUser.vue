<template>
    <div class="">
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      item-text="name"
      return-object
      @change="setItem"
      dense
      clearable
      :label="label"
    ></v-autocomplete>
    </div>
</template>

<script>
import axios from 'axios'
  export default {

    data () {
      return {
        loading: false,
        items: [],
        search: null,
        select: null,        
      }
    },
    props: {
      label: {
        default: null,
        type: String
      }
    },
    computed: {

    },
    watch: {
      search (val) {
          if(val) {
            if(val.length > 0) {
                val && val !== this.select && this.querySelections(val)
            }  
          }
                  
      },
    },
    methods: {
        async querySelections (v) {
            this.loading = true
            // Simulated ajax query
            await axios.get('/users', {
                    params: {
                        'q': v,
                        'paginate': 0
                    }
                }).then((result) => {

                    this.items = []
                    for ( let item of result.data.data ) {
                        this.items.push({
                            name: item.attributes.surname + ' ' + item.attributes.name,
                            id: item.id
                            })
                    }

                    //console.log(this.items)
                })

            this.loading = false

        },
        setItem() {
          if(this.select){
            this.$emit("setUserId",this.select.id)
          }else {
            this.$emit("setUserId", null)
          }
            
        }
    },
  }
</script>

<style>

</style>