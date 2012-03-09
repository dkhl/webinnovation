goog.provide('inno');

goog.require('inno.Model');
goog.requite('inno.View');
goog.require('lime.Director');
goog.require('lime.Layer');
goog.require('lime.Scene');


inno.start = function() {

    var director = new lime.Director(document.body);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);
    var size = director.getSize();
    var width = size.width;
    var height = size.height;

    var scene = new lime.Scene();

    var model = new inno.Model();
    inno.model = model;

    var view = new inno.View(model);
    model.addListener(view);

    model.startGame();

}

goog.exportSymbol('inno.start', inno.start);
