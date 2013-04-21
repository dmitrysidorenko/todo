require.config({
    // base url to scripts
    baseUrl: "src/"
    // how much time wait for abort loading. false - disable
    waitSeconds: false,

    paths: {
        "require": "../lib/require",
        "knockout": "../lib/knockout",
        "jquery": "../lib/jquery"
    }
});

require([
    ""
], function() {

});