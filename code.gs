function pickRandomUnsoldPlayer() {
  var sheet= SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Player list");
  var player= sheet.getRange("A2:A40").getValues();
  var statuses= sheet.getRange('f2:f40').getValues();

  var unsoldPlayer = [];

  for ( var i=0; i<statuses.length; i++){
    if (statuses[i][0]=="Unsold"){
      unsoldPlayer.push(player[i][0]);
    }
  }
  if (unsoldPlayer.length==0){
    Logger.log("No player left unsold");
    return;
  
  }
  var randomIndex= Math.floor(Math.random()*unsoldPlayer.length);
  var randomPlayer= unsoldPlayer[randomIndex];
  sheet.getRange("j1").setValue(randomPlayer);
}

function bidOnPlayer(teamNameCell, teamBalanceCell){

  var sheet= SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var incrementAmount= 10000;
  var currentPrice = sheet.getRange('c29').getValue();
  
  if (currentPrice==0){
    currentPrice= sheet.getRange('c28').getValue()-incrementAmount;
  
  }
  var budget = sheet.getRange(teamBalanceCell).getValue();
  var teamName = sheet.getRange(teamNameCell).getValue();

  if (budget<currentPrice+incrementAmount){
    SpreadsheetApp.getActiveSpreadsheet().toast(teamName+ "doesn't have enough money to buy ");
    return;

  }
  sheet.getRange('c29').setValue(currentPrice+incrementAmount);
  sheet.getRange('c30').setValue(teamName);

}
function bidOnPlayerfromTeamA(){
  teamNameCell= "A1";
  teamBalanceCell= "D1";
  bidOnPlayer(teamNameCell,teamBalanceCell);

}
function bidOnPlayerfromTeamB(){
  teamNameCell= "F1";
  teamBalanceCell= "I1";
  bidOnPlayer(teamNameCell,teamBalanceCell);
  
}
function bidOnPlayerfromTeamC(){
  teamNameCell= "K1";
  teamBalanceCell= "N1";
  bidOnPlayer(teamNameCell,teamBalanceCell);
  
}
function bidOnPlayerfromTeamD(){
  teamNameCell= "P1";
  teamBalanceCell= "S1";
  bidOnPlayer(teamNameCell,teamBalanceCell);
  
}



function markPlayerAsSold(){
  var sheet =SpreadsheetApp.getActiveSpreadsheet();
  var auctionsheet = sheet.getSheetByName("Auction");
  var playersheet = sheet.getSheetByName("Player list");
  
  var playerName = auctionsheet.getRange("c26").getValue();
  var soldTo = auctionsheet.getRange("c30").getValue();
  var salePrice = parseFloat( auctionsheet.getRange("c29").getValue());

  auctionsheet.getRange("q27").setValue(playerName);
  auctionsheet.getRange("Q28").setValue(soldTo);
  auctionsheet.getRange("Q29").setValue(salePrice);
  auctionsheet.getRange("c29:c30").clearContent();
  var data = playersheet.getRange("A2:A40").getValues();
  
  for (var i=0; i<data.length; i++){
    if (data[i][0]== playerName){
      playersheet.getRange(i+2, 6).setValue("Sold");
      playersheet.getRange(i+2, 7).setValue(soldTo);
      playersheet.getRange(i+2, 4).setValue(salePrice);
      break;


    }
    
  }
  //entry column for Sold players
  var entrycolumn = 1;
  if(soldTo == 'CSK'){
    entrycolumn=1;
  }
 
  else if(soldTo == 'RCB'){
    entrycolumn=6;
  }
  else if(soldTo == 'MI'){
    entrycolumn=11;
  }
  else if(soldTo == 'PBKS'){
    entrycolumn=16;
  }
  var insertRow=3;
  var values = auctionsheet.getRange(insertRow,entrycolumn,15).getValues();

   //loop through values to find next empty cell
  
  for(var i=0; i<values.length; i++){
    if (values[i][0]==0||values[i][0]==null){
      insertRow=i+3;
      break;
    }
  }
  //insert data
  auctionsheet.getRange(insertRow,entrycolumn,1,2).setValues([[playerName,salePrice]]);
  
  SpreadsheetApp.getActiveSpreadsheet().toast(playerName  +  " was sold to " + soldTo + " for whooping Rs." + salePrice);



  pickRandomUnsoldPlayer();

}





