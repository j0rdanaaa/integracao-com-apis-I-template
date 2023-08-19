import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const User = styled.div`
  border: black 1px solid;
  margin-top: 8px;
  width: 350px;
  padding: 8px;
`;
function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  useEffect(() => {
    getUserById(props.usuario.id);
  }, [props.usuario]);

  const getUserById = (id) => {
    const headers = {
      headers: {
        Authorization: "jordana-goes-easley",
      },
    };

    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
        headers
      )
      .then((resp) => {
        setUsuario(resp.data);
        //console.log("sucesso by id", resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // exercício prática

  const editUser = (id) => {
    const body = {
      name: nome,
      email: email
    };
    const headers = {
      headers: {
        Authorization: "jordana-goes-easley",
      },
    };
    axios
      .put(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users$/${id}`, body, headers)
      .then(() => {
        props.allUserApi();
        setEmail("");
        setNome("");
        setEditar(false);
      })
      .catch((error) => {
        console.log("caso de erro", error);
      });
  };

  const deleteUser = (id) => {
   
    const headers = {
      headers: {
        Authorization: "jordana-goes-easley",
      },
    };
    axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`, headers) 
      .then(() => {
        props.allUserApi();
      })
      .catch((error) => {
        console.log("caso de erro", error);
      });
  };

  return (
    <User>
      {editar ? (
        <div>
          <p>Nome: {usuario.name}</p>
          <p>E-mail: {usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={()=>editUser(usuario.id)}>
            Enviar alterações
          </button>
        </div>
      ) : (
        <>
          <p>
            <strong>Nome:</strong> {usuario.name}
          </p>
          <p>
            <strong>E-mail:</strong> {usuario.email}
          </p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={()=>deleteUser(usuario.id)}>Excluir</button>
    </User>
  );
}

export default Usuario;
