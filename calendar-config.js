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
    // The url, this should be the endpoint you are attempting to pull data from
    url,

    method: "get",

    headers: {
      "Content-Type": "application/json",
    },

    // Name of the data to be downloaded.  Will show in graphQL or be saved to a file
    // using this name. i.e. posts.json
    name: `CalendarEvents`,

    // Nested level of entities in response object, example: `data.posts`
    entityLevel: `items`,

    // Define schemaType to normalize blank values
    // example:
    // const postType = {
    //   id: 1,
    //   name: 'String',
    //   published: true,
    //   object: {a: 1, b: '2', c: false},
    //   array: [{a: 1, b: '2', c: false}]
    // }
    // schemaType: postType,

    // Request parameters
    // Only available from version 2.1.0
    params: calendarParams,

    // Optionally include some output when building
    // Default is false
    verboseOutput: true, // For debugging purposes
  },
}
