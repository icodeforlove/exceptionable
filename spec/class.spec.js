import exceptionable from '../dist/index';

class Example {
	@exceptionable({verbose: false})
	static methodWithoutLogging () {
		throw new Error('Example');
	}
}

describe('Class Tests', () => {
	it('can swallow a exception', () => {
		let swallowed = false;

		try {
			Example.methodWithoutLogging();
			swallowed = true;
		} catch (error) {}

		expect(swallowed).toBe(true);
	});

	it('can support custom logging', () => {
		let handlerFired = false;

		class Example {
			@exceptionable({handler: error => {
				handlerFired = !!error;
			}})
			static methodWithLogging () {
				throw new Error('Example');
			}
		}

		try {
			Example.methodWithLogging();
		} catch (error) {}

		expect(handlerFired).toBe(true);
	});
});