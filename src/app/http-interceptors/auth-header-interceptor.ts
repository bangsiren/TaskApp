import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http'

export class AuthHeaderInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    let token = localStorage.getItem('token');
    if(token) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          token
        )
    });
    }
    return next.handle(request);
  }
}
