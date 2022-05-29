import {
    Injectable,
    CanActivate,
    ExecutionContext,
    forwardRef,
    Inject,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(
      private reflector: Reflector,
    ) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const role = this.reflector.get<string[]>('role', context.getHandler());
      if (!role) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      // console.log(request)
      if (role.includes(request.user.role.title)) {
        return true;
      }
  
      return false;
    }
  }