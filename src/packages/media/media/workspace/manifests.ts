import { MEDIA_REPOSITORY_ALIAS } from '../repository/manifests.js';
import { UmbSaveWorkspaceAction } from '@umbraco-cms/backoffice/workspace';
import type {
	ManifestWorkspace,
	ManifestWorkspaceAction,
	ManifestWorkspaceEditorView,
	ManifestWorkspaceViewCollection,
} from '@umbraco-cms/backoffice/extension-registry';

const workspace: ManifestWorkspace = {
	type: 'workspace',
	alias: 'Umb.Workspace.Media',
	name: 'Media Workspace',
	loader: () => import('./media-workspace.element.js'),
	meta: {
		entityType: 'media',
	},
};

const workspaceEditorViews: Array<ManifestWorkspaceEditorView> = [
	{
		type: 'workspaceEditorView',
		alias: 'Umb.WorkspaceView.Media.Edit',
		name: 'Media Workspace Edit View',
		loader: () => import('./views/edit/media-edit-workspace-view.element.js'),
		weight: 200,
		meta: {
			label: 'Media',
			pathname: 'media',
			icon: 'umb:picture',
		},
		conditions: [
			{
				alias: 'Umb.Condition.WorkspaceAlias',
				match: workspace.alias,
			},
		],
	},
	{
		type: 'workspaceEditorView',
		alias: 'Umb.WorkspaceView.Media.Info',
		name: 'Media Workspace Info View',
		loader: () => import('./views/info/media-info-workspace-view.element.js'),
		weight: 100,
		meta: {
			label: 'Info',
			pathname: 'info',
			icon: 'info',
		},
		conditions: [
			{
				alias: 'Umb.Condition.WorkspaceAlias',
				match: workspace.alias,
			},
		],
	},
];

const workspaceViewCollections: Array<ManifestWorkspaceViewCollection> = [
	{
		type: 'workspaceViewCollection',
		alias: 'Umb.WorkspaceView.Media.Collection',
		name: 'Media Workspace Collection View',
		weight: 300,
		meta: {
			label: 'Media',
			pathname: 'collection',
			icon: 'umb:grid',
			entityType: 'media',
			repositoryAlias: MEDIA_REPOSITORY_ALIAS,
		},
		conditions: [
			{
				alias: 'Umb.Condition.WorkspaceAlias',
				match: workspace.alias,
			},
		],
	},
];

const workspaceActions: Array<ManifestWorkspaceAction> = [
	{
		type: 'workspaceAction',
		alias: 'Umb.WorkspaceAction.Media.Save',
		name: 'Save Media Workspace Action',
		meta: {
			label: 'Save',
			look: 'primary',
			color: 'positive',
			api: UmbSaveWorkspaceAction,
		},
		conditions: [
			{
				alias: 'Umb.Condition.WorkspaceAlias',
				match: workspace.alias,
			},
		],
	},
];

export const manifests = [workspace, ...workspaceEditorViews, ...workspaceViewCollections, ...workspaceActions];
