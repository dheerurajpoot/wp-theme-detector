import React, { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";

const Detector = () => {
	const [url, setUrl] = useState("");
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		// Validate URL
		if (!url.startsWith("http://") && !url.startsWith("https://")) {
			setError(
				"Please enter a valid URL starting with http:// or https://"
			);
			setLoading(false);
			return;
		}

		try {
			// Fetch detection data from the backend
			const response = await axios.get(`http://localhost:3001/detect`, {
				params: { url },
			});

			// Set results
			setResult(response.data);
		} catch (err) {
			setError(
				"Failed to fetch data. Please check the URL or the site settings."
			);
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					placeholder='Enter WordPress site URL'
				/>
				<Button type='submit' disabled={loading}>
					{loading ? "Loading..." : "Detect"}
				</Button>
			</form>

			{error && <p>{error}</p>}

			{result && (
				<div>
					<h3>Detected Information:</h3>
					<h4>Theme:</h4>
					<p>
						{result.theme
							? `Name: ${result.theme.name}, Author: ${result.theme.author}, Version: ${result.theme.version}`
							: "No theme detected"}
					</p>

					<h4>Plugins:</h4>
					{result.plugins && result.plugins.length > 0 ? (
						<ul>
							{result.plugins.map((plugin) => (
								<li key={plugin}>{plugin}</li>
							))}
						</ul>
					) : (
						<p>No plugins detected.</p>
					)}
				</div>
			)}
		</div>
	);
};

export default Detector;
