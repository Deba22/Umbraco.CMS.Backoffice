import { UmbTiptapToolbarDropdownBaseElement, type TiptapDropdownItem } from '../../components/index.js';
import { customElement, state } from '@umbraco-cms/backoffice/external/lit';

const elementName = 'umb-tiptap-style-select-toolbar-element';

@customElement(elementName)
export class UmbTiptapStyleSelectToolbarElement extends UmbTiptapToolbarDropdownBaseElement {
	protected override label = 'Style select';

	@state()
	protected override get items(): TiptapDropdownItem[] {
		throw new Error('Method not implemented.');
	}

	static override readonly styles = UmbTiptapToolbarDropdownBaseElement.styles;
}

export { UmbTiptapStyleSelectToolbarElement as element };

declare global {
	interface HTMLElementTagNameMap {
		[elementName]: UmbTiptapStyleSelectToolbarElement;
	}
}
