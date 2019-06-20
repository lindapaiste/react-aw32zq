import React from 'react';

export default () => {
  return(
	<header id="header" className="sticky inline" align="center">

		<a href="#main-menu" className="menu-toggle" role="button" id="main-menu-toggle" aria-expanded="false" aria-controls="main-menu" aria-label="Open main menu">
			<span className="screen-reader-text">Open main menu</span>
			<i className="fa fa-bars fa-fw" aria-hidden="true"></i>
		</a>

		<a href="https://stealherstyle.net/" className="header-title">
			<img srcset="https://stealherstyle.net/wp-content/uploads/2018/10/steal-her-style-92.png 92w,
            https://stealherstyle.net/wp-content/uploads/2018/10/steal-her-style-200.png 200w"
			sizes="(max-width: 767px) 92px,
            200px"
			src="https://stealherstyle.net/wp-content/uploads/2018/10/steal-her-style-200.png"
			alt="Steal Her Style" />
		</a>
		
		<a href="#search-overlay" className="search-toggle" role="button" id="search-overlay-toggle" aria-expanded="false" aria-controls="search-overlay" aria-label="Open search form">
			<span className="screen-reader-text">Open search form</span>
			<i className="fa fa-search fa-fw" aria-hidden="true"></i>
		</a>

		<nav id="main-menu" className="main-menu" role="navigation" aria-expanded="false" aria-label="Main menu">
		<ul>
			<li className="close-container"><a href="#main-menu-toggle" className="menu-close" role="button" id="main-menu-close" aria-expanded="false" aria-controls="main-menu" aria-label="Close main menu">
				<span className="screen-reader-text">Close main menu</span>
				<i className="fas fa-times fa-fw" aria-hidden="true"></i>
			</a></li>
			<li><a href="https://stealherstyle.net/">Outfits</a></li>
			<li><a href="https://stealherstyle.net/tattoo/">Tattoos</a></li>
			<li><a href="https://stealherstyle.net/hairstyles/">Hair</a></li>
			<li><a href="https://stealherstyle.net/makeup/">Makeup</a></li>
			<li><a href="https://stealherstyle.net/nails/">Nails</a></li>
			<li><a href="https://stealherstyle.net/piercings/">Piercings</a></li>
			<li><a href="#search-overlay" role="button" id="inline-search-toggle">
				<form role="search" method="get" id="inline-search-form" action="/">
					<input type="search" id="inline-search-field" placeholder="Search Celebrities" autoComplete="off" name="s" />
					<button type="submit" id="inline-search-submit"><i className="fa fa-search fa-fw"></i></button>
				</form>
			</a></li>
		</ul>
		</nav>
		<a href="#main-menu-toggle" id="backdrop" className="backdrop" tabIndex="-1" aria-hidden="true" hidden></a>
		
		
		<div id="search-overlay" className="search-overlay" aria-expanded="false" aria-label="Search form">
			<a href="#search-overlay-toggle" className="search-close" role="button" id="search-overlay-close" aria-expanded="false" aria-controls="search-overlay" aria-label="Close search form">
				<span className="screen-reader-text">Close search form</span>
				<i className="fas fa-times fa-fw" aria-hidden="true"></i>
			</a>
		
		<form role="search" method="get" id="overlay-search-form" action="/">
			<div className="search-form">
				<legend className="screen-reader-text">Search Celebrities</legend>
				<label for="overlay-search-field" className="screen-reader-text">Type a Celebrity Name</label>
				<input type="search" id="overlay-search-field" placeholder="Search Celebrity Names" autoComplete="off" name="s" />
				<label for="search-submit" className="screen-reader-text">Search</label>
				<button type="submit" id="search-submit">
					<i className="fa fa-search fa-fw"></i>
				</button>
			</div>
			<ul id="suggestions" className="suggestions">
				<li><a href="https://stealherstyle.net/ariana-grande/">Ariana Grande</a></li>
				<li><a href="https://stealherstyle.net/kylie-jenner/">Kylie Jenner</a></li>
				<li><a href="https://stealherstyle.net/kendall-jenner/">Kendall Jenner</a></li>
				<li><a href="https://stealherstyle.net/selena-gomez/">Selena Gomez</a></li>
				<li><a href="https://stealherstyle.net/bella-hadid/">Bella Hadid</a></li>
				<li><a href="https://stealherstyle.net/gigi-hadid/">Gigi Hadid</a></li>
				<li><a href="https://stealherstyle.net/maddie-ziegler/">Maddie Ziegler</a></li>
				<li><a href="https://stealherstyle.net/hailey-baldwin/">Hailey Baldwin</a></li>
				<li><a href="https://stealherstyle.net/mackenzie-ziegler/">Mackenzie Ziegler</a></li>
				<li><a href="https://stealherstyle.net/rihanna/">Rihanna</a></li>
			</ul>
        </form>
		</div>
	
	</header>
  )
};