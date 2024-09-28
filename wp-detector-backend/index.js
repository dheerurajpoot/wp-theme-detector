const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

app.get("/detect", async (req, res) => {
	const { url } = req.query;

	if (!url || !url.startsWith("http")) {
		return res.status(400).send("Invalid URL");
	}

	try {
		// Fetch the homepage HTML
		const response = await axios.get(url);
		const html = response.data;
		const $ = cheerio.load(html);

		let theme = null;
		const pluginsSet = new Set();

		// Detect theme from the style.css link in wp-content/themes
		$('link[rel="stylesheet"]').each((i, el) => {
			const href = $(el).attr("href");
			if (href && href.includes("wp-content/themes/")) {
				const themeName = href
					.split("wp-content/themes/")[1]
					.split("/")[0];
				theme = {
					name: themeName,
					stylesheet: href,
				};
			}
		});

		// Fetch the theme information from the style.css file
		if (theme) {
			try {
				const themeStyleResponse = await axios.get(theme.stylesheet);
				const themeStyle = themeStyleResponse.data;

				// Extract additional information from the style.css
				const themeDetails = {
					name:
						/Theme Name:\s*(.*)/.exec(themeStyle)?.[1] ||
						theme.name,
					author: /Author:\s*(.*)/.exec(themeStyle)?.[1] || "Unknown",
					description:
						/Description:\s*(.*)/.exec(themeStyle)?.[1] ||
						"No description available",
					version:
						/Version:\s*(.*)/.exec(themeStyle)?.[1] || "Unknown",
					license:
						/License:\s*(.*)/.exec(themeStyle)?.[1] ||
						"No license available",
					provider:
						/Author URI:\s*(.*)/.exec(themeStyle)?.[1] ||
						"No provider information",
					thumbnail: `${url}/wp-content/themes/${theme.name}/screenshot.png`,
				};

				theme.details = themeDetails;
			} catch (err) {
				console.error("Failed to fetch theme details:", err);
			}
		}

		// Detect plugins from <script> tags or other identifiable locations
		$("script").each((i, elem) => {
			const scriptSrc = $(elem).attr("src");
			if (scriptSrc && scriptSrc.includes("wp-content/plugins/")) {
				const pluginName = scriptSrc
					.split("/wp-content/plugins/")[1]
					.split("/")[0];
				if (!pluginsSet.has(pluginName)) {
					pluginsSet.add(pluginName);
				}
			}
		});

		// Fetch additional plugin details from their files
		const plugins = await Promise.all(
			[...pluginsSet].map(async (pluginName) => {
				const pluginBaseUrl = `${url}/wp-content/plugins/${pluginName}/`;
				let pluginDetails = {
					name: pluginName,
					description: "A WordPress plugin",
					version: "Unknown",
					license: "Unknown",
					provider: "WordPress",
					thumbnail: "./notfound.png",
					downloadUrl: `https://wordpress.org/plugins/${pluginName}`,
				};

				try {
					// Try fetching the plugin's readme.txt or main plugin file
					const pluginReadmeResponse = await axios.get(
						`${pluginBaseUrl}readme.txt`
					);
					const readme = pluginReadmeResponse.data;
					pluginDetails.description =
						/Description:\s*(.*)/.exec(readme)?.[1] ||
						pluginDetails.description;
					pluginDetails.version =
						/Stable tag:\s*(.*)/.exec(readme)?.[1] ||
						pluginDetails.version;
					pluginDetails.license =
						/License:\s*(.*)/.exec(readme)?.[1] ||
						pluginDetails.license;
					pluginDetails.provider =
						/Author:\s*(.*)/.exec(readme)?.[1] ||
						pluginDetails.provider;
					pluginDetails.thumbnail = `${pluginBaseUrl}icon-128x128.png`;
				} catch (error) {
					// Handle missing readme or icon files gracefully
					console.error(
						`Failed to fetch details for ${pluginName}`,
						error
					);
				}

				return pluginDetails;
			})
		);

		// Respond with the detected theme and plugins
		res.json({
			theme: theme ? theme.details : "No theme detected",
			plugins: plugins.length > 0 ? plugins : "No plugins detected",
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Failed to fetch data from the WordPress site");
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
