import {
  Avatar,
  Table,
  Group,
  Text,
  Select,
  ScrollArea,
  Menu,
  Button,
  Loader,
  Center,
} from "@mantine/core";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import moment from "moment";
import { notifications } from "@mantine/notifications";
import {
  IconSettingsBolt,
  IconTrash,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const rolesData = ["USER", "MODERATOR", "ADMIN"];

export function AllUsers() {
  const changeRole = (userId: string, newRole: string) => {
    UserService.changeUserRole({ userId, newRole }).then(
      (response) => {},
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
      }
    );
  };

  const [users, setUsers] = useState([
    {
      username: "",
      email: "",
      _id: "",
      role: "",
      createdAt: "",
    },
  ]);

  const [stateUpdate, setStateUpdate] = useState(false);

  const handleDelete = (userId: string) => {
    UserService.deleteUser({ userId }).then(
      (response) => {
        setStateUpdate(!stateUpdate);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
      }
    );
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    UserService.getAllUsers().then(
      (response) => {
        setUsers(response.data);
        setIsLoading(false);
      },
      (error) => {
        const _Stats =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setUsers(_Stats);

        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
        setIsLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateUpdate]);

  const rows = users.map((item) => (
    <tr key={item.username}>
      <td>
        <Group spacing="sm">
          <Avatar
            size={40}
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${item.username}`}
            radius={40}
          />
          <div>
            <Text fz="sm" fw={500}>
              {item.username}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.email}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        <Select
          onChange={(value) => {
            changeRole(item._id, value!);
            notifications.show({
              title: `Role updated!`,
              message: `User Role successfully updated to ${value}! 😎`,
              autoClose: 5000,
            });
          }}
          data={rolesData}
          defaultValue={item.role}
          variant="unstyled"
        />
      </td>
      <td>{moment(item.createdAt).utcOffset("+5:30").format("DD-MM-YYYY")}</td>
      <td>
        <Menu
          transitionProps={{ transition: "pop" }}
          withArrow
          position="bottom-end"
          withinPortal
        >
          <Menu.Target>
            <Button
              variant="outline"
              color="yellow"
              compact
              leftIcon={<IconSettingsBolt size="1rem" stroke={1.5} />}
            >
              Actions
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                handleDelete(item._id);
              }}
              icon={<IconTrash size="1rem" stroke={1.5} />}
              color="red"
            >
              Delete User
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  const { user: currentUser } = useSelector((state: any) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {isLoading ? ( // Conditional rendering based on the loading status
        <Center>
          <Loader />
        </Center>
      ) : (
        <ScrollArea>
          <Table miw={800} verticalSpacing="sm">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      )}
    </>
  );
}
