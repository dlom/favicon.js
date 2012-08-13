/* http://mit-license.org/ */

(function(global) {

    /*
     *  Private
     */

    var head = global.document.getElementsByTagName("head")[0];
    var sequencePause;
    var iconSequence;
    var iconIndex;
    var loopTimeout = null;
    var preloadIcons = function(icons) {
        var image = new Image();
        for (var i = 0; i < icons.length; i++) {
            image.src = icons[i];
        }
    };
    var addLink = function(iconUrl) {
        var link = document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "icon";
        link.href = iconUrl;
        removeLinkIfExists();
        head.appendChild(link);
    };
    var removeLinkIfExists = function() {
        var links = head.getElementsByTagName("link");
        for (var i = 0; i < links.length; i++) {
            if ((links[i].getAttribute('rel') || '').match(/\bicon\b/)) {
                head.removeChild(links[i]);
                return;
            }
        }
    };

    /*
     *  Public
     */

    global["favicon"] = {
        "defaultPause": 2000,
        "change": function(iconURL, optionalDocTitle) {
            clearTimeout(loopTimeout);
            if (optionalDocTitle) {
                document.title = optionalDocTitle;
            }
            addLink(iconURL);
        },
        "animate": function(icons, optionalDelay) {
            clearTimeout(loopTimeout);
            var that = this;
            preloadIcons(icons);
            iconSequence = icons;
            sequencePause = (optionalDelay) ? optionalDelay : that["defaultPause"];
            iconIndex = 0;
            that["change"](iconSequence[0]);
            loopTimeout = setTimeout(function animateFunc() {
                iconIndex = (iconIndex + 1) % iconSequence.length;
                addLink(iconSequence[iconIndex]);
                loopTimeout = setTimeout(animateFunc, sequencePause);
            }, sequencePause);
        },
        "stopAnimate": function() {
            clearTimeout(loopTimeout);
        }
    };
})(this);