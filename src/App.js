import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
// import {readDocs} from "./firebase/operation"
import {
  createBrowserRouter,
} from "react-router-dom";
import Root from './component/root';
import HomePage from './pages/homepage';
import BlogForm from "./pages/createblog";
import ListView from './pages/listview';
import BlogView from './pages/blogview'
import CardView from './pages/cardview';
import { async } from 'regenerator-runtime';
import {FirestoreAPI} from "./firebase/operation"
import { db,getDB } from "./firebase/config";
import MasterView from './pages/masterpage';
const api = new FirestoreAPI(db)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      {
        path:"/",
        element: <HomePage/>,
        id:"home",
        loader:  async()=>{
          return await api.readDocs("Blogs")
        },
      },
      {
        path:"/blog/create",
        element:<BlogForm/>
      },
      {
        path:"/blog/:id",
        loader:async ({ params })=>{
          return await api.readDoc("Blogs",params.id)
        },
        element:<BlogView/>
      }
      ,
      {
        path:"/blog/:id/edit",
        loader:async ({ params })=>{
          return await api.readDoc("Blogs",params.id)
        },
        element:<BlogForm/>
      }
    ]
  },
  {
    path: "/v2",
    element: <MasterView/>,
  }
]);


export default router;
