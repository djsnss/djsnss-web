import React from 'react';
import PolaroidCard from './PolaroidCard';

export default function TeamCard(props) {
  // Support both legacy props (image, position) and new props (photo, role)
  return (
    <PolaroidCard
      {...props}
      photo={props.photo || props.image}
      role={props.role || props.position}
    />
  );
}
