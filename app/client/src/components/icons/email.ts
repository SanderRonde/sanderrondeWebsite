import { svg } from 'lit-html';

export const Email = ({
	height = 25,
	width = 25,
	id,
}: {
	width?: number;
	height?: number;
	id: string;
}) =>
	svg`
		<svg 
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 477.867 477.867"
			width="${width}px" 
			height="${height}px" 
			id=${id}
		>
			<g>
				<g>
					<path d="M460.8,68.267H17.067l221.867,182.75L463.309,68.779C462.488,68.539,461.649,68.368,460.8,68.267z"/>
				</g>
			</g>
			<g>
				<g>
					<path d="M249.702,286.31c-6.288,5.149-15.335,5.149-21.623,0L0,98.406v294.127c0,9.426,7.641,17.067,17.067,17.067H460.8
						c9.426,0,17.067-7.641,17.067-17.067V100.932L249.702,286.31z"/>
				</g>
			</g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
			<g></g>
		</svg>
	`;

export default Email;