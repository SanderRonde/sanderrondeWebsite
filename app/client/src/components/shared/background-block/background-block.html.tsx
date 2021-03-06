import { BackgroundBlock } from './background-block';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

export const BackgroundBlockHTML = new TemplateFn<BackgroundBlock>(
	function (html) {
		return (
			<section id="block" class="transition">
				<slot id="slot"></slot>
			</section>
		);
	},
	CHANGE_TYPE.NEVER,
	render
);
