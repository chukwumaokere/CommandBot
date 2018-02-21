var isBetween = function (A, B, C) {
    return (A <= B && B <= C);
};

function Card(s, n) {
    var suit = s;
    var number = n;
    this.getSuit = function () {
        return suit;
    };
    this.getNumber = function () {
        return number;
    };
}
Card.prototype.getValue = function () {
    return this.getNumber() === 1 ? 11 : isBetween(11, this.getNumber(), 13) ? 10 : this.getNumber();
};

var deal = function () {
    return new Card(-~(Math.floor(Math.random() * 4)), -~(Math.floor(Math.random() * 13)));
};

function Deck() {
    var accept = {
        1: [],
        2: [],
        3: [],
        4: []
    };
    for (var s in accept) {
        for (var i = 0; i < 13; ++i)
            accept[s][i] = 1;
    }  

    this.TryAddDeck = function (newCard) {
        if (accept[newCard.getSuit()][newCard.getNumber() - 1]) {
            accept[newCard.getSuit()][newCard.getNumber() - 1] = 0;
            return 1;
        }
        return 0;
    };
}

function Hand() {
    var pack = new Deck(),
        deck = [],
        l = deck.length,
        string = '';
    this.good = 1;
    this.printHand = function () {
        var suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
		var SuitsEmoji = ["♥", "♣", "♦", "♠"];
        var face = {
            1: 'Ace',
            11: 'Jack',
            12: 'Queen',
            13: 'King'
        };
        while (l < deck.length) {
            var num = deck[l].getNumber();
            string += (l ? ', ' : '') + (num ^ 1 && num < 11 ? num : face[num]) + ' of ' + suits[deck[l].getSuit() - 1];
            ++l;
        }
        return string;
    };

    var close = function () {
        this.good = 0;
        alert("You have used up all the cards in your deck!\n");
    };

    var addToDeck = function (myCard) {
        deck[deck.length] = myCard;
    };

    this.hitMe = function () {
        var c;
        if (deck.length ^ 52) {
            while (!pack.TryAddDeck((c = deal())));
            addToDeck(c);
        } else close();
    };

    this.score = function () {
        var s = 0,
            bust = deck.length,
            n;
        for (var c in deck) {
            s += (n = deck[c].getValue());
            bust -= ((n ^ 11) !== 0);
        }
        while (s > 21 && bust--) s -= 10;
        return s;
    };

    this.hitMe();
    this.hitMe();
}

var playAsDealer = function () {
    var myHand = new Hand();
    while (myHand.score() < 17)
        myHand.hitMe();
    return myHand;
};

var playAsUser = function () {
    var myHand = new Hand();
    while (myHand.good && console.log('\tIn your deck you have:\n' +
    '\t-------------------------------------\n' + 
    myHand.printHand() + 
    "\n\n\tDo you want to hit?")) {
        myHand.hitMe();
    }
    return myHand;
};

var declareWinner = function (userHand, dealerHand) {
    var u = userHand.score(),
        d = dealerHand.score();
    console.log('User Hand\n' + userHand.printHand() + 
    '\nScore = ' + u + '\n\nDealer Hand\n' + 
    dealerHand.printHand() + 
    '\nScore = ' + d + '\n');
    return (u === d || (u > 21 && d > 21)) ? "You tied!" : ((isBetween(0, d, 21) && d > u) || (u > 21)) ? "You lose!" : "You win!";
};

var playGame = function () {
    console.log(declareWinner(playAsUser(), playAsDealer()));
};

playGame();