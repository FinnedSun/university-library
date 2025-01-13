"use client"

import { AuthForm } from '@/components/AuthForm'
import { signUpSchema } from '@/lib/validations'
import { University } from 'lucide-react'
import React from 'react'

const SignUpPage = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        fullName: '',
        email: '',
        password: '',
        universityId: 0,
        universityCard: '',
      }}
      onSubmit={() => { }}
    />
  )
}

export default SignUpPage