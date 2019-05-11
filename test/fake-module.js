
class FakeService {
    constructor(skipThrow) {
        if (!skipThrow) {
            throw new Error('not supposed to use real constructor');
        }
    }
    someMethod(skipThrow) {
        if (!skipThrow) {
            throw new Error('not supposed to use real someMethod');
        }
    }
}

exports.SomeClass = FakeService;
