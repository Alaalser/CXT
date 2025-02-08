import React from 'react';

interface NoteCardProps {
  title: string;
  content: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content }) => {
  return (
    <div>
      <h2 className='text-black'>{title}</h2>
      <p className='text-black'>{content}</p>
    </div>
  );
};

export default NoteCard;