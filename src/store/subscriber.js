import store from '@/store'
import axios from 'axios'

store.subscribe((mutation) => {
    switch ( mutation.type ) {
        case 'auth/SET_TOKEN': 
            if (mutation.payload) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
                localStorage.setItem('token', mutation.payload)
            }else {
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token')
                localStorage.removeItem('sucursal')
            }

            break;
        case 'sucursal/SET_SUCURSAL': 
            if (mutation.payload) {
                const parsed = JSON.stringify(mutation.payload);
                localStorage.setItem('sucursal', parsed);
            }else {
                localStorage.removeItem('sucursal')
            }

            break;
    }
})