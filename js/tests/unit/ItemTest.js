$(function () {
    'use strict'

    QUnit.test('constructor', function (assert) {
        var item = new Item(100, 200, 'test!')

        assert.equal(item.width, 100)
        assert.equal(item.height, 200)
        assert.equal(item.originalWidth, 100)
        assert.equal(item.originalHeight, 200)
        assert.equal(item.getAspect(), 0.5)
        assert.equal(item.getWidthPercent(400), 25)
        assert.equal(item.getHeightPercent(400), 50)
        assert.equal(item.content, 'test!')
    })

    QUnit.test('types', function (assert) {
        var item1 = new Item(300, 100)
        var item2 = new Item(100, 200)
        var item3 = new Item(300, 300)

        assert.equal(item1.isLandscape(), true)
        assert.equal(item1.isPortrait(), false)
        assert.equal(item1.isSquare(), false)

        assert.equal(item2.isLandscape(), false)
        assert.equal(item2.isPortrait(), true)
        assert.equal(item2.isSquare(), false)

        assert.equal(item3.isLandscape(), false)
        assert.equal(item3.isPortrait(), false)
        assert.equal(item3.isSquare(), true)
    })

    QUnit.test('width scaling', function (assert) {
        var item = new Item(100, 200)

        item.setWidth(50)

        assert.equal(item.width, 50)
        assert.equal(item.height, 100)
        assert.equal(item.originalWidth, 100)
        assert.equal(item.originalHeight, 200)
        assert.equal(item.getScale(), 0.5)
    })

    QUnit.test('height scaling', function (assert) {
        var item = new Item(100, 200)

        item.setHeight(300)

        assert.equal(item.width, 150)
        assert.equal(item.height, 300)
        assert.equal(item.originalWidth, 100)
        assert.equal(item.originalHeight, 200)
        assert.equal(item.getScale(), 1.5)
    })
})
