import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { v1AuthController } from "./modules/auth/auth.controller";
import fastify from "fastify";
import { v1Routes } from "./routes/v1-routes";

import { prismaPlugin } from "./lib/plugins/prisma.plugin";
import { authPlugin } from "./lib/plugins/auth.plugin";

const app = fastify({
  // logger: true,
});

(async () => {
  // REGISTER PLUGINS
  await app.register(prismaPlugin);
  await app.register(authPlugin);

  // REGISTER VERSIONED CONTROLLERS
  await app.register(
    (instance) => {
      // REGISTER v1 ROUTES
      app.register(v1Routes, { prefix: "/v1" });
    },
    { prefix: "/api" },
  );
})();

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "API Doc",
      description: "Documentação da API",
      version: "1.0.0",
    },
    servers: [{ url: "http://0.0.0.0:3333", description: "Servidor Local" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs", // Onde a documentação estará disponível
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

app.listen({ port: 3333, host: "0.0.0.0" }, (err, addr) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }

  console.log(`Server running at: ${addr}`);
});
