<template>


        <div>
            <!-- PDF Content Here --> 

            <dir style="margin-top: 10px; margin-right: 15px; margin-left: 10px; ">
                <div 
                    style="text-align: center; border: 1px solid black; padding-top: 5px; padding-bottom: 5px">
                    <span><b>ORIGINAL</b></span>
                </div>
                <div
                    style="
                        border-left: 1px solid black;
                        border-right: 1px solid black;
                        border-bottom: 1px solid black;
                    "    
                >
                    <div 
                        style="
                            display: flex;
                            
                        ">
                        <div
                            style="
                                width: 350px; 
                                text-align: center;
                                margin: auto;
                        ">
                            <span
                                style="
                                    font-size:30px;
                                " 
                            >PLASTITODO</span>
                        </div>
                        <div
                            style="
                                width: 100px; 
                                text-align: center;
                                border-left: 1px solid black;
                                border-right: 1px solid black;
                                border-bottom: 1px solid black;
                        ">
                            <div>
                                <h1 style="font-size: 30px;">A</h1>
                                <h4>COD: 01</h4>
                            </div>
                        </div>
                        <div
                            style="
                                width: 350px; 
                                text-align: center;
                                margin: auto;
                        ">
                            <span
                                style="
                                    font-size: 30px
                                "
                            >FACTURA</span>
                        </div>
                    </div>
                    <div>
                        <div
                            style="
                                display: flex;
                            "
                        >
                            <div
                                style="
                                    width: 390px; 
                                    padding: 10px;
                                "  
                            >
                                <div
                                    style="
                                        display: flex;
                                        font-size: 14px;
                                        margin-top: 10px;
                                    "
                                >
                                    <span style="width:205px"><b>Razón social: </b></span>
                                    <span style="margin-left: 5px;">PICCO GABRIEL SEBASTIAN, PICCO IRINA NADIA Y PICCO IVANA BRENDA SOC. DE HECHO.</span>
                                </div>
                                <div
                                    style="
                                        display: flex;
                                        font-size: 14px;
                                        margin-top: 8px;
                                    "
                                >
                                    <span style="width:130px"><b>Domicilio comercial: </b></span>
                                    <span style="margin-left: 5px;">Baigorria 1306, Rosario Santa Fé</span>
                                </div>
                                <div
                                    style="
                                        display: flex;
                                        font-size: 14px;
                                        margin-top: 8px;
                                    "
                                >
                                    <span style="width:160px"><b>Condición frente al IVA: </b></span>
                                    <span style="margin-left: 5px;"><b>IVA Responsable Inscripto</b></span>
                                </div>
                            </div>
                            <div
                                style="
                                    width: 390px; 
                                    padding: 10px;
                                    border-left: 1px solid black;
                                "  
                            >
                                <div
                                    style="
                                        display: flex;
                                        font-size: 14px;
                                        margin-top: 10px;
                                    "
                                >
                                    <span style="width:100px"><b>Punto de Venta: </b></span>
                                    <span style="margin-left: 5px;">{{ sale.relationships.comprobante.attributes.punto_venta | punto_venta_string }}</span>
                                    <span style="width:100px; margin-left: 30px"><b>Comp. número: </b></span>
                                    <span style="margin-left: 5px;">{{ sale.relationships.comprobante.attributes.numero | numero_factura_string }}</span>
                                </div>

                                <div
                                    style="
                                        display: flex;
                                        font-size: 14px;
                                        margin-top: 8px;
                                    "
                                >
                                    <span style="width:110px"><b>Fecha de emisión: </b></span>
                                    <span style="margin-left: 5px;">{{ sale.relationships.comprobante.attributes.created_at }}</span>
                                </div>

                                <div
                                    style="
                                        display: flex;
                                        font-size: 14px;
                                        margin-top: 8px;
                                    "
                                >
                                    <span style="width:50px"><b>CUIT: </b></span>
                                    <span style="margin-left: 5px;">30714071633</span>
                                </div>

                                <div
                                    style="
                                        display: flex;
                                        font-size: 14px;
                                        margin-top: 8px;
                                    "
                                >
                                    <span style="width:105px"><b>Ingresos Brutos: </b></span>
                                    <span style="margin-left: 5px;">0214032075</span>
                                </div>

                                <div
                                    style="
                                        display: flex;
                                        font-size: 14px;
                                        margin-top: 8px;
                                    "
                                >
                                    <span style="width:190px"><b>Fecha de Inicio de Actividades: </b></span>
                                    <span style="margin-left: 5px;">01/05/2013</span>
                                </div>
                            </div>
                        </div>


                        
                    </div>
                </div>
                <div 
                
                    style="
                        margin-top: 10px;
                        border: 1px solid black;
                        padding-left: 10px;
                        padding-bottom: 10px;
                    "
                >
                    <div
                        style="
                            display: flex;
                            font-size: 14px;
                            margin-top: 8px;
                        "
                    >
                        <span style="width:50px"><b>CUIT: </b></span>
                        <span style="margin-left: 5px;">{{ sale.relationships.client.attributes.numero_id }}</span>
                        <span style="width:220px; margin-left: 30px"><b>Apellido y Nombre / Razón Social: </b></span>
                        <span style="margin-left: 5px;">{{ sale.relationships.client.attributes.name_fact }}</span>
                    </div>
                    <div
                        style="
                            display: flex;
                            font-size: 14px;
                            margin-top: 8px;
                        "
                    >
                        <span style="width:160px"><b>Condición frente al IVA: </b></span>
                        <span style="margin-left: 5px;"><b>{{ sale.relationships.client.attributes.iva_condition }}</b></span>

                        <span style="width:130px; margin-left: 30px"><b>Domicilio comercial: </b></span>
                        <span style="margin-left: 5px;">{{ sale.relationships.client.attributes.direccion_fact }}</span>
                    </div>

                    <div
                        style="
                            display: flex;
                            font-size: 14px;
                            margin-top: 8px;
                        "
                    >
                        <span style="width:140px"><b>Condición de Venta: </b></span>
                        <span style="margin-left: 5px;"><b>Contado</b></span>

                    </div>
                </div>
                <div
                    style="
                        margin-top: 10px;
                        font-size: 13px;
                    "
                >
                    <table 
                        style="
                            width: 100%;
                        "
                    >
                        <thead style="background-color: #D5DBDB; border: 1px solid black;">
                            <tr style="">
                                <th style="padding-top: 5px; padding-bottom: 5px; width: 60px;">Código</th>
                                <th style="border-left: 1px solid black;">Producto</th>
                                <th style="border-left: 1px solid black; width: 70px;">Cantidad</th>
                                <th style="border-left: 1px solid black; width: 70px;">Precio</th>
                                <th style="border-left: 1px solid black; width: 70px;">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="item in sale.relationships.saleitems" :key="item.id"
                            >
                                <td style="text-align: right; padding-right: 5px;">
                                    {{ item.attributes.id }}
                                </td>
                                <td style="padding-left: 5px;">
                                    {{ item.attributes.name }}
                                </td>
                                
                                <td v-if="item.attributes.is_stock_unitario_kilo" style="text-align: right; padding-right: 5px;">{{ globalHelperFixeDecimalCantidad(item.attributes.cantidad_total) }}</td>
                                <td v-else style="text-align: right; padding-right: 5px;">{{ globalHelperFixeDecimalCantidad(item.attributes.cantidad) }}</td>

                                <td style="text-align: right; padding-right: 5px;">
                                    {{ globalHelperFixeDecimalMoney(item.attributes.precio) }}
                                </td>
                                <td v-if="item.attributes.is_stock_unitario_kilo" style="text-align: right; padding-right: 5px;">{{ globalHelperFixeDecimalMoney(globalHelperCalculaSubTotalStockUnitario(item.attributes.precio, item.attributes.cantidad, item.attributes.stock_aproximado_unidad, item.attributes.cantidad_total)) }}</td>
                                <td v-else style="text-align: right; padding-right: 5px;">{{ globalHelperFixeDecimalMoney(globalHelperCalculaSubTotal(item.attributes.precio, item.attributes.cantidad)) }}</td>
                                
                            </tr>
                            <tr v-for="(i, index) in [1, 2,3,4,5,6,7,8,9,10,11,13,14,4,4,4,4,44,4,4,,4,4,4,4,4,4,44,4]" :key="index + 'a'">
                                <td>{{ index }}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div 
                    style="
                        border: 1px solid black;
                        display: flex;
                    "
                >
                    <div
                        style="
                            width: 590px; 
                            padding: 10px;
                        "
                    >

                    </div> 
                    <div
                        style="
                            width: 200px; 
                            padding: 10px;
                        "
                    >
                        <table style="font-size: 13px;">
                            <tbody>
                                <tr>
                                    <td style="width:100px; text-align: right">Sub total:</td>
                                    <td style="width:100px; text-align: right">{{ globalHelperFixeDecimalMoney(impNeto) | money_string }}</td>
                                </tr>
                                <tr v-for="iva in ivas" :key="iva.id">
                                    <td style="width:100px; text-align: right">IVA {{ iva.name }} %</td>
                                    <td style="width:100px; text-align: right">{{ globalHelperFixeDecimalMoney(iva.valor) | money_string }}</td>
                                </tr>
                                <tr>
                                    <td style="width:100px; text-align: right">Importe total:</td>
                                    <td style="width:100px; text-align: right">{{ globalHelperFixeDecimalMoney(sale.attributes.total) | money_string }}</td>
                                </tr>
                            </tbody>
                        </table>
                                                
                    </div> 
                </div>

            </dir>

        </div>

