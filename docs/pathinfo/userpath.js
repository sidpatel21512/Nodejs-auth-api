export const commonResponse = {
    "content": {
        "application/json": {
            "schema": {
                "type": "object",
                "properties": {
                    "success": {
                        "type": "boolean"
                    },
                    "message": {
                        "type": "string",
                    }
                }
            }
        }
    }
};

export const userPathInfo = {
    "/users/register": {
        "post": {
            "summary": "Register a new user",
            "tags": [
                "Users"
            ],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "type": "string",
                                    "description": "The username of the user to be registered."
                                },
                                "email": {
                                    "type": "string",
                                    "description": "The email address of the user to be registered."
                                },
                                "password": {
                                    "type": "string",
                                    "description": "The password for the user to be registered."
                                }
                            },
                            "required": [
                                "username",
                                "email",
                                "password"
                            ]
                        }
                    }
                }
            },
            "responses": {
                "201": {
                    description: "Returns id of newly created user",
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
                                    "userId": {
                                        "type": "string",
                                    }
                                }

                            }
                        }
                    }
                }
            }
        }
    },
    "/users/login": {
        "post": {
            "summary": "Authenticate a user",
            "tags": [
                "Users"
            ],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "userId": {
                                    "type": "string",
                                    "description": "The username/email of the user to be authenticated."
                                },
                                "password": {
                                    "type": "string",
                                    "description": "The password of the user to be authenticated."
                                }
                            },
                            "required": [
                                "userId",
                                "password"
                            ]
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Success",
                    ...commonResponse
                }
            }
        }
    },
    "/users/logout": {
        get: {
            operationId: "/logout",
            tags: ["Users"],
            summary: "Logout a user",
            responses: {
                "200": {
                    description: "Success message after logout",
                    content: {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "success": {
                                        "type": "boolean"
                                    },
                                    "message": {
                                        "type": "string",
                                    }
                                }

                            }
                        }
                    }
                }
            }
        }
    },
    "/users/myself": {
        get: {
            operationId: "/myself",
            tags: ["Users"],
            summary: "Get the information of logged in user",
            security: {
                cookieAuth: [],
            },
            responses: {
                "200": {
                    description: "Information of logged in user",
                    content: {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "success": {
                                        "type": "boolean"
                                    },
                                    "user": {
                                        $ref: "#components/schemas/User",
                                    }
                                }

                            }
                        }
                    }
                }
            }
        }
    },
    "/users": {
        get: {
            operationId: "",
            tags: [
                "Users"
            ],
            security: {
                cookieAuth: []
            },
            summary: "Get all users",
            parameters: [
                {
                    "name": "active",
                    "in": "query",
                    "description": "To fetch different type of users(Active/Inactive).\n By default only active users will be listed",
                    "required": false,
                    "schema": {
                        "type": "boolean",
                    }
                }
            ],
            responses: {
                "200": {
                    description: "A list of users",
                    content: {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "success": {
                                        "type": "boolean"
                                    },
                                    "users": {
                                        "type": "array",
                                        "items": {
                                            $ref: "#/components/schemas/User"
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
            }
        }
    },
    "/users/{id}": {
        get: {
            operationId: "/{id}",
            tags: ["Users"],
            summary: "Get the information of any user",
            parameters: [
                {
                    "name": "id",
                    "in": "path",
                    "description": "The id of the user to retrieve",
                    "required": true,
                    "schema": {
                        "type": "string",
                    }
                }
            ],
            responses: {
                "200": {
                    description: "Information of user",
                    content: {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "success": {
                                        "type": "boolean"
                                    },
                                    "user": {
                                        $ref: "#components/schemas/User",
                                    }
                                }

                            }
                        }
                    }
                }
            }
        },
        patch: {
            summary: "Update a user by ID",
            tags: [
                "Users"
            ],
            parameters: [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "The ID of the user to update",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            requestBody: {
                "description": "Users field to be updated(at least 1 field is required)",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "type": "string"
                                },
                                "isActive": {
                                    "type": "boolean",
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Information about updation attempt",
                    ...commonResponse
                }
            }
        }
    },
};