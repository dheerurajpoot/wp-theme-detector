import React, { useState } from "react";
import { Download, Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import axios from "axios";

export default function Home() {
	const [url, setUrl] = useState("");
	const [data, setData] = useState(null);
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
			const response = await axios.get(
				`https://wp-theme-detector-api.onrender.com/detect`,
				{
					params: { url },
				}
			);
			setData(response.data); // Set results from the backend
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
		<div className='min-h-full bg-gradient-to-b from-blue-100 to-white'>
			<div className='container mx-auto p-4'>
				<header className='text-center py-12'>
					<h1 className='text-4xl font-bold mb-4 text-blue-800'>
						WordPress Theme and Plugin Detector
					</h1>
					<p className='text-xl text-gray-600 mb-8'>
						Discover the themes and plugins powering any WordPress
						site
					</p>
					<form onSubmit={handleSubmit} className='max-w-2xl mx-auto'>
						<div className='flex gap-2'>
							<Input
								type='url'
								placeholder='Enter WordPress site URL'
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								required
								className='flex-grow text-lg py-6'
							/>
							<Button
								type='submit'
								size='lg'
								className='bg-blue-600 hover:bg-blue-700'>
								<Search className='mr-2 h-5 w-5' />
								Detect
							</Button>
						</div>
					</form>
					{error && <p className='text-red-500 mt-4'>{error}</p>}
				</header>

				{loading && <p className='text-center'>Loading...</p>}

				{data && (
					<div className='mt-12'>
						<Tabs defaultValue='theme' className='w-full'>
							<TabsList className='grid w-full grid-cols-2'>
								<TabsTrigger value='theme'>Theme</TabsTrigger>
								<TabsTrigger value='plugins'>
									Plugins
								</TabsTrigger>
							</TabsList>

							{/* Theme Tab */}
							<TabsContent value='theme'>
								<Card>
									<CardHeader>
										<CardTitle>{data.theme.name}</CardTitle>
										<CardDescription>
											Theme Information
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className='flex flex-col md:flex-row gap-6'>
											<div className='flex-shrink-0'>
												<img
													src={data.theme.thumbnail}
													alt={`${data.theme.name} thumbnail`}
													width={400}
													height={300}
													className='rounded-lg shadow-lg'
												/>
											</div>
											<div className='flex-grow'>
												<dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
													<div>
														<dt className='font-medium text-gray-500'>
															Description
														</dt>
														<dd className='mt-1 text-gray-900'>
															{
																data.theme
																	.description
															}
														</dd>
													</div>
													<div>
														<dt className='font-medium text-gray-500'>
															Version
														</dt>
														<dd className='mt-1 text-gray-900'>
															{data.theme.version}
														</dd>
													</div>
													<div>
														<dt className='font-medium text-gray-500'>
															License
														</dt>
														<dd className='mt-1 text-gray-900'>
															{data.theme.license}
														</dd>
													</div>
													<div>
														<dt className='font-medium text-gray-500'>
															Provider
														</dt>
														<dd className='mt-1 text-gray-900'>
															{
																data.theme
																	.provider
															}
														</dd>
													</div>
												</dl>
											</div>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							{/* Plugins Tab */}
							<TabsContent value='plugins'>
								<Card>
									<CardHeader>
										<CardTitle>Detected Plugins</CardTitle>
										<CardDescription>
											{Array.isArray(data.plugins)
												? `Found ${data.plugins.length} plugins`
												: "No plugins detected."}
										</CardDescription>
									</CardHeader>
									<CardContent>
										{Array.isArray(data.plugins) &&
										data.plugins.length > 0 ? (
											data.plugins.map(
												(plugin, index) => (
													<div
														key={index}
														className={`mb-8 ${
															index !==
															data.plugins
																.length -
																1
																? "border-b pb-8"
																: ""
														}`}>
														<div className='flex flex-col md:flex-row gap-6'>
															<div className='flex-shrink-0'>
																<img
																	src={
																		plugin?.thumbnail ||
																		"./notfound.png"
																	}
																	alt={`${plugin?.name} thumbnail`}
																	width={100}
																	height={100}
																	className='rounded-md shadow'
																/>
															</div>
															<div className='flex-grow'>
																<h3 className='font-semibold text-xl mb-2'>
																	{
																		plugin.name
																	}
																</h3>
																<dl className='grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4'>
																	<div>
																		<dt className='font-medium text-gray-500'>
																			Description
																		</dt>
																		<dd className='mt-1 text-gray-900'>
																			{
																				plugin?.description
																			}
																		</dd>
																	</div>
																	<div>
																		<dt className='font-medium text-gray-500'>
																			Version
																		</dt>
																		<dd className='mt-1 text-gray-900'>
																			{
																				plugin?.version
																			}
																		</dd>
																	</div>
																	<div>
																		<dt className='font-medium text-gray-500'>
																			License
																		</dt>
																		<dd className='mt-1 text-gray-900'>
																			{
																				plugin?.license
																			}
																		</dd>
																	</div>
																	<div>
																		<dt className='font-medium text-gray-500'>
																			Provider
																		</dt>
																		<dd className='mt-1 text-gray-900'>
																			{
																				plugin.provider
																			}
																		</dd>
																	</div>
																</dl>
																<Button
																	variant='outline'
																	size='sm'
																	asChild>
																	<a
																		href={
																			plugin.downloadUrl
																		}
																		target='_blank'
																		rel='noopener noreferrer'>
																		<Download className='mr-2 h-4 w-4' />
																		Download
																	</a>
																</Button>
															</div>
														</div>
													</div>
												)
											)
										) : (
											<p className='text-gray-500'>
												No plugins found.
											</p>
										)}
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				)}
			</div>
		</div>
	);
}
