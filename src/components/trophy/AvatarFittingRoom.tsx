import React, { useState } from 'react';
import { Star, Check, Lock, CheckCircle2 } from 'lucide-react';
import { AvatarAccessory, ChildProfile } from '../../types';
import { TactileButton } from '../common/TactileButton';

interface AvatarFittingRoomProps {
  currentProfile: ChildProfile;
  equippedItem?: AvatarAccessory;
  stars: number;
  accessories: AvatarAccessory[];
  onEquip: (id: string) => void;
  onBuy: (id: string) => void;
}

export const AvatarFittingRoom: React.FC<AvatarFittingRoomProps> = ({
  currentProfile,
  equippedItem,
  stars,
  accessories,
  onEquip,
  onBuy,
}) => {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleEquipItem = (item: AvatarAccessory) => {
    onEquip(item.id);
    const willEquip = currentProfile.accessoryId !== item.id;
    setFeedback(willEquip ? `¡Has equipado ${item.name}!` : `Has desequipado ${item.name}`);
    setTimeout(() => setFeedback(null), 2200);
  };

  const handleBuyItem = (item: AvatarAccessory) => {
    onBuy(item.id);
    setFeedback(`¡Desbloqueaste ${item.name}!`);
    setTimeout(() => setFeedback(null), 2200);
  };

  return (
    <div className="space-y-6 animate-fadeIn relative">
      {/* Toast Feedback */}
      {feedback && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 bg-[#1F2340] text-white px-4 py-2.5 rounded-full text-xs font-heading font-bold flex items-center gap-2 shadow-xl animate-pop border border-white/20">
          <CheckCircle2 className="w-4 h-4 text-[#FFC857]" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Avatar Live Fitting Room Card */}
      <div className="bg-gradient-to-r from-[#F3ECFA] to-[#FFFDF7] rounded-3xl p-6 border-2 border-[#845EC2]/20 card-elevation-1 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative w-24 h-24 rounded-3xl bg-white shadow-md border-2 border-[#845EC2]/20 flex items-center justify-center text-5xl">
            <span>{currentProfile.avatar}</span>
            {equippedItem && (
              <span className="absolute -top-3 -right-3 text-2xl drop-shadow animate-bouncy">
                {equippedItem.icon}
              </span>
            )}
          </div>
          <div>
            <span className="text-xs font-heading font-extrabold uppercase text-[#845EC2] tracking-wider">
              Vestuario de Explorador
            </span>
            <h2 className="text-xl font-heading font-extrabold text-[#1F2340]">
              {currentProfile.name}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Lleva puesto:{' '}
              <strong>{equippedItem ? equippedItem.name : 'Ningún accesorio equipado'}</strong>
            </p>
          </div>
        </div>

        {/* Stars Balance Display */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#FFC857]/30 shadow-sm">
          <Star className="w-5 h-5 fill-[#FFC857] text-[#FFC857]" />
          <div className="text-left">
            <div className="text-[10px] font-bold text-gray-400 uppercase leading-none">
              Tus Estrellas
            </div>
            <div className="text-lg font-heading font-extrabold text-[#1F2340] leading-tight">
              {stars}
            </div>
          </div>
        </div>
      </div>

      {/* Accessories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {accessories.map((item) => {
          const isEquipped = currentProfile.accessoryId === item.id;
          const canAfford = stars >= item.price;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-5 card-elevation-1 border flex flex-col justify-between transition-all ${
                isEquipped
                  ? 'border-2 border-[#845EC2] shadow-md ring-2 ring-[#845EC2]/20'
                  : 'border-gray-100'
              }`}
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FFFDF7] border border-gray-100 flex items-center justify-center text-4xl mb-3 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-heading font-extrabold text-sm text-[#1F2340] line-clamp-1">
                  {item.name}
                </h3>
                <div className="text-[11px] text-gray-400 font-medium capitalize">
                  {item.type === 'hat' ? 'Sombrero' : item.type === 'glasses' ? 'Gafas' : item.type === 'cape' ? 'Capa' : 'Medalla'}
                </div>
              </div>

              {item.unlocked ? (
                <TactileButton
                  type="button"
                  variant={isEquipped ? 'memory' : 'white'}
                  size="sm"
                  fullWidth
                  onClick={() => handleEquipItem(item)}
                  className={`min-h-[48px] ${!isEquipped ? 'text-[#845EC2]' : ''}`}
                >
                  {isEquipped ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Equipado
                    </>
                  ) : (
                    'Equipar'
                  )}
                </TactileButton>
              ) : (
                <TactileButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  fullWidth
                  disabled={!canAfford}
                  onClick={() => handleBuyItem(item)}
                  className="min-h-[48px]"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{item.price} Estrellas</span>
                </TactileButton>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
