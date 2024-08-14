import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';

const UserGallery = () => {

  const [user, setUser] = useState(false)
  const [email, setEmail] = useState("")

  const [urls, setUrls] = useState([]);
  const storage = getStorage();
  const listRef = ref(storage, `images/${email}`);



  useEffect(() => {
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          console.log(itemRef);
          setUrls((arr) => [...arr, itemRef.name]);
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);


  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(true)
      setEmail(user.email)
    } else {
      setUser(false)
    }
  });

  return (
    <div className="userGalleryParent">
      {
        urls.map((url, index) => {
          // <div key={index}>{url}</div>
        })
      }
      <h1 className='userGalleryHeading'>{email}</h1>
    </div>
  )
}

export default UserGallery