const assert = require('chai').assert;
const sinon = require('sinon');
const SomeModule = require('./fake-module');
const lib = require('../index');

describe('test', () => {
    describe('fakeCtor', () => {
        it('mock a modules constructor', () => {
            const mocks = {
                SomeClass: {
                    someMethod: sinon.mock()
                }
            };

            const stubs = {
                SomeClass: sinon.stub(SomeModule, 'SomeClass').callsFake(lib.fakeCtor(mocks.SomeClass)),
            };

            assert.equal(mocks.SomeClass.someMethod.callCount, 0, 'unexpected initial state');

            const test1 = new SomeModule.SomeClass();
            test1.someMethod();
            assert.equal(mocks.SomeClass.someMethod.callCount, 1, 'did not invoke mocks');

            lib.resetMocks(mocks);
            lib.restoreServices(stubs);

            assert.equal(mocks.SomeClass.someMethod.callCount, 0, 'did not reset mocks');

            const test2 = new SomeModule.SomeClass(true);
            test2.someMethod(true);
            assert.equal(mocks.SomeClass.someMethod.callCount, 0, 'did invoke mocks');
        })
    })
})