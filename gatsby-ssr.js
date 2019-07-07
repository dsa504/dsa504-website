/* eslint-env es6, node */
/* eslint-disable import/no-commonjs */

const React = require("react");
const { JssProvider, SheetsRegistry, ThemeProvider } = require("react-jss");

/**
 * Keep track of SheetRegistry for each page
 */
const sheetsRegistryManager = new Map();

// eslint-disable-next-line react/prop-types,react/display-name
exports.wrapRootElement = ({ element, pathname }, { theme = {} }) => {
	const sheets = new SheetsRegistry();
	sheetsRegistryManager.set(pathname, sheets);

	return (
		<JssProvider registry={sheets}>
			<ThemeProvider theme={theme}>{element}</ThemeProvider>
		</JssProvider>
	);
};

exports.onRenderBody = ({ setHeadComponents, pathname }) => {
	const sheets = sheetsRegistryManager.get(pathname);
	if (sheets) {
		setHeadComponents([
			<style
				type="text/css"
				id="server-side-jss"
				key="server-side-jss"
				dangerouslySetInnerHTML={{ __html: sheets.toString() }}
			/>
		]);
		sheetsRegistryManager.delete(pathname);
	}
};

// replace inline css/scss with links
exports.onPreRenderHTML = ({ getHeadComponents }) => {
	if (process.env.NODE_ENV !== "production") return;

	let hc = getHeadComponents();
	hc.forEach(el => {
		if (el.type === "style" && el.props && el.props["data-href"]) {
			el.type = "link";
			el.props["href"] = el.props["data-href"];
			el.props["rel"] = "stylesheet";
			el.props["type"] = "text/css";

			delete el.props["data-href"];
			delete el.props["dangerouslySetInnerHTML"];
		}
	});
};
