import { html, customElement } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';

const elementName = 'umb-document-blueprint-folder-workspace-editor';
@customElement(elementName)
export class UmbDocumentBlueprintFolderWorkspaceEditorElement extends UmbLitElement {
	override render() {
		return html`<umb-workspace-editor>
			<umb-workspace-name slot="header"></umb-workspace-name>
		</umb-workspace-editor>`;
	}

	static override styles = [UmbTextStyles];
}

export { UmbDocumentBlueprintFolderWorkspaceEditorElement as element };

declare global {
	interface HTMLElementTagNameMap {
		[elementName]: UmbDocumentBlueprintFolderWorkspaceEditorElement;
	}
}
