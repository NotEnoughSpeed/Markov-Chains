function matrix_mult(matrix_1, matrix_2) {
  
  if(matrix_1[0].length != matrix_2.length) return;
  
  var matrix_3 = [];
  
  for(var row = 0; row < matrix_1.length; row++){
    
    matrix_3.push([]);
    
    for(var col = 0; col < matrix_2[0].length; col++){
    
      var sum = 0;
      
      for(var k = 0; k < matrix_2.length; k++){
        
        sum += matrix_1[row][k] * matrix_2[k][col];
        
      }
      
      matrix_3[row].push(sum);
      
    }
    
  }
  
  return matrix_3;
  
}
