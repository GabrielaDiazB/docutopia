export const mockApiData = {
	id: 1,
	name: "Get a list of access for an organization",
	shortName: "list for organization",
	groupName: "Access",
	requestType: "GET",
	url: "https://api.hyphen.ai/api/organizations/{organizationId}/access/",
	pathParams: [
		{
			name: "organizationId",
			type: "string",
			description: "The ID of the organization.",
			required: true,
			minLength: 1,
			pattern: "^org_[a-fA-F0-9]{24}$",
		},
	],
	queryParams: [
		{
			name: "pageNum",
			type: "integer",
			description: "The page number.",
			required: false,
			minimum: 1,
			defaultValue: 1,
		},
		{
			name: "pageSize",
			type: "integer",
			description: "The page size.",
			required: false,
			minimum: 5,
			maximum: 200,
			defaultValue: 50,
		},
		{
			name: "entityIds",
			type: "array",
			description: "The entity Ids.",
			required: false,
			items: {
				type: "string",
			},
		},
		{
			name: "assignmentIds",
			type: "array",
			description: "The assignment Ids.",
			required: true,
			items: {
				type: "string",
			},
		},
	],
	bodyParams: [
		{
			name: "entity",
			type: "object",
			required: true,
			properties: [
				{
					name: "type",
					type: "string",
					required: true,
					description: "The entity type.",
					options: ["Organization", "LinkCode", "Project", "Team"],
				},
				{
					name: "id",
					type: "string",
					required: true,
					description: "The entity id.",
				},
			],
		},
		{
			name: "roles",
			type: "array",
			required: true,
			description: "The assigned roles.",
			items: {
				type: "string",
				description: "The role assigned to the entity.",
				options: [
					"OrganizationAdmin",
					"OrganizationMember",
					"TeamOwner",
					"TeamMember",
					"ProjectOwner",
					"ProjectCollaborator",
					"ProjectViewer",
					"LinkCodeOwner",
				],
			},
		},
		{
			name: "assignment",
			type: "object",
			required: true,
			properties: [
				{
					name: "type",
					type: "string",
					required: true,
					description: "The entity type.",
					options: ["Organization", "LinkCode", "Project", "Team"],
				},
				{
					name: "id",
					type: "string",
					required: true,
					description: "The entity id.",
					pattern: "^org_[a-fA-F0-9]{24}$",
				},
			],
		},
	],
	response: [
		{
			status: 200,
			name: "success",
			message: "Succesfully got a list of access for an organization",
			success: true,
		},
		{
			status: 401,
			type: "error",
			message: "Unauthorized",
			success: false,
			schema: {
				message: { type: "string", required: true },
				requestId: { type: "string", required: true },
				errorCode: { type: "string", required: true },
				errors: { type: "array", items: { type: "string" }, required: false },
			},
		},
		{
			status: 404,
			type: "error",
			message: "Not Found",
			success: false,
			schema: {
				message: { type: "string", required: true },
				requestId: { type: "string", required: true },
				errorCode: { type: "string", required: true },
				errors: { type: "array", items: { type: "string" }, required: false },
			},
		},
		{
			status: 500,
			type: "error",
			message: "Internal Server Error",
			success: false,
		},
	],
};
