goog.provide('inno.Model');

goog.require('goog.array');
goog.require('inno.Card');
goog.require('inno.Dogmas');
goog.require('inno.Player');


inno.Model = function() {
    this.listeners_ = [];
};


inno.Model.prototype.addListener = function(listener) {
    this.listeners_.push(listener);
};


inno.Model.prototype.updateAll_ = function() {
    for (var i = 0, listener; listener = this.listeners_[i]; i++) {
	listener.update();
    }
};


inno.Model.prototype.startGame = function() {
    this.piles_ = new Array();
    this.makePiles_();

    this.players_ = new Array();
    this.makePlayers_();

    this.players_[0].meldCard(this.drawForAge(1));
    this.players_[0].meldCard(this.drawForAge(1));
    this.players_[1].meldCard(this.drawForAge(1));
    this.players_[1].meldCard(this.drawForAge(1));

    this.updateAll_();
};


inno.Model.prototype.drawForAge = function(age) {
    var card = null;
    while (age <= 10) {
	var pile = this.piles_[age];
	if (pile.length == 0) {
	    age++;
	} else {
	    card = pile.shift();
	    break;
	}
    }
    return card;
};


inno.Model.prototype.returnToPileForCard = function(card) {
    this.piles_[card.age_].push(card);
};


inno.Model.prototype.makePlayers_ = function() {
    this.players_[0] = new inno.Player(0);
    this.players_[1] = new inno.Player(1);
};


inno.Model.prototype.makePiles_ = function() {
    this.piles_[0] = [];

    var age1 = new Array();
    age1.push(new inno.Card("Agriculture", 1, "YELLOW", ["", "LEAF", "LEAF", "LEAF"]));
    age1.push(new inno.Card("Archery", 1, "RED", ["CASTLE", "LIGHT", "", "CASTLE"]));
    age1.push(new inno.Card("Oars", 1, "RED", ["CASTLE", "CROWN", "", "CASTLE"]));
    age1.push(new inno.Card("The Wheel", 1, "GREEN", ["", "CASTLE", "CASTLE", "CASTLE"]));
    goog.array.shuffle(age1);
    this.piles_[1] = age1;

    var age2 = new Array();
    age2.push(new inno.Card("Fermenting", 2, "YELLOW", ["LEAF", "LEAF", "", "CASTLE"]));
    age2.push(new inno.Card("Mapmaking", 2, "GREEN", ["", "CROWN", "CROWN", "CASTLE"]));
    goog.array.shuffle(age2);
    this.piles_[2] = age2;

    var age3 = new Array();
    age3.push(new inno.Card("Alchemy", 3, "BLUE", ["", "LEAF", "CASTLE", "CASTLE"]));
    goog.array.shuffle(age3);
    this.piles_[3] = age3;

    var age4 = new Array();
    age4.push(new inno.Card("Printing Press", 4, "BLUE", ["", "LIGHT", "LIGHT", "CROWN"]));
    goog.array.shuffle(age4);
    this.piles_[4] = age4;

    var age5 = new Array();
    age5.push(new inno.Card("Physics", 5, "BLUE", ["FACTORY", "LIGHT", "LIGHT", ""]));
    goog.array.shuffle(age5);
    this.piles_[5] = age5;

    var age6 = new Array();
    age6.push(new inno.Card("Vaccination", 6, "YELLOW", ["LEAF", "FACTORY", "LEAF", ""]));
    goog.array.shuffle(age6);
    this.piles_[6] = age6;

    var age7 = new Array();
    age7.push(new inno.Card("Lighting", 7, "Purple", ["", "LEAF", "CLOCK", "LEAF"]));
    goog.array.shuffle(age7);
    this.piles_[7] = age7;

    var age8 = new Array();
    age8.push(new inno.Card("Quantum Theory", 8, "BLUE", ["CLOCK", "CLOCK", "CLOCK", ""]));
    goog.array.shuffle(age8);
    this.piles_[8] = age8;

    var age9 = new Array();
    age9.push(new inno.Card("Genetics", 9, "BLUE", ["LIGHT", "LIGHT", "LIGHT", ""]));
    age9.push(new inno.Card("Services", 9, "PURPLE", ["", "LEAF", "LEAF", "LEAF"]));
    goog.array.shuffle(age9);
    this.piles_[9] = age9;

    var age10 = new Array();
    age10.push(new inno.Card("Globalization", 10, "YELLOW", ["", "FACTORY", "FACTORY", "FACTORY"]));
    goog.array.shuffle(age10);
    this.piles_[10] = age10;
};


inno.Model.prototype.endGameForCannotDraw = function() {

};


inno.Model.prototype.performDogmasForCardAndPlayerNum = function(card, playerNum) {
    switch (card.name_) {
    case 'Agriculture':
        inno.Dogmas.agriculture(this, playerNum);
        break;
    case 'Archery':
        inno.Dogmas.archery(this, playerNum);
        break;
    case 'Oars':
	inno.Dogmas.oars(this, playerNum);
	break;
    case 'The Wheel':
        inno.Dogmas.theWheel(this, playerNum);
        break;
    };
};



inno.Model.prototype.getState = function() {
    var output = "Piles:\n";
    for (var i = 1; i < 11; i++) {
	var pileForAge = this.piles_[i];
	output += "Age " + i + ": ";
	for (var j = 0, card; card = pileForAge[j]; j++) {
	    output += card.name_ + ", ";;
	}
	output += "\n";
    }
    return output;
};
