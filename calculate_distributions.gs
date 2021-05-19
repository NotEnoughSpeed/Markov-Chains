function calculate_distributions() {
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var sheetData = sheet.getRange(1,1,sheet.getLastRow(),sheet.getLastColumn()).getValues();
  
  for(var row = 1; row < sheetData.length; row++){
    
    if(sheetData[row][0] == row) var states = row;
    
    if(sheetData[row][0] == 'Turn'){
      
      var turnRow = row + 1;
      
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
  
  for(var turns = 1; turns <= maxTurns; turns++){
    
    distr_matrix = matrix_mult(transition_matrix,distr_matrix);
    
    sheet.getRange(turnRow + 1, turns + 1, states, 1).setValues(distr_matrix);
    
  }
  
}
