import { body, defaultResponse, endpoint, response, request, pathParams, String } from '@airtasker/spot';
import { ProblemDetails } from './models';

@endpoint({ method: 'GET', path: '/property-editors/list' })
export class PropertyEditorsListEndpoint {
	@response({ status: 200 })
	response(@body body: PropertyEditorsListResponse) {}

	@defaultResponse
	default(@body body: ProblemDetails) {}
}

@endpoint({ method: 'GET', path: '/property-editors/property-editor/:propertyEditorAlias' })
export class PropertyEditorEndpoint {
	@request
	request(
		@pathParams
		pathParams: {
			propertyEditorAlias: String;
		}
	) {}

	@response({ status: 200 })
	response(@body body: PropertyEditorResponse) {}

	@defaultResponse
	default(@body body: ProblemDetails) {}
}

@endpoint({ method: 'GET', path: '/property-editors/property-editor/config/:propertyEditorAlias' })
export class PropertyEditorConfigEndpoint {
	@request
	request(
		@pathParams
		pathParams: {
			propertyEditorAlias: String;
		}
	) {}

	@response({ status: 200 })
	response(@body body: PropertyEditorConfigResponse) {}

	@defaultResponse
	default(@body body: ProblemDetails) {}
}

export interface PropertyEditorsListResponse {
	propertyEditors: PropertyEditor[];
}

export interface PropertyEditorResponse extends PropertyEditor {}

export interface PropertyEditorConfigResponse extends PropertyEditorConfig {
	propertyEditorAlias: string;
}

export interface PropertyEditor extends PropertyEditorConfig {
	alias: string;
	name: string;
	icon: string;
	group?: string;
	isSystem: boolean;
	hasConfig: boolean;
}

export interface PropertyEditorConfig {
	config?: {
		properties: PropertyEditorConfigProperty[];
		defaultConfig?: {};
	};
}

export interface PropertyEditorConfigProperty {
	label: string;
	description?: string;
	alias: string;
	propertyEditorUI: string;
}
