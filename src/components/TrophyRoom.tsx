import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, ShoppingBag, ArrowLeft } from 'lucide-react';
import { AvatarFittingRoom } from './trophy/AvatarFittingRoom';
import { BadgesList } from './trophy/BadgesList';

export const TrophyRoom: React.FC = () => {
  const {
    stars,
    achievements,
    accessories,
    buyAccessory,
    equipAccessory,
    currentProfile,
    navigateTo,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'wardrobe' | 'badges'>('wardrobe');
  const equippedItem = accessories.find((a) => a.id === currentProfile.accessoryId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-28">
      {/* Top Header with Back button and Title matching button 'Trofeos' */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#4C5CD0]/10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('adventure')}
            className="min-h-[48px] px-3.5 py-2.5 rounded-2xl bg-white border border-[#4C5CD0]/15 text-[#1F2340] hover:bg-gray-50 flex items-center gap-2 font-heading font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
            title="Volver a Aventuras"
          >
            <ArrowLeft className="w-4 h-4 text-[#845EC2]" />
            <span>Atrás</span>
          </button>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold font-heading text-[#845EC2]">
              <Award className="w-3.5 h-3.5" />
              <span>Sala de Recompensas</span>
            </div>
            {/* Title matching button 'Trofeos' */}
            <h1 className="text-2xl font-heading font-extrabold text-[#1F2340]">
              Trofeos y Vestuario de {currentProfile.name}
            </h1>
          </div>
        </div>

        {/* Tab Buttons - min 48px touch */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-[#4C5CD0]/15 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab('wardrobe')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'wardrobe'
                ? 'bg-[#845EC2] text-white shadow-sm'
                : 'text-gray-500 hover:text-[#1F2340]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Vestuario</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('badges')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'badges'
                ? 'bg-[#845EC2] text-white shadow-sm'
                : 'text-gray-500 hover:text-[#1F2340]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Medallas Obtenidas</span>
          </button>
        </div>
      </div>

      {activeTab === 'wardrobe' && (
        <AvatarFittingRoom
          currentProfile={currentProfile}
          equippedItem={equippedItem}
          stars={stars}
          accessories={accessories}
          onEquip={equipAccessory}
          onBuy={buyAccessory}
        />
      )}

      {activeTab === 'badges' && <BadgesList achievements={achievements} />}
    </div>
  );
};
