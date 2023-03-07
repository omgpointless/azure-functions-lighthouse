const lighthouse = require("lighthouse");
const puppeteer = require("puppeteer");
const workerpool = require("workerpool");

function doLighthouseRun (url) {
    return new Promise(function (resolve, reject) {
            puppeteer.launch({headless: true}).then((browser) => {
                const options = {
                    output: 'json',
                    port: new URL(browser.wsEndpoint()).port,
                };
    
                const config = {
                    extends: 'lighthouse:default',
                    settings: {
                        onlyAudits: [
                            'total-byte-weight',
                        ],
                        },
                        throttlingMethod: 'provided',
                        throttling: {
                            throughputKbps: 8000,
                            downloadThroughputKbps: 8000,
                            uploadThroughputKbps: 2000
                        },
                        runtimeNoEmulation: 'No emulation',
                        screenEmulation: {
                        disabled: true
                    }
                };

                lighthouse(url, options, config).then((res) => {
                    resolve(res);
                }).finally(() => {
                    browser.close();
                })
            }).catch((e) => {
                console.log("error:",e);
                reject(e);
            });
    });
}

workerpool.worker({
    doLighthouseRun: doLighthouseRun,
});
