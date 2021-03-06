import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService) {}
    //incoming request manipulating the request and updating them with the jwttoken 
    //of the user on the authorization header
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken(); 
        const authRequest = req.clone({
            headers:req.headers.set('Authorization', "Bearer "+authToken)
        });
        return next.handle(authRequest);
    }
}