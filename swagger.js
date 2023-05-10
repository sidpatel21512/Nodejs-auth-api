import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routers/v1/user.js', './routers/v1/issue.js'];

swaggerAutogen(outputFile, endpointsFiles);

export const swaggerOutput = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "Issue Portal REST API",
        "description": "",
        "contact": {
            "name": "Avi chauhan",
            "email": "avi.chauhan@crestdatasys.com",
        }
    },
    "host": "localhost:8080",
    "basePath": "/api/v1",
    "schemes": [
        "http"
    ],
    "paths": {
        "users/register": {
            "post": {
                "description": "",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "example": "any"
                                },
                                "username": {
                                    "example": "any"
                                },
                                "password": {
                                    "example": "any"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created"
                    }
                }
            }
        },
        "users/login": {
            "post": {
                "description": "",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "userId": {
                                    "example": "any"
                                },
                                "password": {
                                    "example": "any"
                                }
                            }
                        }
                    }
                ],
                "responses": {}
            }
        },
        "users/logout": {
            "get": {
                "description": "",
                "parameters": [],
                "responses": {}
            }
        },
        "users/myself": {
            "get": {
                "description": "",
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "issues/{id}": {
            "get": {
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "patch": {
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "name": "body",
                        "in": "body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "title": {
                                    "example": "any"
                                },
                                "description": {
                                    "example": "any"
                                },
                                "type": {
                                    "example": "any"
                                },
                                "priority": {
                                    "example": "any"
                                },
                                "status": {
                                    "example": "any"
                                },
                                "assignorId": {
                                    "example": "any"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "202": {
                        "description": "Accepted"
                    }
                }
            }
        },
        "issues/user-issues/{userId}": {
            "get": {
                "description": "",
                "parameters": [
                    {
                        "name": "userId",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "issues/": {
            "post": {
                "description": "",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "title": {
                                    "example": "any"
                                },
                                "description": {
                                    "example": "any"
                                },
                                "type": {
                                    "example": "any"
                                },
                                "priority": {
                                    "example": "any"
                                },
                                "status": {
                                    "example": "any"
                                },
                                "assignorId": {
                                    "example": "any"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created"
                    }
                }
            }
        }
    }
};