import exceptionable from '../dist/index';

@exceptionable({verbose: false})
class Example {
	constructor() {
		this.scope = 'decorated';
	}

	static methodWithoutLogging () {
		throw new Error('Example');
	}

	static async methodAsyncWithoutLogging () {
		return new Promise ((resolve, reject) => {
			setTimeout(() => {
				reject(new Error('Example'));
			}, 200);
		});
	}

	static methodWithArgs (foo, bar) {
		return foo + bar;
	}

	@exceptionable({verbose: false})
	methodWithScope () {
		return this.scope;
	}

	@exceptionable({verbose: false})
	async methodAsyncWithScope () {
		return this.scope;
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

	it('can support async custom logging', async () => {
		let handlerFired = false;

		@exceptionable({handler: error => {
			handlerFired = !!error;
		}})
		class Example {
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