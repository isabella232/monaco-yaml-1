import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';
import { IEvent, languages } from 'monaco-editor/esm/vs/editor/editor.api';

export interface SchemasSettings {
  /**
   * A `Uri` file match which will trigger the schema validation. This may be a glob or an exact
   * path.
   *
   * @example '.gitlab-ci.yml'
   * @example 'file://**\/.github/actions/*.yaml'
   */
  fileMatch: string[];

  /**
   * The JSON schema which will be used for validation. If not specified, it will be downloaded from
   * `uri`.
   */
  schema?: JSONSchema4 | JSONSchema6 | JSONSchema7;

  /**
   * The source URI of the JSON schema. The JSON schema will be downloaded from here if no schema
   * was supplied. It will also be displayed as the source in hover tooltips.
   */
  uri: string;
}

declare module 'monaco-editor/esm/vs/editor/editor.api' {
  namespace languages.yaml {
    export interface DiagnosticsOptions {
      /**
       * If set, enable schema based autocompletion.
       *
       * @default true
       */
      readonly completion?: boolean;

      /**
       * A list of custom tags.
       *
       * @default []
       */
      readonly customTags?: string[];

      /**
       * If set, the schema service would load schema content on-demand with 'fetch' if available
       *
       * @default false
       */
      readonly enableSchemaRequest?: boolean;

      /**
       * If true, formatting using Prettier is enabled. Setting this to `false` does **not** exclude
       * Prettier from the bundle.
       *
       * @default true
       */
      readonly format?: boolean;

      /**
       * If set, enable hover typs based the JSON schema.
       *
       * @default true
       */
      readonly hover?: boolean;

      /**
       * If true, a different diffing algorithm is used to generate error messages.
       *
       * @default false
       */
      readonly isKubernetes?: boolean;

      /**
       * If specified, this prefix will be added to all on demand schema requests
       *
       * @default undefined
       * @deprecated
       */
      readonly prefix?: string;

      /**
       * A list of known schemas and/or associations of schemas to file names.
       *
       * @default []
       */
      readonly schemas?: SchemasSettings[];

      /**
       * If set, the validator will be enabled and perform syntax validation as well as schema
       * based validation.
       *
       * @default true
       */
      readonly validate?: boolean;

      /**
       * The YAML version to use for parsing.
       *
       * @default '1.2'
       */
      readonly yamlVersion?: '1.1' | '1.2';
    }

    export interface LanguageServiceDefaults {
      readonly onDidChange: IEvent<LanguageServiceDefaults>;
      readonly languageId: string;
      readonly diagnosticsOptions: DiagnosticsOptions;
      setDiagnosticsOptions: (options: DiagnosticsOptions) => void;
    }

    export const yamlDefaults: LanguageServiceDefaults;
  }
}

/**
 * Configure `monaco-yaml` diagnostics options.
 *
 * @param options - The options to set.
 */
export function setDiagnosticsOptions(options?: languages.yaml.DiagnosticsOptions): void;
