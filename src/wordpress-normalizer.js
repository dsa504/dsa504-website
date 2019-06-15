/* eslint-env node */
const html = require("remark-html")
const remark = require("remark")
const relativeLinks = require("remark-relative-links")

const wordpressNormalizer = ({ entities }) => {
  return entities.map(entity => {
    let { content } = entity

    remark()
      .use(relativeLinks, {
        domainRegex: /http[s]*:\/\/[www.]*dsaneworleans\.org[/]?/,
      })
      .use(html)
      .process(content, (err, file) => {
        if (err) throw err
        content = String(file)
      })

    return { ...entity, content }
  })
}

exports.default = wordpressNormalizer
