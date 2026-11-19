import React from 'react';
import { Clock, Award, Brain, TrendingUp } from 'lucide-react';

interface ParentOverviewCardsProps {
  totalMinutes: number;
  totalQuests: number;
  overallAccuracy: number;
  streakDays: number;
}

export const ParentOverviewCards: React.FC<ParentOverviewCardsProps> = ({
  totalMinutes,
  totalQuests,
  overallAccuracy,
  streakDays,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-3xl p-5 card-elevation-1 border border-[#4C5CD0]/10">
        <div className="flex items-center justify-between text-gray-400 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Screen Time</span>
          <Clock className="w-4 h-4 text-[#4C5CD0]" />
        </div>
        <div className="text-2xl font-heading font-extrabold text-[#1F2340]">
          {totalMinutes} <span className="text-sm font-semibold text-gray-500">mins</span>
        </div>
        <div className="text-[11px] text-green-600 font-medium mt-1 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> Healthy active focus
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 card-elevation-1 border border-[#4C5CD0]/10">
        <div className="flex items-center justify-between text-gray-400 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Quests Solved</span>
          <Award className="w-4 h-4 text-[#2EC4B6]" />
        </div>
        <div className="text-2xl font-heading font-extrabold text-[#1F2340]">
          {totalQuests}
        </div>
        <div className="text-[11px] text-gray-500 font-medium mt-1">
          Across 4 core disciplines
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 card-elevation-1 border border-[#4C5CD0]/10">
        <div className="flex items-center justify-between text-gray-400 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Overall Accuracy</span>
          <Brain className="w-4 h-4 text-[#845EC2]" />
        </div>
        <div className="text-2xl font-heading font-extrabold text-[#1F2340]">
          {overallAccuracy}%
        </div>
        <div className="text-[11px] text-indigo-600 font-medium mt-1">
          High conceptual retention
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 card-elevation-1 border border-[#4C5CD0]/10">
        <div className="flex items-center justify-between text-gray-400 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Daily Streak</span>
          <span className="text-sm">🔥</span>
        </div>
        <div className="text-2xl font-heading font-extrabold text-[#FF9F1C]">
          {streakDays} <span className="text-sm font-semibold text-gray-500">days</span>
        </div>
        <div className="text-[11px] text-amber-600 font-medium mt-1">
          Consistent daily habits
        </div>
      </div>
    </div>
  );
};
