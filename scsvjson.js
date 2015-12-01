var SCSVJSON = (function() {

  var scvsjson = {}; // public methods

  var splitAddress = function( address ) {
    if( typeof address === 'string' ) {

    } else {
      throw "Address is not a string. Typeof address = " + (typeof address);
    }
  };

  scvsjson.init = function() {

  };

  scvsjson.csvTojson = function( csv, resource ) {
    var jsonArray = [],
        template  = {},
        csvArray  = csv.split(/^(\s\n)/m), // THIS MUST PARSE CORRECTLY ONLY BLANK EMPTY LINES
        headers   = csvArray[0].split(','),
        data, priceMatchGroups, replacedData;

    // have to parse the blank empty lines and we're good! JFSLDAKJFLKSADJFK;ASFGHK;AEWHFGS;KASFGHJ

    /*if( resource !== 'customer' || resource !== 'order' || resource !== 'product' || resource !== 'transaction' ) {
      throw "Resource type: " + resource + " not found.";
    }*/

    console.log( csvArray.length );
    for( var returns = 0; returns < csvArray.length; returns++ ) {
      if( returns === 0 || returns % 2 === 0) {
        console.log( "returns: " + returns);
      } else {
        csvArray = csvArray.splice( returns, 1 );
      }
    }

    console.table( csvArray );

    for( var u = 1; u < csvArray.length; u++ ) {
      // console.log( csvArray[u] );
      // console.table( csvArray[u].match(/(\$)(\d{1,3})(,)/) );
      // console.log( csvArray[u].replace(csvArray[u].match(/(\$)(\d{1,3})(,)/)[0], csvArray[u].match(/(\$)(\d{1,3})(,)/)[2]) );
      // if resource === order, product, transaction, then there must be a price in it
      priceMatchGroups = csvArray[u].match(/(\$)(\d{1,3})(,)/);
      replacedData = csvArray[u].replace( priceMatchGroups[0], priceMatchGroups[2] );

      data = replacedData.split(',');

      for( var i = 0; i < headers.length; i++ ) {
        template[ headers[i] ] = data[i];
      }

      console.table( template );
      jsonArray.push( { order: template } );
      console.table(jsonArray);
    }

    console.table( jsonArray );
    // change wrappers after json conversion
  };

  return scvsjson;
})();

(function() {

  console.log( 'csv script loaded.' );
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if( xhttp.readyState === 4 && xhttp.status === 200 ) {
      SCSVJSON.csvTojson( xhttp.responseText, 'order' );
    }
  };

  xhttp.open( 'GET', 'test.csv', true );
  xhttp.send();

})();