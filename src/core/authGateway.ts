import { jwtDecode } from 'jwt-decode';
import { IHttpClient } from './http';
import { IStorage } from './storage';
import { User } from './user';

export interface ILoginProps {
  registration: string;
  password: string;
}

interface IAuthGateway {
  login(props: ILoginProps): Promise<User | null>;
  validateSession(): Promise<boolean>;
}

export interface ILoginResponseDTO {
  accessToken: string;
  expiresIn: string;
  user: {
    userId: string;
    name: string;
    email: string;
    registration: string;
  };
}

export const ACCESS_TOKEN_NAME = 'accessToken';
export const TOKEN_EXPIRATION = 'tokenExpiration';

export class AuthGatewayHttp implements IAuthGateway {
  constructor(
    private readonly client: IHttpClient,
    private readonly storage: IStorage,
  ) {}

  async login(props: ILoginProps): Promise<User | null> {
    const result = await this.client.post<ILoginResponseDTO>({
      url: 'http://localhost:8080/auth/login',
      body: props,
    });

    if (result.status !== 200) return null;

    await this.storage.setItem(ACCESS_TOKEN_NAME, result.data.accessToken);
    await this.storage.setItem(TOKEN_EXPIRATION, result.data.expiresIn);

    return new User(
      result.data.user.name,
      result.data.user.email,
      result.data.user.registration,
    );
  }

  async validateSession() {
    const token = await this.storage.getItem<string>(ACCESS_TOKEN_NAME);
    const expiresIn = await this.storage.getItem(TOKEN_EXPIRATION);

    if (!token || !expiresIn) return false;
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) return false;

    return true;
  }
}
