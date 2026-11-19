import React from 'react';
import { Printer } from 'lucide-react';
import { ChildProfile } from '../../types';
import { TactileButton } from '../common/TactileButton';
import { soundEffects } from '../../utils/audio';

interface MilestoneCertificateProps {
  currentProfile: ChildProfile;
  stars: number;
  soundEnabled: boolean;
}

export const MilestoneCertificate: React.FC<MilestoneCertificateProps> = ({
  currentProfile,
  stars,
  soundEnabled,
}) => {
  const handlePrint = () => {
    soundEffects.playStar(soundEnabled);
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Celebrate your child's hard work with an official printable certificate of achievement!
        </p>
        <TactileButton
          type="button"
          variant="primary"
          size="sm"
          onClick={handlePrint}
        >
          <Printer className="w-4 h-4" />
          <span>Print Certificate</span>
        </TactileButton>
      </div>

      {/* Printable Certificate Canvas */}
      <div className="bg-[#FFFDF7] rounded-3xl p-8 sm:p-12 border-8 border-[#4C5CD0] text-center shadow-xl relative overflow-hidden print:border-8 print:p-8">
        {/* Corner embellishments */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-[#FFC857]" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#FFC857]" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#FFC857]" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-[#FFC857]" />

        <div className="w-20 h-20 mx-auto rounded-3xl bg-[#FFF5E8] border-2 border-[#FFC857] flex items-center justify-center text-4xl mb-4 shadow-sm">
          🏆
        </div>

        <div className="text-xs font-heading font-extrabold text-[#4C5CD0] uppercase tracking-widest mb-1">
          PLAYFUL PRECISION EARLY LEARNING ACADEMY
        </div>

        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1F2340] tracking-tight mb-2">
          Certificate of Achievement
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          This distinguished award is proudly presented to
        </p>

        <div className="inline-block px-8 py-3 bg-white rounded-2xl border-b-4 border-[#4C5CD0] text-2xl sm:text-3xl font-heading font-extrabold text-[#4C5CD0] mb-6 shadow-sm">
          {currentProfile.name}
        </div>

        <p className="max-w-md mx-auto text-sm text-gray-700 leading-relaxed mb-8">
          For demonstrating extraordinary curiosity, cognitive deduction, and joyful perseverance
          across <strong>Math, Language, Memory, and Logic</strong> adventures, earning{' '}
          <strong>{stars} Stars</strong> and maintaining a radiant learning streak!
        </p>

        <div className="flex items-center justify-around pt-6 border-t-2 border-dashed border-[#4C5CD0]/20 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-sm font-heading font-bold text-[#1F2340]">
              Verified Parent Portal
            </div>
            <div className="text-[11px] text-gray-400">Authentic Milestone</div>
          </div>

          <div className="text-center">
            <div className="text-sm font-heading font-bold text-[#1F2340]">
              {new Date().toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="text-[11px] text-gray-400">Date Awarded</div>
          </div>
        </div>
      </div>
    </div>
  );
};
