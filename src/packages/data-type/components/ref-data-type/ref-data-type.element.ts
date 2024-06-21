import { UmbDataTypeDetailRepository } from '../../repository/detail/data-type-detail.repository.js';
import { UUIIconRequestEvent, UUIRefNodeElement } from '@umbraco-cms/backoffice/external/uui';
import { html, customElement, property, state, css } from '@umbraco-cms/backoffice/external/lit';
import { UmbElementMixin } from '@umbraco-cms/backoffice/element-api';
import { umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';

/**
 *  @element umb-ref-data-type
 *  @description - Component for displaying a reference to a Data Type
 *  @extends UUIRefNodeElement
 */
@customElement('umb-ref-data-type')
export class UmbRefDataTypeElement extends UmbElementMixin(UUIRefNodeElement) {
	@state()
	protected override fallbackIcon =
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M255.981 440.734c-4.422 0-8.895-.159-13.293-.471l1.682-23.62c15.395 1.095 31.076-.014 46.053-3.277l5.039 23.137a185.943 185.943 0 0 1-39.481 4.231zm-43.253-5.094a183.61 183.61 0 0 1-49.174-19.657l11.864-20.49a159.927 159.927 0 0 0 42.833 17.123l-5.523 23.024zm111.734-8.02l-8.781-21.991a160.553 160.553 0 0 0 39.949-23.097l14.666 18.593a184.376 184.376 0 0 1-45.834 26.495zm-185.815-28.926a185.575 185.575 0 0 1-35.652-39.114l19.596-13.293a161.956 161.956 0 0 0 31.105 34.125l-15.049 18.282zm253.834-18.216l-17.492-15.96a161.321 161.321 0 0 0 25.924-38.192l21.297 10.353a184.986 184.986 0 0 1-29.729 43.799zM88.097 333.183a183.381 183.381 0 0 1-14.977-50.791l23.438-3.355a159.869 159.869 0 0 0 13.047 44.243l-21.508 9.903zm345.082-24.798l-22.711-6.705c4.355-14.761 6.566-30.131 6.566-45.679h23.678c0 17.818-2.533 35.444-7.533 52.384zM94.96 252.634l-23.672-.483c.365-17.809 3.266-35.378 8.625-52.224l22.566 7.181c-4.671 14.677-7.203 29.996-7.519 45.526zm320.881-16.346a159.854 159.854 0 0 0-12.115-44.503l21.713-9.45a183.696 183.696 0 0 1 13.908 51.088l-23.506 2.865zM112.546 182.67l-21.072-10.798a184.915 184.915 0 0 1 30.633-43.168l17.154 16.319a161.599 161.599 0 0 0-26.715 37.647zm278.68-14.155a161.801 161.801 0 0 0-30.389-34.763l15.426-17.966a185.512 185.512 0 0 1 34.832 39.846l-19.869 12.883zm-232.239-41.101l-14.273-18.894a184.318 184.318 0 0 1 46.375-25.533l8.322 22.169a160.705 160.705 0 0 0-40.424 22.258zm180.444-9.19a160.053 160.053 0 0 0-42.466-18.02l6.009-22.903a183.633 183.633 0 0 1 48.748 20.684l-12.291 20.239zM224.825 97.956l-4.553-23.239a186.147 186.147 0 0 1 35.705-3.45h.004c5.711 0 11.473.266 17.129.786l-2.174 23.58c-15.306-1.414-31.072-.624-46.111 2.323z"/></svg>`;
	//icon-circle-dotted.svg

	@property({ type: String, attribute: 'data-type-id' })
	public get dataTypeId(): string | undefined {
		return undefined;
	}
	public set dataTypeId(value: string | undefined) {
		this.setDataTypeId(value);
	}

	async setDataTypeId(value: string | undefined) {
		if (value) {
			this.observe(
				(await this.repository.requestByUnique(value)).asObservable(),
				(dataType) => {
					if (dataType) {
						this.name = dataType.name ?? '';
						this.propertyEditorSchemaAlias = dataType.editorAlias ?? '';
						if (dataType.editorUiAlias ?? '' !== this.propertyEditorUiAlias) {
							this.propertyEditorUiAlias = dataType.editorUiAlias ?? '';
							this.#getIconFromUiAlias();
						}
					}
				},
				'dataType',
			);
		} else {
			this.removeUmbControllerByAlias('dataType');
		}
	}

	repository = new UmbDataTypeDetailRepository(this);

	/**
	 * Property Editor UI Alias
	 */
	@state()
	propertyEditorUiAlias = '';

	/**
	 * Property Editor Model Alias
	 */
	@state()
	propertyEditorSchemaAlias = '';

	async #getIconFromUiAlias() {
		if (!this.propertyEditorUiAlias) return;
		this.observe(
			umbExtensionsRegistry.byTypeAndAlias('propertyEditorUi', this.propertyEditorUiAlias),
			async (manifestPropertyEditorUi) => {
				const icon = manifestPropertyEditorUi?.meta.icon;
				/** [LI] We have the icon name now, but because this element extends from uui-ref-node, it wants the icon via the icon slot.
				 * From what I can see, this is not possible via this file, but this is the file that have the datatype data....
				 * Instead, overwriting the fallbackIcon property which requires a SVG... */
				if (icon) {
					this.#requestIconSVG(icon);
				}
			},
		),
			'_observeIcon';
	}

	#requestIconSVG(iconName: string) {
		if (iconName !== '' && iconName !== null) {
			const event = new UUIIconRequestEvent(UUIIconRequestEvent.ICON_REQUEST, {
				detail: { iconName: iconName },
			});
			this.dispatchEvent(event);
			if (event.icon !== null) {
				event.icon.then((iconSvg: string) => {
					this.fallbackIcon = iconSvg;
				});
			}
		}
	}

	protected override renderDetail() {
		const details: string[] = [];

		if (this.propertyEditorUiAlias !== '') {
			details.push(this.propertyEditorUiAlias);
		} else {
			details.push('Property Editor UI Missing');
		}
		/*
		// TODO: Revisit if its fine to leave this out:
		if (this.propertyEditorSchemaAlias !== '') {
			details.push(this.propertyEditorSchemaAlias);
		} else {
			details.push('Property Editor Model Missing');
		}
		*/

		if (this.detail !== '') {
			details.push(this.detail);
		}
		return html`<small id="detail">${details.join(' | ')}<slot name="detail"></slot></small>`;
	}

	static override styles = [
		...UUIRefNodeElement.styles,
		css`
			#detail {
				word-break: break-all;
			}
		`,
	];
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-ref-data-type': UmbRefDataTypeElement;
	}
}
