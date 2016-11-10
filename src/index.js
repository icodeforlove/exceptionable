import decreator from 'decreator';

export default decreator((target, key, descriptor, options) => {
	let {
		handler = console.error,
		verbose = true
	} = options;

	if (!verbose && handler == console.error) {
		handler = null;
	}

	const method = target[key];

	Object.defineProperty(target, key, {
		value: function () {
			try {
				return method(...arguments);
			} catch (error) {
				if (handler) {
					handler(error);
				}
			}
		}
	});

	return target;
});