export {default} from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard',
    '/prompts',
    '/prompts/edit',
    '/prompts/edit/(.*)'
  ]
}
