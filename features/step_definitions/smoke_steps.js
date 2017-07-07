const {defineSupportCode} = require('cucumber');
const {expect} = require('code');

defineSupportCode(function ({Given, When, Then}) {
    Given('a page exists', function () {
        return this.helloWorldPage.setHost('http://localhost:8080');
    });

    When('I load the page', function () {
        return this.helloWorldPage.loadPage();
    });

    Then('{message} should be displayed', function (message) {
        return this.helloWorldPage.getPageMessage()
            .end()
            .then((result) => {
                expect(result.message).to.equal(message);
            });
    });
});
