//console.log(parseInt("0011",16));


var p_in_data = Math.round((Math.random() * 10));
var p_out_data = Math.round((Math.random() * 10));
//console.log(p_in_data,p_out_data);
if((p_in_data - p_out_data) <= 2 && p_in_data > p_out_data){
    console.log(p_in_data,p_out_data);
}