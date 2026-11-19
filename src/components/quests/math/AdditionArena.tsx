import React from 'react';
import { AdditionQuestion } from '../../../data/mockQuests';

interface AdditionArenaProps {
  question: AdditionQuestion;
  selectedOption: number | null;
}

export const AdditionArena: React.FC<AdditionArenaProps> = ({
  question,
  selectedOption,
}) => {
  const operator = question.operator || '+';
  const isLargeOrNumeric = question.showNumericCard || question.leftCount > 8 || question.rightCount > 8;

  return (
    <div className="mb-8">
      <div className="bg-[#E9F9F7] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-center gap-4 border border-[#2EC4B6]/20 shadow-inner">
        {isLargeOrNumeric ? (
          /* Numeric Challenge Card for Higher Level / 7+ years */
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-4 bg-white/90 rounded-2xl shadow-sm border border-teal-100">
            <div className="flex flex-col items-center px-4 py-3 bg-teal-50 rounded-2xl border border-teal-200">
              <span className="text-3xl sm:text-4xl">{question.itemEmoji}</span>
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0B635B] mt-1">
                {question.leftCount}
              </span>
            </div>

            <span className="text-3xl sm:text-4xl font-heading font-extrabold text-[#2EC4B6]">
              {operator}
            </span>

            <div className="flex flex-col items-center px-4 py-3 bg-teal-50 rounded-2xl border border-teal-200">
              <span className="text-3xl sm:text-4xl">{question.itemEmoji}</span>
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0B635B] mt-1">
                {question.rightCount}
              </span>
            </div>

            <span className="text-3xl sm:text-4xl font-heading font-extrabold text-[#2EC4B6]">=</span>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-dashed border-[#2EC4B6] flex items-center justify-center text-2xl sm:text-3xl font-heading font-extrabold text-[#0B635B] shadow-inner">
              {selectedOption !== null ? selectedOption : '?'}
            </div>
          </div>
        ) : (
          /* Visual Groups for 3-6 years */
          <>
            {/* Left group */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-white/70 rounded-2xl">
              {Array.from({ length: question.leftCount }).map((_, i) => (
                <span key={i} className="text-3xl sm:text-4xl">
                  {question.itemEmoji}
                </span>
              ))}
              <span className="text-xs font-bold text-gray-400 ml-1">
                ({question.leftCount})
              </span>
            </div>

            <span className="text-3xl font-heading font-extrabold text-[#2EC4B6]">
              {operator}
            </span>

            {/* Right group */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-white/70 rounded-2xl">
              {Array.from({ length: question.rightCount }).map((_, i) => (
                <span key={i} className="text-3xl sm:text-4xl">
                  {question.itemEmoji}
                </span>
              ))}
              <span className="text-xs font-bold text-gray-400 ml-1">
                ({question.rightCount})
              </span>
            </div>

            <span className="text-3xl font-heading font-extrabold text-[#2EC4B6]">=</span>

            <div className="w-16 h-16 rounded-2xl bg-white border-2 border-dashed border-[#2EC4B6] flex items-center justify-center text-2xl font-heading font-extrabold text-[#0B635B]">
              {selectedOption !== null ? selectedOption : '?'}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
