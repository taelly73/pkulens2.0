import React from 'react';
import { Activity, UserRole } from '../types';
import { MapPin, Calendar, Users, Clock } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  userRole: UserRole;
  isEnglish: boolean;
  onJoin: (id: string) => void;
  isJoined: boolean;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  userRole, 
  isEnglish, 
  onJoin,
  isJoined
}) => {
  const displayTitle = (isEnglish && activity.titleEn) ? activity.titleEn : activity.title;
  const displayDesc = (isEnglish && activity.descriptionEn) ? activity.descriptionEn : activity.description;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={activity.image} 
          alt={displayTitle} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-pku-red uppercase tracking-wider">
          {activity.category}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 leading-tight">
          {displayTitle}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-pku-red" />
            <span>{activity.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-pku-red" />
            <span>{activity.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-pku-red" />
            <span className="truncate">{activity.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-pku-red" />
            <span>{activity.registeredCount} / {activity.maxCapacity} {isEnglish ? 'Joined' : '已报名'}</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 mb-4">
          {displayDesc}
        </p>

        <div className="mt-auto">
          <button 
            onClick={() => onJoin(activity.id)}
            disabled={isJoined}
            className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
              isJoined 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-pku-red text-white hover:bg-pku-light'
            }`}
          >
            {isJoined 
              ? (isEnglish ? 'Registered' : '已报名') 
              : (isEnglish ? 'Join Event' : '立即报名')}
          </button>
        </div>
      </div>
    </div>
  );
};