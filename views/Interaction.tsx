import React from 'react';
import { MOCK_COMMENTS } from '../constants';
import { MessageSquare, Heart, Share2, PlusCircle } from 'lucide-react';
import { User } from '../types';

interface InteractionProps {
  isEnglish: boolean;
  user: User;
}

export const Interaction: React.FC<InteractionProps> = ({ isEnglish, user }) => {
  return (
    <div className="pb-24 pt-4 md:pt-20 px-4 max-w-3xl mx-auto">
       <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isEnglish ? "Interaction Center" : "互动中心"}
          </h2>
          <p className="text-sm text-gray-500">
            {isEnglish ? "Find teammates & discuss events" : "寻找队友，讨论热门活动"}
          </p>
        </div>
        <button className="bg-pku-red text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-pku-light transition-colors shadow-sm">
          <PlusCircle className="w-4 h-4" />
          {isEnglish ? "New Post" : "发帖"}
        </button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 cursor-pointer hover:shadow-md transition-all">
          <h3 className="font-bold text-orange-800 mb-1">{isEnglish ? "Team Up" : "组队大厅"}</h3>
          <p className="text-xs text-orange-600">Find partners for sports, games, and projects.</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 cursor-pointer hover:shadow-md transition-all">
          <h3 className="font-bold text-blue-800 mb-1">{isEnglish ? "Lost & Found" : "失物招领"}</h3>
          <p className="text-xs text-blue-600">Campus items lost and found.</p>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
              LS
            </div>
            <div>
              <p className="font-semibold text-sm">Li Si</p>
              <p className="text-xs text-gray-400">Undergraduate • 10 mins ago</p>
            </div>
          </div>
          <p className="text-gray-800 text-sm mb-4 leading-relaxed">
            {isEnglish 
              ? "Anyone going to the AI lecture this afternoon? Looking for someone to walk with from the library." 
              : "下午的人工智能讲座有人一起去吗？求个图书馆出发的搭子。"}
          </p>
          <div className="flex items-center gap-6 text-gray-500 text-xs">
            <button className="flex items-center gap-1 hover:text-pku-red">
              <MessageSquare className="w-4 h-4" /> 3
            </button>
            <button className="flex items-center gap-1 hover:text-pku-red">
              <Heart className="w-4 h-4" /> 12
            </button>
            <button className="flex items-center gap-1 hover:text-pku-red">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        {MOCK_COMMENTS.map(comment => (
          <div key={comment.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                {comment.user[0]}
              </div>
              <div>
                <p className="font-semibold text-sm">{comment.user}</p>
                <p className="text-xs text-gray-400">{comment.timestamp}</p>
              </div>
            </div>
            <p className="text-gray-800 text-sm mb-4">{comment.content}</p>
             <div className="flex items-center gap-6 text-gray-500 text-xs">
              <button className="flex items-center gap-1 hover:text-pku-red">
                <Heart className="w-4 h-4" /> {comment.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};