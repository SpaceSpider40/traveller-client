import { jwtDecode, JwtPayload } from "jwt-decode";
import { getCookie } from "./cookie";

export class Token {
    public readonly str: string;
    public readonly exp: number;
    public readonly iat: number;
    public readonly sub: string;

    public constructor(jwt: string) {
        this.str = jwt;
        const token = this.decode(jwt);
        if (this.validate(token)) {
            this.exp = token.exp! * 1000;
            this.iat = token.iat! * 1000;
            this.sub = token.sub!;
        } else {
            throw new Error("Invalid JWT");
        }
    }

    public toString(): string {
        return this.str;
    }

    private decode(jwt: string) {
        try {
            return jwtDecode(jwt);
        } catch (e:unknown) {
            let err = "JWT decode failed";
            if (e instanceof Error) {
                err += e.message;
            }
            if (typeof (e) === "string" ) {
                err += e;
            }
            throw new Error(err);
        }
    }

    private validate(token: JwtPayload): boolean {
        if (!token.exp) {
            return false;
        }
        if (!token.iat) {
            return false;
        }
        if(!token.sub){
            return false;
        }
        return true;
    }
}

export function getToken(): Token | null {
    const tokenStr = getCookie("t");
    if (!tokenStr) {
        return null;
    }

    return new Token(tokenStr);
}

export function isTokenExpired(token: Token): boolean {
    return token.exp < Date.now();
}