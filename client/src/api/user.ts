import { SignupFormValues } from '@/components/forms/SignupForm';
import { APIResponse } from '@/types/api-response';
import axiosInstance from './axiosInstance';
import { LoginFormValues } from '@/components/forms/LoginForm';

export const submitSignupForm = async (
	formData: SignupFormValues
): Promise<APIResponse | undefined> => {
	try {
		const { data } = await axiosInstance.post('/auth/signup', formData);

		return data;
	} catch (err: any) {
		console.error('Failed to submit signup form', err);
	}
};

export const submitLoginForm = async (
	formData: LoginFormValues
): Promise<APIResponse | undefined> => {
	try {
		const { data } = await axiosInstance.post('/auth/login', formData);

		return data;
	} catch (err: any) {
		console.error('Failed to submit signup form', err);
	}
};