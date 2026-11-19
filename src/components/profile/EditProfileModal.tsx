import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, ArrowLeft, Loader2, User } from 'lucide-react';
import { TactileButton } from '../common/TactileButton';
import { soundEffects } from '../../utils/audio';

const AVAILABLE_AVATARS = [
  { emoji: '🦁', label: 'León' },
  { emoji: '🦉', label: 'Búho' },
  { emoji: '🦊', label: 'Zorro' },
  { emoji: '🐧', label: 'Pingüino' },
  { emoji: '🐼', label: 'Panda' },
  { emoji: '🐨', label: 'Koala' },
  { emoji: '🐯', label: 'Tigre' },
  { emoji: '🦄', label: 'Unicornio' },
];

const AGE_OPTIONS = [3, 4, 5, 6, 7, 8];

export const EditProfileModal: React.FC = () => {
  const { editingProfile, closeEditProfile, updateProfile, settings, profiles } = useApp();

  const [name, setName] = useState('');
  const [age, setAge] = useState(5);
  const [avatar, setAvatar] = useState('🦁');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const childIndex = editingProfile ? profiles.findIndex((p) => p.id === editingProfile.id) : -1;

  useEffect(() => {
    if (editingProfile) {
      setName(editingProfile.name);
      setAge(editingProfile.age);
      setAvatar(editingProfile.avatar);
      setErrorMsg(null);
      setIsSaving(false);
    }
  }, [editingProfile]);

  if (!editingProfile) return null;

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setErrorMsg('Por favor escribe el nombre del niño o niña.');
      soundEffects.playSoftBoop(settings.soundEffectsEnabled);
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);

    setTimeout(() => {
      updateProfile(editingProfile.id, {
        name: trimmed,
        age,
        avatar,
      });
      soundEffects.playCorrect(settings.soundEffectsEnabled);
      setIsSaving(false);
      closeEditProfile();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F2340]/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#4C5CD0]/15 card-elevation-2 animate-pop max-h-[90vh] overflow-y-auto">
        {/* Top close button */}
        <button
          type="button"
          onClick={closeEditProfile}
          className="absolute top-4 right-4 min-w-[48px] min-h-[48px] flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
          aria-label="Cerrar edición"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#4C5CD0] text-xs font-heading font-extrabold mb-2">
            <span>Perfil {childIndex >= 0 ? childIndex + 1 : 1} de 2 Niños</span>
          </div>
          <div className="w-16 h-16 mx-auto rounded-3xl bg-[#FFF5E8] flex items-center justify-center text-3xl shadow-inner border border-amber-200 mb-2">
            <span>{avatar}</span>
          </div>
          <h2 className="text-xl font-heading font-extrabold text-[#1F2340]">
            Editar Perfil del Niño
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Personaliza el nombre y edad para este perfil de aprendizaje
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Nombre input */}
          <div>
            <label className="block text-xs font-heading font-bold text-[#1F2340] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#4C5CD0]" />
              <span>Nombre del Niño o Niña</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder="Ej: Mateo, Sofía, Lucas..."
              maxLength={20}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 bg-[#FFFDF7] font-heading font-bold text-base text-[#1F2340] focus:border-[#4C5CD0] focus:outline-none transition-all"
            />
            {errorMsg && (
              <p className="text-xs text-red-600 font-semibold mt-1.5">{errorMsg}</p>
            )}
          </div>

          {/* Selector de Edad */}
          <div>
            <label className="block text-xs font-heading font-bold text-[#1F2340] uppercase tracking-wider mb-1.5">
              Edad del Niño ({age} años)
            </label>
            <div className="grid grid-cols-6 gap-1.5">
              {AGE_OPTIONS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => {
                    setAge(a);
                    soundEffects.playPop(settings.soundEffectsEnabled);
                  }}
                  className={`min-h-[48px] rounded-xl font-heading font-extrabold text-sm transition-all cursor-pointer ${
                    age === a
                      ? 'bg-[#4C5CD0] text-white shadow-md'
                      : 'btn-tactile-white text-[#1F2340]'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Las misiones adaptarán su ritmo pedagógico para niños de {age} años.
            </p>
          </div>

          {/* Selector de Mascota / Avatar */}
          <div>
            <label className="block text-xs font-heading font-bold text-[#1F2340] uppercase tracking-wider mb-1.5">
              Elige su Mascota Exploradora
            </label>
            <div className="grid grid-cols-4 gap-2">
              {AVAILABLE_AVATARS.map((av) => (
                <button
                  key={av.emoji}
                  type="button"
                  onClick={() => {
                    setAvatar(av.emoji);
                    soundEffects.playPop(settings.soundEffectsEnabled);
                  }}
                  className={`min-h-[56px] rounded-2xl flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                    avatar === av.emoji
                      ? 'bg-[#FFF5E8] border-2 border-[#FFC857] shadow-md scale-105'
                      : 'btn-tactile-white'
                  }`}
                >
                  <span className="text-2xl">{av.emoji}</span>
                  <span className="text-[10px] font-bold text-gray-500 mt-0.5">{av.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Acciones en la mitad inferior para alcance del pulgar */}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <TactileButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSaving}
              className="min-h-[52px]"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Guardando Cambios...</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>Guardar Nombre y Edad</span>
                </>
              )}
            </TactileButton>

            <button
              type="button"
              onClick={closeEditProfile}
              className="w-full min-h-[48px] py-2 text-center text-xs font-semibold text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Cancelar y volver</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
