import error404 from '@/components/404'
import error403 from '@/components/403'


import auth from './auth/auth.js'



export const home = {
  ...auth,
  {
    path: '/404',
    name: '404',
    component: error404
  },
  {
    path: '/403',
    name: '403',
    component: error403
  }
}

