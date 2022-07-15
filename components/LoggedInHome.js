import { useUser } from "@auth0/nextjs-auth0/dist/frontend"
import { 
  Navbar,
  Button,
  Modal,
  Group
} from "@mantine/core";
import { 
  useEffect,
  useState,
  useMemo
} from "react";
import UrlForm from "/components/forms/UrlForm";
import axios from "axios";
import useSWR from "swr";

const LoggedInHome = () => {
  const { user } = useUser();
  const { data: urls, error } = useSWR("/api/fetch-urls", async () => {
    const res = await axios.get("/api/fetch-urls");
    return res.data;
  });

  const [urlFormOpen, setUrlFormOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState();

  const urlList = useMemo(() => {
    if (!urls) return null;

    return (
      <div>
        <h2>Your URLs</h2>
        {
          urls.map((url, i) => {
            return (
              <div 
                key={i}
                onClick={() => setSelectedUrl(() => url)}
                style={{
                  cursor: "pointer"
                }}
              >
                <p>{url.name}</p>
              </div>
            )
          })
        }
      </div>
    );
  });

  const urlInfo = useMemo(() => {
    if (!selectedUrl) return null;

    return (
      <div>
        <h2>{selectedUrl.name}</h2>
        <p>Short URL: https://shortiezzz.com/{selectedUrl._id}</p>
        <p>Redirects to: {selectedUrl.redirect_url}</p>
        <p>Clicked count: {selectedUrl.click_count}</p>
      </div>
    );
  })

  return (
    <div>
      <Modal
       opened={urlFormOpen}
       onClose={() => setUrlFormOpen(false)}
      >
        <UrlForm 
          closeModal={() => setUrlFormOpen(false)}
        />
      </Modal>
      <Group>
       <Navbar
        width={{base: 200}}
      >
        <Button
          onClick={() => setUrlFormOpen(true)}
        >
          New URL
        </Button>
        {urlList}
      </Navbar>
      <div>
        {urlInfo} 
      </div> 
      </Group>
    </div>
  )
}

export default LoggedInHome;