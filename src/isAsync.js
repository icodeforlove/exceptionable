import saw from 'string-saw';

export default func => {
	const $string = saw(func.toString()).trim();

	return !!(
		// native
		$string.has(/^async /) ||

		// babel
		$string.has(/return _ref[^\.]*\.apply/) ||

		// mangled
		$string
		  // get inner function contents
		  .match(/^\s*[^\{]+\{([\s\S]+)\}\s*$/im)
		  .first()
		  // strip all sub calls
		  .replace(/\{[\s\S]+}/g,'')
		  // find return
		  .split('\n').trim().filter()
		  .has(/return .*promise/i)
	);
};