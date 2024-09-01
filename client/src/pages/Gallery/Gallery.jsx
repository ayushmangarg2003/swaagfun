import React, { useEffect, useState } from 'react'
import "./Gallery.css"
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { backendLink } from "../../utils/details"
import axios from 'axios';
import Shimmer from "../../components/Shimmer/Shimmer"

import { categories } from "../../utils/constants"
const Gallery = () => {

  const [loading, setLoading] = useState(true);
  const cat = useLocation().search;
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${backendLink}/api/gallery${cat}`
        );
        setLoading(false);
      } catch (error) {
        alert("Some Error Occured, Redirecting to Home Page")
        navigate('../')
        setLoading(false);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className='galleryParent'>
      <div className='categoryList'>
        <Link className='link' to={`/gallery`}><h6>ALL</h6></Link>
        {
          categories.map((item, index) => (
            <Link key={index} className='link' to={`/gallery/?cat=${item}`}><h6>{item.toLocaleUpperCase()}</h6></Link>
          ))
        }
      </div>
      <div>
        {loading ? (
          <div className='shimmer-parent'>
            <Shimmer />
          </div>
        ) : <div>
        </div>}
      </div>

    </div>
  )
}

export default Gallery