import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './views/Home';
import { Interaction } from './views/Interaction';
import { MyActivities } from './views/MyActivities';
import { GeminiAssistant } from './components/GeminiAssistant';
import { ViewState, User, Activity } from './types';
import { MOCK_USER, ACTIVITIES } from './constants';
import { Languages } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [activities, setActivities] = useState<Activity[]>(ACTIVITIES);
  
  // Detect if user is International Student to toggle language by default
  const [isEnglish, setIsEnglish] = useState(user.role === 'International Student');

  const handleJoinActivity = (id: string) => {
    // Optimistic update
    setUser(prev => {
      if (prev.joinedActivities.includes(id)) return prev;
      return {
        ...prev,
        joinedActivities: [...prev.joinedActivities, id]
      };
    });
    
    // Update count on activity
    setActivities(prev => prev.map(a => 
      a.id === id ? { ...a, registeredCount: a.registeredCount + 1 } : a
    ));
  };

  const handleCompleteActivity = (id: string) => {
    // Move from joined to completed and add points
    setUser(prev => {
      if (!prev.joinedActivities.includes(id)) return prev;
      return {
        ...prev,
        joinedActivities: prev.joinedActivities.filter(a => a !== id),
        completedActivities: [...prev.completedActivities, id],
        points: prev.points + 50 // Award 50 points
      };
    });
    alert(isEnglish ? "Activity Completed! +50 Points" : "活动已完成！获得 50 积分");
  };

  const handleRedeemReward = (id: string, cost: number) => {
    setUser(prev => {
      if (prev.points < cost) return prev;
      return {
        ...prev,
        points: prev.points - cost,
        redeemedRewards: [...prev.redeemedRewards, id]
      };
    });
    alert(isEnglish ? "Reward Redeemed Successfully!" : "奖励兑换成功！");
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Home 
          activities={activities} 
          user={user} 
          isEnglish={isEnglish} 
          onJoinActivity={handleJoinActivity}
          setView={setCurrentView}
        />;
      case ViewState.INTERACTION:
        return <Interaction isEnglish={isEnglish} user={user} />;
      case ViewState.MY_ACTIVITIES:
        return <MyActivities 
          user={user} 
          activities={activities} 
          isEnglish={isEnglish} 
          onCompleteActivity={handleCompleteActivity}
          onRedeemReward={handleRedeemReward}
        />;
      case ViewState.ACTIVITIES:
         // Reusing Home with a filter could be better, but for now redirect Home
         return <Home 
          activities={activities} 
          user={user} 
          isEnglish={isEnglish} 
          onJoinActivity={handleJoinActivity}
          setView={setCurrentView}
        />;
      default:
        return <Home 
          activities={activities} 
          user={user} 
          isEnglish={isEnglish} 
          onJoinActivity={handleJoinActivity}
          setView={setCurrentView}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      <Navbar currentView={currentView} setView={setCurrentView} isEnglish={isEnglish} />
      
      {/* Global Language Toggle */}
      <button 
        onClick={() => setIsEnglish(!isEnglish)}
        className="fixed bottom-24 md:top-20 right-4 z-[40] bg-white/90 backdrop-blur text-gray-700 p-2 rounded-full shadow-md hover:bg-white transition-all border border-gray-200"
        title="Switch Language"
      >
        <Languages className="w-5 h-5" />
      </button>

      <main className="min-h-screen">
        {renderView()}
      </main>

      <GeminiAssistant user={user} activities={activities} isEnglish={isEnglish} />
    </div>
  );
};

export default App;