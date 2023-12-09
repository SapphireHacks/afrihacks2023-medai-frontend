const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://medai.adaptable.app/api/v1';

const urls = {
  createUser: `${baseUrl}/users/signup`,
  loginUser: `${baseUrl}/users/login`
};

export default urls;
