import React from 'react';
import { Sparkles } from 'lucide-react';
import { ChildProfile, SubjectStats } from '../../types';

interface PedagogicalObservationCardProps {
  currentProfile: ChildProfile;
  subjectStats: Record<string, SubjectStats>;
}

const SUBJECT_LABELS: Record<string, string> = {
  math: 'Matemáticas',
  language: 'Palabras & Fonética',
  memory: 'Reino de Memoria',
  logic: 'Lógica Detective',
};

export const PedagogicalObservationCard: React.FC<PedagogicalObservationCardProps> = ({
  currentProfile,
  subjectStats,
}) => {
  const entries = Object.entries(subjectStats) as [string, SubjectStats][];
  const totalQuests = entries.reduce((sum, [, s]) => sum + s.questsCompleted, 0);

  if (totalQuests === 0) {
    return (
      <div className="bg-gradient-to-r from-[#EDECFF] to-[#FFFDF7] rounded-3xl p-6 border border-[#4C5CD0]/20 card-elevation-1">
        <div className="flex items-center gap-2 mb-2 text-[#4C5CD0] font-heading font-extrabold text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Observación Curricular y Guía Pedagógica</span>
        </div>
        <h2 className="text-lg font-heading font-extrabold text-[#1F2340] mb-2">
          Perfil listo para comenzar desde cero
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Aún no hay misiones completadas para <strong>{currentProfile.name}</strong> ({currentProfile.age} años).
          Al completar sus primeras aventuras en Matemáticas, Palabras, Memoria o Lógica, aquí verás un resumen
          personalizado de sus fortalezas y áreas sugeridas.
        </p>
      </div>
    );
  }

  const practiced = entries.filter(([, s]) => s.questsCompleted > 0);
  const strongest = [...practiced].sort((a, b) => b[1].accuracy - a[1].accuracy)[0];
  const leastPracticed = [...entries].sort((a, b) => a[1].questsCompleted - b[1].questsCompleted)[0];

  return (
    <div className="bg-gradient-to-r from-[#EDECFF] to-[#FFFDF7] rounded-3xl p-6 border border-[#4C5CD0]/20 card-elevation-1">
      <div className="flex items-center gap-2 mb-2 text-[#4C5CD0] font-heading font-extrabold text-sm uppercase tracking-wider">
        <Sparkles className="w-4 h-4" />
        <span>Observación Curricular y Guía Pedagógica</span>
      </div>
      <h2 className="text-lg font-heading font-extrabold text-[#1F2340] mb-2">
        Progreso Cognitivo de {currentProfile.name}
      </h2>
      <p className="text-sm text-gray-700 leading-relaxed">
        {currentProfile.name} ha completado <strong>{totalQuests} {totalQuests === 1 ? 'misión' : 'misiones'}</strong>
        {strongest && (
          <>
            , destacando en <strong>{SUBJECT_LABELS[strongest[0]] || strongest[0]}</strong> con{' '}
            <strong>{strongest[1].accuracy}% de precisión</strong>
          </>
        )}
        . Para mantener un desarrollo equilibrado, recomendamos explorar nuevas actividades en{' '}
        <strong>{SUBJECT_LABELS[leastPracticed[0]] || leastPracticed[0]}</strong>.
      </p>
    </div>
  );
};
