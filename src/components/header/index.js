import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css'
import {useState} from "preact/hooks";

const Header = (props) => {
	const [burgerActive, setBurgerActive] = useState(false)

	return	<header>
		<nav className="navbar is-link" role="navigation" aria-label="main navigation" onClick={() => setBurgerActive(!burgerActive)} >
			<div className="navbar-brand">
				<div className="navbar-item">
					<h1 className={style.title}>{props.title}</h1>
				</div>
				<a role="button" className={`navbar-burger ${  burgerActive ? 'is-active':''}`} aria-label="menu" aria-expanded="false"
				   data-target="main-menu">
					<span aria-hidden="true" />
					<span aria-hidden="true" />
					<span aria-hidden="true" />
				</a>
			</div>

			<div id="main-menu" className={`navbar-menu ${  burgerActive ? 'is-active':''}`}>
				<div className="navbar-start">
					{ props.views.map(view =>
						<Link class="navbar-item" key={view.name} activeClassName={style.active} href={`/${view.name}`}>{view.title}</Link>
					)}
				</div>

				<div className="navbar-end">
					<div className="navbar-item">
						<div className="buttons">
							<a className="button is-light">
								Log in
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
}

export default Header;
