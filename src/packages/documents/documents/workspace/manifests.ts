import { UmbDocumentSaveAndPublishWorkspaceAction } from './actions/save-and-publish.action.js';
import { UmbDocumentSaveAndPreviewWorkspaceAction } from './actions/save-and-preview.action.js';
import { UmbSaveAndScheduleDocumentWorkspaceAction } from './actions/save-and-schedule.action.js';
import { UmbSaveWorkspaceAction } from '@umbraco-cms/backoffice/workspace';
import type {
	ManifestWorkspace,
	ManifestWorkspaceAction,
	ManifestWorkspaceEditorView,
	ManifestWorkspaceViewCollection,
} from '@umbraco-cms/backoffice/extension-registry';

const workspace: ManifestWorkspace = {
	type: 'workspace',
	alias: 'Umb.Workspace.Document',
	name: 'Document Workspace',
	loader: () => import('./document-workspace.element.js'),
	meta: {
		entityType: 'document',
	},
};

const workspaceEditorViews: Array<ManifestWorkspaceEditorView> = [
	{
		type: 'workspaceEditorView',
		alias: 'Umb.WorkspaceView.Document.Edit',
		name: 'Document Workspace Edit View',
		loader: () => import('./views/edit/document-workspace-view-edit.element.js'),
		weight: 200,
		meta: {
			label: 'Content',
			pathname: 'content',
			icon: 'document',
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
		alias: 'Umb.WorkspaceView.Document.Info',
		name: 'Document Workspace Info View',
		loader: () => import('./views/info/document-info-workspace-view.element.js'),
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
	/*
	// TODO: Reenable this:
	{
		type: 'workspaceViewCollection',
		alias: 'Umb.WorkspaceView.Document.Collection',
		name: 'Document Workspace Collection View',
		weight: 300,
		meta: {
			label: 'Documents',
			pathname: 'collection',
			icon: 'umb:grid',
			entityType: 'document',
			repositoryAlias: DOCUMENT_REPOSITORY_ALIAS,
		}
	},
	*/
];

const workspaceActions: Array<ManifestWorkspaceAction> = [
	{
		type: 'workspaceAction',
		alias: 'Umb.WorkspaceAction.Document.SaveAndPublish',
		name: 'Save And Publish Document Workspace Action',
		weight: 70,
		meta: {
			label: 'Save And Publish',
			look: 'primary',
			color: 'positive',
			api: UmbDocumentSaveAndPublishWorkspaceAction,
		},
		conditions: [
			{
				alias: 'Umb.Condition.WorkspaceAlias',
				match: workspace.alias,
			},
		],
	},
	{
		type: 'workspaceAction',
		alias: 'Umb.WorkspaceAction.Document.Save',
		name: 'Save Document Workspace Action',
		weight: 80,
		meta: {
			label: 'Save',
			look: 'secondary',
			api: UmbSaveWorkspaceAction,
		},
		conditions: [
			{
				alias: 'Umb.Condition.WorkspaceAlias',
				match: workspace.alias,
			},
		],
	},
	{
		type: 'workspaceAction',
		alias: 'Umb.WorkspaceAction.Document.SaveAndPreview',
		name: 'Save And Preview Document Workspace Action',
		weight: 90,
		meta: {
			label: 'Save And Preview',
			api: UmbDocumentSaveAndPreviewWorkspaceAction,
		},
		conditions: [
			{
				alias: 'Umb.Condition.WorkspaceAlias',
				match: workspace.alias,
			},
		],
	},
	{
		type: 'workspaceAction',
		alias: 'Umb.WorkspaceAction.Document.SaveAndSchedule',
		name: 'Save And Schedule Document Workspace Action',
		weight: 100,
		meta: {
			label: 'Save And Schedule',
			api: UmbSaveAndScheduleDocumentWorkspaceAction,
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
