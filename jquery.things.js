/*
 * jQuery Things v1.2
 * https://github.com/hubgit/jquery-things
 *
 * Copyright 2014 Alf Eaton
 * Released under the MIT license
 * http://git.macropus.org/mit-license/
 *
 * Date: 2014-01-12
 */
 (function($) {
	// get all items of a certain type
	$.fn.getItems = function(itemtype) {
		return this.find('[itemscope]').filter(function() {
			return $(this).attrs('itemType').get().indexOf(itemtype) !== -1;
		});
	};

	// get or set the itemValue of a node
	$.fn.itemValue = function(value) {
		var getting = value == null;

		if (this.is('[itemscope]')) {
			if (!getting) {
				throw 'Not allowed to set the value of an itemscope node';
			}

			return this;
		}

		var node = this.get(0);

		switch (node.nodeName) {
			case 'META':
			return getting ? $.trim(this.attr('content')) : this.attr('content', value);

			case 'DATA':
			return getting ? $.trim(this.attr('value')) : this.attr('value', value);

			case 'METER':
			return getting ? $.trim(this.attr('value')) : this.attr('value', value);

			case 'TIME':
			if (getting) {
				if (this.attr('datetime')) {
					return $.trim(this.attr('datetime'));
				}

				return $.trim(this.text());
			}
			return this.attr('datetime', value);

			case 'AUDIO':
			case 'EMBED':
			case 'IFRAME':
			case 'IMG':
			case 'SOURCE':
			case 'TRACK':
			return getting ? node.src : this.attr('src', value);

			case 'A':
			case 'AREA':
			case 'LINK':
			return getting ? node.href : this.attr('href', value);

			case 'OBJECT':
			return getting ? node.data : this.attr('data', value);

			default:
			if (getting) {
				return $.trim(this.text());
			}

			return this.text(value);
		}
	};

	// all property nodes, including those in referenced nodes
	$.fn.properties = function() {
		var refs = this.attrs('itemRef').map(function() {
			return document.getElementById(this);
		});

		var nodes = $.merge($(refs), this);

		return nodes.find('[itemprop]').not(nodes.find('[itemscope] [itemprop]'));
	};

	// all nodes with a certain property name
	$.fn.namedItem = function(name) {
		return this.properties().filter(function(item) {
			return $(this).attrs('itemProp').get().indexOf(name) !== -1;
		});
	};

	// properties as a data object
	$.fn.propertiesObject = function(collapsed) {
		if (this.length > 1) {
			return this.map(function() {
				return $(this).propertiesObject(collapsed);
			}).toArray();
		};

		// the object always includes an itemtype
		var data = {
			type: collapsed ? this.attrs('itemType').get(0) : this.attrs('itemType').get()
		};

		this.properties().map(function() {
			var node = $(this);
			var property = node.itemValue();

			if (property instanceof jQuery) {
				property = property.propertiesObject(collapsed);
			}

			node.attrs('itemProp').each(function(index, name) {
				if (collapsed) {
					if (typeof data[name] == 'undefined') {
						data[name] = property; // first item
					} else if ($.isArray(data[name])) {
						data[name].push(property); // more items
					} else {
						data[name] = [data[name], property];
					}
				} else {
					if (typeof data[name] == 'undefined') {
						data[name] = [];
					}

					data[name].push(property);
				}
			});
		});

		return data;
	};

	/* new interfaces */
	$.fn.things = $.fn.getItems;

	$.fn.attrs = function(attribute) {
		return this.map(function() {
			return (this.getAttribute(attribute) || '').split(/\s+/);
		});
	};

	// get/set the itemValue of matched elements
	$.fn.value = function(value) {
		// get a value
		if (typeof value === 'undefined') {
			return this.map(function() {
				return $(this).itemValue();
			});
		}

		// set a value
		this.each(function() {
			$(this).itemValue(value);
		});
	};

	// properties as a data object
	$.fn.microdata = function(name, value, index) {
		var nodes = this;

		// get all the properties
		if (name == null) {
			return nodes.propertiesObject(true);
		}

		// set multiple properties
		if (typeof name === 'object') {
			$.each(name, function(name, value) {
				nodes.microdata(name, value);
			});

			return nodes;
		}

		var items = nodes.namedItem(name);

		if (index != null) {
			items = items.eq(index);
		}

		if (value === true) {
			return items.length ? items.itemValue() : $();
		}

		// get the value of a single node
		if (value == null) {
			return items.length ? items.itemValue() : $();
		}

		// set the value of a single node or multiple nodes by name
		items.value(value);

		return nodes;
	};
}(jQuery));
