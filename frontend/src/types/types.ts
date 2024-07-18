export type registrationDetails = {
	username: string;
	email: string;
	full_name: {
		first_name: string;
		middle_name: string | undefined;
		last_name: string;
	};
	password: string;
};
