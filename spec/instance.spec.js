import exceptionable from '../dist/index';

@exceptionable({verbose: false})
class Example {
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

		@exceptionable({handler: error => {
			handlerFired = !!error;
		}})
		class Example {
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