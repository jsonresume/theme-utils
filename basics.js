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
        bitbucket: 'bitbucket.org',
        exercism: 'exercism.io',
        instagram: 'instagram.com',
        googleplus: 'plus.google.com',
        gratipay: 'gratipay.com',
        hackernews: 'news.ycombinator.com',
        lastfm: 'last.fm',
        stackexchange: 'stackexchange.com',
        stackoverflow: 'stackoverflow.com',
        tumblr: 'tumblr.com',
        youtube: 'youtube.com',
        medium: 'medium.com',
        blogger: 'blogspot.com',
        meetup: 'meetup.com',
        flickr: 'flickr.com',
        telegram: 'telegram.me'
    };

function getPictureFromEmail(email) {
    return gravatar.url(email, config.gravatar, 'https');
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

    //in case user forgets to append `@` at the start of username for medium accounts
    if (network === 'medium' && !/^@.*/.test(username)) {
        username = '@' + username;
    }

    switch(network) {
        case 'skype':
            return 'skype:' + username + '?call';
        case 'reddit':
        case 'spotify':
        case 'lastfm':
        case 'foursquare':
        case 'youtube':
            return '//' + url + '/user/' + username;
        case 'hackernews':
            return '//' + url + '/user?id=' + username;
        case 'stackexchange':
        case 'stackoverflow':
            return '//' + url + '/users/' + username;
        case 'tumblr':
        case 'blogger':
            return '//' + username + '.' + url;
        case 'meetup':
            return '//' + url + '/members/' + username;
        case 'flickr':
            return '//' + url + '/people/' + username;
        default:
            return '//' + url + '/' + username;
    }
}

module.exports = {
    getUrlForPicture: getUrlForPicture,
    getProfile: getProfile,
    getUrlForProfile: getUrlForProfile
};
