import React from "react";
import styled from "styled-components";
import { FaLinkedin } from "react-icons/fa";

const TeamCard = ({ name, position, image, linkedin, title }) => {
  return (
    <StyledWrapper>
      <div className="card">
        {/* Image container */}
        <div className="image-container">
          <img
            src={
              image ||
              "https://images.unsplash.com/photo-1678811116814-26372fcfef1b?q=80&w=3388&auto=format&fit=crop"
            }
            alt={name}
            className="team-card-image"
          />
        </div>

        {/* Content area */}
        <div className="content">
          <div className="name-section">
            <h3 className="team-card-name">{name}</h3>
          </div>

          <div className="position-section">
            <p className="text head">{position}</p>
          </div>

          {linkedin && (
            <div className="linkedin-section">
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="linkedin-icon" />
              </a>
            </div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 400px;
    height: max;
    background: #ffffff;
    border-radius: 50px;
    box-shadow: 4px 4px 4px 0px #00000040;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    transition: transform 0.25s ease-in-out;
  }

  .card:hover {
    transform: scale(1.04) rotate(-1deg);
  }

  /* Image container */
  .image-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 20px 10px;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    overflow: hidden;
  }

  .team-card-image {
    width: 80%;
    aspect-ratio: 1 / 1;
    border-radius: 30px;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
  }

  .card:hover .team-card-image {
    transform: scale(1.1);
  }

  .content {
    padding: 20px;
    width: 100%;
    text-align: center;
  }

  .name-section {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .team-card-name {
    font-size: 22px;
    font-weight: 700;
    color: #000;
    cursor: pointer;
  }

  .position-section {
    margin-top: 8px;
    color: #333;
  }

  .head {
    font-weight: bold;
    font-size: 18px;
  }

  /* Centered LinkedIn icon */
  .linkedin-section {
    display: flex;
    justify-content: center;
    margin-top: 12px;
  }

  .linkedin-icon {
    font-size: 30px;
    color: #0077b5;
    cursor: pointer;
    transition: color 0.2s;
  }

  .linkedin-icon:hover {
    color: #005582;
  }
`;

export default TeamCard;
