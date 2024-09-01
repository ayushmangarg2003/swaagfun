import React from 'react'
import { ShimmerSimpleGallery } from "react-shimmer-effects-18";
import "./Shimmer.css"

const Shimmer = () => {
  return (
    <div className="shimmer">
      <ShimmerSimpleGallery card imageHeight={300} />
    </div>)
}

export default Shimmer