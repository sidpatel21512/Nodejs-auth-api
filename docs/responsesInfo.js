export const responsesInfo = {
    responses: {
        "401": {
            "description": "Unauthenticated Access",
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "error": {
                                "success": "boolean",
                                "example": "false"
                            },
                            "message": {
                                "type": "string",
                                "example": "Unauthorized"
                            }
                        }
                    }
                }
            }
        },
        "404": {
            "description": "Not Found",
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "message": {
                                "type": "string",
                                "example": "Not Found"
                            },
                            "success": {
                                "type": "boolean",
                                "example": "The requested resource was not found"
                            }
                        }
                    }
                }
            }
        },
        "403": {
            "description": "Forbidden Access",
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "error": {
                                "success": "boolean",
                                "example": "false"
                            },
                            "message": {
                                "type": "string",
                                "example": "You are not allowed to perform this operation"
                            }
                        }
                    }
                }
            }
        },
        "400": {
            "description": "Bad Request Error",
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "error": {
                                "success": "boolean",
                                "example": "false"
                            },
                            "message": {
                                "type": "string",
                                "example": "Provided resource was badly formatted"
                            }
                        }
                    }
                }
            }
        },
        "500": {
            "description": "Internal Server Error",
            "content": {
                "application/json": {
                    "schema": {
                        "type": "object",
                        "properties": {
                            "error": {
                                "success": "boolean",
                                "example": "false"
                            },
                            "message": {
                                "type": "string",
                                "example": "Server side error due to connection failure or schema validation"
                            }
                        }
                    }
                }
            }
        }
    }
}