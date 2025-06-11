import React,{useEffect,useState} from "react"
import { auth,db } from "../firebase";
import { doc,getDoc } from "firebase/firestore";
import styles from './MainContent.module.css';


export const ProfileName = () => {
    const [userDetails,setUserDetails] = useState(null);
    const fetchUserData = async () => {
        auth.onAuthStateChanged(async(user)=>{
            const docRef = doc(db,"Users",user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setUserDetails(docSnap.data());
            }else{
                console.log("no data");
            }
        });
    };

    useEffect(()=>{
        fetchUserData();
        console.log("x");
        
    },[]);

    

    return(
        userDetails?(
            <div className={styles.profileName}>
                <span>Hello <b>{userDetails.fName.split(" ")[0]}</b></span>
            </div>
        ):(
            <div>
                .....
            </div>
        )
    )
}