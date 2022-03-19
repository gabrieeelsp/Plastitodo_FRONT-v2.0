<template>
    <div>
        <v-toolbar dark >


            <v-toolbar-title>Plastidodo - ADMIN</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>

    <v-navigation-drawer>
    <v-list>
      <v-list-item>
          <v-list-item-action>
            <v-img height="50" width="50" class="rounded-circle" src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>Administrador</v-list-item-subtitle>
          </v-list-item-content>

          
        </v-list-item>
    </v-list>
        <v-divider></v-divider>
    
      <v-list
        nav
        dense
      >
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"

          :to="item.route"
          exact

          v-show="item.show"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      
    </v-list>
  </v-navigation-drawer>



    
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    mounted() {
      alert(this.caja)
    },
    data: () => ({
      selectedItem: 1,
      items: [
        { text: 'Dashboard', icon: 'mdi-view-dashboard', 'route': '/admin', show: true },
        
        { text: 'Users', icon: 'mdi-account', 'route': '/admin/users', show: true },

        { text: 'Abrir/Cerrar Caja', icon: 'mdi-account', 'route': '/admin/cajas/abrir_cerrar', show: true },

        { text: 'Sale', icon: 'mdi-account', 'route': '/admin/sale', show: (this.caja == null) },
      ],
    }),
    computed: {
      ...mapGetters({
          authenticated: 'auth/authenticated',
          user: 'auth/user',
          caja: 'caja/caja'
      })
    },
  }
</script>

<style>

</style>