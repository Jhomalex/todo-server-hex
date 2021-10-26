import { Response, NextFunction, Request } from 'express';

/**
 * Disables Cross-Origin-Resource-Sharing at ip added in the array declared in the same function.
 */
export const cors = function () {
	return async function (
		request: Request,
		response: Response,
		next: NextFunction
	) {
		const allowedOrigins = ['http://localhost:8080', 'http://localhost:8080/'];

		const origin = <string>request.headers.origin;
		if (allowedOrigins.indexOf(origin) > -1) {
			response.header('Access-Control-Allow-Origin', origin);
			response.header('Access-Control-Allow-Credentials', 'true');
			response.header('Access-Control-Allow-Headers', '*');
			response.header(
				'Access-Control-Allow-Methods',
				'POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD'
			);
		}
		next();
	};
};
