import { html } from '../../../shared/util.js';

const _icons = html`
	<link
		rel="apple-touch-icon"
		sizes="57x57"
		href="/images/apple-icon-57x57.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="60x60"
		href="/images/apple-icon-60x60.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="72x72"
		href="/images/apple-icon-72x72.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="76x76"
		href="/images/apple-icon-76x76.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="114x114"
		href="/images/apple-icon-114x114.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="120x120"
		href="/images/apple-icon-120x120.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="144x144"
		href="/images/apple-icon-144x144.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="152x152"
		href="/images/apple-icon-152x152.png"
	/>
	<link
		rel="apple-touch-icon"
		sizes="180x180"
		href="/images/apple-icon-180x180.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="192x192"
		href="/images/android-icon-192x192.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="32x32"
		href="/images/favicon-32x32.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="96x96"
		href="/images/favicon-96x96.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="16x16"
		href="/images/favicon-16x16.png"
	/>
	<meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
	<meta name="theme-color" content="#ffffff" />
`;
export function icons() {
	return _icons;
}

const _head = html`
	<meta charset="utf-8" />
	<meta name="description" content="Sander Ronde" />
	${icons()}
	<link rel="manifest" href="/manifest.json" />
	<link rel="icon" href="/images/favicon.ico" type="images/x-icon" />
	<style>
		@font-face {
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 400;
			src: local('Roboto'), local('Roboto-Regular'),
				url('/fonts/Roboto-Regular.ttf');
		}
		@import url('https://fonts.googleapis.com/css?family=Roboto:400');

		span[data-type='html'] {
			font-family: 'Roboto';
		}
	</style>
`;
export function head() {
	return _head;
}
