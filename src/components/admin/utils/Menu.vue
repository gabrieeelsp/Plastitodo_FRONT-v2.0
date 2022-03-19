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
          to="/admin"
          exact
        >
          <v-list-item-icon>
            <v-icon >mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          to="/admin/users"
          exact
        >
          <v-list-item-icon>
            <v-icon >mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/admin/cajas/abrir_cerrar"
          exact
        >
          <v-list-item-icon>
            <v-icon >mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >Abrir/Cerrar Caja</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
            to="/admin/sales/manager"
            exact
          >
            <v-list-item-icon>
              <v-icon >mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title >Sale List</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        <v-list-item
          to="/admin/sales/sale_register"
          exact
        >
          <v-list-item-icon>
            <v-icon >mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >Sale Register</v-list-item-title>
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
    data: () => ({
      selectedItem: 1,
      
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