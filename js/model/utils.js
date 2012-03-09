goog.provide('inno.Utils');


inno.Utils.countForSymbolCardsSplay = function(symbol, cards, splay) {
    var count = 0;
    for (var i = 0, card; card = cards[i]; i++) {
	var symbols = card.symbols_;
	if (i == 0) {
	    for (var j = 0; j < 4; j++) {
		if (symbols[j] == symbol) {
		    count++;
		}
	    }
	} else {
	    switch (splay) {
	    case 'LEFT':
		if (symbols[3] == symbol) {
		    count++;
		}
		break;
	    case 'RIGHT':
		for (var j = 0; j < 2; j++) {
		    if (symbols[j] == symbol) {
			count++;
		    }
		}
		break;
	    case 'UP':
		for (var j = 1; j < 4; j++) {
		    if (symbols[j] == symbol) {
			count++;
		    }
		}
		break;
	    }
	}
    }
    return count;
};
