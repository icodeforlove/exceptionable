export default func => {
	const string = func.toString().trim();

	return !!(
		// native
		string.match(/^async /) ||
		// babel
		string.match(/return _ref\.apply/)
	);
};