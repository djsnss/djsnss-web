import React from "react";
import styled from "styled-components";

const TeamCard = ({ name, position, image }) => {
  return (
    <StyledWrapper>
      <div className="card h-[250px] w-[200px] sm:h-[300px] sm:w-[250px]">
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1678811116814-26372fcfef1b?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={name}
          className="team-card-image"
        />
        <div className="textBox">
          <p className="text head">{name}</p>
          <span>at</span>
          {position === "Principal" ? (
            <p className="text price">DJSCE</p>
          ) : (
            <p className="text price">DJSNSS</p>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    background: #000;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
    font:family:poppins;
  }
  
  .card:hover {
    transform: scale(1.04) rotate(-1deg);
  }

  .team-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    scale: 0.95;
    transition: 0.2s ease-in-out;
  }

  .textBox {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: transparent;
    opacity: 0;
    transition: background 0.3s ease-in-out, opacity 0.3s ease-in-out;
    border-radius: 20px;
  }

  .textBox > .text {
    font-weight: bold;
  }

  .textBox > .head {
    font-size: 20px;
  }

  .textBox > .price {
    font-size: 17px;
  }

  .textBox > span {
    font-size: 12px;
    color: lightgrey;
  }

  .card:hover .textBox {
    opacity: 1;
    background: rgba(0, 0, 0, 0.5);
  }

  .card:hover .team-card-image {
    filter: blur(5px);
    transform: scale(1.1);
  }
`;

export default TeamCard;
