import { jwtVerify } from 'jose';

export interface ITokenInside {
  id: string;
  iat: number;
  exp: number;
}

export async function jwtVerifyServer(accessToken: string) {
  try {
    const { payload }: { payload: ITokenInside } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(`${process.env.JWT_SECRET}`)
    );
    return payload;
  } catch (error) {
    // обработка ошибок, связанных с верификацией JWT
    if (error instanceof Error && error.message.includes('exp claim timestamp check failed')) {
      // токен истек
      console.log('токен истек');
      return null;
    }

    console.log('Ошибка при верификации токена: ', error);
    return null;
  }
}
