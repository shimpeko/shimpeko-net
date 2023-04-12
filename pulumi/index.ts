import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";

const accountId = "081f668942799d922407565bcd3c000d"
const shimpekoNet = new cloudflare.PagesProject("shimpeko-net", {
    accountId: accountId,
    buildConfig: {
        webAnalyticsTag: "3e773a755ce7436c8ab53adb5311acaa",
        webAnalyticsToken: "1faa252164a54db280afa01f839326f8",
    },
    deploymentConfigs: {
        preview: {
            compatibilityDate: "2023-04-02",
            failOpen: true,
        },
        production: {
            compatibilityDate: "2023-04-02",
            failOpen: true,
        },
    },
    name: "shimpeko-net",
    productionBranch: "main",
}, {
    protect: true,
});

const shimpekoNetDomain = new cloudflare.PagesDomain("shimpeko-net-domain", {
    accountId: accountId,
    domain: "shimpeko.net",
    projectName: shimpekoNet.name,
});

