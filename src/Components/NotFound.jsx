import React from "react";

export default function NotFound() {
  return (
    <div className="notFound">
      <p className="fs-1 fw-bold">
        404 <i className="fa-regular fa-face-frown-open text-warning"></i>
      </p>
      <p className="text-center">
        You didn't break the internet <br /> but we can't find what you are
        looking for .
      </p>
    </div>
  );
}
