# jQuery Things

Extract and manipulate objects stored in [HTML Microdata](http://www.whatwg.org/specs/web-apps/current-work/multipage/microdata.html), using a simple interface.

[Demonstration](http://git.macropus.org/jquery-things/)

## W3C-like interface

### Get all things of a certain type

$(node).items(itemtype)

    $('#albumlist').items('http://schema.org/MusicAlbum')

### Get the nodes for a property

$(node).property(property) => a jQuery collection of nodes

    $(node).property('name') => [ node, node ]

    $(node).property('byArtist')[0].property('album') => [ node, node ]

### Get the value of a property

$(node).value() => the itemValue of the node(s)

    $(node).property('name').value() => string

    $(node).property('byArtist')[0].property('name').value() => string

### Set a property

$(node).property(property).value(value)

    $(node).property('name').value('Yellow Submarine')

    $(node).property('byArtist')[0]
           .property('name').value('The Beatles')
           .property('url').value('https://en.wikipedia.org/wiki/The_Beatles')


### Get all properties

$(node).microdata()

    $('#albumlist').items('http://schema.org/MusicAlbum').microdata()

## Simple interface

### Get all things of a certain type

$(node).things(itemtype)

    $('#albumlist').things('http://schema.org/MusicAlbum')

### Get a property

$(node).microdata(property) => a literal value or a jQuery object

    $(node).microdata('name') => string

    $(node).microdata('byArtist') => jQuery object

    $(node).microdata('byArtist').microdata('name') => string

### Set a property

$(node).microdata(property, value)

	$(node).microdata('name', 'Yellow Submarine')

	$(node).microdata('byArtist')
	       .microdata('name', 'The Beatles')
	       .microdata('url', 'https://en.wikipedia.org/wiki/The_Beatles')

### Get a property as an array

$(node).microdata(property, true) => an array of literal values or jQuery objects

    $(node).microdata('name', true) => [ string, string ]

    $(node).microdata('byArtist').microdata('album', true) => [ jQuery object, jQuery object ]

### Get all properties

$(node).microdata()

    $('#albumlist').things('http://schema.org/MusicAlbum').microdata()
