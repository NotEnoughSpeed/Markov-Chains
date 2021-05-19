function simulate_sequences() {
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var sheetData = sheet.getRange(1,1,sheet.getLastRow(),sheet.getLastColumn()).getValues();
  
  for(var row = 1; row < sheetData.length; row++){
    
    if(sheetData[row][0] == row - 1) var states = row;
    
    if(sheetData[row][0] == 'Sequence'){
      
      var sequenceRow = row + 1;
      
      for(var col = 0; col < sheetData[row].length; col++){
        
        if(sheetData[row][col] == col) var maxTurns = col;
        //if(sheetData[row][col] != col) break;
        
      }
      
    }
    
  }
  
  var transition_matrix = sheet.getRange(2,2,states,states).getValues();
  
  for(var col = 0; col < sheetData[0].length; col++){
    
    if(sheetData[0][col] == 'Starting Distribution') var distr_matrixCol = col + 2;
    
  }
  
  var distr_matrix = sheet.getRange(2,distr_matrixCol,states,1).getValues();
  
  var row = sequenceRow;
  
  
  while(sheetData[row][0] != ''){
    
    var sequence = [];
    
    var randNum = Math.random();
      
    for(var state = 0; state < distr_matrix.length; state++){
      
      var setState = state;
      
      if(randNum < distr_matrix[state][0]){
        
        break;
        
      } else {
        
        randNum -= distr_matrix[state][0];
        
      }
      
    }
    
    sequence.push(setState);
  
    for(var turns = 1; turns < maxTurns; turns++){
      
      var randNum = Math.random();
      var lastState = setState;
      
      for(var state = 0; state < transition_matrix.length; state++){
        
        var setState = state;
        
        if(randNum < transition_matrix[state][lastState]){
          
          break;
          
        } else {
          
          randNum -= transition_matrix[state][lastState];
          
        }
        
      }
      
      sequence.push(setState);
      
    }
    
    sheet.getRange(row + 1, 2, 1, sequence.length).setValues([sequence]);
      
    row++;
    
    if(row >= sheetData.length) break;
    
  }
  
}
