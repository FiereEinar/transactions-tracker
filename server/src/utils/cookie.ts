import { CookieOptions, Response } from 'express';
import { NODE_ENV } from '../constants/env';
import { accessTokenCookieName, refreshTokenCookieName } from '../constants';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from './date';

export const REFRESH_PATH = '/auth/refresh';

export const cookieOptions: CookieOptions = {
	httpOnly: true,
	sameSite: NODE_ENV === 'production' ? 'strict' : 'lax',
	secure: NODE_ENV === 'production',
};

export const getAccessTokenOptions = () => ({
	...cookieOptions,
	maxAge: FIFTEEN_MINUTES,
});

export const getRefreshTokenOptions = () => ({
	...cookieOptions,
	maxAge: THIRTY_DAYS,
	path: REFRESH_PATH,
});

type SetCookieParams = {
	res: Response;
	accessToken: string;
	refreshToken: string;
};

export const setAuthCookie = ({
	res,
	accessToken,
	refreshToken,
}: SetCookieParams) =>
	res
		.cookie(accessTokenCookieName, accessToken, getAccessTokenOptions())
		.cookie(refreshTokenCookieName, refreshToken, getRefreshTokenOptions());
