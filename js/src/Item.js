/* Copyright 2015, Clippings Ltd. Licensed under BSD-3-Clause
 * See license text at https://github.com/clippings/align-blocks/blob/master/LICENSE */

 /* exported Item */

var Item = (function () {

    'use strict'

    function Item(width, height, content) {
        this.originalWidth = this.width = width
        this.originalHeight = this.height = height
        this.content = content
    }

    Item.prototype.getWidthPercent = function (total) {
        return (this.width / total) * 100
    }

    Item.prototype.getHeightPercent = function (total) {
        return (this.height / total) * 100
    }

    Item.prototype.getAspect = function () {
        return this.originalWidth / this.originalHeight
    }

    Item.prototype.setWidth = function (width) {
        this.width = width
        this.height = width / this.getAspect()
    }

    Item.prototype.setHeight = function (height) {
        this.height = height
        this.width = height * this.getAspect()
    }

    Item.prototype.getScale = function () {
        return this.width / this.originalWidth
    }

    Item.prototype.isLandscape = function () {
        return this.getAspect() > 1
    }

    Item.prototype.isPortrait = function () {
        return this.getAspect() < 1
    }

    Item.prototype.isSquare = function () {
        return this.getAspect() === 1
    }

    return Item

})()
