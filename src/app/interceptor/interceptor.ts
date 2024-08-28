import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from "rxjs/operators"; // Updated import
import { jwtDecode } from "jwt-decode";
import { HttpInterceptorFn } from '@angular/common/http';

export const Interceptor: HttpInterceptorFn = (request, next) => {
    // Access Router via injected dependency, not 'this'
    const router = inject(Router);

    // Get token from localStorage
    let accessToken: string | null = localStorage.getItem('token');

    try {
      if (accessToken) {
        const decoded = jwtDecode(accessToken);

        if (decoded) {
          // Clone the request and add Authorization header
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        } else {
          // Token is invalid, redirect to authentication
          router.navigateByUrl('/authentication');
        }
      } else {
        // No token present, redirect to authentication
        router.navigateByUrl('/authentication');
      }
    } catch (e) {
      // Catch any token parsing errors and redirect
      router.navigateByUrl('/authentication');
    }

    return next(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Handle successful responses if needed
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              // Unauthorized error, redirect to authentication
              router.navigateByUrl('/authentication');
            }
          }
        }
      )
    );
  };
