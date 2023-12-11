const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://medai.adaptable.app/api/v1';

const urls = {
  createUser: `${baseUrl}/users/signup`,
  loginUser: `${baseUrl}/users/login`,
  verifyEmail: (userId: string, emailVerificationToken: string) =>
    `${baseUrl}/users/verify-email/${userId}/${emailVerificationToken}`,
  logoutUser: `${baseUrl}/users/logout`
};

export default urls;
