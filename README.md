# Mocking
stateless utilities for managing mocks and stubs in your node tests

# Install
```
npm install -D mocking
```

# Example

```
const SomeModule = require('./a-module');
const lib = require('mocking');

const assert = require('chai').assert;
const sinon = require('sinon');

// create your testing mocks
const mocks = {
    SomeClass: {
        someMethod: sinon.mock()
    }
};

// know the state of your testing mocks
const stubs = {
    SomeClass: sinon.stub(SomeModule, 'SomeClass').callsFake(lib.fakeCtor(mocks.SomeClass)),
};

// test your code
const test1 = new SomeModule.SomeClass();
test1.someMethod();
assert.equal(mocks.SomeClass.someMethod.callCount, 1, 'did not invoke mocks');

// reset state of your tests
lib.resetMocks(mocks);
lib.restoreServices(stubs);
assert.equal(mocks.SomeClass.someMethod.callCount, 0, 'did not reset mocks');
```
