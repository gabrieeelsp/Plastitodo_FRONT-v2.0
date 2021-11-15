import Vue from "vue"

Vue.filter("round2decimal", num => Number(num).toFixed(2))