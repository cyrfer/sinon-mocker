// stateless utility module for managing stubs

// `mock` is an object that will have keys for all the methods needed for the service it is mocking
// example of mock definition:
// ```const mocks = {
//   SQS: {
//     receiveMessage: sinon.stub(),
//     deleteMessage: sinon.stub(),
//   },
// }```
// example usage is in stub creation:
// ```stubs.SQS = sinon.stub(AWS, 'SQS').callsFake(mocker.fakeCtor(mocks.SQS));```
exports.fakeCtor = (mock) => {
    return function ctor() {
        Object.keys(mock).forEach(key => {
            this[key] = mock[key];
        });
    }
};

// `s` is a `sinon.stub` object that was constructed with `fakeCtor`
// example of stub creation:
// ```stubs.SQS = sinon.stub(AWS, 'SQS').callsFake(mocker.fakeCtor(mocks.SQS));```
// example of usage:
// ```mocker.restoreServices(stubs.SQS);```
exports.restoreServices = (s) => {
    Object.keys(s).forEach(serviceKey => {
        s[serviceKey].restore();
    })
};

// `m` is an object containing mock defintions for multiple services.
// see example definition in docs for `fakeCtor`.
exports.resetMocks = (m) => {
    Object.keys(m).forEach((serviceKey) => {
        const mockService = m[serviceKey];
        Object.keys(mockService).forEach(method => {
            mockService[method].reset();
        })
    })
};
