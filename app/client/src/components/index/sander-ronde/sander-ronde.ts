import { BackgroundBlock } from '../../shared/background-block/background-block.js';
import { MessageToast } from '../../shared/message-toast/message-toast.js';
import { IDMapType, ClassMapType } from './sander-ronde-querymap';
import { ConfigurableWebComponent, config } from 'wc-lib';
import { I18NType } from '../../../../../i18n/i18n-defs';
import { SanderRondeHTML } from './sander-ronde.html.js';
import { themes } from '../../../../../shared/theme.js';
import { SanderRondeCSS } from './sander-ronde.css.js';
import { LANGUAGE } from '../../../../../i18n/i18n';

@config({
	is: 'sander-ronde',
	html: SanderRondeHTML,
	css: SanderRondeCSS,
	dependencies: [MessageToast, BackgroundBlock],
})
export class SanderRonde extends ConfigurableWebComponent<{
	selectors: {
		IDS: IDMapType;
		CLASSES: ClassMapType;
	};
	langs: LANGUAGE;
	i18n: I18NType;
	themes: typeof themes;
}> {}
