import {
  TextInput,
  Card,
  Button,
  Group
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import axios from "axios";

export default ({ urlRec, closeModal }) => {
  const form = useForm({
    initialValues: urlRec
      ? {
        name: urlRec.name,
        redirect_url: urlRec.redirect_url,
        start_date: urlRec.start_date,
        end_date: urlRec.end_date
      } : {
        name: "",
        redirect_url: "",
        start_date: "",
        end_date: ""
      },
    // validate: ({
    //   start_date
    // }) => ({
    //   end_date: (date) => date > start_date
    // })
  });

  return (
    <Card>
      <form
        onSubmit={form.onSubmit(async (values) => {
          axios.post("/api/create-url", values);
          closeModal();
        })}
      >
        <TextInput
          label="Name"
          value={form.values.name}
          onChange={(e) => {
            form.setFieldValue("name", e.currentTarget.value);
          }}
        />
        <TextInput
          label="Redirect URL"
          value={form.values.redirect_url}
          onChange={(e) => {
            form.setFieldValue("redirect_url", e.currentTarget.value);
          }}
        />
        <DatePicker
          label="Start Date"
          value={form.values.start_date}
          onChange={(date) => {
            form.setFieldValue("start_date", date);
          }}
        />
        <DatePicker
          label="End Date"
          value={form.values.end_date}
          onChange={(date) => {
            form.setFieldValue("end_date", date);
          }}
          disabled={!form.values.start_date}
        />
        <Group>
          <Button type="submit">
            Submit
          </Button> 
        </Group>
      </form>
    </Card>
  )
}