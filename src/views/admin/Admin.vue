<template>
    <div v-if="!is_loading">
        <v-navigation-drawer v-model="drawer" app>
            <Menu />            
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
                <MenuSucursal />
                <MenuUser />
                
            <!-- <v-toolbar-title>Application</v-toolbar-title> -->
        </v-app-bar>

        <v-main>
            <v-container fluid class="grey lighten-4 pa-1">
                <transition name="fade" mode="out-in">
            <router-view />
                </transition>
            </v-container>
        <v-footer app inset>
            dd
        </v-footer>
        </v-main>
        
          
        
        <!--  -->        
        
        
    </div>
    <div v-else>
        cargando ...
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Menu from '../../components/admin/utils/Menu.vue'
import MenuUser from '../../components/admin/utils/MenuUser.vue'
import MenuSucursal from '../../components/admin/utils/MenuSucursal.vue'
export default {
    computed: {
        ...mapGetters({
            is_loading: 'app/is_loading'
        })
        
    },
    components: {
        Menu,
        MenuUser,
        MenuSucursal
    },
    data: () => ({ 
        drawer: null,

    }),
    methods: {


        
    }

}
</script>

