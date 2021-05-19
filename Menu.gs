function onOpen() {
  var ui = SpreadsheetApp.getUi();
  
  ui.createMenu('Makros')
      .addItem('calculate_distributions', 'calculate_distributions')
      .addItem('simulate_sequences', 'simulate_sequences')
      .addItem('analyze_sequences', 'analyze_sequences')
      .addToUi();
}