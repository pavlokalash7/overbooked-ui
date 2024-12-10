'use client';

import React from 'react';

import { InterestsForm } from '@/app/pages/interests/create/form';

const CreateInterestsPage: React.FC = () => {
  return (
    <div className="p-10 flex-col w-96">
      <InterestsForm/>
    </div>
  );
};

export default CreateInterestsPage;
