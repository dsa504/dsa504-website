/* eslint-env node */
const today = new Date()
const timeMin = today.toISOString()
const timeMax = new Date(today.setMonth(today.getMonth() + 3)).toISOString()

const url = `${process.env.GOOGLE_CALENDAR_BASE_URL}/${
  process.env.GOOGLE_CALENDAR_ID
  }/events`

const calendarParams = {
  key: process.env.GOOGLE_CALENDAR_API_KEY,
  orderBy: "startTime",
  singleEvents: true,
  timeMin,
  timeMax,
  timeZone: "America/Chicago",
}

module.exports = {
  resolve: "gatsby-source-apiserver",
  options: {
    url,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    name: `CalendarEvent`,
    entityLevel: `items`,
    // Define schemaType to normalize blank values
    // example:
    // const calendarEventType = {
    //   id: 1,
    //   summary: 'String',
    //   start { datetime: 'String' }
    // }
    // schemaType: calendarEventTypeType,
    params: calendarParams,
    verboseOutput: true,
  },
}
