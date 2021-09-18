import React, { Children, createContext, useEffect, useState } from "react";

const AppContext = createContext();

const local_list = "LIST"
const localData = ()=>{
    const data = localStorage.getItem(local_list)
    return JSON.parse(data);
}
localData();
const AppProvider = ({children})=>{
    const [item,setItem] = useState('');
    const [list,setList] = useState(localData);
    const [isEditing,setIsEditing]=useState({edit:false,name:"",id:null});
    const [error,setError]=useState({show:false,msg:""})
    let timeout;

    const handleSubmit = (e)=>{
      e.preventDefault();
      errorBox();
      if(!item)return;
      if(isEditing.edit){
          const {name,id}=isEditing;
          const data = list.map((grocery)=>{
              if(grocery.id === id){
                  return {
                      ...grocery,name:item
                  }
              }
              return grocery;
          })
          setList(data)
          setIsEditing({edit:false})
          setItem('') 
          errorBox(true,"item just Edited")
      }else{
          setList([...list,{id:Math.random().toString(),name:item }])
          setItem('')
      }
    }

    const setLocalStorage = ()=>{
        localStorage.setItem(local_list,JSON.stringify(list));
    }
    const handleDelete = (e)=>{
        const target = e.target.dataset.class;
        const targetParent = e.target.parentNode.dataset.id;
        if(target === "delete"){
            const newList = list.filter(item=>item.id !==targetParent)
            setList(newList)
            errorBox(true,"item have deleted!")
        }
        if(target === "Edit"){
            const editItem = list.find(item=>item.id===targetParent)
            setIsEditing({edit:true,name:editItem.name,id:targetParent})
            setItem(editItem.name)
            errorBox(true,"Edit Mode")
        }
    }
    const errorBox = (show=false,msg="")=>{
        setError({show,msg})
    }
    useEffect(()=>{
        setLocalStorage();
        timeout = setTimeout(() => {
            errorBox();
        }, 3000);
        return ()=> clearTimeout(timeout)
    },[list,isEditing,item])
    return(
        <AppContext.Provider value={{handleSubmit,item,setItem,list,handleDelete,isEditing,error}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppProvider,AppContext};