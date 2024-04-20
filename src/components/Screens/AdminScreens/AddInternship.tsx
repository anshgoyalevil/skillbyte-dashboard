import {
  TextInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Checkbox,
  CheckboxProps,
  Select,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { IconBell } from "@tabler/icons-react";
import UserService from "../../../services/user.service";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AddService() {
  const [batches, setBatches] = useState([
    {
      year: "",
      internshipsId: "",
    },
  ]);

  useEffect(() => {
    UserService.getAllBatches().then(
      (response) => {
        setBatches(response.data);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [successful, setSuccessful] = useState(false);

  const form = useForm({
    initialValues: {
      batch: "",
      title: "",
      link: "",
      company: "",
      location: "",
      stipend: "",
      duration: "",
      sendNotification: false,
    },
  });

  const handleRegister = (formValue: any) => {
    setSuccessful(false);
    UserService.addInternship(formValue).then(
      (response) => {
        setSuccessful(true);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
      }
    );
  };

  const CheckboxIcon: CheckboxProps["icon"] = ({ indeterminate, className }) =>
    indeterminate ? (
      <IconBell className={className} />
    ) : (
      <IconBell className={className} />
    );

  const { user: currentUser } = useSelector((state: any) => state.auth);
  const batchValues = batches.map((batch) => {
    return batch.year;
  });
  batchValues.push("Open-Source");

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Container size={420} my={40}>
      {
        <>
          <Title
            align="center"
            sx={(theme) => ({
              fontWeight: 900,
            })}
          >
            Add New Internship
          </Title>
        </>
      }

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {!successful && (
          <form onSubmit={form.onSubmit(handleRegister)} autoComplete="off">
            <Select
              label="Batch/Type"
              placeholder="Select Batch"
              searchable
              nothingFound="No Batch Found"
              maxDropdownHeight={280}
              {...form.getInputProps("batch")}
              required
              data={batchValues}
            />
            <TextInput
              label="Title"
              mt="md"
              placeholder="SWE Internship"
              required
              {...form.getInputProps("title")}
            />
            <TextInput
              label="Link"
              mt="md"
              placeholder="https://..../."
              required
              {...form.getInputProps("link")}
            />
            <TextInput
              label="Company"
              mt="md"
              placeholder="Microsoft"
              required
              {...form.getInputProps("company")}
            />
            <TextInput
              label="Location"
              mt="md"
              placeholder="Remote"
              required
              {...form.getInputProps("location")}
            />
            <TextInput
              label="Stipend"
              mt="md"
              placeholder="30K"
              required
              {...form.getInputProps("stipend")}
            />
            <TextInput
              label="Duration"
              mt="md"
              placeholder="3 Months"
              required
              {...form.getInputProps("duration")}
            />
            <Group position="apart" mt="lg">
              <Checkbox
                icon={CheckboxIcon}
                label="Notify Users via Push?"
                description="It would send notification to all users!"
                {...form.getInputProps("sendNotification")}
              />
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Add Internship
            </Button>
          </form>
        )}
        {successful && (
          <>
            <Text>Internship Added Successfully!</Text>
          </>
        )}
      </Paper>
    </Container>
  );
}
