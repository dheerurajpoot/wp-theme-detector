import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiPhone } from "react-icons/ci";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className='bg-gray-50'>
			<div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					<div className='space-y-8'>
						{/* <img
							src='/placeholder.svg?height=40&width=160'
							alt='WordPress Themes and Plugins Detector'
							width={160}
							height={40}
							className='h-10 w-auto'
						/> */}
						<Link to={"/"}>
							<h3 className='text-2xl font-semibold'>
								WPThemeDetector
							</h3>
						</Link>
						<p className='text-gray-500 text-base'>
							Discover the building blocks of any WordPress site
							with our powerful detection tool. We help you
							identify themes and plugins used on WordPress
							websites.
						</p>
						<div className='flex space-x-6'>
							<a
								href='#'
								className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Facebook</span>
								<FaFacebookF className='h-6 w-6' />
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Twitter</span>
								<FaTwitter className='h-6 w-6' />
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Instagram</span>
								<FaInstagram className='h-6 w-6' />
							</a>
						</div>
					</div>
					<div>
						<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4'>
							Contact
						</h3>
						<ul className='space-y-4'>
							<li className='flex items-center'>
								<CiPhone className='flex-shrink-0 h-5 w-5 text-gray-400' />
								<span className='ml-3 text-base text-gray-500'>
									+1 555 123-4567
								</span>
							</li>
							<li className='flex items-center'>
								<IoMailOpenOutline className='flex-shrink-0 h-5 w-5 text-gray-400' />
								<a
									href='mailto:info@wpdetector.com'
									className='ml-3 text-base text-gray-500 hover:text-gray-900'>
									info@wpdetector.com
								</a>
							</li>
							<li className='flex items-start'>
								<FaMapMarkerAlt className='flex-shrink-0 h-5 w-5 text-gray-400 mt-1' />
								<span className='ml-3 text-base text-gray-500'>
									123 WordPress Lane
									<br />
									San Francisco, CA 94107
								</span>
							</li>
						</ul>
					</div>
					<div className='flex flex-col items-center'>
						<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4'>
							Important Links
						</h3>
						<ul className='space-y-4'>
							<li>
								<Link
									to='/'
									className='text-base text-gray-500 hover:text-gray-900'>
									Home
								</Link>
							</li>
							<li>
								<Link
									to='/'
									className='text-base text-gray-500 hover:text-gray-900'>
									Detector
								</Link>
							</li>
							<li>
								<Link
									to='/'
									className='text-base text-gray-500 hover:text-gray-900'>
									Themes
								</Link>
							</li>
							<li>
								<Link
									to='/'
									className='text-base text-gray-500 hover:text-gray-900'>
									Plugins
								</Link>
							</li>
							<li>
								<Link
									to='/'
									className='text-base text-gray-500 hover:text-gray-900'>
									Blog
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className='mt-12 border-t border-gray-200 pt-8'>
					<p className='text-base text-gray-400 text-center'>
						&copy; {new Date().getFullYear()} WordPress Themes and
						Plugins Detector. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
