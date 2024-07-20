import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')
// Views
const Dashboard = () => import('@/views/Dashboard')
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Users = () => import('@/views/pages/Users')
const User = () => import('@/views/pages/User')

const TransactionList = () => import('@/views/pages/TransactionList')
const Transaction = () => import('@/views/pages/Transaction')
const MyProfile = () => import('@/views/pages/MyProfile')

const SearchTransaction = () => import('@/views/pages/SearchTransaction')
const EmailSent = () => import('@/views/pages/EmailSent')


Vue.use(Router)

const router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})


router.beforeEach((to, from, next) => {
  var isAuth = auth.check();
  if (!isAuth) {
    if (to.name == 'Login') {
      next();
    }
    else {
      next({ name: 'Login' });
    }


  }
  else {
    var role = auth.getRole();
    if (role == 'viewer') {
      console.log(to.name);
      switch (to.name) {
        case 'Schedule':
        case 'Dashboard':
        case 'TransactionList':
          case 'DropboxList':
        case 'Setting':
        case 'Users':
        case'myProfile':
          {
            next();
          }
          break;
        default:
          {
            auth.logout();
            next({ name: 'Login' });
          }
        //break;
      };

    }
    else {
      next();
    }
  }
})

export default router

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/pages/Transaction/:id',
          name: 'Transaction',
          component: Transaction
        },

        {
          path: '/pages/TransactionList',
          name: 'TransactionList',
          component: TransactionList
        },

        {
          path: '/pages/users',
          name: 'Users',
          component: Users
        },
        {
          path: '/pages/user/:id',
          meta: {
            label: 'User Details'
          },
          name: 'User',
          component: User
        },
        {
          path: '/pages/user',
          name: 'User',
          component: User
        },
       
    
        {
          path: '/pages/myProfile',
          name: 'myProfile',
          component: MyProfile
        },

        {
          path: '/auth',
          name: 'Auth',
          component: Dashboard // Use the same Home component to handle the redirect
        },

      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'searchTransaction',
          name: 'SearchTransaction',
          component: SearchTransaction
        },
        {
          path: 'emailSent',
          name: 'EmailSent',
          component: EmailSent
        },

      ]
    }
  ]
}
