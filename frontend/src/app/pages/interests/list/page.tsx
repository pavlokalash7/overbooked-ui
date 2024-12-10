'use client';

import React, { useState } from 'react';
import { Book, CircleHelp, Film, Newspaper } from 'lucide-react';

import { GetInterests } from '@/app/pages/interests/list/form';
import { Badge } from '@/components/ui/badge';

const GetInterestsPage: React.FC = () => {
  const [ recommendations, setRecommendations ] = useState<
    { type: string; value: string; icon: React.ComponentType }[]
  >([]);
  const [ preferences, setPreferences ] = useState<string[]>([]);

  const handleFetch = (data: {
    recommendations: string[];
    interests: string[];
  }) => {
    const iconMapping = [
      {
        key: 'book',
        icon: Book,
      },
      {
        key: 'article',
        icon: Newspaper,
      },
      {
        key: 'movie',
        icon: Film,
      },
    ];

    const modifiedInterests = data.recommendations.map((item) => {
      const splitted = item.split(':');
      return {
        type: splitted[0],
        icon:
          iconMapping.find((i) => i.key === splitted[0].toLowerCase())?.icon ||
          CircleHelp,
        value: splitted[1],
      };
    });

    setRecommendations(modifiedInterests);
    setPreferences(data.interests);
  };

  return (
    <div className="p-10 flex flex-col space-y-8 w-full">
      <GetInterests onFetch={handleFetch}/>

      {recommendations.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold mb-2">Interests</h2>
          {recommendations.map((item, index) => (
            <Badge key={index} className="flex items-center gap-2 p-2 mb-2 text-sm">
              <item.icon/>
              {item.value}
            </Badge>
          ))}
        </div>
      ) : preferences.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold">Interests</h2>
          <p className="uppercase font-bold text-sm text-red-500">
            No interests found!
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GetInterestsPage;
