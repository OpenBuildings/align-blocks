$(function () {
    'use strict'

    QUnit.module('Group', {
        beforeEach: function () {
            this.items = [
                new Item(100, 200),
                new Item(200, 100),
                new Item(100, 100)
            ]
        }
    })

    QUnit.test('constructor', function (assert) {
        var group = new Group(this.items, 10)

        assert.deepEqual(group.items, this.items)
        assert.equal(group.margin, 10)
        assert.equal(group.getMarginPercent(20), 50)

        group.add(new Item(5, 5))

        assert.deepEqual(group.items[3], new Item(5, 5))
    })

    QUnit.test('setWidth', function (assert) {
        var group = new Group(this.items)

        group.setWidth(50)

        assert.equal(group.items[0].width, 50)
        assert.equal(group.items[0].height, 100)

        assert.equal(group.items[1].width, 50)
        assert.equal(group.items[1].height, 25)

        assert.equal(group.items[2].width, 50)
        assert.equal(group.items[2].height, 50)
    })

    QUnit.test('setHeight', function (assert) {
        var group = new Group(this.items)

        group.setHeight(50)

        assert.equal(group.items[0].width, 25)
        assert.equal(group.items[0].height, 50)

        assert.equal(group.items[1].width, 100)
        assert.equal(group.items[1].height, 50)

        assert.equal(group.items[2].width, 50)
        assert.equal(group.items[2].height, 50)
    })

    QUnit.test('horizontalSlice', function (assert) {
        var group = new Group(this.items, 15)

        var sliced = group.horizontalSlice(400)

        var expected = [
            new Item(100, 200),
            new Item(200, 100)
        ]

        assert.deepEqual(sliced.items, expected)
    })

    QUnit.test('verticalSlice', function (assert) {
        var group = new Group(this.items, 15)

        var sliced = group.verticalSlice(350)

        var expected = [
            new Item(100, 200),
            new Item(200, 100)
        ]

        assert.deepEqual(sliced.items, expected)
    })

    QUnit.test('filter', function (assert) {
        var group = new Group([
            new Item(100, 200, true),
            new Item(200, 100, false),
            new Item(100, 100, true)
        ])

        var expected = [
            new Item(100, 200, true),
            new Item(100, 100, true)
        ]

        var filtered = group.filter(function (item) {
            return item.content
        })

        assert.deepEqual(filtered.items, expected)
    })

    QUnit.test('slice', function (assert) {
        var group = new Group([
            new Item(100, 200),
            new Item(200, 100),
            new Item(100, 100),
            new Item(50, 70)
        ])

        var expected = [
            new Item(200, 100),
            new Item(100, 100)
        ]

        var sliced = group.slice(1, 3)

        assert.deepEqual(sliced.items, expected)
    })

    QUnit.test('getGaps', function (assert) {
        var group = new Group(this.items)

        assert.deepEqual(group.getGaps(), 2)
    })

    QUnit.test('sumWidths', function (assert) {
        var group = new Group(this.items)

        assert.deepEqual(group.sumWidths(), 400)
    })

    QUnit.test('sumHeights', function (assert) {
        var group = new Group(this.items)

        assert.deepEqual(group.sumHeights(), 400)
    })

    QUnit.test('scaleToWidth', function (assert) {
        var group = new Group(this.items, 15)

        group.scaleToWidth(500)

        assert.deepEqual(group.getWidth(), 500)
    })

    QUnit.test('scaleToHeight', function (assert) {
        var group = new Group(this.items, 15)

        group.scaleToHeight(500)

        assert.deepEqual(group.getHeight(), 500)
    })

    QUnit.test('setScale', function (assert) {
        var group = new Group(this.items)

        group.setScale(2)

        assert.deepEqual(group.getWidth(), 800)
        assert.deepEqual(group.getHeight(), 800)
    })

    QUnit.test('extract', function (assert) {
        var group = new Group(this.items, 15)

        var extracted = group.extract(function (group) {
            return group
                .setHeight(50)
                .horizontalSlice(410)
                .scaleToWidth(410)
        })

        assert.deepEqual(extracted.getWidth(), 410)
    })
})
