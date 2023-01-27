import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { IRoutingInfo } from 'router-slot';
import { first, map } from 'rxjs';
import { UmbSectionContext, UMB_SECTION_CONTEXT_TOKEN } from '../section.context';
import { createExtensionElement , umbExtensionsRegistry } from '@umbraco-cms/extensions-api';
import type {
	ManifestDashboard,
	ManifestDashboardCollection,
	ManifestWithMeta,
} from '@umbraco-cms/models';
import { UmbLitElement } from '@umbraco-cms/element';

@customElement('umb-section-dashboards')
export class UmbSectionDashboardsElement extends UmbLitElement {
	static styles = [
		UUITextStyles,
		css`
			:host {
				display: flex;
				flex-direction: column;
				height: 100%;
			}

			#tabs {
				background-color: var(--uui-color-surface);
				height: 70px;
			}

			#scroll-container {
				flex:1;
			}

			#router-slot {
				box-sizing: border-box;
				display: block;
				padding: var(--uui-size-5);
			}
		`,
	];

	@state()
	private _dashboards?: Array<ManifestDashboard | ManifestDashboardCollection>;

	@state()
	private _currentDashboardPathname = '';

	@state()
	private _routes: Array<any> = [];

	@state()
	private _currentSectionPathname = '';

	private _currentSectionAlias?: string;
	private _sectionContext?: UmbSectionContext;

	constructor() {
		super();

		this.consumeContext(UMB_SECTION_CONTEXT_TOKEN, (context) => {
			this._sectionContext = context;
			this._observeSectionContext();
		});
	}

	private _observeSectionContext() {
		if (!this._sectionContext) return;

		this.observe(this._sectionContext.alias.pipe(first()), (alias) => {
			this._currentSectionAlias = alias;
			this._observeDashboards();
		});
		this.observe(this._sectionContext.pathname.pipe(first()), (pathname) => {
			this._currentSectionPathname = pathname || '';
		});
	}

	private _observeDashboards() {
		if (!this._currentSectionAlias) return;

		this.observe(
			umbExtensionsRegistry
				?.extensionsOfTypes<ManifestDashboard | ManifestDashboardCollection>(['dashboard', 'dashboardCollection'])
				.pipe(
					map((extensions) =>
						extensions.filter((extension) =>
							(extension as ManifestWithMeta).meta.sections.includes(this._currentSectionAlias)
						)
					)
				),
			(dashboards) => {
				this._dashboards = dashboards || undefined;
				this._createRoutes();
			}
		);
	}

	private _createRoutes() {
		this._routes = [];

		if (this._dashboards) {
			this._routes = this._dashboards.map((dashboard) => {
				return {
					path: `${dashboard.meta.pathname}`,
					component: () => {
						if (dashboard.type === 'dashboardCollection') {
							return import('src/backoffice/shared/collection/dashboards/dashboard-collection.element');
						}
						return createExtensionElement(dashboard);
					},
					setup: (component: Promise<HTMLElement> | HTMLElement, info: IRoutingInfo) => {
						this._currentDashboardPathname = info.match.route.path;
						// When its using import, we get an element, when using createExtensionElement we get a Promise.
						// TODO: this is a bit hacky, can we do it in a more appropriate way
						(component as any).manifest = dashboard;
						if ((component as any).then) {
							(component as any).then((el: any) => (el.manifest = dashboard));
						}
					},
				};
			});

			this._routes.push({
				path: '**',
				redirectTo: this._dashboards?.[0]?.meta.pathname,
			});
		}
	}

	private _renderNavigation() {
		return html`
			${this._dashboards && this._dashboards.length > 1
				? html`
						<uui-tab-group id="tabs">
							${this._dashboards.map(
								(dashboard) => html`
									<uui-tab
										href="${`section/${this._currentSectionPathname}/dashboard/${dashboard.meta.pathname}`}"
										label=${dashboard.meta.label || dashboard.name}
										?active="${dashboard.meta.pathname === this._currentDashboardPathname}"></uui-tab>
								`
							)}
						</uui-tab-group>
				  `
				: nothing}
		`;
	}

	render() {
		return html`
			${this._renderNavigation()}
			<uui-scroll-container id="scroll-container">
				<router-slot id="router-slot" .routes="${this._routes}"></router-slot>
			</uui-scroll-container>
		`;
	}
}

export default UmbSectionDashboardsElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-section-dashboards': UmbSectionDashboardsElement;
	}
}
