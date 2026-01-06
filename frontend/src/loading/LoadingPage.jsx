import React from 'react';

const DarkSkeletonCard = () => {
  // The CSS is embedded within the component for encapsulation.
  // This allows us to use pseudo-selectors (::before) and @keyframes
  // which are not supported by standard inline styles in React.
  const styles = `
    .card {
      max-width: 250px;
      width: 100%;
      background: #242526; /* Dark background */
      padding: 30px;
      border-radius: 10px;
      border: 1px solid #393a3b; /* Dark border */
    }
    .card .header {
      display: flex;
      align-items: center;
    }
    .header .img {
      height: 45px;
      width: 45px;
      background: #3A3B3C; /* Darker placeholder color */
      border-radius: 50%;
      position: relative;
      overflow: hidden;
    }
    .header .details {
      margin-left: 20px;
    }
    .details span {
      display: block;
      background: #3A3B3C; /* Darker placeholder color */
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }
    .details .name {
      height: 12px;
      width: 70px;
    }
    .details .about {
      height: 13px;
      width: 120px;
      margin-top: 10px;
    }
    .card .description {
      margin: 25px 0;
    }
    .description .line {
      background: #3A3B3C; /* Darker placeholder color */
      border-radius: 10px;
      height: 11px;
      margin: 10px 0;
      overflow: hidden;
      position: relative;
    }
    .description .line-1 {
      width: calc(100% - 15%);
    }
    .description .line-3 {
      width: calc(100% - 40%);
    }
    .card .btns {
      display: flex;
    }
    .card .btns .btn {
      height: 25px;
      width: 100%;
      background: #3A3B3C; /* Darker placeholder color */
      border-radius: 25px;
      position: relative;
      overflow: hidden;
    }
    .btns .btn-1 {
      margin-right: 8px;
    }
    .btns .btn-2 {
      margin-left: 8px;
    }

    /* Shimmer Animation for Dark Theme */
    .header .img::before,
    .details span::before,
    .description .line::before,
    .btns .btn::before {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      background-image: linear-gradient(
        to right,
        #3A3B3C 0%,
        #4E4F50 20%, /* Lighter shade for shimmer effect */
        #3A3B3C 40%,
        #3A3B3C 100%
      );
      background-repeat: no-repeat;
      background-size: 450px 400px;
      animation: shimmer 1s linear infinite;
    }
    .header .img::before {
      background-size: 650px 600px;
    }
    .details span::before {
      animation-delay: 0.2s;
    }
    .btns .btn-2::before {
      animation-delay: 0.22s;
    }
    @keyframes shimmer {
      0% {
        background-position: -450px 0;
      }
      100% {
        background-position: 450px 0;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      {/* From Uiverse.io by elijahgummer */}
      <div className="card">
        <div className="header">
          <div className="img"></div>
          <div className="details">
            <span className="name"></span>
            <span className="about"></span>
          </div>
        </div>
        <div className="description">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
        </div>
        <div className="btns">
          <div className="btn btn-1"></div>
          <div className="btn btn-2"></div>
        </div>
      </div>
    </>
  );
};

export default DarkSkeletonCard;