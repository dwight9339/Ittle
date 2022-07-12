import { AppShell, Header, Center, Group } from "@mantine/core";
import { useUser } from "@auth0/nextjs-auth0/dist/frontend";

export default ({ children }) => {
  const { user, error, isLoading } = useUser();

  return (
    <AppShell
      header={
        <Header height={60}>
          <Group position="apart">
            <div></div>
            <h1>Shortiezzz</h1>
            {
              user 
                ? <a href="/api/auth/logout">Logout</a>
                : <a href="/api/auth/login">Login</a>
            }
            
          </Group>
        </Header>
      }
    >
      { children }
    </AppShell>
  )
}