</template>

<script>

export default {
    mounted() {
        this.loadValues()
    },
    props: {
        sale: Object
    },

    data() {
        return {
            impNeto: 0,

            ivas : []
        }
    },

    computed: {

        
    },
    methods: {
        loadValues () {

            for ( var item of this.sale.relationships.saleitems ) {
                let imp
                if ( item.attributes.is_stock_unitario_kilo ) {
                    imp = parseFloat(( item.attributes.precio * item.attributes.cantidad_total ).toFixed(4))
                }else {
                    imp = parseFloat(( item.attributes.precio * item.attributes.cantidad ).toFixed(4))
                }
                let impNetoItem = parseFloat((imp / ( 1 + parseFloat( (item.relationships.iva.attributes.valor / 100).toFixed(4) ))).toFixed(2))
                
                let iva = imp - impNetoItem
                let exists = false
                for ( let i of this.ivas ) {
                    if ( i.id == item.relationships.iva.id ) {
                        i.valor = i.valor + iva
                        exists = true
                    }
                }
                if ( !exists ) {
                    this.ivas.push({
                        id: item.relationships.iva.id,
                        name: item.relationships.iva.attributes.name,
                        valor: iva
                    })
                }

                this.impNeto = this.impNeto + impNetoItem
            }
        },
    }
}
</script>

<style>

</style>