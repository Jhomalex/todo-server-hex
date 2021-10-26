// import { error, success } from "../util/response";
import { passport } from './passport';
import { Response, NextFunction, Request } from 'express';

/**
 * Verifica si un usuario está autenticado o no en el sistema. Si no está autenticado no lo
 * deja pasar a ejecutar las siguientes peticiones.
 * @param request variable que posee los datos enviados por POST
 * @param response variable que posee funciones que permiten enviar una respuesta al cliente
 * @param next función que permite continuar con la ejecución del algoritmo.
 */
export const isLoggedIn = function (
	request: Request,
	response: Response,
	next: NextFunction
) {
	passport.authenticate('jwt', { session: false }, function (err, user) {
		request.logIn(user, function () {
			next();
		});
	})(request, response, next);
};
