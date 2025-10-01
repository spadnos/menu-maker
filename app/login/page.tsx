import { login, signup } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-4 max-w-sm mx-auto">
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email"
        />
        <Input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Password"
        />
        <div className="flex justify-between">
          <Button formAction={login}>Log in</Button>
          <Button formAction={signup}>Sign up</Button>
        </div>
      </form>
    </div>
  )
}
