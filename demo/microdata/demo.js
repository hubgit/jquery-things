/* set a value */

$(function() {
	var albums = $('#albumlist').getItems('http://schema.org/MusicAlbum');

	var artist = albums.eq(0).namedItem('byArtist').eq(0);
	artist.namedItem('name').itemValue('Jesu');
	artist.namedItem('url').itemValue('https://en.wikipedia.org/wiki/Jesu');
});

/* display in a table - W3C interface */

$(function() {
	var table = $('<table/>').appendTo('body');
	var thead = $('<thead/>').appendTo(table);
	var tbody = $('<tbody/>').appendTo(table);

	var row = $('<tr/>').appendTo(thead);
	$('<th/>', { text: 'album' }).appendTo(row);
	$('<th/>', { text: 'artist' }).appendTo(row);

	$('#albumlist').getItems('http://schema.org/MusicAlbum').each(function() {
		// album
		var album = $(this);
		var row = $('<tr/>').appendTo(tbody);

		var cell = $('<td/>').appendTo(row);
		$('<a/>', {
			href: album.namedItem('url').itemValue(),
			text: album.namedItem('name').itemValue()
		}).appendTo(cell);

		var cell = $('<td/>').appendTo(row);

		// group (artist)
		album.namedItem('byArtist').each(function() {
			var artist = $(this);

			$('<a/>', {
				href: artist.namedItem('url').itemValue(),
				text: artist.namedItem('name').itemValue()
			}).appendTo(cell).wrap('<div/>');

			// group's members
			var members = artist.namedItem('musicGroupMember').map(function() {
				return $(this).namedItem('name').itemValue();
			});

			if (members.length) {
				$('<div/>', {
					text: 'Members: ' + members.get().join(', ')
				}).appendTo(cell);
			}

			// group's albums
			var albums = artist.namedItem('album').map(function() {
				return $(this).namedItem('name').itemValue();
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
	var albums = $('#albumlist').getItems('http://schema.org/MusicAlbum');

	var code = $('<code/>', {
		text: JSON.stringify(albums.propertiesObject(), null, 2)
	});

	$('<pre/>').append(code).appendTo('body');
});