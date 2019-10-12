import React from "react";
const Like = props => {
  const liked = props.liked;
  const style = liked ? "fas" : "far";
  return (
    <button
      onClick={props.onLike}
      className={`${style} fa-heart fa-lg btn btn-link`}
      style={{ color: "#ff6b6b", textDecoration: "none" }}
    ></button>
  );
};

export default Like;
