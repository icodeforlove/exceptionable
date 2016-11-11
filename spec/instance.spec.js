import exceptionable from '../dist/index';

class Example {
	@exceptionable({verbose: false})
	static methodWithoutLogging () {
		throw new Error('Example');
	}

	@exceptionable({verbose: false})
	static async methodAsyncWithoutLogging () {
		throw new Error('Example');
	}
}

describe('Instance Tests', () => {
	it('can swallow a exception', () => {
		let swallowed = false;

		try {
			Example.methodWithoutLogging();
			swallowed = true;
		} catch (error) {}

		expect(swallowed).toBe(true);
	});

	it('can swallow a async exception', async () => {
		let swallowed = false;

		try {
			await Example.methodAsyncWithoutLogging();
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

	it('can support async custom logging', async () => {
		let handlerFired = false;

		class Example {
			@exceptionable({handler: error => {
				handlerFired = !!error;
			}})
			static async methodAsyncWithoutLogging () {
				throw new Error('Example');
			}
		}

		try {
			await Example.methodAsyncWithoutLogging();
		} catch (error) {}

		expect(handlerFired).toBe(true);
	});
});