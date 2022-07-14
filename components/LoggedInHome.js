import { useUser } from "@auth0/nextjs-auth0/dist/frontend"

export default () => {
  const { user } = useUser();

  return (
    <div>
      User Home
    </div>
  )
}