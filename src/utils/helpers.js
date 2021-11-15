import Vue from "vue"

Vue.mixin({
    methods: {
        globalHelperLimitNDecimal: function (num, n) { 
            if ( num ){
              let temp = num.split('.');
              if ( temp[1] ) {
                  let decimal = temp[1];
                  if ( decimal.length >= n ) {
                      decimal = decimal.substring(0, n);                
                  }
                  return temp[0].concat('.', decimal);
              }else {
                return temp[0];
              }
            }
          },
      globalHelperLimit2Decimal: function (num) { 
        if ( num ){
          let temp = num.split('.');
          if ( temp[1] ) {
              let decimal = temp[1];
              if ( decimal.length >= 2 ) {
                  decimal = decimal.substring(0, 2);                
              }
              return temp[0].concat('.', decimal);
          }else {
            return temp[0];
          }
        }
      },
      globalHelperLimit4Decimal: function (num) { 
        if ( num ){
          let temp = num.split('.');
          if ( temp[1] ) {
              let decimal = temp[1];
              if ( decimal.length >= 4 ) {
                  decimal = decimal.substring(0, 4);                
              }
              return temp[0].concat('.', decimal);
          }else {
            return temp[0];
          }
        }
      },
      
    },
  })