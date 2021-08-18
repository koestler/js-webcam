import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = (props) => {
	return	<header class={style.header}>
		<h1>{props.title}</h1>
		<nav>
			{ props.views.map(view => <Link key={view.name} activeClassName={style.active} href={`/${view.name}`}>{view.title}</Link>) }
		</nav>
	</header>
}

export default Header;
