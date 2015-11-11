/* Copyright 2015, Clippings Ltd. Licensed under BSD-3-Clause
 * See license text at https://github.com/clippings/align-blocks/blob/master/LICENSE */

 /* exported Group */

var Group = (function () {

    'use strict'

    function sumArray(array, callback) {
        var sum = 0

        for (var i = 0; i < array.length; i++) {
            sum += callback(array[i])
        }

        return sum
    }

    function diffArray(array1, array2) {
        return array1.filter(function (i) {
            return array2.indexOf(i) < 0
        })
    }

    function Group(items, margin) {
        this.items = items
        this.margin = margin || 0
    }

    Group.prototype.getMarginPercent = function (total) {
        return (this.margin / total) * 100
    }

    Group.prototype.add = function (item) {
        this.items.push(item)

        return this
    }

    Group.prototype.getGaps = function () {
        return Math.max(this.items.length - 1, 0)
    }

    Group.prototype.sumWidths = function () {
        return sumArray(this.items, function (item) {
            return item.width
        })
    }

    Group.prototype.sumHeights = function () {
        return sumArray(this.items, function (item) {
            return item.height
        })
    }

    Group.prototype.getWidth = function () {
        return this.sumWidths() + this.getGaps() * this.margin
    }

    Group.prototype.getHeight = function () {
        return this.sumHeights() + this.getGaps() * this.margin
    }

    Group.prototype.setWidth = function (width) {
        this.items.forEach(function (item) {
            item.setWidth(width)
        })

        return this
    }

    Group.prototype.setHeight = function (height) {
        this.items.forEach(function (item) {
            item.setHeight(height)
        })

        return this
    }

    Group.prototype.setScale = function (scale) {
        this.items.forEach(function (item) {
            item.setWidth(item.width * scale)
        })

        return this
    }

    Group.prototype.filter = function (filter) {
        return new Group(this.items.filter(filter), this.margin)
    }

    Group.prototype.slice = function (offset, limit) {
        return new Group(this.items.slice(offset, limit), this.margin)
    }

    Group.prototype.extract = function (extract) {
        var items = this.items.slice(0)
        var extracted = extract(new Group(items, this.margin))

        this.items = diffArray(this.items, extracted.items)

        return extracted
    }

    Group.prototype.scaleToWidth = function (width) {
        var copy = new Group(this.items.slice(0), this.margin)
        var withoutMargins = width - copy.getGaps() * copy.margin
        var sum = copy.sumWidths()

        if (sum && sum < withoutMargins) {
            var difference = withoutMargins / sum
            copy.setScale(difference)
        }

        return copy
    }

    Group.prototype.scaleToHeight = function (height) {
        var copy = new Group(this.items.slice(0), this.margin)
        var withoutMargins = height - copy.getGaps() * copy.margin
        var sum = copy.sumHeights()

        if (sum && sum < withoutMargins) {
            var difference = withoutMargins / sum
            copy.setScale(difference)
        }

        return copy
    }

    Group.prototype.horizontalSlice = function (width) {
        var current = 0
        var self = this

        return this.filter(function (item) {
            current += item.width + self.margin
            return current <= (width + self.margin)
        })
    }

    Group.prototype.verticalSlice = function (height) {
        var current = 0
        var self = this

        return this.filter(function (item) {
            current += item.height + self.margin
            return current <= (height + self.margin)
        })
    }

    return Group

})()
