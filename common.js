var config = require('./config'),
    moment = require('moment');

function getFormattedDate(date, date_format) {
    var DATE_FORMAT_INPUT = 'YYYY-MM-DD'; // resume.json standard date format
    date_format = date_format || config.date_format; // output format

    return moment(date, DATE_FORMAT_INPUT).format(date_format);
}

function humanizeDuration(duration) {
   var days,
       months = duration.months(),
       years = duration.years(),
       month_str = months > 1 ? 'months' : 'month',
       year_str = years > 1 ? 'years' : 'year';

    if ( months && years ) {
        return years + ' ' + year_str + ' ' + months + ' ' + month_str;
    }

    if ( months ) {
        return months + ' ' + month_str;
    }

    if ( years ) {
        return years + ' ' + year_str;
    }

    days = duration.days();

    return ( days > 1 ? days + ' days' : days + ' day' );
}

function getDuration(start_date, end_date, humanize) {
    var duration;

    start_date = new Date(start_date);
    end_date = new Date(end_date);
    duration = moment.duration(end_date.getTime() - start_date.getTime());

    return (humanize ? humanizeDuration(duration) : duration);
}

module.exports = {
  getFormattedDate: getFormattedDate,
  getDuration: getDuration
};