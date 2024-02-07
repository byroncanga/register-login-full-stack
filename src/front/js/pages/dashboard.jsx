import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
  Button,
} from "@tremor/react";

const Dashboard = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      // Si no hay token, redirige al login
      navigate("/login");
    } else {
      // Si hay token, obtiene la lista de usuarios
      actions.userList();
    }
  }, [navigate, actions]);

  const handleClick = () => {
    actions.logout();
    navigate("/login");
  };

  return (
    <div>
      <Card>
        <Title className="p-3 bg-teal-100">
          Lista de Usuarios
          <Button className=" ml-5" onClick={handleClick}>
            Cerrar Sesión
          </Button>
        </Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>id</TableHeaderCell>
              <TableHeaderCell>email</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.user.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Text>{user.email}</Text>
                </TableCell>
                <TableCell>
                  <Badge color={user.is_active ? "emerald" : "red"}>
                    {user.is_active ? "Activo" : "No Activo"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
export default Dashboard;
