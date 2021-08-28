const LoginSchema = {
  password: {
    isLength: {
      errorMessage: 'Password should be at least 7 chars long',
      // Multiple options would be expressed as an array
      options: { min: 7 },
    },
  },
  email: {
    isEmail: {
      bail: true,
    },
  },
}

export default LoginSchema
