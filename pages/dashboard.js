import {auth, db} from '../utils/firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import { where, onSnapshot, deleteDoc, collection, query, doc } from '../node_modules/@firebase/firestore';
import {BsTrash2Fill} from 'react-icons/bs';
import {AiFillEdit} from 'react-icons/ai';
import Link from "next/link";
import Message from "../components/message";
import {toast} from "react-toastify";


export default function Dashboard(){
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    //See if user is logged in
    
    const getData = async () => {
if(loading) return;
if(!user) return route.push('/auth/login');
const collectionRef = collection(db, 'posts');
const q = query(collectionRef, where('user', '==', user.uid));
const unsubscribe = onSnapshot(q, (snapshot) => {
    setPosts(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
});
return unsubscribe
};

//Delete posts
const deletePost = async (id) => {
    const docRef = doc(db, 'posts', id)
    await deleteDoc(docRef);
    toast.success('Post has been deleted!', {position: toast.POSITION.TOP_CENTER,
        autoClose: 1500} )
}

//Get users data
useEffect(() => {
        getData();    
}, [user, loading]);

    return (
<div>
    <h1>Your posts</h1>
    <div>
    {posts.map((post) => {
        return (
<Message 
    {...post} 
    key={post.id}>
<div className="flex gap-4">
    <button 
        onClick={() => deletePost(post.id)} 
        className="text-red-600 flex items-center justify-center gap-2 py-2 text-sm">
    <BsTrash2Fill 
            className="text-2xl" />Delete
    </button>
    <Link href={{pathname: "/post", query: post}}>
    <button 
        className="text-teal-600 flex items-center justify-center gap-2 py-2 text-sm">
        <AiFillEdit 
            className="text-2xl"  />Edit
    </button>
    </Link>
    </div>
    </Message>
)
    })}
    </div>
    <button className="hover:bg-gray-700 text-white bg-gray-800 py-2 px-4 my-6" onClick={() => auth.signOut()}>Sign out</button>
</div>
    );
}