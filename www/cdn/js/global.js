window.pages = {
    "/": ["/"],
    "apps": ["/apps/"],
    "build": ["/build/"]
};
window.routes = {
    "main": {
        "/": {  
            "/": {
                "noauth": { "template": "/cdn/html/template-index.html", "document": "/cdn/html/noauth-index.html" }
            }
        }
    },
    "popup": {
        "build": {
            "/build/": {
                "isauth": { "template": "/cdn/html/template-build.html", "document": "/cdn/html/isauth-build.html" },
                "noauth": { "template": "/cdn/html/template-build.html", "document": "/cdn/html/noauth-build.html" }
            },
            "/build/#/": {
                "isauth": { "template": "/cdn/html/template-builder.html", "document": "/cdn/html/isauth-builder.html" },
                "noauth": { "template": "/cdn/html/template-builder.html", "document": "/cdn/html/noauth-builder.html" }
            },
            "/build/#/#/": {
                "isauth": { "template": "/cdn/html/template-builder.html", "document": "/cdn/html/isauth-builder.html" },
                "noauth": { "template": "/cdn/html/template-builder.html", "document": "/cdn/html/noauth-builder.html" }
            },
            "/build/#/#/#/": {
                "isauth": { "template": "/cdn/html/template-builder.html", "document": "/cdn/html/isauth-builder.html" },
                "noauth": { "template": "/cdn/html/template-builder.html", "document": "/cdn/html/noauth-builder.html" }
            }
        },
        "apps": {
            "/apps/": {
                "isauth": { "template": "/cdn/html/template-apps.html", "document": "/cdn/html/isauth-apps.html" },
                "noauth": { "template": "/cdn/html/template-apps.html", "document": "/cdn/html/noauth-apps.html" }
            },
            "/apps/#/": {
                "isauth": { "template": "/cdn/html/template-app.html", "document": "/cdn/html/isauth-app.html" },
                "noauth": { "template": "/cdn/html/template-app.html", "document": "/cdn/html/noauth-app.html" }
            },
            "/apps/#/#/": {
                "isauth": { "template": "/cdn/html/template-app.html", "document": "/cdn/html/isauth-builder.html" },
                "noauth": { "template": "/cdn/html/template-app.html", "document": "/cdn/html/noauth-builder.html" }
            },
            "/apps/#/#/#/": {
                "isauth": { "template": "/cdn/html/template-app.html", "document": "/cdn/html/isauth-builder.html" },
                "noauth": { "template": "/cdn/html/template-app.html", "document": "/cdn/html/noauth-builder.html" }
            }
        }
    }
};