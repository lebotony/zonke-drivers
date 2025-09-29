type Session = {
  jwt: string,
  user: User,
}

type User = {
  id: string,
  first_name: string,
  last_name: string,
  username: string,
  email: string
}