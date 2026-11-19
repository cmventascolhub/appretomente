import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  Flame,
  Volume2,
  VolumeX,
  Shield,
  CheckCircle2,
  ChevronDown,
  ArrowLeft,
  Edit2,
  X,
  HelpCircle,
} from 'lucide-react';

export const HeaderHUD: React.FC = () => {
  const {
    stars,
    streakDays,
    dailyGoalCompleted,
    dailyGoalTarget,
    currentProfile,
    profiles,
    switchProfile,
    accessories,
    settings,
    toggleSound,
    openParentGate,
    navigateTo,
    currentView,
    openEditProfile,
    subjectStats,
    lastActivity,
    getProfileStars,
    getProfileLastActivity,
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isStarsBreakdownOpen, setIsStarsBreakdownOpen] = useState(false);

  const equippedAccessory = accessories.find((a) => a.id === currentProfile.accessoryId);
  const isNotHome = currentView !== 'adventure';

  return (
    <header className="sticky top-0 z-30 w-full bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#4C5CD0]/10 px-4 py-2.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left Side: Back button or Child Profile Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isNotHome && (
            <button
              type="button"
              onClick={() => navigateTo('adventure')}
              className="min-h-[48px] px-3.5 py-2 rounded-2xl bg-white border border-[#4C5CD0]/20 text-[#4C5CD0] hover:bg-indigo-50 flex items-center gap-1.5 font-heading font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
              title="Volver a la pantalla principal de Aventuras"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
          )}

          {/* Child Profile Avatar Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="min-h-[48px] flex items-center gap-2 p-1.5 pr-3 bg-white rounded-full border border-[#4C5CD0]/15 shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer group"
              title="Cambiar o editar perfil del niño o niña"
              aria-label="Seleccionar perfil"
            >
              <div className="relative w-9 h-9 rounded-full bg-[#FFF5E8] flex items-center justify-center text-xl shadow-inner border border-amber-200">
                <span>{currentProfile.avatar}</span>
                {equippedAccessory && (
                  <span className="absolute -top-1 -right-1 text-xs drop-shadow" title={equippedAccessory.name}>
                    {equippedAccessory.icon}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-xs font-semibold text-[#1F2340] leading-tight font-heading">
                  {currentProfile.name}
                </span>
                <span className="block text-[10px] text-gray-500 font-medium">
                  {currentProfile.age} años
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#4C5CD0] transition-colors" />
            </button>

            {/* Profile Dropdown with edit capability for each child */}
            {isProfileMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-[#4C5CD0]/15 p-3 z-50 animate-pop">
                <div className="flex items-center justify-between px-2 py-1 mb-1">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider font-heading">
                    2 Perfiles de Niños
                  </span>
                  <span className="text-[10px] font-bold text-[#4C5CD0] bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                    2 de 2 perfiles
                  </span>
                </div>

                <div className="space-y-2">
                  {profiles.map((profile, index) => {
                    const profileStars = getProfileStars(profile.id);
                    const profileLast = getProfileLastActivity(profile.id);
                    const isSelected = profile.id === currentProfile.id;

                    return (
                      <div
                        key={profile.id}
                        className={`flex items-center justify-between p-2 rounded-2xl transition-all ${
                          isSelected
                            ? 'bg-[#4C5CD0]/10 border border-[#4C5CD0]/30 shadow-xs'
                            : 'hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            switchProfile(profile.id);
                            setIsProfileMenuOpen(false);
                          }}
                          className="flex-1 min-h-[44px] flex items-center gap-2.5 px-1.5 text-left cursor-pointer"
                        >
                          <span className="text-2xl flex-shrink-0">{profile.avatar}</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-[9px] font-heading font-extrabold uppercase px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700">
                                Niño {index + 1}
                              </span>
                              {isSelected && (
                                <span className="text-[9px] font-bold text-[#4C5CD0]">
                                  (En uso)
                                </span>
                              )}
                            </div>
                            <div className="text-sm font-heading font-bold text-[#1F2340] leading-tight flex items-center justify-between gap-1">
                              <span className="truncate flex items-center gap-1">
                                {profile.name}
                                {isSelected && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4C5CD0] flex-shrink-0" />
                                )}
                              </span>
                              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-heading font-extrabold border border-amber-200/60 flex-shrink-0">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                                <span>{profileStars}</span>
                              </span>
                            </div>
                            <div className="text-[10px] text-gray-500 font-medium flex items-center gap-1.5 mt-0.5">
                              <span className="font-semibold text-gray-700">{profile.age} años</span>
                              <span>•</span>
                              <span className="text-indigo-600 truncate max-w-[130px]" title={profileLast?.title}>
                                {profileLast ? profileLast.title : 'Por explorar'}
                              </span>
                            </div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            openEditProfile(profile);
                            setIsProfileMenuOpen(false);
                          }}
                          className="min-w-[38px] min-h-[38px] flex items-center justify-center p-1.5 rounded-xl text-gray-400 hover:text-[#4C5CD0] hover:bg-white transition-all cursor-pointer flex-shrink-0"
                          title={`Editar nombre y edad de ${profile.name}`}
                          aria-label={`Editar ${profile.name}`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 mt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      openEditProfile(currentProfile);
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full min-h-[44px] py-2 px-3 rounded-xl bg-indigo-50 text-[#4C5CD0] hover:bg-indigo-100 font-heading font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Editar nombre de {currentProfile.name}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Tactical HUD */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Goal Badge */}
          {(() => {
            const isDailyGoalMet = dailyGoalCompleted >= dailyGoalTarget;
            return (
              <div
                className={`min-h-[44px] flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border shadow-sm text-xs font-bold transition-colors ${
                  isDailyGoalMet ? 'border-emerald-200 text-emerald-700' : 'border-[#4C5CD0]/10 text-[#1F2340]'
                }`}
                title={`Meta diaria: ${dailyGoalCompleted} de ${dailyGoalTarget} misiones completadas ${isDailyGoalMet ? '(¡Meta cumplida!)' : ''}`}
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <svg className="w-5 h-5 -rotate-90">
                    <circle
                      cx="10"
                      cy="10"
                      r="7"
                      fill="none"
                      stroke={isDailyGoalMet ? '#D1FAE5' : '#EDECFF'}
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="10"
                      cy="10"
                      r="7"
                      fill="none"
                      stroke={isDailyGoalMet ? '#10B981' : '#4C5CD0'}
                      strokeWidth="2.5"
                      strokeDasharray="44"
                      strokeDashoffset={44 - (44 * Math.min(dailyGoalCompleted, dailyGoalTarget)) / dailyGoalTarget}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    className={`absolute text-[8px] font-heading font-extrabold ${
                      isDailyGoalMet ? 'text-emerald-700' : 'text-[#4C5CD0]'
                    }`}
                  >
                    {isDailyGoalMet ? '✓' : dailyGoalCompleted}
                  </span>
                </div>
                <span
                  className={`font-heading font-extrabold ${
                    isDailyGoalMet ? 'text-emerald-700' : 'text-[#4C5CD0]'
                  }`}
                >
                  {dailyGoalCompleted}/{dailyGoalTarget}
                </span>
              </div>
            );
          })()}

          {/* Streak Flame Badge */}
          <div
            className="min-h-[44px] flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[#FF9F1C]/20 shadow-sm text-xs font-bold text-[#1F2340]"
            title={`Racha de ${streakDays} días consecutivos`}
          >
            <Flame className="w-4 h-4 text-[#FF9F1C] fill-[#FF9F1C] animate-bouncy" />
            <span className="font-heading font-extrabold text-[#FF9F1C]">{streakDays}</span>
            <span className="hidden sm:inline text-gray-500 font-medium">días</span>
          </div>

          {/* Star Counter Token with Interactive Breakdown Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsStarsBreakdownOpen(!isStarsBreakdownOpen)}
              className="min-h-[44px] flex items-center gap-1.5 px-3.5 py-1 bg-white hover:bg-[#FFFDF7] rounded-full border-2 border-[#FFC857]/40 shadow-sm cursor-pointer active:scale-95 transition-all group"
              title="Toca para ver el desglose exacto de estrellas por juego"
              aria-label="Ver desglose de estrellas"
            >
              <Star className="w-4 h-4 text-[#FFC857] fill-[#FFC857]" />
              <span className="font-heading font-extrabold text-sm text-[#1F2340]">
                {stars}
              </span>
            </button>

            {/* Breakdown Popover */}
            {isStarsBreakdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-3xl shadow-2xl border-2 border-[#FFC857]/30 p-4 z-50 animate-pop">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2.5">
                  <div className="flex items-center gap-1.5 font-heading font-extrabold text-xs text-[#1F2340]">
                    <Star className="w-4 h-4 fill-[#FFC857] text-[#FFC857]" />
                    <span>Estrellas de {currentProfile.name}: {stars}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsStarsBreakdownOpen(false)}
                    className="p-1 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Last Activity Card */}
                {lastActivity ? (
                  <div className="mb-3 p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-[11px]">
                    <div className="flex items-center justify-between text-amber-900 font-heading font-bold mb-0.5">
                      <span className="flex items-center gap-1">
                        <span>🎯</span> Última actividad:
                      </span>
                      <span className="px-1.5 py-0.5 bg-amber-200/60 rounded-md text-[10px] font-extrabold text-amber-800">
                        +{lastActivity.starsEarned} ⭐
                      </span>
                    </div>
                    <div className="font-semibold text-gray-800 truncate">{lastActivity.title}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      Aciertos: {lastActivity.score}/{lastActivity.maxScore} • {lastActivity.date}
                    </div>
                  </div>
                ) : (
                  <div className="mb-3 p-2 rounded-xl bg-gray-50 text-[11px] text-gray-500">
                    Aún no hay actividades registradas para {currentProfile.name}.
                  </div>
                )}

                <p className="text-[11px] text-gray-500 mb-2.5">
                  Total acumulado en las 4 materias de {currentProfile.name}:
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#E9F9F7] text-[#0B635B] font-medium">
                    <span className="flex items-center gap-1.5">
                      <span>🔢</span> <strong>Matemáticas</strong>
                    </span>
                    <span className="font-heading font-bold">{subjectStats.math.starsEarned} ⭐</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#FFF5E8] text-[#8C5200] font-medium">
                    <span className="flex items-center gap-1.5">
                      <span>🔤</span> <strong>Palabras & Fonética</strong>
                    </span>
                    <span className="font-heading font-bold">{subjectStats.language.starsEarned} ⭐</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#F3ECFA] text-[#4E2C83] font-medium">
                    <span className="flex items-center gap-1.5">
                      <span>🔮</span> <strong>Memoria</strong>
                    </span>
                    <span className="font-heading font-bold">{subjectStats.memory.starsEarned} ⭐</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#E4F7FC] text-[#005D71] font-medium">
                    <span className="flex items-center gap-1.5">
                      <span>🧩</span> <strong>Lógica</strong>
                    </span>
                    <span className="font-heading font-bold">{subjectStats.logic.starsEarned} ⭐</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-dashed border-gray-200 text-center text-[10px] text-gray-400 font-medium">
                  {subjectStats.math.starsEarned} + {subjectStats.language.starsEarned} + {subjectStats.memory.starsEarned} + {subjectStats.logic.starsEarned} = {stars} estrellas
                </div>
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label="Activar o silenciar sonidos"
            className="w-11 h-11 flex items-center justify-center bg-white rounded-full border border-[#4C5CD0]/10 shadow-sm text-gray-600 hover:text-[#4C5CD0] active:scale-95 transition-all cursor-pointer flex-shrink-0"
            title={settings.soundEffectsEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
          >
            {settings.soundEffectsEnabled ? (
              <Volume2 className="w-4 h-4 text-[#4C5CD0]" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {/* Parent Zone Button */}
          <button
            type="button"
            onClick={() => {
              if (currentView === 'parent-portal') {
                navigateTo('adventure');
              } else {
                openParentGate();
              }
            }}
            className={`min-h-[44px] flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-heading font-bold transition-all cursor-pointer ${
              currentView === 'parent-portal'
                ? 'bg-[#4C5CD0] text-white border-[#3946A6] shadow-sm'
                : 'bg-white text-gray-700 border-[#4C5CD0]/20 hover:border-[#4C5CD0]/40 hover:text-[#4C5CD0]'
            }`}
            title="Acceso exclusivo para padres y educadores"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {currentView === 'parent-portal' ? 'Volver a Aventuras' : 'Zona de Padres'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
