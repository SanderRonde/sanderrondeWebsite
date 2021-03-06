import { TOOLTIP_DIRECTION } from '../../../shared/tool-tip/tool-tip.js';
import { BubbleSelectHTML } from '../bubble-select/bubble-select.html.js';
import { LANGUAGE, LANGUAGES } from '../../../../../../i18n/i18n.js';
import { I18NKeys } from '../../../../../../i18n/i18n-keys';
import { render, SVGTemplateResult } from 'lit-html';
import { ToolTip } from '../../../shared/index.js';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import NL from '../../../icons/languages/nl.js';
import EN from '../../../icons/languages/en.js';
import { LangSelect } from './lang-select.js';

const LANG_ICONS: {
	[LANG in LANGUAGE]: (config: {
		width?: number;
		height?: number;
		id?: string;
	}) => SVGTemplateResult;
} = {
	nl: NL,
	en: EN,
};

export const LangSelectHTML = new TemplateFn<LangSelect>(
	function (html) {
		return BubbleSelectHTML<LANGUAGE>(html, this, LANGUAGES, (langName) => {
			const LangSVG = LANG_ICONS[langName];
			return (
				<ToolTip
					class="tooltip"
					direction={TOOLTIP_DIRECTION.LEFT}
					message={this.__(I18NKeys.shared.langSelect.changeLang, {
						lang: this.__prom(
							`${I18NKeys.shared.langSelect._}${langName}` as any
						),
					})}
					data-lang={langName}
				>
					<div class="lang-background" title={langName}>
						<LangSVG id={langName} width={41} height={41} />
					</div>
				</ToolTip>
			);
		});
	},
	CHANGE_TYPE.NEVER,
	render
);
