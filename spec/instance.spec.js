import exceptionable from '../dist/index';

class Example {
	constructor() {
		this.scope = 'decorated';
	}

	@exceptionable({verbose: false})
	static methodWithoutLogging () {
		throw new Error('Example');
	}

	@exceptionable({verbose: false})
	static async methodAsyncWithoutLogging () {
		throw new Error('Example');
	}

	@exceptionable({verbose: false})
	methodWithScope () {
		return this.scope;
	}

	@exceptionable({verbose: false})
	static methodWithArgs (foo, bar) {
		return foo + bar;
	}

	@exceptionable({verbose: false})
	async methodAsyncWithScope () {
		return this.scope;
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

	it('does not break args', () => {
		expect(Example.methodWithArgs('foo', 'bar')).toBe('foobar');
	});

	it('can retain scope', async () => {
		const example = new Example();
		expect(example.methodWithScope()).toBe('decorated');
		expect(await example.methodAsyncWithScope()).toBe('decorated');
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