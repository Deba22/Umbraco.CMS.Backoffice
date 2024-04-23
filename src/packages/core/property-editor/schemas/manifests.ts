import { manifest as blockGrid } from './Umbraco.BlockGrid.js';
import { manifest as blockList } from './Umbraco.BlockList.js';
import { manifest as iconPicker } from './Umbraco.IconPicker.js';
import { manifest as imageCropper } from './Umbraco.ImageCropper.js';
import { manifest as label } from './Umbraco.Label.js';
import { manifest as listView } from './Umbraco.ListView.js';
import { manifest as markdownEditor } from './Umbraco.MarkdownEditor.js';
import { manifest as mediaPicker } from './Umbraco.MediaPicker.js';
import { manifest as memberGroupPicker } from './Umbraco.MemberGroupPicker.js';
import { manifest as memberPicker } from './Umbraco.MemberPicker.js';
import { manifest as multiNodeTreePicker } from './Umbraco.MultiNodeTreePicker.js';
import { manifest as multiUrlPicker } from './Umbraco.MultiUrlPicker.js';
import { manifest as radioButtonList } from './Umbraco.RadioButtonList.js';
import { manifest as slider } from './Umbraco.Slider.js';
import { manifest as tags } from './Umbraco.Tags.js';
import { manifest as richText } from './Umbraco.RichText.js';
import { manifest as trueFalse } from './Umbraco.TrueFalse.js';
import { manifest as uploadField } from './Umbraco.UploadField.js';
import { manifest as userPicker } from './Umbraco.UserPicker.js';

import type { ManifestPropertyEditorSchema } from '@umbraco-cms/backoffice/extension-registry';

export const manifests: Array<ManifestPropertyEditorSchema> = [
	blockGrid,
	blockList,
	iconPicker,
	imageCropper,
	label,
	listView,
	markdownEditor,
	mediaPicker,
	memberGroupPicker,
	memberPicker,
	multiNodeTreePicker,
	multiUrlPicker,
	radioButtonList,
	slider,
	tags,
	richText,
	trueFalse,
	uploadField,
	userPicker,
];
