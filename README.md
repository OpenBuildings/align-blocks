Align Blocks
============

[![Build Status](https://travis-ci.org/clippings/align-blocks.svg?branch=master)](https://travis-ci.org/clippings/align-blocks)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/e614af258a93423ab0056c93fb101c62)](https://www.codacy.com/app/clippings/align-blocks)
[![Dependency Status](https://david-dm.org/clippings/align-blocks.svg)](https://david-dm.org/clippings/align-blocks)
[![devDependency Status](https://david-dm.org/clippings/align-blocks/dev-status.svg)](https://david-dm.org/clippings/align-blocks#info=devDependencies)

Arrange Images with percentages

## Instalation

Using [jspm](http://jspm.io/):

    jspm install npm:align-blocks

Using npm:

    npm install align-blocks

Manual:

Download [latest release](https://github.com/clippings/align-blocks/releases/latest)

``` html
<script type="text/javascript" src="dist/js/align-blocks.min.js"></script>
```

Usage
-----

``` js
var gallery = new AlignBlocks.Group([
    new AlignBlocks.Item(100, 200, 'http://example.com/1.jpg'),
    new AlignBlocks.Item(200, 100, 'http://example.com/2.jpg'),
    new AlignBlocks.Item(100, 100, 'http://example.com/3.jpg'),
    new AlignBlocks.Item(300, 200, 'http://example.com/4.jpg'),
]);

gallery.margin = 15;

// extract some of the images into a group
var group = gallery.extract(function (group) {
    return group
        .setHeight(50)
        .horizontalSlice(200)
        .scaleToWidth(200);
});

group.items.forEach(function (item) {
    console.log(item.content);
});

// Get the remaining items
gallery.items;
```

License
-------

Copyright (c) 2015, Clippings Ltd. Developed by Ivan Kerin

Under BSD-3-Clause license, read LICENSE file.
