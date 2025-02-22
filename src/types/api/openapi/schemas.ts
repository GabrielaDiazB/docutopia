export type SchemaOrRef = SchemaObject | ReferenceObject;

export interface SchemaObject {
	type?: string;
	format?: string;
	description?: string;
	properties?: Record<string, SchemaObject>;
	items?: SchemaObject;
	required?: string[];
	enum?: (string | number | boolean)[];
	default?: number | string;
	pattern?: string;
	minimum?: number;
	maximum?: number;
	minLength?: number;
	maxLength?: number;
}

export interface ReferenceObject {
	$ref: string;
}

export interface MediaTypeObject {
	schema?: SchemaOrRef;
}
