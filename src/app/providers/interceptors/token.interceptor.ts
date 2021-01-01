import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {AuthService} from "../services/auth/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authService.getUser()).pipe(
      switchMap(user => {
        if (user && user.access_token) {
          const creq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${user.access_token}`)
          });

          return next.handle(creq);
        }

        return next.handle(req);
      })
    );
  }
}
