import { commonResponse } from "./userpath.js";

export const issuePathInfo = {
    "/issues": {
        get: {
            operationId: "",
            tags: [
                "Issues"
            ],
            summary: "Get all issues",
            responses: {
                "200": {
                    description: "A list of issues",
                    content: {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "success": {
                                        "type": "boolean"
                                    },
                                    "issues": {
                                        "type": "array",
                                        "items": {
                                            $ref: "#/components/schemas/Issue"
                                        }
                                    }
                                }

                            }
                        }
                    }
                },
                "400": {
                    "$ref": "#/responses/400"
                },
                "401": {
                    "$ref": "#/responses/401"
                },
                "403": {
                    "$ref": "#/responses/403"
                },
                "404": {
                    "$ref": "#/responses/404"
                },
                "500": {
                    "$ref": "#/responses/500"
                },
            }
        },
        post: {
            summary: "Create an issue",
            tags: [
                "Issues"
            ],
            requestBody: {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#components/schemas/IssuePayload"
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    description: "Returns id of newly created issue",
                    content: {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "success": {
                                        "type": "boolean"
                                    },
                                    "message": {
                                        "type": "string"
                                    },
                                    "issueId": {
                                        "type": "string",
                                    }
                                }

                            }
                        }
                    }
                },
                "400": {
                    "$ref": "#/responses/400"
                },
                "401": {
                    "$ref": "#/responses/401"
                },
                "403": {
                    "$ref": "#/responses/403"
                },
                "404": {
                    "$ref": "#/responses/404"
                },
                "500": {
                    "$ref": "#/responses/500"
                },
            }
        }
    },
    "/issues/user-issues/{userId}": {
        get: {
            operationId: "/{userId}",
            tags: ["Issues"],
            summary: "Get issues related to user",
            parameters: [
                {
                    "name": "userId",
                    "in": "path",
                    "description": "The id of user whose issues will be fetched",
                    "required": true,
                    "schema": {
                        "type": "string",
                    }
                }
            ],
            responses: {
                "200": {
                    description: "List of issues of user",
                    content: {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "success": {
                                        "type": "boolean"
                                    },
                                    "issues": {
                                        "type": "array",
                                        "items": {
                                            $ref: "#/components/schemas/Issue"
                                        }
                                    }
                                }

                            }
                        }
                    }
                },
                "400": {
                    "$ref": "#/responses/400"
                },
                "401": {
                    "$ref": "#/responses/401"
                },
                "403": {
                    "$ref": "#/responses/403"
                },
                "404": {
                    "$ref": "#/responses/404"
                },
                "500": {
                    "$ref": "#/responses/500"
                },
            }
        }
    },
    "/issues/{id}": {
        get: {
            operationId: "/{id}",
            tags: ["Issues"],
            summary: "Get the information of an issue",
            parameters: [
                {
                    "name": "id",
                    "in": "path",
                    "description": "The id of an issue to retrieve",
                    "required": true,
                    "schema": {
                        "type": "string",
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Information of an issue",
                    content: {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "success": {
                                        "type": "boolean"
                                    },
                                    "user": {
                                        $ref: "#components/schemas/Issue",
                                    }
                                }

                            }
                        }
                    }
                },
                "400": {
                    "$ref": "#/responses/400"
                },
                "401": {
                    "$ref": "#/responses/401"
                },
                "403": {
                    "$ref": "#/responses/403"
                },
                "404": {
                    "$ref": "#/responses/404"
                },
                "500": {
                    "$ref": "#/responses/500"
                },
            }
        },
        patch: {
            summary: "Update an issue by ID",
            tags: [
                "Issues"
            ],
            parameters: [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "The ID of an issue to update",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            requestBody: {
                "description": "Issues field to be updated(at least 1 field is required)",
                "content": {
                    "application/json": {
                        "schema": {
                            $ref: "#components/schemas/IssuePayload"
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Information about updation attempt",
                    ...(commonResponse())
                },
                "400": {
                    "$ref": "#/responses/400"
                },
                "401": {
                    "$ref": "#/responses/401"
                },
                "403": {
                    "$ref": "#/responses/403"
                },
                "404": {
                    "$ref": "#/responses/404"
                },
                "500": {
                    "$ref": "#/responses/500"
                },
            }
        },
        delete: {
            summary: "Delete an issue by ID",
            tags: [
                "Issues"
            ],
            parameters: [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "The ID of an issue to be deleted",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Information about deletion attempt",
                    ...(commonResponse())
                },
                "400": {
                    "$ref": "#/responses/400"
                },
                "401": {
                    "$ref": "#/responses/401"
                },
                "403": {
                    "$ref": "#/responses/403"
                },
                "404": {
                    "$ref": "#/responses/404"
                },
                "500": {
                    "$ref": "#/responses/500"
                }
            }
            
        }
    }
}