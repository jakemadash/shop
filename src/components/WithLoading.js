import React from "react";
import { RotatingLines } from "react-loader-spinner";

const WithLoading = (Component) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading)
      return (
        <div className="loading" aria-label="loading">
          <RotatingLines
            strokeColor="rgb(77, 78, 146)"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      );
    else return <Component {...props} />;
  };
};

export default WithLoading;
