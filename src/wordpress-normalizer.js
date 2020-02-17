/* eslint-env node */
/* eslint-disable import/no-commonjs */

const sanitizeHtml = require('sanitize-html');

const wordpressNormalizer = ({ entities }) => {
	return entities.map((entity) => {
		let { content } = entity;

		content = sanitizeHtml(content, {
			transformTags: {
				a: (tagName, attribs) => {
					const rewritten = attribs.href.replace(/http[s]*:\/\/[www.]*dsaneworleans\.org[/]?/, '/');
					return {
						tagName: 'a',
						attribs: {
							href: rewritten,
						},
					};
				},
			},
		});

		return { ...entity, content };
	});
};

exports.default = wordpressNormalizer;
