import {
	getInternationalText,
	LifeTimeline,
	InternationalText,
	Skill,
} from '../../../../../config/me.js';
import {
	SkillRow,
	SKILL_ROW_ALIGNMENT,
} from '../../info-block/skill-row/skill-row.js';
import { TimeLineEntry, TIMELINE_DIRECTION } from './time-line-entry.js';
import { I18NKeys } from '../../../../../../../i18n/i18n-keys.js';
import { cutIntoGroups, untilAwait } from '../../../../../shared/util.js';
import { ElevatedCard } from '../../../../shared/';
import { TemplateFn, CHANGE_TYPE } from 'wc-lib';
import Pin from '../../../../icons/pin.js';
import { render } from 'lit-html';
import { IMAGE_DIMENSIONS } from './time-line-entry.css.js';

const SKILL_GROUP_SIZE =
	(typeof window === 'undefined' ? 1920 : window.innerWidth) < 500 ? 2 : 4;

export const TimeLineEntryHTML = new TemplateFn<TimeLineEntry>(
	function (html, { props }) {
		const lang = this.getLang();

		const renderTitleLink = (title: string) => {
			if (!('source' in props.entry)) return title;

			return (
				<a
					href={props.entry.source}
					rel="noopener"
					title={getInternationalText(props.entry.title, lang)}
					target="_blank"
					class="link light transition"
					{...{
						'@': {
							click: (e) => {
								e.stopPropagation();
								e.cancelBubble = true;
							},
						},
					}}
				>
					{title}
				</a>
			);
		};

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
											rel="noopener"
											title={`${name} website`}
											target="_blank"
											class="title-at-name link light transition"
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
			<ElevatedCard
				id="card"
				class="transition"
				level={1}
				{...{
					'@': {
						// When hovering/unhovering, temporarily
						// show
						mouseenter: this.cardEnter,
						mouseleave: this.cardLeave,
						focusin: this.cardEnter,
						focusout: this.cardLeave,

						// When touching/clicking, pin/unpin
						click: () => this.cardClick(true),
					},
				}}
			>
				<div id="content">
					<div id="icon-col">
						{props.entry.icon && props.entry.icon.length ? (
							props.entry.icon.map(({ alt, source }) => (
								<img
									class="icon"
									src={source}
									alt={alt}
									title={alt}
									width={IMAGE_DIMENSIONS}
									height={IMAGE_DIMENSIONS}
									{...{
										loading: 'lazy',
									}}
								/>
							))
						) : (
							<img
								class="icon"
								src="/timeline/github.webp"
								alt="github project icon"
								title="github project ico"
								width={IMAGE_DIMENSIONS}
								height={IMAGE_DIMENSIONS}
								{...{
									loading: 'lazy',
								}}
							/>
						)}
					</div>
					<div id="content-col">
						<div id="title-row">
							<div id="title" class="transition">
								{renderTitleLink(renderTitle())}
							</div>
							<span
								id="time"
								class="transition"
								{...{
									'@': {
										mouseenter: this.dateEnter,
										mouseleave: this.dateLeave,
										focusin: this.dateEnter,
										focusout: this.dateLeave,
									},
								}}
							>
								{untilAwait(
									this,
									(async () => {
										const fmt = new Intl.DateTimeFormat(
											this.getLang(),
											{
												year: 'numeric',
												month: 'short',
											}
										);
										if (LifeTimeline.isPProj(props.entry)) {
											return fmt.format(
												new Date(props.entry.start)
											);
										}

										if (
											typeof props.entry.end === 'number'
										) {
											return `${fmt.format(
												new Date(props.entry.start)
											)} - ${fmt.format(
												new Date(props.entry.end)
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
							</span>
						</div>
						<div id="overflow-container" class="transition">
							<Pin id="pin" width={15} height={15} />
							<div id="detail-row">
								{getInternationalText(
									props.entry.description,
									lang
								)}
							</div>
							<div id="skill-row">
								{cutIntoGroups(
									props.entry.skills,
									SKILL_GROUP_SIZE
								).map((group) => (
									<SkillRow
										group={{
											group: Skill.SKILL_GROUP.NONE,
											skills: group,
										}}
										align={
											props.direction ===
											TIMELINE_DIRECTION.LEFT
												? SKILL_ROW_ALIGNMENT.RIGHT
												: SKILL_ROW_ALIGNMENT.LEFT
										}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</ElevatedCard>
		);
	},
	CHANGE_TYPE.PROP | CHANGE_TYPE.LANG,
	render
);
