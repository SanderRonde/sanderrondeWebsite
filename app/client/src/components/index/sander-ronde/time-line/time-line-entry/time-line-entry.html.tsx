import {
	getInternationText as getInternationalText,
	LifeTimeline,
	InternationalText,
	Skill,
} from '../../../../../config/me.js';
import { I18NKeys } from '../../../../../../../i18n/i18n-keys.js';
import { SkillRow } from '../../info-block/skill-row/skill-row.js';
import { TimeLineEntry } from './time-line-entry.js';
import { ElevatedCard } from '../../../../shared/';
import { until } from 'lit-html/directives/until';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import { render } from 'lit-html';

export const TimeLineEntryHTML = new TemplateFn<TimeLineEntry>(
	function (html, props) {
		const lang = this.getLang();

		const renderTitle = () => {
			const lang = this.getLang();
			if (props.entry.type === LifeTimeline.TYPE.PERSONAL_PROJECT) {
				return getInternationalText(props.entry.title, lang);
			}
			const { at, atURL } = (() => {
				switch (props.entry.type) {
					case LifeTimeline.TYPE.EDUCATION:
					case LifeTimeline.TYPE.EDUCATION_PROJECT:
						return {
							at: props.entry.school,
							atURL: props.entry.schoolURL,
						};
					case LifeTimeline.TYPE.WORK:
						return {
							at: [props.entry.employer],
							atURL: [props.entry.employerURL],
						};
				}
			})();
			return (
				<span id="title-at">
					{getInternationalText(props.entry.title, lang)} {' - '}
					{(at as any[]).map(
						(atName: string | InternationalText, index, arr) => {
							const name = getInternationalText(atName, lang);
							const url = (atURL || [])[index];
							return (
								<span>
									{url ? (
										<a
											href={getInternationalText(
												url,
												lang
											)}
											target="_blank"
											class="title-at-name link light"
										>
											{name}
										</a>
									) : (
										<span class="title-at-name">
											{name}
										</span>
									)}
									{index !== arr.length - 1 && ', '}
								</span>
							);
						}
					)}
				</span>
			);
		};

		return (
			<ElevatedCard id="card" level={1}>
				<div id="content">
					<div id="icon-col">
						{props.entry.icon && props.entry.icon.length ? (
							props.entry.icon.map((icon) => (
								<img class="icon" src={icon} />
							))
						) : (
							<img class="icon" src="/timeline/github.png" />
						)}
					</div>
					<div id="content-col">
						<div id="title-row">
							<div id="title">{renderTitle()}</div>
							<div
								id="time"
								{...{
									'@': {
										mouseenter: this.dateEnter,
										mouseleave: this.dateLeave,
										focusin: this.dateEnter,
										focusout: this.dateLeave,
									},
								}}
							>
								{until(
									(async () => {
										const fmt = new Intl.DateTimeFormat(
											navigator.language,
											{
												year: 'numeric',
												month: 'short',
											}
										);
										if (LifeTimeline.isPProj(props.entry)) {
											return fmt.format(
												props.entry.start
											);
										}

										if (props.entry.end instanceof Date) {
											return `${fmt.format(
												props.entry.start
											)} - ${fmt.format(
												props.entry.end
											)}`;
										}
										return `${fmt.format(
											props.entry.start
										)} - ${await this.__prom(
											I18NKeys.index.timeline
												.timelineEntry.time.end.current
										)}`;
									})(),
									''
								)}
							</div>
						</div>
						<div id="detail-row">
							{getInternationalText(
								props.entry.description,
								lang
							)}
						</div>
						<div id="skill-row">
							<SkillRow
								group={{
									group: Skill.SKILL_GROUP.NONE,
									skills: props.entry.skills,
								}}
							/>
						</div>
					</div>
				</div>
			</ElevatedCard>
		);
	},
	CHANGE_TYPE.PROP,
	render
);