import React, { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AppContext } from "./context";

const List = ({name,id}) => {
  const {handleDelete}=useContext(AppContext)
  return (
    <article data-id={id} onClick={handleDelete} >
      <h3>{name}</h3>
      <button data-class="delete">X</button>
      <button data-class="Edit" >O</button>
    </article>
  );
};

export default List;
