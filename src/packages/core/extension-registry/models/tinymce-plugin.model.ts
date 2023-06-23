import { ManifestClass } from '@umbraco-cms/backoffice/extension-api';

export interface MetaTinyMcePlugin {
	/**
	 * If the plugin adds toolbar buttons, this property can be used to configure the buttons.
	 * This configuration will be used on the Rich Text Editor configuration page.
	 */
	toolbar?: Array<{
		/**
		 * The alias of the toolbar button that will be configured in the TinyMCE editor.
		 *
		 * @see [TinyMCE Toolbar](https://www.tiny.cloud/docs/tinymce/6/toolbar-configuration-options/) for more information.
		 */
		alias: string;

		/**
		 * The label of the option shown on the Rich Text Editor configuration page.
		 */
		label: string;

		/**
		 * The icon shown on the Rich Text Editor configuration page. The icon has to be registered in the icon provider.
		 * @optional
		 */
		icon?: string;
	}>;
}

/**
 * The manifest for a TinyMCE plugin.
 * The plugin will be loaded into the TinyMCE editor.
 * A plugin can add things like buttons, menu items, context menu items, etc. through the TinyMCE API.
 * A plugin can also add custom commands to the editor.
 * A plugin can also modify the behavior of the editor.
 *
 * @see [TinyMCE Plugin](https://www.tiny.cloud/docs/tinymce/6/apis/tinymce.plugin/) for more information.
 */
export interface ManifestTinyMcePlugin extends ManifestClass {
	type: 'tinyMcePlugin';
	meta?: MetaTinyMcePlugin;
}
