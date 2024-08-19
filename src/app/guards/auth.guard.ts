import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {

    if(localStorage.getItem('token')){
        return true;
    }else{
        return false;
    }


};
