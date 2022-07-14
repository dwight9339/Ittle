import { useUser } from "@auth0/nextjs-auth0/dist/frontend"
import { 
  Navbar,
  Button,
  Modal
} from "@mantine/core";
import { useState } from "react";
import UrlForm from "/components/forms/UrlForm";

export default () => {
  const { user } = useUser();

  const [urlFormOpen, setUrlFormOpen] = useState(false);

  // const toggleUrlForm = setUrlFormOpen((isOpen) => !isOpen);


  return (
    <div>
      <Modal
       opened={urlFormOpen}
       onClose={() => setUrlFormOpen(false)}
      >
        <UrlForm />
      </Modal>
      <Navbar
        width={{base: 200}}
      >
        <Button
          onClick={() => setUrlFormOpen(true)}
        >
          New URL
        </Button>
        <h1>
          This is a navbar. It's catchy, you like it.
        </h1>
      </Navbar>
      User Home
    </div>
  )
}