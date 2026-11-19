import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SubjectCategory } from '../types';
import { getAgeTierLabel } from '../data/mockQuests';
import { SubjectCard } from './adventure/SubjectCard';
import { TactileButton } from './common/TactileButton';
import { Sparkles, ArrowRight, Star, Trophy, X, Lightbulb } from 'lucide-react';

export const AdventureHub: React.FC = () => {
  const {
    currentProfile,
    profiles,
    switchProfile,
    getProfileStars,
    startQuest,
    openDailySpark,
    subjectStats,
    dailyGoalCompleted,
    dailyGoalTarget,
    navigateTo,
    accessories,
    lastActivity,
  } = useApp();

  const [showTip, setShowTip] = useState(true);

  const equippedAccessory = accessories.find((a) => a.id === currentProfile.accessoryId);
  const subjects: SubjectCategory[] = ['math', 'language', 'memory', 'logic'];

  const isGoalMet = dailyGoalCompleted >= dailyGoalTarget;
  const progressPercent = Math.min(100, Math.round((dailyGoalCompleted / Math.max(1, dailyGoalTarget)) * 100));

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-28">
      {/* 2-Children Direct Profile Switcher Bar */}
      <div className="mb-4 bg-white rounded-2xl p-2.5 sm:p-3 border border-[#4C5CD0]/15 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#4C5CD0]/10 text-[#4C5CD0] flex items-center justify-center font-heading font-extrabold text-sm">
            2
          </div>
          <div>
            <span className="text-xs font-heading font-bold text-[#1F2340] block leading-tight">
              Modo 2 Niños
            </span>
            <span className="text-[10px] text-gray-500 font-medium">
              Toca para cambiar de niño al instante
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:min-w-[340px]">
          {profiles.map((profile, idx) => {
            const isSelected = profile.id === currentProfile.id;
            const childStars = getProfileStars(profile.id);

            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => switchProfile(profile.id)}
                className={`min-h-[48px] px-3 py-2 rounded-xl flex items-center justify-between gap-2 border-2 transition-all cursor-pointer active:scale-98 ${
                  isSelected
                    ? 'bg-[#4C5CD0] text-white border-[#3946A6] shadow-sm'
                    : 'bg-[#FFFDF7] text-[#1F2340] border-gray-200 hover:bg-indigo-50/50 hover:border-[#4C5CD0]/40'
                }`}
                title={`Cambiar a ${profile.name} (${profile.age} años)`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-2xl flex-shrink-0">{profile.avatar}</span>
                  <div className="text-left min-w-0">
                    <div className="flex items-center gap-1">
                      <span className={`text-[9px] font-heading font-extrabold uppercase px-1 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                        Niño {idx + 1}
                      </span>
                      <span className="text-xs font-heading font-extrabold truncate">
                        {profile.name}
                      </span>
                    </div>
                    <span className={`text-[10px] block font-medium ${isSelected ? 'text-indigo-100' : 'text-gray-500'}`}>
                      {profile.age} años
                    </span>
                  </div>
                </div>

                <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-heading font-extrabold flex-shrink-0 ${
                  isSelected ? 'bg-amber-400 text-[#1F2340]' : 'bg-amber-100 text-amber-800'
                }`}>
                  ⭐ {childStars}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Welcome Card - Screen Title: Aventuras */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4C5CD0] to-[#3142b6] text-white p-6 sm:p-8 shadow-xl mb-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-[#FFC857]/15 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl sm:text-5xl border border-white/30 shadow-inner flex-shrink-0">
              <span>{currentProfile.avatar}</span>
              {equippedAccessory && (
                <span className="absolute -top-2 -right-2 text-xl drop-shadow">
                  {equippedAccessory.icon}
                </span>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-heading font-bold text-amber-200 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Centro de Aprendizaje</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/25 border border-amber-300/40 text-[11px] font-heading font-extrabold text-amber-200 backdrop-blur-sm">
                  <span>🎂 {currentProfile.age} años</span>
                  <span>•</span>
                  <span>{getAgeTierLabel(currentProfile.age)}</span>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
                Aventuras de {currentProfile.name}
              </h1>
              <p className="text-sm text-indigo-100 font-medium mt-0.5">
                ¿Qué misión divertida quieres conquistar hoy?
              </p>

              {/* Child's Last Activity Badge */}
              {lastActivity ? (
                <div className="mt-3 inline-flex flex-wrap items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/20 backdrop-blur-md text-xs border border-white/25">
                  <span className="font-heading font-bold text-amber-200">🎯 Última actividad:</span>
                  <span className="font-semibold text-white">{lastActivity.title}</span>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-400 text-[#1F2340] font-heading font-extrabold text-[10px]">
                    +{lastActivity.starsEarned} ⭐
                  </span>
                  <span className="text-[10px] text-indigo-200">({lastActivity.date})</span>
                </div>
              ) : (
                <div className="mt-2 text-xs text-indigo-200">
                  ¡Comienza una misión para ganar tus primeras estrellas!
                </div>
              )}
            </div>
          </div>

          {/* Daily Goal Quick Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-sm">
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider">
                  Meta del Día
                </span>
                {isGoalMet && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950 font-heading font-extrabold text-[10px] shadow-sm animate-pulse">
                    ✓ ¡Meta Lograda!
                  </span>
                )}
              </div>
              <div className="text-lg font-heading font-extrabold text-white mt-0.5 flex items-baseline gap-1.5">
                <span>{dailyGoalCompleted} de {dailyGoalTarget} completadas</span>
                {dailyGoalCompleted > dailyGoalTarget && (
                  <span className="text-xs text-amber-300 font-bold">
                    (+{dailyGoalCompleted - dailyGoalTarget} extra)
                  </span>
                )}
              </div>
              {/* Mini visual progress bar */}
              <div className="w-full sm:w-44 h-2 bg-black/25 rounded-full mt-2 overflow-hidden border border-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isGoalMet ? 'bg-gradient-to-r from-emerald-400 to-teal-300' : 'bg-gradient-to-r from-[#FFC857] to-[#FF9F1C]'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <TactileButton
              type="button"
              variant="secondary"
              size="sm"
              onClick={openDailySpark}
              className="flex-shrink-0"
            >
              <span>Reto Diario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </TactileButton>
          </div>
        </div>
      </div>

      {/* Onboarding Tip for First-Time Clarity */}
      {showTip && (
        <div className="mb-6 bg-indigo-50/80 border border-[#4C5CD0]/20 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs text-[#1F2340] animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#4C5CD0]/15 text-[#4C5CD0] flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <span className="font-heading font-bold text-[#4C5CD0]">Pista para empezar:</span>{' '}
              Toca el botón <strong>"Iniciar Aventura"</strong> en cualquiera de las 4 materias de abajo para comenzar tu primera misión interactiva.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowTip(false)}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg cursor-pointer"
            title="Cerrar sugerencia"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Featured Daily Spark Banner */}
      <div className="mb-8 bg-gradient-to-r from-[#FFF5E8] to-[#FFFDF7] rounded-3xl p-5 border-2 border-[#FF9F1C]/30 card-elevation-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FF9F1C] text-white flex items-center justify-center text-2xl shadow-md shadow-[#FF9F1C]/30 flex-shrink-0 animate-bouncy">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-heading font-extrabold text-[#FF9F1C] uppercase tracking-wider">
                Misión Especial de Hoy
              </span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#FFC857]/20 text-[#8C5200] text-[10px] font-bold">
                +8 Estrellas <Star className="w-3 h-3 fill-[#FFC857] text-[#FFC857]" />
              </span>
            </div>
            <h2 className="text-base font-heading font-extrabold text-[#1F2340]">
              Reto Diario: Caza de Gemas Cósmicas
            </h2>
          </div>
        </div>

        <TactileButton
          type="button"
          variant="secondary"
          size="sm"
          onClick={openDailySpark}
          className="self-start sm:self-auto"
        >
          <span>Jugar Reto Diario</span>
          <ArrowRight className="w-4 h-4" />
        </TactileButton>
      </div>

      {/* Subject Islands Grid */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-extrabold text-[#1F2340]">
              Misiones por Materia
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              4 disciplinas diseñadas con ritmo pedagógico estimulante
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('trophy')}
            className="min-h-[44px] flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-heading font-bold text-[#4C5CD0] hover:bg-indigo-50/60 transition-colors cursor-pointer"
          >
            <Trophy className="w-4 h-4" />
            <span>Ver Trofeos</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {subjects.map((subKey) => (
            <SubjectCard
              key={subKey}
              subjectKey={subKey}
              stats={subjectStats[subKey]}
              onStartQuest={startQuest}
            />
          ))}
        </div>
      </div>

      {/* Companion Wardrobe Shortcut */}
      <div className="bg-white rounded-3xl p-5 card-elevation-1 border border-[#4C5CD0]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EDECFF] flex items-center justify-center text-3xl">
            {currentProfile.avatar}
          </div>
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase">
              Compañero Actual
            </div>
            <div className="font-heading font-extrabold text-base text-[#1F2340]">
              {currentProfile.name} • {equippedAccessory ? equippedAccessory.name : '¡Listo para aprender!'}
            </div>
            {lastActivity && (
              <div className="text-xs text-gray-500 font-medium mt-0.5 flex items-center gap-1.5">
                <span className="text-[#4C5CD0] font-semibold">Último logro:</span>
                <span className="truncate max-w-xs">{lastActivity.title} (+{lastActivity.starsEarned} ⭐)</span>
              </div>
            )}
          </div>
        </div>

        <TactileButton
          type="button"
          variant="white"
          size="sm"
          onClick={() => navigateTo('trophy')}
          className="text-[#4C5CD0]"
        >
          <span>Vestuario y Trofeos</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </TactileButton>
      </div>
    </div>
  );
};
