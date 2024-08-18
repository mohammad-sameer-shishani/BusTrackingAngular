import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const parentGuard: CanActivateFn = (route, state) => {
  const router =new Router();
  const taostr:ToastrService=inject(ToastrService);
const token =localStorage.getItem('token');
if (token) 
  {

  if (state.url.indexOf('parent')>0) 
    {

    let user:any=localStorage.getItem('user');
    user=JSON.parse(user);

    if (user.RoleId=="3") 
    {
      return true;
    }

    else
    {
      taostr.warning('This page is for Parents !');
      router.navigate(['home'])
      return false;
    }

  }
  else
  {
    return false;
  }
}
else
{
  taostr.warning('Please Sign In !');
  router.navigate(['account/login'])
  return false;
}
};
