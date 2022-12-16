// Selections des éléments
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//  Condition du bouton reset
const reset = function() {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');    
};



// Fonction du btn Roll
btnRoll.addEventListener('click', () => {
    if (playing === true) {

        // Génére aléatoirement un dés 1 à 6
        const dice = Math.floor(Math.random() * 6) +1;
        
        // Affiche le dés correspondant
        diceEl.classList.remove('hidden');
        diceEl.src = `/Images/dice-${dice}.png`;
        
        // Vérification si le dés fait 1, si c'est le cas , change de joueur
        if (dice !== 1) {
            // ajoute le numéro du dés au score round
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            // Change de joueur
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', () => {
    if (playing === true) {

        
        // Ajoute le score actuel au score du joueur actif
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Vérifie si le score du joueur est >= 100
        if (scores[activePlayer] >= 100) {
            
            // Fin de la partie
            playing = false
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            
            // Change de joueur
            switchPlayer();
            
        }
    } 
})

// btn Noucelle partie
btnNew.addEventListener('click', reset);