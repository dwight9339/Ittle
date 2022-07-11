import { AppShell, Header, Center, Group } from "@mantine/core";

export default ({ children }) => {
  return (
    <AppShell
      header={
        <Header height={60}>
          <Group position="apart">
            <div></div>
            <h1>Shortiezzz</h1>
            <p>[login/profile pic]</p> 
          </Group>
        </Header>
      }
    >
      { children }
    </AppShell>
  )
}