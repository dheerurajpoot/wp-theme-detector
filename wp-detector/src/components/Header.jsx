import { Link } from "react-router-dom";
import React from "react";

export default function Header() {
	return (
		<header className='bg-white shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center py-4'>
					<div className='flex items-center'>
						<Link to='/' className='flex-shrink-0'>
							<h3 className='text-2xl font-semibold'>
								WPThemeDetector
							</h3>
						</Link>
					</div>
					<nav className='hidden md:flex space-x-10'>
						<Link
							to='/'
							className='text-base font-medium text-gray-500 hover:text-gray-900'>
							Home
						</Link>
						<Link
							to='/'
							className='text-base font-medium text-gray-500 hover:text-gray-900'>
							Detector
						</Link>
						<Link
							to='/'
							className='text-base font-medium text-gray-500 hover:text-gray-900'>
							Themes
						</Link>
						<Link
							to='/'
							className='text-base font-medium text-gray-500 hover:text-gray-900'>
							Plugins
						</Link>
						<Link
							to='/about'
							className='text-base font-medium text-gray-500 hover:text-gray-900'>
							About
						</Link>
					</nav>
					<div className='md:hidden'>
						<button
							type='button'
							className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
							aria-expanded='false'>
							<span className='sr-only'>Open main menu</span>
							<svg
								className='h-6 w-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}
