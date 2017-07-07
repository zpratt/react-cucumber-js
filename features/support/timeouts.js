const {defineSupportCode} = require('cucumber');

defineSupportCode(function ({setDefaultTimeout}) {
    const maxTimeout = 30000;

    setDefaultTimeout(maxTimeout);
});
