/* http://mit-license.org/ */

(function(global, doc) {
    if (global["favicon"]) {
        return;
    }

    /*\
    |*| Private
    \*/

    var head = doc.getElementsByTagName("head")[0];
    var loopTimeout = null;
    var preloadIcons = function(icons) {
        var image = new Image();
        for (var i = 0; i < icons.length; i++) {
            image.src = icons[i];
        }
    };
    var addLink = function(iconURL) {
        var newLink = doc.createElement("link");
        newLink.type = "image/x-icon";
        newLink.rel = "icon";
        newLink.href = iconURL;
        removeLinkIfExists();
        head.appendChild(newLink);
    };
    var removeLinkIfExists = function() {
        var links = head.getElementsByTagName("link");
        for (var i = links.length; --i >= 0; /\bicon\b/i.test(links[i].getAttribute("rel")) && head.removeChild(links[i])) {}
    };

    /*\
    |*| Public
    \*/

    global["favicon"] = {
        "defaultPause": 2000,
        "change": function(iconURL, optionalDocTitle) {
            clearTimeout(loopTimeout);
            if (optionalDocTitle) {
                doc.title = optionalDocTitle;
            }
            if (iconURL !== "") {
                addLink(iconURL);
            }
        },
        "animate": function(icons, optionalDelay) {
            clearTimeout(loopTimeout);
            preloadIcons(icons);
            optionalDelay = optionalDelay || this["defaultPause"];
            var iconIndex = 0;
            addLink(icons[iconIndex]);
            loopTimeout = setTimeout(function animateFunc() {
                iconIndex = (iconIndex + 1) % icons.length;
                addLink(icons[iconIndex]);
                loopTimeout = setTimeout(animateFunc, optionalDelay);
            }, optionalDelay);
        },
        "stopAnimate": function() {
            clearTimeout(loopTimeout);
        }
    };
})(this, document);
