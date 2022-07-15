import { useRouter } from "next/router"
import {
  Modal
} from "@mantine/core";
import fetchRedirect from "utils/fetchRedirect";

export default ({ redirect }) => {
  return (
    <div>
      <Modal
        opened
        onClose={() => {
          window.location = redirect.redirect_url;
        }}
      >
        Thanks for using my link!
      </Modal>
      <iframe
        src={redirect.redirect_url}
        width="100%"
        height="900"
        allowFullScreen
        style={{
          border: "none"
        }}
      />
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  const redirect = await fetchRedirect(slug);

  return {
    props: {
      redirect
    }
  }
}