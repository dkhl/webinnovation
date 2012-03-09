goog.provide('inno.Dogmas');

inno.Dogmas.agriculture = function(model, activePlayerNum) {
    var players = model.players_;
    var numPlayers = players.length;
    var activePlayer = players[activePlayerNum];
    var activeLeafs = activePlayer.countForSymbol('LEAF');
    var dogmaShared = false;
    for (var i = 0; i < numPlayers - 1; i++) {
	var otherPlayer = players[(i + activePlayerNum + 1) % numPlayers];
        var otherLeafs = otherPlayer.countForSymbol('LEAF');
        if (otherLeafs >= activeLeafs) {
	    var card = otherPlayer.maybeGetCardFromHand();
	    if (card) {
		var age = card.age_;
		model.returnToPileForCard(card);
		var draw = model.drawForAge(age + 1);
		if (draw) {
                    otherPlayer.addCardToScore(draw);
                } else {
                    model.endGameForCannotDraw();
                    return;
		}
		dogmaShared = true;
	    }
	}
    }
    var card = activePlayer.maybeGetCardFromHand();
    if (card) {
	var age = card.age_;
	model.returnToPileForCard(card);
	var draw = model.drawForAge(age + 1);
	if (draw) {
	    activePlayer.addCardToScore(draw);
	} else {
	    model.endGameForCannotDraw();
	    return;
	}
    }
    if (dogmaShared) {
        var draw = model.drawForAge(activePlayer.highestAgeOnBoard());
        if (draw) {
            activePlayer.addCardToHand(draw);
        } else {
            model.endGameForCannotDraw();
        }
    }    
};

inno.Dogmas.archery = function(model, activePlayerNum) {
    var players = model.players_;
    var numPlayers = players.length;
    var activePlayer = players[activePlayerNum];
    var activeCastles = activePlayer.countForSymbol('CASTLE');
    for (var i = 0; i < numPlayers - 1; i++) {
	var otherPlayer = players[(i + activePlayerNum + 1) % numPlayers];
	var otherCastles = otherPlayer.countForSymbol('CASTLE');
	if (otherCastles < activeCastles) {
	    var draw = model.drawForAge(1);
	    if (draw) {
		otherPlayer.addCardToHand(draw);
		var card = otherPlayer.demandHighestCard();
		if (card) {
		    activePlayer.addCardToHand(card);
		}
	    } else {
		model.endGameForCannotDraw();
		return;
	    }
	}
    }
};

inno.Dogmas.oars = function(model, activePlayerNum) {
    var players = model.players_;
    var numPlayers = players.length;
    var activePlayer = players[activePlayerNum];
    var activeCastles = activePlayer.countForSymbol('CASTLE');
    var cardTransferred = false;
    for (var i = 0; i < numPlayers - 1; i++) {
	var otherPlayer = players[(i + activePlayerNum + 1) % numPlayers];
	var otherCastles = otherPlayer.countForSymbol('CASTLE');
	if (otherCastles < activeCastles) {
	    var card = otherPlayer.demandCardFromHandWithSymbol('CROWN');
	    if (card) {
		activePlayer.addToScoreWithCard(card);
		var draw = model.drawForAge(1);
		if (draw) {
		    otherPlayer.addCardToHand(draw);
		} else {
		    model.endGameForCannotDraw();
		    return;
		}
		cardTransferred = true;
	    }
	}
    }
    if (!cardTransferred) {
	var draw = model.drawForAge(1);
	if (draw) {
	    activePlayer.addCardToHand(draw);
	} else {
	    model.endGameForCannotDraw();
	    return;
	}
    }
};

inno.Dogmas.theWheel = function(model, activePlayerNum) {
    var players = model.players_;
    var numPlayers = players.length;
    var activePlayer = players[activePlayerNum];
    var activeCastles = activePlayer.countForSymbol('CASTLE');
    var dogmaShared = false;
    for (var i = 0; i < numPlayers - 1; i++) {
	var otherPlayer = players[(i + activePlayerNum + 1) % numPlayers];
        var otherCastles = otherPlayer.countForSymbol('CASTLE');
        if (otherCastles >= activeCastles) {
	    for (var j = 0; j < 2; j++) {
		var draw = model.drawForAge(1);
		if (draw) {
		    otherPlayer.addCardToHand(draw);
		} else {
		    model.endGameForCannotDraw();
		    return;
		}
	    }
	    dogmaShared = true;
	}
    }
    for (var i = 0; i < 2; i++) {
	var draw = model.drawForAge(1);
	if (draw) {
	    activePlayer.addCardToHand(draw);
	} else {
	    model.endGameForCannotDraw();
	    return;
	}
    }
    if (dogmaShared) {
        var draw = model.drawForAge(activePlayer.highestAgeOnBoard());
	if (draw) {
	    activePlayer.addCardToHand(draw);
	} else {
	    model.endGameForCannotDraw();
	}
    }
};
