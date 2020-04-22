import {
	TemplateResult,
	PropertyCommitter,
	EventPart,
	BooleanAttributePart,
	AttributeCommitter,
	NodePart,
	isDirective,
	noChange,
} from 'lit-html';
import { SanderRonde } from '../../components/index/sander-ronde/sander-ronde.js';
import { I18NGetMessage, LANGUAGE } from '../../../../i18n/i18n.js';
import { registerServiceworker, onIdle } from '../../shared/sw.js';
import { I18NReturner } from '../../shared/client-i18n.js';
import { THEME, themes } from '../../../../shared/theme';
import { I18NType } from '../../../../i18n/i18n-defs';
import { getCookie } from '../../shared/cookies.js';
import { WebComponent } from 'wc-lib';

import en from '../../../../i18n/locales/en.json.js';
import nl from '../../../../i18n/locales/nl.json.js';

function registerComponents() {
	WebComponent.initComplexTemplateProvider({
		TemplateResult,
		PropertyCommitter,
		EventPart,
		BooleanAttributePart,
		AttributeCommitter,
		NodePart,
		isDirective,
		noChange,
	});
	WebComponent.initI18N({
		urlFormat: '/i18n/locales/$LANG$.json',
		defaultLang: getCookie('lang', LANGUAGE.DEFAULT_LANG),
		returner: I18NReturner,
		getMessage: I18NGetMessage,
		langFiles: {
			en,
			nl,
		} as {
			[key in LANGUAGE]: I18NType;
		},
	});
	WebComponent.initTheme({
		theme: themes,
		defaultTheme: getCookie('theme', THEME.DEFAULT_THEME) as THEME,
	});

	SanderRonde.define();
}

registerComponents();

onIdle(() => {
	registerServiceworker();
});
