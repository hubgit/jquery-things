/* set a value */

$(function() {
	var albums = $('#albumlist').things('http://schema.org/MusicAlbum');

	albums.eq(0)
		.microdata('byArtist', null, 0)
		.microdata('name', 'Jesu', 1)
		.microdata('url', 'https://en.wikipedia.org/wiki/Jesu');

	albums.eq(0)
		.microdata('byArtist', null, 1)
		.microdata({
			'name': 'The Beatles',
			'url': 'https://en.wikipedia.org/wiki/The_Beatles'
		}, null, 0);
});

/* display in a table */

$(function() {
	var table = $('<table/>').appendTo('body');
	var thead = $('<thead/>').appendTo(table);
	var tbody = $('<tbody/>').appendTo(table);

	var row = $('<tr/>').appendTo(thead);
	$('<th/>', { text: 'album' }).appendTo(row);
	$('<th/>', { text: 'artist' }).appendTo(row);

	$('#albumlist').things('http://schema.org/MusicAlbum').each(function() {
		// album
		var album = $(this);
		var row = $('<tr/>').appendTo(tbody);

		var cell = $('<td/>').appendTo(row);
		$('<a/>', {
			href: album.microdata('url'),
			text: album.microdata('name')
		}).appendTo(cell);

		//var artist = album.microdata('byArtist');
		var cell = $('<td/>').appendTo(row);

		album.microdata('byArtist').each(function() {
			// group (artist)
			var artist = $(this);

			var names = artist.microdata('name', function() {
				return $(this).itemValue();
			});

			$('<a/>', {
				href: artist.microdata('url'),
				text: names.get().join(', '),
			}).appendTo(cell).wrap('<div/>');

			// group's members
			var members = artist.microdata('musicGroupMember', function() {
				return $(this).microdata('name');
			});

			if (members.length) {
				$('<div/>', {
					text: 'Members: ' + members.get().join(', ')
				}).appendTo(cell);
			}

			// group's albums
			var albums = artist.microdata('album', function() {
				return $(this).microdata('name');
			});

			if (albums.length) {
				$('<div/>', {
					text: 'Albums: ' + albums.get().join(', ')
				}).appendTo(cell);
			}
		});
	});
});

/* convert to JSON */

$(function() {
	var albums = $('#albumlist').things('http://schema.org/MusicAlbum');

	var code = $('<code/>', {
		text: JSON.stringify(albums.microdata(), null, 2)
	});

	$('<pre/>').append(code).appendTo('body');
});