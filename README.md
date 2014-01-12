# jQuery Things

Extract and manipulate objects stored in [HTML Microdata](http://www.whatwg.org/specs/web-apps/current-work/multipage/microdata.html), using a simple interface.

[Demonstration](http://git.macropus.org/jquery-things/)

## Simple interface

### Get all things of a certain type

$(node).things(itemtype)

    $('#albumlist').things('http://schema.org/MusicAlbum')

### Get a property

$(node).microdata(property) => a literal value or a jQuery set of matched elements

    $(node).microdata('name') => string

    $(node).microdata('byArtist') => set of elements

    $(node).microdata('byArtist').microdata('name') => string

### Set a property

$(node).microdata(property, value)

    $(node).microdata('name', 'Yellow Submarine')

    $(node).microdata('byArtist').eq(0)
           .microdata('name', 'The Beatles')
           .microdata('url', 'https://en.wikipedia.org/wiki/The_Beatles')

    $(node).microdata('byArtist').eq(0)
           .microdata({
                name: 'The Beatles',
                url: 'https://en.wikipedia.org/wiki/The_Beatles'
           });

### Get all properties

$(node).microdata()

    $('#albumlist').things('http://schema.org/MusicAlbum').microdata()

## W3C-like interface

### Get all things of a certain type

$(node).getItems(itemtype)

    $('#albumlist').getItems('http://schema.org/MusicAlbum')

### Get the nodes for a property

$(node).namedItem(property) => a jQuery collection of nodes

    $(node).namedItem('name') => [ node, node ]

    $(node).namedItem('byArtist').eq(0).namedItem('album') => [ node, node ]

### Get the value of a property

$(node).itemValue() => the itemValue of the node(s)

    $(node).namedItem('name').itemValue() => string

    $(node).namedItem('byArtist').eq(0).namedItem('name').itemValue() => string

### Set a property

$(node).namedItem(property).itemValue(value)

    $(node).namedItem('name').eq(0).itemValue('Yellow Submarine')

    var artist = $(node).namedItem('byArtist').eq(0);
    artist.namedItem('name').itemValue('The Beatles');
    artist.namedItem('url').itemValue('https://en.wikipedia.org/wiki/The_Beatles');

### Get all properties

$(node).propertiesObject()

    $('#albumlist').getItems('http://schema.org/MusicAlbum').propertiesObject()

