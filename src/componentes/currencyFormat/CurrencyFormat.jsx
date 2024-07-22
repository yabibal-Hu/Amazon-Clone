import numeral from "numeral";

const CurrencyFormater=({amount})=>{
 const formattedAmount=numeral(amount).format("$0,0.00");
 return formattedAmount
}

export default CurrencyFormater