import decreator from 'decreator';
import isAsync from './isAsync';

export default decreator((target, key, descriptor, options) => {
	let {
		handler = console.error,
		verbose = true
	} = options;

	if (!verbose && handler == console.error) {
		handler = null;
	}

	const method = target[key];

	if (isAsync(method)) {
		Object.defineProperty(target, key, {
			value: async function () {
				try {
					return await method(...arguments);
				} catch (error) {
					if (handler) {
						handler(error);
					}
				}
			}
		});
	} else {
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
	}

	return target;
});