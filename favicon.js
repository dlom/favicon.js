/* http://mit-license.org/ */

(function (root, factory) {
    if (typeof define === "function" && define["amd"]) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === "object" && module["exports"]) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module["exports"] = factory();
    } else {
        // Browser globals (root is window)
        root["favicon"] = factory();
  }
}(typeof self !== "undefined" ? self : this, function () {
    var doc = document;
    // private

    var head = doc.getElementsByTagName("head")[0];
    var loopTimeout = null;
    var changeFavicon = function(iconURL) {
        var newLink = doc.createElement("link");
        newLink.type = "image/x-icon";
        newLink.rel = "icon";
        newLink.href = iconURL;
        removeExistingFavicons();
        head.appendChild(newLink);
    };
    var removeExistingFavicons = function() {
        var links = head.getElementsByTagName("link");
        for (var i = 0; i < links.length; i++) {
            if (/\bicon\b/i.test(links[i].getAttribute("rel"))) {
                head.removeChild(links[i]);
            }
        }
    };

    // public

    var favicon = {
        "defaultPause": 2000,
        "change": function(iconURL, optionalDocTitle) {
            clearTimeout(loopTimeout);
            if (optionalDocTitle) {
                doc.title = optionalDocTitle;
            }
            if (iconURL !== "") {
                changeFavicon(iconURL);
            }
        },
        "animate": function(icons, optionalDelay) {
            clearTimeout(loopTimeout);
            // preload icons
            icons.forEach(function(icon) {
                (new Image()).src = icon;
            });
            optionalDelay = optionalDelay || this["defaultPause"];
            var iconIndex = 0;
            changeFavicon(icons[iconIndex]);
            loopTimeout = setTimeout(function animateFunc() {
                iconIndex = (iconIndex + 1) % icons.length;
                changeFavicon(icons[iconIndex]);
                loopTimeout = setTimeout(animateFunc, optionalDelay);
            }, optionalDelay);
        },
        "stopAnimate": function() {
            clearTimeout(loopTimeout);
        }
    };

    return favicon;
}));
