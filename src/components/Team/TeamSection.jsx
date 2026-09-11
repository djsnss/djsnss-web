import React from 'react';
import MemberGridSection from './MemberGridSection';

export default function TeamSection({ title, members, ...rest }) {
  return (
    <MemberGridSection
      id={title ? title.toLowerCase().replace(/\s+/g, '-') : undefined}
      sectionTitle={title}
      members={members || []}
      {...rest}
    />
  );
}
