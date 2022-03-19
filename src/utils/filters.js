import Vue from "vue"

Vue.filter("round2decimal", num => Number(num).toFixed(2))

Vue.filter("money_string", num => {
    let dollarUS =  Intl.NumberFormat("en-US", {
        style: "currency",
        currency:"USD",
        useGrouping: true,
        minimumFractionDigits: 2
    })
    return dollarUS.format(num)
    //return Intl.NumberFormat('en-US').format(num) 
})