export const componentsInfo = {
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    _id: {
                        type: "string"
                    },
                    username: {
                        type: "string"
                    },
                    email: {
                        type: "string"
                    },
                    isActive: {
                        type: "boolean"
                    },
                    createdAt: {
                        type: "string",
                        format: "date"
                    },
                    lastModifiedAt: {
                        type: "string",
                        format: "date"
                    }
                }
            },
            Issue: {
                type: "object",
                properties: {
                    _id: {
                        type: "string"
                    },
                    title: {
                        type: "string"
                    },
                    description: {
                        type: "string"
                    },
                    type: {
                        type: "string",
                        enum: ['Task', 'Epic', 'Bug', 'Subtask']
                    },
                    priority: {
                        type: "string",
                        enum: ['Minor', 'Major', 'Critical', 'Low', 'High'],
                    },
                    status: {
                        type: "string",
                        enum: ['Backlog', 'In Progress', 'Done', 'Closed', 'Scoping'],
                    },
                    createdAt: {
                        type: "string",
                        format: "date"
                    },
                    lastModifiedAt: {
                        type: "string",
                        format: "date"
                    },
                    createdBy: {
                        type: "object",
                        properties: {
                            username: {
                                type: "string",
                            },
                            userId: {
                                type: "string",
                            }
                        }
                    },
                    assignor: {
                        type: "object",
                        properties: {
                            username: {
                                type: "string",
                            },
                            userId: {
                                type: "string",
                            }
                        }
                    },
                }
            },
            IssuePayload: {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string",
                    },
                    "type": {
                        "type": "string",
                        "enum": ['Task', 'Epic', 'Bug', 'Subtask']
                    },
                    "priority": {
                        "type": "string",
                        "enum": ['Minor', 'Major', 'Critical', 'Low', 'High'],
                    },
                    "status": {
                        "type": "string",
                        "enum": ['Backlog', 'In Progress', 'Done', 'Closed', 'Scoping'],
                    },
                    "assignorId": {
                        "type": "string",
                        "description": "Id of assignor whom this issue will be assigned"
                    }
                }
            }
        },
        // securitySchemes: {
        //     cookieAuth: {
        //         type: "apiKey",
        //         in: "cookie",
        //         name: "ip_cookie"
        //     }
        // }
    },
    // security:{
    //     cookieAuth: []
    // }
}