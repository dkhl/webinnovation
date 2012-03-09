goog.provide('inno.Player');

goog.require('goog.array');
goog.require('inno.Colors');
goog.require('inno.Utils');


inno.Player = function(playerNum) {
    this.playerNum_ = playerNum;

    this.board_ = {};
    for (var i = 0, color; color = inno.Colors[i]; i++) {
	this.board_[color] = {'CARDS': [], 'SPLAY': 'NONE'};
    }

    this.hand_ = [];

    this.score_ = [];

    this.achievements_ = [];
};

inno.Player.prototype.highestAgeOnBoard = function() {
    var highest = 0;
    for (var i = 0, color; color = inno.Colors[i]; i++) {
        var cards = this.board_[color]['CARDS'];
	for (var j = 0, card; card = cards[j]; j++) {
	    var age = card.age_;
	    if (age == 10) {
		return 10;
	    } else if (age > highest) {
		highest = age;
	    }
	}
    }
    return highest;
};

inno.Player.prototype.countPilesWithSplay = function(splay) {
    var count = 0;
    for (var i = 0, color; color = inno.Colors[i]; i++) {
	if (this.board_[color]['SPLAY'] == splay) {
	    count++;
	}
    }
    return count;
};

inno.Player.prototype.addCardToHand = function(card) {
    this.hand_.push(card);
};

inno.Player.prototype.addCardToScore = function(card) {
    this.score_.push(card);
};

inno.Player.prototype.valueOfScore = function() {
    var value = 0;
    for (var i = 0, card; card = this.score_[i]; i++) {
	value += card.age_;
    }
    return value;
};

inno.Player.prototype.meldCard = function(card) {
    goog.array.insertAt(this.board_[card.color_]['CARDS'], card, 0);
};

inno.Player.prototype.tuckCard = function(card) {
    this.board_[card.color_]['CARDS'].push(card);
};

inno.Player.prototype.splayForColor = function(splay, color) {
    this.board_[color]['SPLAY'] = splay;
};

inno.Player.prototype.removeTopCardForColor = function(color) {
    var cards = this.board_[color]['CARDS'];
    cards.shift();
    if (cards.length == 1) {
	this.board_[color]['SPLAY'] = 'NONE';
    }
};

inno.Player.prototype.removeBottomCardForColor = function(color) {
    var cards = this.board_[color]['CARDS'];
    cards.pop();
    if (cards.length == 1) {
	this.board_[color]['SPLAY'] = 'NONE';
    }
};

inno.Player.prototype.countForSymbol = function(symbol) {
    var count = 0, cards, splay;
    for (var i = 0, color; color = inno.Colors[i]; i++) {
	cards = this.board_[color]['CARDS'];
	splay = this.board_[color]['SPLAY'];
	count += inno.Utils.countForSymbolCardsSplay(symbol, cards, splay);
    }
    return count;
};


inno.Player.prototype.demandCardFromHandWithSymbol = function(symbol) {
    return null;
};


inno.Player.prototype.maybeGetCardFromHand = function() {
    return null;
};

inno.Player.prototype.demandHighestCard = function() {
    return null;
};
