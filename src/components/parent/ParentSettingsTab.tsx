import React, { useState } from 'react';
import { Sliders, CheckCircle2, Users, Edit2, RotateCcw } from 'lucide-react';
import { ParentSettings } from '../../types';
import { TactileButton } from '../common/TactileButton';
import { useApp } from '../../context/AppContext';

interface ParentSettingsTabProps {
  settings: ParentSettings;
  updateSettings: (newSettings: Partial<ParentSettings>) => void;
}

export const ParentSettingsTab: React.FC<ParentSettingsTabProps> = ({
  settings,
  updateSettings,
}) => {
  const { profiles, openEditProfile, currentProfile, resetAllProgress } = useApp();
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleUpdate = (partial: Partial<ParentSettings>, label: string) => {
    updateSettings(partial);
    setSaveNotice(`Cambio guardado: ${label}`);
    setTimeout(() => {
      setSaveNotice(null);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 card-elevation-1 border border-[#4C5CD0]/10 max-w-2xl mx-auto animate-fadeIn relative space-y-8">
      {/* Visual Save Feedback Toast */}
      {saveNotice && (
        <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-800 border border-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold font-heading flex items-center gap-1.5 shadow-sm animate-pop">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{saveNotice}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-2xl bg-[#4C5CD0]/10 flex items-center justify-center text-[#4C5CD0]">
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-extrabold text-[#1F2340]">
            Controles Parentales y Preferencias
          </h2>
          <p className="text-xs text-gray-500">
            Personaliza los nombres de los niños por edad, límites de tiempo y dificultad
          </p>
        </div>
      </div>

      {/* SECTION: Configuración exclusiva para 2 Niños */}
      <div className="space-y-3 bg-[#FFFDF7] p-5 rounded-3xl border-2 border-[#4C5CD0]/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#4C5CD0] text-white flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-sm text-[#1F2340]">
                Perfiles de los 2 Niños
              </h3>
              <p className="text-xs text-gray-500">
                Diseñado exclusivamente para el aprendizaje de dos niños. Toca "Editar" para cambiar su nombre o edad.
              </p>
            </div>
          </div>
          <span className="self-start sm:self-auto text-xs font-bold font-heading text-[#4C5CD0] bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
            2 de 2 perfiles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {profiles.map((profile, index) => {
            const isActive = profile.id === currentProfile.id;
            return (
              <div
                key={profile.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between shadow-sm transition-all ${
                  isActive
                    ? 'bg-indigo-50/70 border-[#4C5CD0] ring-1 ring-[#4C5CD0]/30'
                    : 'bg-white border-gray-200 hover:border-[#4C5CD0]/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF5E8] flex items-center justify-center text-2xl border border-amber-200 flex-shrink-0">
                    {profile.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-heading font-extrabold uppercase px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700">
                        Niño {index + 1}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-heading font-bold text-emerald-600 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>Activo</span>
                        </span>
                      )}
                    </div>
                    <div className="font-heading font-extrabold text-sm text-[#1F2340] leading-tight truncate mt-0.5">
                      {profile.name}
                    </div>
                    <div className="text-xs text-gray-500 font-medium mt-0.5">
                      Edad: <span className="font-bold text-[#4C5CD0]">{profile.age} años</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openEditProfile(profile)}
                  className="min-h-[44px] px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-[#4C5CD0] border border-[#4C5CD0]/20 font-heading font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xl flex-shrink-0"
                  title={`Editar nombre y edad de ${profile.name}`}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {/* Daily Quests Goal */}
        <div>
          <label className="block text-sm font-heading font-bold text-[#1F2340] mb-2">
            Meta diaria de misiones
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[2, 3, 4, 5].map((count) => (
              <TactileButton
                key={count}
                type="button"
                variant={settings.dailyQuestGoal === count ? 'primary' : 'white'}
                onClick={() => handleUpdate({ dailyQuestGoal: count }, `${count} misiones diarias`)}
                className="min-h-[48px]"
              >
                {count} Misiones
              </TactileButton>
            ))}
          </div>
        </div>

        {/* Screen Time Limit */}
        <div>
          <label className="block text-sm font-heading font-bold text-[#1F2340] mb-2">
            Límite de sesión recomendado
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[20, 30, 45].map((mins) => (
              <TactileButton
                key={mins}
                type="button"
                variant={settings.screenTimeLimitMinutes === mins ? 'primary' : 'white'}
                onClick={() => handleUpdate({ screenTimeLimitMinutes: mins }, `${mins} minutos`)}
                className="min-h-[48px]"
              >
                {mins} Minutos
              </TactileButton>
            ))}
          </div>
        </div>

        {/* Difficulty Mode */}
        <div>
          <label className="block text-sm font-heading font-bold text-[#1F2340] mb-2">
            Modelo de progresión cognitiva
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'gentle', label: 'Paso Suave' },
              { id: 'adaptive', label: 'Adaptativo (Auto)' },
              { id: 'challenging', label: 'Reto Avanzado' },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() =>
                  handleUpdate(
                    { difficultyPreference: mode.id as ParentSettings['difficultyPreference'] },
                    mode.label
                  )
                }
                className={`min-h-[48px] py-3 px-2 rounded-2xl font-heading font-bold text-xs text-center transition-all cursor-pointer ${
                  settings.difficultyPreference === mode.id
                    ? 'bg-[#4C5CD0] text-white shadow-md'
                    : 'btn-tactile-white text-[#1F2340]'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="pt-4 border-t border-gray-100 space-y-4">
          <div className="flex items-center justify-between min-h-[48px]">
            <div>
              <div className="text-sm font-heading font-bold text-[#1F2340]">
                Efectos de sonido y campanas
              </div>
              <div className="text-xs text-gray-500">
                Respuesta auditiva alegre al pulsar y acertar
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                handleUpdate(
                  { soundEffectsEnabled: !settings.soundEffectsEnabled },
                  settings.soundEffectsEnabled ? 'Sonido silenciado' : 'Sonido activado'
                )
              }
              aria-label="Alternar sonido"
              className={`w-14 h-8 rounded-full transition-colors relative cursor-pointer ${
                settings.soundEffectsEnabled ? 'bg-[#4C5CD0]' : 'bg-gray-200'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform ${
                  settings.soundEffectsEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between min-h-[48px]">
            <div>
              <div className="text-sm font-heading font-bold text-[#1F2340]">
                Modalidad Bilingüe (Español / Inglés)
              </div>
              <div className="text-xs text-gray-500">
                Pistas bilingües simultáneas en la sección de Palabras
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                handleUpdate(
                  {
                    languageMode: settings.languageMode === 'bilingual' ? 'en' : 'bilingual',
                  },
                  settings.languageMode === 'bilingual' ? 'Modo estándar' : 'Modo bilingüe'
                )
              }
              aria-label="Alternar modo bilingüe"
              className={`w-14 h-8 rounded-full transition-colors relative cursor-pointer ${
                settings.languageMode === 'bilingual' ? 'bg-[#4C5CD0]' : 'bg-gray-200'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform ${
                  settings.languageMode === 'bilingual' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Reset Progress Section */}
        <div className="pt-5 border-t border-gray-100">
          <div className="rounded-2xl bg-rose-50/70 border border-rose-200/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-heading font-extrabold text-[#1F2340]">
                Reiniciar progreso y estadísticas a cero
              </div>
              <div className="text-xs text-gray-600 mt-0.5">
                Limpia estrellas, misiones completadas, rachas, medallas y vestuario desbloqueado de ambos niños.
              </div>
            </div>

            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-600 hover:bg-rose-50 font-heading font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer flex-shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar a cero</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="min-h-[44px] px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-heading font-bold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetAllProgress();
                    setConfirmReset(false);
                    setSaveNotice('Todos los valores se reiniciaron a cero');
                    setTimeout(() => setSaveNotice(null), 2500);
                  }}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-heading font-bold text-xs shadow-sm cursor-pointer"
                >
                  Confirmar reinicio
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
