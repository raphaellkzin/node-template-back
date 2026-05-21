import { FastifyReply } from 'fastify';

interface JsonResponseBase {
  reply: FastifyReply;
  data?: any;
  statusCode?: number;
  message?: string;
}

export const jsonResponse = {
  success({ reply, data = null, statusCode = 200, message = 'Success' }: JsonResponseBase) {
    const response = {
      success: true,
      message,
      data,
    };

    return reply.code(statusCode).send(response);
  },

  error({ reply, data = null, statusCode = 422, message = 'Error response' }: JsonResponseBase) {
    const response = {
      success: false,
      message,
      data,
    };

    return reply.code(statusCode).send(response);
  },
};
