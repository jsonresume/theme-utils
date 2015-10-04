var config = require('./config'),
    basics = require('./basics'),
    common = require('./common'),
    languages = require('./languages'),
    _ = require('underscore');

function setConfig(opts) {
    _.extend(config, opts || {});
};

module.exports = {
    setConfig: setConfig,
    getUrlForPicture: basics.getUrlForPicture,
    getProfile: basics.getProfile,
    getUrlForProfile: basics.getUrlForProfile,
    getFormattedDate: common.getFormattedDate,
    getDuration: common.getDuration,
    getNativeLanguage: languages.getNativeLanguage
};