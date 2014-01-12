/* set a value */

$(function() {
	var albums = $('#albumlist').things('http://schema.org/MusicAlbum');

	albums.eq(0)
		.microdata('byArtist')
		.microdata('name', 'Jesu')
		.microdata('url', 'https://en.wikipedia.org/wiki/Jesu');

	albums.eq(0)
		.microdata('byArtist').eq(1)
		.microdata({
			'name': 'The Beatles',
			'url': 'https://en.wikipedia.org/wiki/The_Beatles'
		});
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

			$('<a/>', {
				href: artist.microdata('url'),
				text: artist.microdata('name')
			}).appendTo(cell).wrap('<div/>');

			// group's members
			var members = artist.microdata('musicGroupMember').map(function() {
				return $(this).microdata('name');
			});

			if (members.length) {
				$('<div/>', {
					text: 'Members: ' + members.get().join(', ')
				}).appendTo(cell);
			}

			// group's albums
			var albums = artist.microdata('album').map(function() {
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