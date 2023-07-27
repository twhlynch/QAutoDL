const pathname = window.location.pathname.split('/').filter(item => item);

const applicationID = pathname[2];

let access_token = "";

window.addEventListener("load", main, false);

function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function main() {
    chrome.runtime.sendMessage("GetCookies", async (response) => {
        access_token = response;
        if (pathname.length == 3) {
            await waitForElement('.app__info');

            const button = document.querySelector("button[data-testid='pdp:purchase-button']");
            if (button) {
                button.click();
                await waitForElement('button[data-testid^="store:pdp:app-button:manage-entitlement:"]');
            }

            const requestData = `access_token=${access_token}&variables={"applicationID":"${applicationID}"}&doc_id=3828663700542720`;
            createAndSendRequest(requestData).then((response) => {
                const releaseChannel = response.data.node.release_channels.nodes[0];
                if (releaseChannel) {
                    const version = releaseChannel.latest_supported_binary;
                    if (version) {
                        const downloadLink = `https://securecdn.oculus.com/binaries/download/?id=${version.id}`;
                        if (downloadLink) {
                            location.href = downloadLink;
                        } else {
                            console.log("No download link available.");
                        }
                    } else {
                        console.log("No version available.");
                    }
                } else {
                    console.log("No release channel available.");
                }
            }).catch(error => {
                console.error(error);
            });
        }
    });
}

function createAndSendRequest(sendArgs) {
    return new Promise((resolve, reject) => {
        const transport = new XMLHttpRequest;
        const graphURI = "https://graph.oculus.com/graphql";
        transport.withCredentials = true;
        transport.open("POST", graphURI, true);
        transport.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        transport.onreadystatechange = function () {
            if (transport.readyState === 4) {
                if (transport.status == 200) {
                    resolve(JSON.parse(transport.responseText));
                } else {
                    reject(transport.status);
                }
            }
        }
        transport.send(sendArgs);
    });
}
