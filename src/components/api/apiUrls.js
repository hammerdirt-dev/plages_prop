const prefix = 'http://127.0.0.1:8000/api/'
// const prefix = 'https://mwshovel.pythonanywhere.com/api/'
// authentication

export const REFRESH_TOKEN = `${prefix}hd-auth/jwt/refresh/`
export const SERVER_CHECK = `${prefix}list-of-beaches/`
export const TOKEN_AUTH = `${prefix}hd-auth/jwt/create/`
export const VERIFY_TOKEN = `${prefix}hd-auth/jwt/verify/`
export const ARE_WE_ONLINE = `${prefix}are-we-online/`
export const TOKEN_TIME_OUT = 3540000
// user-data
export const LIST_OF_USERS = `${prefix}users/` // check
// survey data
export const CITY_CODE_TOTALS = `${prefix}code-totals/cities/swiss/` //check
export const DAILY_TOTALS_PCS_M = `${prefix}surveys/daily-totals/swiss/` //check
export const SURVEY_RESULTS = `${prefix}surveys/survey-results/`// check query ' location__country, date'
export const LOCATION_SURVEY_DETAILS = `${prefix}surveys/daily-totals/code-totals/swiss/` //check
export const LIST_OF_BEACHES = `${prefix}list-of-beaches/swiss/` //check
export const LIST_OF_BEACHES_CATEGORY = `${prefix}list-of-beaches/by-category/swiss/` // check
export const LIST_OF_CATEGORIES = `${prefix}list-of-beaches/categories/swiss/` //check
export const LIST_OF_CODES = `${prefix}mlw-codes/list/` //check query material and source
export const WATER_BODY_CODE_TOTAlS = `${prefix}code-totals/water-bodies/swiss/` //check
export const LATEST_DAILY_TOTALS = `${prefix}surveys/daily-totals/code-totals/latest-daily-totals/swiss/`
export const DIMS_DATA = `${prefix}surveys/dim-data/dim-data-list/` //check query locations and date
// post form data surveys
export const SURVEY_TO_SERVER = `${prefix}surveys/` //check
export const DIMS_TO_SERVER =  `${prefix}surveys/dim-data/dim-data-create/`//check

// articles and references
export const ARTICLE_LIST = `${prefix}article-view/`//check
export const ARTICLE_SEARCH_TERMS =  `${prefix}article-search/`//check
export const ARTICLE_UPDATE = `${prefix}article-update/`//check
export const CREATE_ARTICLE = `${prefix}create-article/`//check
export const CREATE_COMMENT =  `${prefix}article-comment/create/`//check
export const COMMENT_LIST = `${prefix}article-comment/`//check
//links
export const EU_RIVERINE = "https://mcc.jrc.ec.europa.eu/documents/201703034325.pdf"
export const EU_BEACH_MONITOR = "https://mcc.jrc.ec.europa.eu/documents/201702074014.pdf"
//Repos
export const PROBABILITY = "https://github.com/hammerdirt-analyst/probability-2021"
export const ABUNDANCE = "https://github.com/hammerdirt-analyst/abundance-2021"
export const TIME_SERIES = "https://github.com/hammerdirt-analyst/timeseries-2021"
export const API = "hhttps://github.com/hammerdirt-dev/hammerdirt_api"
export const APP = "https://github.com/hammerdirt-dev/plages_prop"
//API keys
export const GOOGLE_API_CAL = "AIzaSyCTnq_SnPwI3ucmpUSwQgiOEYoEiMp40Ys"
export const GOOGLE_CALENDAR_ID = "hammerdirt.ch_86ucmubkkssadhr8974kau3e0g@group.calendar.google.com"
export const CALENDAR_PATH = `https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events/`
export const CALENDAR_URL_CALL ='https://www.googleapis.com/calendar/v3/calendars/hammerdirt.ch_86ucmubkkssadhr8974kau3e0g@group.calendar.google.com/events/?key=AIzaSyCTnq_SnPwI3ucmpUSwQgiOEYoEiMp40Ys'
export const PUBLIC_CALENDAR = "https://calendar.google.com/calendar/embed?src=hammerdirt.ch_86ucmubkkssadhr8974kau3e0g%40group.calendar.google.com&ctz=Europe%2FZurich"
