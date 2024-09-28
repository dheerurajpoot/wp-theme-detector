import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Body from "./pages/Body";
import Home from "./pages/Home";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Body />}>
						<Route index element={<Home />} />
						<Route path='/about' element={<About />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
