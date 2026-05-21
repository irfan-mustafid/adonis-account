/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').redirect('auth.login')
router
  .group(() => {
    // router.get('signup', [controllers.NewAccount, 'create'])
    // router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Auth, 'create']).as('auth.login')
    router.post('login', [controllers.Auth, 'login']).as('auth.authenticate')
  })
  .use(middleware.guest())

// router
//   .group(() => {
//     router.post('logout', [controllers.Session, 'destroy'])
//   })
//   .use(middleware.auth())

router
  .group(() => {
    router.get('home', async ({ inertia }) => inertia.render('home', {})).as('home')
    router.post('logout', [controllers.Auth, 'logout']).as('auth.logout')
  })
  .use(middleware.auth())
