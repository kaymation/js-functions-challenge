var gameInfo = function(){
  return [
   {
     home_team: "Patriots",
     away_team: "Broncos",
     home_score: 7,
     away_score: 3
   },
   {
     home_team: "Broncos",
     away_team: "Colts",
     home_score: 3,
     away_score: 0
   },
   {
     home_team: "Patriots",
     away_team: "Colts",
     home_score: 11,
     away_score: 7
   },
   {
     home_team: "Steelers",
     away_team: "Patriots",
     home_score: 7,
     away_score: 21
   }
 ]
}

// YOUR CODE HERE

function createRow(team, wins, losses){
  return {
    team: team,
    wins: wins,
    losses: losses
  };
}

function createRows(){
  var games = gameInfo();
  var teams = [];
  var toAdd;
  for (var i = 0; i < games.length; i++) {

    if(teams.find(function(team){
        return team === games[i].home_team
      }) === undefined){
      teams.push(games[i].home_team);
    }
    if (teams.find(function(team){
        return team === games[i].away_team
    }) === undefined) {
      teams.push(games[i].away_team)
    }
  }
  var rows = [];
  for (var i = 0; i < teams.length; i++) {
    var win_and_loss = calculateWinsAndLosses(teams[i]);
    rows.push(createRow(teams[i], win_and_loss.wins, win_and_loss.losses));
  }
  rows = rows.sort(function(a,b){
    if (a.wins < b.wins) {
      return 1;
    }
    if (a.wins > b.wins) {
      return -1;
    }
    if(a.losses > b.losses){
      return 1
    }
    return 0;
  });
  for (var i = 0; i < rows.length; i++) {
    rows[i].rank = i + 1;
  }
  return rows;
}

function calculateWinsAndLosses(team){
  var games = gameInfo();
  var wins = 0;
  var relevant_games = games.filter(function(game){
    return (game.home_team == team || game.away_team == team);
  });
  for (var i = 0; i < relevant_games.length; i++) {
    if (relevant_games[i].home_team == team){
      if (relevant_games[i].home_score > relevant_games[i].away_score) {
        wins++;
      }
    } else if(relevant_games[i].away_score > relevant_games[i].home_score){
      wins++;
    }
  }
  return {wins: wins, losses: relevant_games.length - wins}
}

function rowDisplay(row){
  var team_string = attrString(row.team, 10);
  var rank_string = attrString(row.rank, 10);
  var wins_string = attrString(row.wins, 14);
  var losses_string = attrString(row.losses, 12);
  console.log("| " + team_string + rank_string + wins_string + losses_string + " |");
}

function attrString(attr, ct){
  var attr_string = String(attr);
  var result = attr_string;
  for (var i = 0; i < (ct - attr_string.length); i++) {
    result += " ";
  }
  return result;
}

var rows = createRows();
console.log("--------------------------------------------------");
console.log("| Name      Rank      Total Wins    Total Losses |");
for (var i = 0; i < rows.length; i++) {
  rowDisplay(rows[i]);
  debugger;
}
console.log("--------------------------------------------------");
