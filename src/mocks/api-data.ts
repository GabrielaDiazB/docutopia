import type { OpenApiDocument } from "@/types/api/openapi";

export const mockOpenApiDoc: OpenApiDocument = {
	openapi: "3.1.0",
	info: {
		title: "Docutopia API",
		version: "1.0.0",
		description: "API mock for documentation purposes",
	},
	servers: [
		{
			url: "https://api.hyphen.ai/api",
		},
	],
	tags: [
		{ name: "API Keys", description: "Operations for API key management" },
		{ name: "Access", description: "Access control operations" },
	],
	paths: {
		"/organizations/{organizationId}/access": {
			get: {
				summary: "Get a list of access for an organization",
				tags: ["Access"],
				parameters: [
					{
						name: "organizationId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							pattern: "^org_[a-fA-F0-9]{24}$",
						},
						description: "The ID of the organization.",
					},
					{
						name: "pageNum",
						in: "query",
						required: false,
						schema: {
							type: "integer",
							minimum: 1,
							default: 1,
						},
						description: "The page number.",
					},
					{
						in: "query",
						name: "pageSize",
						required: false,
						schema: {
							type: "integer",
							minimum: 5,
							maximum: 200,
							default: 50,
						},
						description: "The page size.",
					},
					{
						in: "query",
						name: "entityIds",
						required: false,
						schema: {
							type: "array",
							items: {
								type: "string",
							},
						},
						description: "The entity Ids.",
					},
					{
						in: "query",
						name: "assignmentIds",
						required: true,
						schema: {
							type: "array",
							items: {
								type: "string",
								enum: [
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
						description: "The assignment Ids.",
					},
				],
				responses: {
					"200": {
						description:
							"Successfully got a list of access for an organization",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										total: {
											type: "integer",
											description: "The total number of records",
										},
										pageNum: {
											type: "integer",
											description: "The page number.",
										},
										pageSize: {
											type: "integer",
											description: "The page size.",
										},
										data: {
											type: "array",
											description: "The data response.",
											items: {
												type: "object",
												properties: {
													entity: {
														type: "object",
														properties: {
															type: {
																type: "string",
																description: "The entity type.",
																enum: [
																	"Organization",
																	"LinkCode",
																	"Project",
																	"Team",
																],
															},
															id: {
																type: "string",
																description: "The entity Id.",
															},
															name: {
																type: "string",
																description: "The name of the entity.",
															},
														},
														required: ["type", "id", "name"],
													},
													roles: {
														type: "array",
														description: "The assigned roles.",
													},
													id: {
														type: "string",
														description: "The access Id.",
													},
													type: {
														type: "string",
														description: "The type of access.",
													},
													assignment: {
														type: "object",
														properties: {
															type: {
																type: "string",
																description: "The assignment type.",
																enum: [
																	"Organization",
																	"LinkCode",
																	"Project",
																	"Team",
																],
															},
															id: {
																type: "string",
																description: "The assignment Id.",
															},
															name: {
																type: "string",
																description: "The name of the assignment.",
															},
														},
														required: ["type", "id", "name"],
													},
												},
												required: [
													"entity",
													"roles",
													"id",
													"type",
													"assignment",
												],
											},
										},
									},
									required: ["total", "pageNum", "pageSize"],
								},
							},
						},
					},
					"401": {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"404": {
						description: "Not Found",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"500": {
						description: "Internal Server Error",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
				},
			},
			post: {
				summary: "Create access for an organization",
				tags: ["Access"],
				parameters: [
					{
						name: "organizationId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							pattern: "^org_[a-fA-F0-9]{24}$",
						},
						description: "The ID of the organization.",
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									entity: {
										type: "object",
										properties: {
											type: {
												type: "string",
												description: "The entity type.",
												enum: ["Organization", "LinkCode", "Project", "Team"],
											},
											id: {
												type: "string",
												description: "The entity id.",
											},
										},
										required: ["type", "id"],
									},
									roles: {
										type: "array",
										description: "The assigned roles.",
										items: {
											type: "string",
											description: "The role assigned to the entity.",
											enum: [
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
									assignment: {
										type: "object",
										properties: {
											type: {
												type: "string",
												description: "The entity type.",
												enum: ["Organization", "LinkCode", "Project", "Team"],
											},
											id: {
												type: "string",
												description: "The entity id.",
												pattern: "^org_[a-fA-F0-9]{24}$",
											},
										},
										required: ["type", "id"],
									},
								},
								required: ["entity", "roles"],
							},
							examples: {
								"option 1": {
									description: "this is a test",
								},
							},
						},
					},
				},
				responses: {
					"200": {
						description:
							"Successfully got a list of access for an organization",
						content: {
							"application/json": {
								schema: {
									type: "string",
									description: "this is a test.",
								},
								examples: {
									"option 1": {
										description: "This is a description",
										type: "object",
										required: ["entity", "id"],
										properties: {
											entity: {
												type: "object",
												properties: {
													type: {
														type: "string",
														description: "The entity type.",
														enum: [
															"Organization",
															"LinkCode",
															"Project",
															"Team",
														],
													},
													id: {
														type: "integer",
														description: "The entity id.",
													},
													name: {
														type: "string",
														description: "The entity name.",
													},
												},
												required: ["type", "id", "name"],
											},
											id: {
												type: "integer",
												description: "The access Id.",
											},
											type: {
												type: "string",
												description: "The type of access.",
												enum: ["Type 1", "Type 2"],
											},
											test: {
												type: "array",
												description: "This is a test.",
												items: {
													type: "string",
													enum: ["test 1", "test 2", "test 3"],
												},
											},
										},
									},
									"option 2": {
										description: "This is a description",
										type: "object",
										required: ["entity", "id"],
										properties: {
											entity: {
												type: "object",
												properties: {
													type: {
														type: "string",
														description: "The entity type.",
														enum: [
															"Organization",
															"LinkCode",
															"Project",
															"Team",
														],
													},
													id: {
														type: "integer",
														description: "The entity id.",
													},
													name: {
														type: "string",
														description: "The entity name.",
													},
												},
												required: ["type", "id", "name"],
											},
											id: {
												type: "integer",
												description: "The access Id.",
											},
											type: {
												type: "string",
												description: "The type of access.",
												enum: ["Type 1", "Type 2"],
											},
											test: {
												type: "array",
												description: "This is a test.",
												items: {
													type: "string",
													enum: ["test 1", "test 2", "test 3"],
												},
											},
										},
									},
									"option 3": {
										description: "This is a description",
										type: "object",
										required: ["entity", "id"],
										properties: {
											entity: {
												type: "object",
												properties: {
													type: {
														type: "string",
														description: "The entity type.",
														enum: [
															"Organization",
															"LinkCode",
															"Project",
															"Team",
														],
													},
													id: {
														type: "integer",
														description: "The entity id.",
													},
													name: {
														type: "string",
														description: "The entity name.",
													},
												},
												required: ["type", "id", "name"],
											},
											id: {
												type: "integer",
												description: "The access Id.",
											},
											type: {
												type: "string",
												description: "The type of access.",
												enum: ["Type 1", "Type 2"],
											},
											test: {
												type: "array",
												description: "This is a test.",
												items: {
													type: "string",
													enum: ["test 1", "test 2", "test 3"],
												},
											},
										},
									},
								},
							},
						},
					},
					"401": {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"404": {
						description: "Not Found",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"500": {
						description: "Internal Server Error",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
				},
			},
		},
		"/organizations/{organizationId}/access/{accessId}": {
			get: {
				summary: "Get the access for an organization",
				tags: ["Access"],
				parameters: [
					{
						name: "organizationId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							pattern: "^org_[a-fA-F0-9]{24}$",
						},
						description: "The ID of the organization.",
					},
					{
						name: "accessId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							minLength: 1,
						},
						description: "The access ID.",
					},
				],
				responses: {
					"200": {
						description: "Successfully got the access for an organization",
						content: {},
					},
					"401": {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"404": {
						description: "Not Found",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"500": {
						description: "Internal Server Error",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
				},
			},
			delete: {
				summary: "Delete the access for an organization",
				tags: ["Access"],
				parameters: [
					{
						name: "organizationId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							pattern: "^org_[a-fA-F0-9]{24}$",
							minLength: 1,
						},
						description: "The ID of the organization.",
					},
					{
						name: "accessId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							minLength: 1,
						},
						description: "The access ID.",
					},
				],
				responses: {
					"204": {
						description: "Successfully deleted the access for an organization",
						content: {},
					},
					"401": {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"404": {
						description: "Not Found",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"500": {
						description: "Internal Server Error",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
				},
			},
			patch: {
				summary: "Update the access for an organization",
				tags: ["Access"],
				parameters: [
					{
						name: "organizationId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							pattern: "^org_[a-fA-F0-9]{24}$",
							minLength: 1,
						},
						description: "The organization Id.",
					},
					{
						name: "accessId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							minLength: 1,
						},
						description: "The access ID.",
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									roles: {
										type: "array",
										description: "The assigned roles.",
										items: {
											type: "string",
											description: "The role assigned to the entity.",
											enum: [
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
								},
								required: ["roles"],
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Successfully updated the access for an organization",
						content: {},
					},
					"401": {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"404": {
						description: "Not Found",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"409": {
						description: "Conflict",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"500": {
						description: "Internal Server Error",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
				},
			},
		},
		"/organizations/{organizationId}/api-keys/{apiKeyId}/secrets/": {
			put: {
				summary: "Create a secret for an API key",
				tags: ["API Keys"],
				parameters: [
					{
						name: "organizationId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							pattern: "^org_[a-fA-F0-9]{24}$",
							minLength: 1,
						},
						description: "The organization ID.",
					},
					{
						name: "apiKeyId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							minLength: 1,
						},
						description: "The API Key ID.",
					},
				],
				responses: {
					"200": {
						description: "Secret created successfully",
					},
					"401": {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"404": {
						description: "Not Found",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"500": {
						description: "Internal Server Error",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
				},
			},
			patch: {
				summary: "Update the access for an organization",
				tags: ["Access"],
				parameters: [
					{
						name: "organizationId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							pattern: "^org_[a-fA-F0-9]{24}$",
							minLength: 1,
						},
						description: "The organization Id.",
					},
					{
						name: "accessId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							minLength: 1,
						},
						description: "The access ID.",
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								properties: {
									roles: {
										type: "array",
										description: "The assigned roles.",
										items: {
											type: "string",
											description: "The role assigned to the entity.",
											enum: [
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
								},
								required: ["roles"],
							},
						},
					},
				},
				responses: {
					"200": {
						description: "Successfully updated the access for an organization",
						content: {},
					},
					"401": {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"404": {
						description: "Not Found",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"409": {
						description: "Conflict",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"500": {
						description: "Internal Server Error",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
				},
			},
		},
		"/organizations/{organizationId}/api-keys/{apiKeyId}/secrets/": {
			put: {
				summary: "Create a secret for an API key",
				tags: ["API Keys"],
				parameters: [
					{
						name: "organizationId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							pattern: "^org_[a-fA-F0-9]{24}$",
							minLength: 1,
						},
						description: "The organization ID.",
					},
					{
						name: "apiKeyId",
						in: "path",
						required: true,
						schema: {
							type: "string",
							minLength: 1,
						},
						description: "The API Key ID.",
					},
				],
				responses: {
					"200": {
						description: "Secret created successfully",
					},
					"401": {
						description: "Unauthorized",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"404": {
						description: "Not Found",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
					"500": {
						description: "Internal Server Error",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/DefaultErrorSchema" },
							},
						},
					},
				},
			},
		},
	},
	components: {
		schemas: {
			DefaultErrorSchema: {
				type: "object",
				required: ["message", "requestId", "errorCode"],
				properties: {
					message: { type: "string" },
					requestId: { type: "string" },
					errorCode: { type: "string" },
					errors: {
						type: "array",
						items: { type: "string" },
					},
				},
			},
		},
	},
};
