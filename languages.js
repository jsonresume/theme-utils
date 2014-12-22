var config = require('./config'),
    _ = require('underscore');

function getNativeLanguage(resume) {
    var languages = resume.languages;

    return _.find(languages, function(language) {
        return language.fluency === 'Native speaker';
    });
}

module.exports = {
    getNativeLanguage: getNativeLanguage
};