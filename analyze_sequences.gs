function analyze_sequences() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var sheetData = sheet.getActiveRange().getValues();
  
  var startingdistribution = [];
  var transitionMatrix = [];
  
  for(var sequence of sheetData){
    
    if(startingdistribution[sequence[0]] == null) startingdistribution[sequence[0]] = 0;
    startingdistribution[sequence[0]]++;
    
    for(var step = 1; step < sequence.length; step++){
      
      if(transitionMatrix[sequence[step]] == null) transitionMatrix[sequence[step]] = [];
      if(transitionMatrix[sequence[step]][sequence[step - 1]] == null) transitionMatrix[sequence[step]][sequence[step - 1]] = 0;
      transitionMatrix[sequence[step]][sequence[step - 1]]++;
      
    }
    
  }
  
  //console.log(startingdistribution);
  //console.log(transitionMatrix);
  
  //max state berechnen
  var max = 0;
  for(var state in startingdistribution) if(state > max) max = state;
  for(var state in transitionMatrix) if(state > max) max = state;
  
  console.log('Max: ' + max);
  
  var startingdistributionSum = 0;
  
  for(var state = 0; state <= max; state++){
    
    if(startingdistribution[state] != null) startingdistributionSum += startingdistribution[state];
    if(startingdistribution[state] == null) startingdistribution[state] = 0;
    
    var transitionMatrixSum = 0;
    
    for(var state_ = 0; state_ <= max; state_++){
      
      if(transitionMatrix[state_] == null) transitionMatrix[state_] = [];
      if(transitionMatrix[state_][state] == null) transitionMatrix[state_][state] = 0;
      if(transitionMatrix[state_][state] != null) transitionMatrixSum += transitionMatrix[state_][state];
      
    }
    
    for(var state_ = 0; state_ <= max; state_++){
      
      transitionMatrix[state_][state] /= transitionMatrixSum;
      
    }
      
  }
  
  var formattedStartingdistribution = [];
  
  for(var state = 0; state <= max; state++){
    
    startingdistribution[state] /= startingdistributionSum;
    formattedStartingdistribution.push([startingdistribution[state]]);
    
  }
  
  sheet.getRange(2, 2, transitionMatrix.length, transitionMatrix[0].length).setValues(transitionMatrix);
  sheet.getRange(2, 10, formattedStartingdistribution.length, 1).setValues(formattedStartingdistribution);
    
}
