'use client'

import { signup } from '@/app/(auth)/auth/sign-up/actions'
import { useActionState } from 'react'

export function SignUpForm(){
    const initialState = {
        errors: {
          name: undefined,
          lastname: undefined,
          email: undefined,
          password: undefined,
          confirmPassword: undefined
        }
      };
    
      const [state, action, pending] = useActionState(signup, initialState);

      
    return (
        <form action={action}>
            <input name="name"/>
            {state?.errors?.name && <p>{state.errors.name}</p>}
            <input name="lastname"/>
            {state?.errors?.lastname && <p>{state.errors.lastname}</p>}
            <input name="email"/>
            {state?.errors?.email && <p>{state.errors.email}</p>}
            <input name="password"/>
            {state?.errors?.password && <p>{state.errors.password}</p>}
            <input name="confirmPassword"/>
            {state?.errors?.confirmPassword && <p>{state.errors.confirmPassword}</p>}
            <button disabled={pending}>
                {pending ? 'Submitting..' : 'Sign up'}
            </button>
        </form>
    )

}