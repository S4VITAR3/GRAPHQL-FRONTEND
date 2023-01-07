import { gql, useQuery } from "@apollo/client";
import Eliminar from "./Eliminar";
import './App.css';
import { useMutation } from "urql";

const ALL_MOVIES = gql`
  query {
    mostrar {
      id
      nombre
      apellidos
      edad
      pais
    }
  }
`;

const DELETE_USER = gql`
  mutation{
    deletePost(id: $id)
  }
`;


const App = () => {
  const { error, loading, data } = useQuery(ALL_MOVIES);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleOnClick = (id) => {
    deleteUser({variables: {id: id}});
    alert('eliminado');
  }

  if (error) return <p>{error.message}</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div className="tabla">
      <h2 className="titulo">CRUD CON MONGODB Y REACT</h2>
      <table class="table table-striped w-50 m-auto mt-4" id="tabla1">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.mostrar.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.nombre}</td>
              <td>{movie.apellidos}</td>
              <td>{movie.edad}</td>
              <td>{movie.pais}</td>
              <td>
                <button className="btnedit" type="button"><img className="editar" src="https://cdn-icons-png.flaticon.com/512/1160/1160515.png" width="30px" height="30px" alt=""></img></button>
                <button onClick={ () => handleOnClick(movie.id)} className="btnedit" type="button"><img className="eliminar" width="30px" height="30px" alt="" src="https://cdn-icons-png.flaticon.com/512/3221/3221897.png"></img></button></td>
            </tr>
          ))
          }

        </tbody>
      </table>
    </div>
  );
}

export default App;
