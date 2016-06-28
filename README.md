jsonresume-themeutils
=====================

[![Dependency Status](https://david-dm.org/jsonresume/theme-utils.svg)](https://david-dm.org/jsonresume/theme-utils)

Helpful set of utility methods for jsonresume theme developers

# Getting Started
```
npm install jsonresume-themeutils
```

# Usage

```javascript
var utils = require('jsonresume-themeutils'),
    resume = { // Generally this is available by default as argument, including here for the sake of clarity
      "basics": {
        "name": "John Doe",
        "label": "Programmer",
        "picture": "",
        "email": "john@gmail.com",
        "phone": "(912) 555-4321",
        "website": "http://johndoe.com",
        "summary": "A summary of John Doe...",
        "location": {
          "address": "2712 Broadway St",
          "postalCode": "CA 94115",
          "city": "San Francisco",
          "countryCode": "US",
          "region": "California"
        },
        "profiles": [{
          "network": "Twitter",
          "username": "john",
          "url": "http://twitter.com/john"
        }]
      },
      "work": [{
        "company": "Company",
        "position": "President",
        "website": "http://company.com",
        "startDate": "2013-01-01",
        "endDate": "2014-01-01",
        "summary": "Description...",
        "highlights": [
          "Started the company"
        ]
      }],
      "volunteer": [{
        "organization": "Organization",
        "position": "Volunteer",
        "website": "http://organization.com/",
        "startDate": "2012-01-01",
        "endDate": "2013-01-01",
        "summary": "Description...",
        "highlights": [
          "Awarded 'Volunteer of the Month'"
        ]
      }],
      "education": [{
        "institution": "University",
        "area": "Software Development",
        "studyType": "Bachelor",
        "startDate": "2011-01-01",
        "endDate": "2013-01-01",
        "gpa": "4.0",
        "courses": [
          "DB1101 - Basic SQL"
        ]
      }],
      "awards": [{
        "title": "Award",
        "date": "2014-11-01",
        "awarder": "Company",
        "summary": "There is no spoon."
      }],
      "publications": [{
        "name": "Publication",
        "publisher": "Company",
        "releaseDate": "2014-10-01",
        "website": "http://publication.com",
        "summary": "Description..."
      }],
      "skills": [{
        "name": "Web Development",
        "level": "Master",
        "keywords": [
          "HTML",
          "CSS",
          "Javascript"
        ]
      }],
      "languages": [{
        "language": "English",
        "fluency": "Native speaker"
      }],
      "interests": [{
        "name": "Wildlife",
        "keywords": [
          "Ferrets",
          "Unicorns"
        ]
      }],
      "references": [{
        "name": "Jane Doe",
        "reference": "Reference..."
      }]
    };
```

### config
The default config 

```javascript
{
    date_format: 'MMM DD, YYYY',
    gravatar: {
        s: '100',
        r: 'pg',
        d: 'mm'
    }
};
```

### setConfig(opts)
Override the default config using this method

```javascript
utils.setConfig({ date_format: 'MM-DD-YYYY' });
```

### getUrlForPicture(resume)
Returns the profile picture url from the `resume.basics.picture` attribute, if it is not present then it returns the gravatar url from the email address.

```javascript
utils.getUrlForPicture(resume)
// => 'http://www.gravatar.com/avatar/1f9d9a9efc2f523b2f09629444632b5c?s=100&r=pg&d=mm'
```

### getProfile(resume, network)
Returns the profile information for a given network

```javascript
utils.getProfile(resume, 'twitter');
//=> { network: 'Twitter', username: 'john', url: 'http://twitter.com/john' }
```

### getUrlForProfile(resume, 'twitter')
Returns the url for a user's network from the `url` attribute. If it is not specified then it constructs the url based on the specified `username`

```javascript
utils.getUrlForProfile(resume, 'twitter')
//=> 'http://twitter.com/john'
```

### getFormattedDate(date, date_format)
Returns a formatted date as per specified date format. If the date format is not specified then the format specified in `config` is used

```javascript
utils.getFormattedDate('02-02-2012')
//=> 'Feb 02, 2012'
utils.getFormattedDate('02-02-2012', 'MMM, YYYY')
//=> 'Feb, 2012'
```

### getDuration(start_date, end_date, humanize)
Returns an object with duration information when `humanize` is `false`. Returns a human readable duration string for a given `start_date` & `end_date` when `humanize` is `true`

```javascript
utils.getDuration('02-02-2012', '04-02-2014')
//=> { _milliseconds: 68256000000, _days: 0, _months: 0, _data: { milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 2, years: 2 }, ... }
utils.getDuration('02-02-2012', '04-02-2014', true)
//=> '2 years 2 months'
```

### getNativeLanguage(resume)
Returns the native language object

```javascript
utils.getNativeLanguage(resume)
//=> { language: 'English', fluency: 'Native speaker' }
```
