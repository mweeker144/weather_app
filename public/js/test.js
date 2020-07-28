const fetch = require("node-fetch");
searchTerm = '95030'

fetch(`https://api.aerisapi.com/forecasts/${searchTerm}?&format=json&filter=day&limit=7&client_id=mBQGb6NKoSDfUtVEL1ukN&client_secret=rZ3eULU8H7EDFxUe82E3sAEch32vhbKzucWTXJt7`)
.then(res => res.json())
.then(data => {
    console.log(data.error === 'null')
    // console.log(x)

});

// console.log




// // // // .catch(function() {
// // // //     console.log("error");
// // // // });
