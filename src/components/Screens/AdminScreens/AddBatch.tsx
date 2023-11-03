import {
    TextInput,
    Paper,
    Title,
    Text,
    Container,
    Button,
  } from "@mantine/core";
  import React, { useState } from "react";
  import { useForm } from "@mantine/form";
  import UserService from "../../../services/user.service";
  import { useSelector } from "react-redux";
  import { Navigate } from "react-router-dom";
  
  export function AddBatch() {
    const [successful, setSuccessful] = useState(false);
  
    const form = useForm({
      initialValues: {
        year: "",
      }
    });
  
    const handleRegister = (formValue: any) => {
      setSuccessful(false);
      UserService.addNewBatch(formValue).then(
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
  
    const { user: currentUser } = useSelector((state: any) => state.auth);
  
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
              Add New Batch
            </Title>
          </>
        }
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {!successful && (
            <form onSubmit={form.onSubmit(handleRegister)} autoComplete="off">
              <TextInput
                label="Batch Year"
                placeholder="2025"
                required
                {...form.getInputProps("year")}
              />
              <Button fullWidth mt="xl" type="submit">
                Add Batch
              </Button>
            </form>
          )}
          {successful && (
            <>
              <Text>Batch Added Successfully!</Text>
            </>
          )}
        </Paper>
      </Container>
    );
  }
  