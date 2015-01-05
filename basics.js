var config = require('./config'),
    _ = require('underscore'),
    gravatar = require('gravatar'),
    urlMap = {
        github: 'github.com',
        twitter: 'twitter.com',
        soundcloud: 'soundcloud.com',
        pinterest: 'pinterest.com',
        vimeo: 'vimeo.com',
        behance: 'behance.net',
        codepen: 'codepen.io',
        foursquare: 'foursquare.com',
        reddit: 'reddit.com',
        spotify: 'open.spotify.com',
        dribble: 'dribbble.com',
        dribbble: 'dribbble.com',
        facebook: 'facebook.com',
        angellist: 'angel.co',
        bitbucket: 'bitbucket.org'
    };

function getPictureFromEmail(email) {
    return gravatar.url(email, config.gravatar);
}

function getUrlForPicture(resume) {
    return (resume.basics.picture || getPictureFromEmail(resume.basics.email));
}

function getProfile(resume, network) {
    var profiles = resume.basics.profiles;

    return _.find(profiles, function(profile) {
        return profile.network.toLowerCase() === network.toLowerCase();
    });
}

function getUrlForProfile(resume, network) {
    var url, username,
        profile = getProfile(resume, network);

    if (profile.url) {
        return profile.url;
    }

    username = profile.username;
    url = urlMap[network];

    if (!username && !url) {
        return;
    }

    switch(network) {
        case 'skype':
            return 'skype:' + username + '?call';
        case 'reddit':
        case 'spotify':
            return '//' + url + '/user/' + username;
        default:
            return '//' + url + '/' + username;
    }
}

module.exports = {
    getUrlForPicture: getUrlForPicture,
    getProfile: getProfile,
    getUrlForProfile: getUrlForProfile
};