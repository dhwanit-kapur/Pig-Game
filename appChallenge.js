var scores, roundScore, activePlayer, gameOn;
var lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gameOn){
        // 1. Generate a random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';

        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-1').src = 'dice-' + dice2 + '.png';

        
        // 3. Update the round score
        if (dice1 !== 1 && dice2 !== 1){
            roundScore = roundScore + dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else{
            // 4. Move to the next player
            nextPlayer();
        }


        // if (dice === 6 && lastDice === 6){
        //     // Player looses his turn 
        //     scores[activePlayer] = 0;
        //     document.querySelector('#score-' + activePlayer).textContent = '0';
        //     nextPlayer();
        // }
        // else if (dice !== 1){
        //     roundScore = roundScore + dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // }
        // else{
        //     // 4. Move to the next player
        //     nextPlayer();
        // }
        // lastDice = dice;
    }
})

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gameOn){
        // 1. Add the current score to the global score
        scores[activePlayer] = scores[activePlayer] + roundScore;

        // 2. Display the score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        if (input){
            winningScore = input;
        }else{
            winningScore = 100;
        }

        // 3. Check if the player won
        if (scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = "Winner";
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            gameOn = false;
        }
        else {
            // 4. Move to the next player
            nextPlayer();
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', function(){
    init();
})


function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';

}

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameOn = true;
    
    // document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#name-0').textContent = "Player 1";
    document.querySelector('#name-1').textContent = "Player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}