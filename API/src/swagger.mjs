import swaggerJSDoc from "swagger-jsdoc";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "api passionLecture",
            version: "1.0.0",
            description:
                "API REST permettant de gérer l'application self-service-machine",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                Book: {
                    type: "object",
                    required: ["id", "title", "numberPages", "excerpt", "summary", "writer", "editor", "releaseYear", "avgRating", "coverImage", "fk_user", "fk_category"],
                    properties: {
                        id: {
                            type: "integer",
                            description: "The book's unique identifier.",
                        },
                        title: {
                            type: "string",
                            description: "The book's title.",
                        },
                        numberPages: {
                            type: "integer",
                            description: "The number of pages in the book.",
                        },
                        excerpt: {
                            type: "string",
                            description: "An excerpt from the book.",
                        },
                        summary: {
                            type: "string",
                            description: "A brief summary of the book.",
                        },
                        writer: {
                            type: "string",
                            description: "The writer's name.",
                        },
                        editor: {
                            type: "string",
                            description: "The name of the editor.",
                        },
                        releaseYear: {
                            type: "string",
                            format: "date-time",
                            description: "The year of publication of the book.",
                        },
                        avgRating: {
                            type: "float",
                            description: "The book's average score.",
                        },
                        coverImage: {
                            type: "string",
                            description: "A link to the book's cover image."
                        },
                        fk_user: {
                            type: "integer",
                            description: "The foreign key of the book for his user.", //TODO : explain better
                        },
                        fk_category: {
                            type: "integer",
                            description: "The foreign key of the book for his category",
                        }
                    },
                },
                Categories: {
                    type: "object",
                    required: ["id", "name"],
                    properties: {
                        id: {
                            type: "integer",
                            description: "The category's unique identifier.",
                        },
                        name: {
                            type: "string",
                            description: "The name of the category.",
                        },
                    },
                },
                Comment: {
                    type: "object",
                    required: ["id", "comment", "fk_user", "fk_book"],
                    properties: {
                        id: {
                            type: "integer",
                            description: "The comment's unique identifier.",
                        },
                        comment: {
                            type: "string",
                            description: "The comment's content."
                        },
                        rate: {
                            type: "integer",
                            description: "The note chosen by the user."
                        },
                        fk_user: {
                            type: "integer",
                            description: "The foreign key of the user that have posted the comment."
                        },
                        fk_book: {
                            type: "integer",
                            description: "The foreign key of the book for which the comment has been posted."
                        },
                    },
                },
                User: {
                    type: "object",
                    required: ["id", "username", "password", "nbrBookRecommended", "nbrRatingDone", "nbrCommentsDone"],
                    properties: {
                        id: {
                            type: "integer",
                            description: "The user's unique identifier.",
                        },
                        username: {
                            type: "string",
                            description: "The username of the user.",
                        },
                        password: {
                            type: "string",
                            description: "The password of the user.",
                        },
                        nbrBookRecommended: {
                            type: "integer",
                            description: "The number of books recommended by the user.",
                        },
                        nbrRatingDone: {
                            type: "integer",
                            description: "The number of votes made by the user.",
                        },
                        nbrCommentsDone: {
                            type: "integer",
                            description: "The number of comments made by the user.",
                        }
                    },
                },
                // Ajoutez d'autres schémas ici si nécessaire
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.mjs"], // Chemins vers vos fichiers de route
};
const swaggerSpec = swaggerJSDoc(options);
    
export { swaggerSpec };