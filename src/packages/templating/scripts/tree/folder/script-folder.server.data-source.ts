import { UmbServerPathUniqueSerializer } from '../../../utils/index.js';
import { UmbCreateFolderModel, UmbFolderDataSource, UmbUpdateFolderModel } from '@umbraco-cms/backoffice/tree';
import { ScriptResource } from '@umbraco-cms/backoffice/backend-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';

/**
 * A data source for Script folders that fetches data from the server
 * @export
 * @class UmbScriptFolderServerDataSource
 * @implements {RepositoryDetailDataSource}
 */
export class UmbScriptFolderServerDataSource implements UmbFolderDataSource {
	#host: UmbControllerHost;
	#serverPathUniqueSerializer = new UmbServerPathUniqueSerializer();

	/**
	 * Creates an instance of UmbScriptFolderServerDataSource.
	 * @param {UmbControllerHost} host
	 * @memberof UmbScriptFolderServerDataSource
	 */
	constructor(host: UmbControllerHost) {
		this.#host = host;
	}

	/**
	 * Fetches a Script folder from the server
	 * @param {string} unique
	 * @return {UmbDataSourceResponse<UmbFolderModel>}
	 * @memberof UmbScriptFolderServerDataSource
	 */
	async read(unique: string) {
		if (!unique) throw new Error('Unique is missing');

		const path = this.#serverPathUniqueSerializer.toServerPath(unique);

		const { data, error } = await tryExecuteAndNotify(
			this.#host,
			ScriptResource.getScriptFolderByPath({
				path,
			}),
		);

		if (data) {
			const mappedData = {
				unique: this.#serverPathUniqueSerializer.toUnique(data.path),
				parentUnique: data.parent ? this.#serverPathUniqueSerializer.toUnique(data.parent.path) : null,
				name: data.name,
			};

			return { data: mappedData };
		}

		return { error };
	}

	/**
	 * Creates a Script folder on the server
	 * @param {UmbCreateFolderModel} args
	 * @return {UmbDataSourceResponse<UmbFolderModel>}
	 * @memberof UmbScriptFolderServerDataSource
	 */
	async create(args: UmbCreateFolderModel) {
		if (args.parentUnique === undefined) throw new Error('Parent unique is missing');
		if (!args.name) throw new Error('Name is missing');

		const parentPath = new UmbServerPathUniqueSerializer().toServerPath(args.parentUnique);

		const requestBody = {
			parentPath,
			name: args.name,
		};

		const { data, error } = await tryExecuteAndNotify(
			this.#host,
			ScriptResource.postScriptFolder({
				requestBody,
			}),
		);

		if (data) {
			const newPath = this.#serverPathUniqueSerializer.toUnique(data);
			return this.read(newPath);
		}

		return { error };
	}

	/**
	 * Deletes a Script folder on the server
	 * @param {string} unique
	 * @return {UmbDataSourceErrorResponse}
	 * @memberof UmbScriptServerDataSource
	 */
	async delete(unique: string) {
		if (!unique) throw new Error('Unique is missing');

		const path = this.#serverPathUniqueSerializer.toServerPath(unique);

		return tryExecuteAndNotify(
			this.#host,
			ScriptResource.deleteScriptFolderByPath({
				path,
			}),
		);
	}

	async update(args: UmbUpdateFolderModel): Promise<any> {
		throw new Error('Updating is not supported');
	}
}
