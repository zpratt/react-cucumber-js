const {defineSupportCode} = require('cucumber');
const Nightmare = require('nightmare');
const {HelloWorldPage} = require('./page-objects/hello-world-page');
const StaticServer = require('static-server');

function MinimalistConstructor() {
    this.start = () => {
        this.server = new Promise((resolve) => {
            const server = new StaticServer({
                rootPath: '.',
                host: 'localhost',
                port: 8080
            });

            server.start(() => {
                resolve(server);
            });
        });

        return this.server;
    };

    this.stop = () => {
        return this.server.then((server) => {
            return new Promise((resolve) => {
                server.stop();
                resolve();
                return server;
            })
        });
    };
}

function getNightmareOptions(withDevTools) {
    const baseOptions = {
        show: true
    };

    if (withDevTools) {
        baseOptions.openDevTools = {
            mode: 'detach'
        };
    }

    return baseOptions;
}

defineSupportCode(function ({setWorldConstructor, Before, After}) {
    setWorldConstructor(MinimalistConstructor);

    Before(function () {
        this.nightmare = new Nightmare(
            getNightmareOptions(false)
        );
        this.helloWorldPage = new HelloWorldPage(this.nightmare);

        return this.start();
    });

    After(function () {
        return new Promise((resolve) => {
            this.nightmare.end()
                .then(resolve);
        })
            .then(() => {
                this.helloWorldPage = null;
                this.nightmare = null;

                return this.stop();
            });
    });
});
