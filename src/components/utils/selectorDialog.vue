<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }" >
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          @click="getItems"
          small
        >
            <v-icon>
                mdi-pencil
            </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Categories
        </v-card-title>

        <v-card-text>
          <v-row>
                    
                    <v-spacer></v-spacer>
                    <v-col cols="12" sm="6" md="5" class="pt-1 pb-1 ">
                        <v-text-field
                            solo
                            label="Search"
                            append-icon="mdi-magnify"
                            dense
                            hide-details
                            v-model="q"
                            v-on:keyup.enter="setSearch"
                            class="rounded-sm"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" class="pt-2 pb-2 pl-1 pr-1">
                        <v-simple-table >
                            <template v-slot:default>
                                <thead  >
                                    <tr>
                                        <th class="pl-1 text-left font-weight-bold text-subtitle-1 grey--text text--darken-3">
                                            Name
                                        </th>

                                        <th 
                                            v-if="size != 'xs'" 
                                            class="text-left font-weight-bold text-subtitle-1 grey--text text--darken-3"  style="width: 80px;">
                                            Enable
                                        </th>
                                        <th class="pr-1 text-left font-weight-bold text-subtitle-1 grey--text text--darken-3" style="width: 100px;">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(item, index) in items"
                                        :key="index"
                                    >
                                        <td :class="[{'text-decoration-line-through': !item.attributes.is_enable && size === 'xs'}, 'pl-1']" >{{ item.attributes.name }}</td>
                                        <td 
                                            v-if="size != 'xs'"
                                        >
                                            <v-chip v-if="item.attributes.is_enable" x-small class="" color="success">Enable</v-chip>
                                            <v-chip v-else x-small class="" color="warning">Disable</v-chip>
                                        </td> 
                                        <td class="pr-1">                                            
                                            <v-btn small
                                                @click="select({
                                                    category_id: item.id,
                                                    category_name: item.attributes.name
                                                })"
                                                color="success"
                                                elevation="2"
                                                icon
                                                outlined
                                                
                                            >
                                                <v-icon small >
                                                    mdi-pencil
                                                </v-icon>
                                            </v-btn>
                                            
                                            <v-btn small
                                                @click="setEdit(item.id)"
                                                color="error"
                                                elevation="2"
                                                icon
                                                outlined
                                                class="ml-2"
                                            >
                                                <v-icon small >
                                                    mdi-delete
                                                </v-icon>
                                            </v-btn>
                                        </td>   
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>

                <v-row>
                    <v-spacer></v-spacer>
                    
                    <v-col cols="12" md="4" class="d-flex align-center justify-center justify-md-end  pt-1 pb-1">
                        <v-pagination
                            v-model="page"
                            :length="last_page"
                            :total-visible="5"
                            @input="setPage"
                            :disabled="last_page <2"
                            prev-icon="mdi-menu-left"
                            next-icon="mdi-menu-right"
                        ></v-pagination>
                    </v-col>
                </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
  export default {

    data () {
      return {
        dialog: false,

        loadingTable: false,
        items: [],
        last_page: 1,
        q: this.$route.query.q || '',
        page: parseInt(this.$route.query.page) || 1,
        limit: 5,

      }
    },

    computed: {
        size: function () {
            return this.$vuetify.breakpoint.name
        }
    },


    methods: {
        async getItems () {
            this.loadingTable = true,
            await axios.get('/categories', {
                params: {
                    'q': this.q,
                    'page': this.page,
                    'limit': this.limit,
                    //'filter_is_enable': this.filter_is_enable
                }
            }).then((result) => {
                this.items = result.data.data

                this.last_page = result.data.meta.last_page
                //console.log(this.items)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                this.loadingTable = false
            })           
        },

        setLimit(){
            this.limit = this.limitSelected;
            this.$router.push({path: this.$route.path, query: { ...this.$route.query, q: this.q, page: this.page, limit: this.limit }})
            this.getItems()
        },
        setPage(){
            this.$router.push({path: this.$route.path, query: { ...this.$route.query, q: this.q, page: this.page, limit: this.limit }})
            this.getItems()
        },
        setSearch(){
            this.page = 1
            this.$router.push({path: this.$route.path, query: { ...this.$route.query, q: this.q, page: this.page, limit: this.limit }})
            this.getItems()
        },

        select (category) {
            this.$emit('select', {
                category_id: category.category_id,
                category_name: category.category_name
            });
            this.dialog = false;
        }
    },
  }
</script>