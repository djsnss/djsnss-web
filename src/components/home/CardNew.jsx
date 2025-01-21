import React from 'react';
import styled from 'styled-components';
import Logo from "../../assets/aboutus.jpg"

const CardNew = ({img,name,position}) => {
  return (
    <StyledWrapper>
      <div className="card h-[300px] sm:h-[200px] flex-col sm:flex-row">
        <img src={Logo} alt={name} className=''/>
        
        <div className='block sm:hidden'>
          <p className="card__title text-center ">{name}</p>
          <p className="card__description text-center">{position}</p>
        </div>
        
        <div className="card__content hidden sm:block">
          <p className="card__title text-center ">{name}</p>
          <p className="card__description text-center">{position}</p>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 300px;
    background-color: #f2f2f2;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: start;
    overflow: hidden;
    perspective: 1000px;
    box-shadow: 0 0 0 5px #ffffff80;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
  }

  .card__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f2f2f2;
    opacity: 0.9;
    transform: rotateX(-90deg);
    transform-origin: bottom;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card:hover .card__content {
    transform: rotateX(0deg);
  }

  .card__title {
    margin: 0;
    font-size: 24px;
    color: #333;
    font-weight: 700;
  }

  .card__description {
    margin: 10px 0 0;
    font-size: 14px;
    color: #777;
    line-height: 1.4;
  }`;

export default CardNew;
