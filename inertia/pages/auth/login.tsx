import { Form } from '@adonisjs/inertia/react'

export default function Login() {
  return (
    <div className="form-container">
      <div>
        <h1> Login </h1>
        <p>Enter your details below to login to your account</p>
      </div>

      <div>
        <Form route="auth.authenticate">
          {({ errors }) => (
            <>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  data-invalid={errors.username ? 'true' : undefined}
                />
                {errors.username && <div>{errors.username}</div>}
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  data-invalid={errors.password ? 'true' : undefined}
                />
                {errors.password && <div>{errors.password}</div>}
              </div>

              <div>
                <button type="submit" className="button">
                  Login
                </button>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  )
}
