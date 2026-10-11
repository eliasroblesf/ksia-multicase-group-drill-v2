import React, { useState } from 'react';
import { Maximize2, X, Eye } from 'lucide-react';

interface ScenarioIllustrationProps {
  type: 'microwave_fire' | 'medical_collapse' | 'server_smoke' | 'chemical_spill' | 'stairwell_evac';
  className?: string;
  stageNumber?: number;
}

interface ImageConfig {
  src: string;
  alt: string;
  badgeEn: string;
  badgeAr: string;
  cameraCode: string;
}

const SCENARIO_IMAGES: Record<ScenarioIllustrationProps['type'], ImageConfig> = {
  microwave_fire: {
    src: '/src/assets/images/ksia_pantry_fire_1791744643708.jpg',
    alt: 'Administration 2nd Floor Staff Pantry - Breakroom microwave ignited with burning napkins and smoke rising',
    badgeEn: 'PANTRY APPLIANCE IGNITION',
    badgeAr: 'اشتعال جهاز بمطبخ الموظفين',
    cameraCode: 'CAM-204 // BREAKROOM',
  },
  medical_collapse: {
    src: '/src/assets/images/ksia_medical_aid_1791744682320.jpg',
    alt: 'Open Workstation Bay - Unresponsive employee receiving casualty care with AED unit open on carpet',
    badgeEn: 'UNRESPONSIVE CASUALTY & AED',
    badgeAr: 'سقوط فاقد للوعي وجهاز إزالة الرجفان',
    cameraCode: 'CAM-312 // OPEN BAY 3',
  },
  server_smoke: {
    src: '/src/assets/images/ksia_server_smoke_1791744653386.jpg',
    alt: '3rd Floor IT Archive Corridor - Dense toxic chemical smoke billowing from server room door seams',
    badgeEn: 'IT UPS BATTERY FUMES',
    badgeAr: 'أبخرة بطاريات غرفة الخوادم',
    cameraCode: 'CAM-388 // SERVER VAULT',
  },
  chemical_spill: {
    src: '/src/assets/images/ksia_chemical_hazard_1791744692173.jpg',
    alt: 'Engineering Plotting Depot - Flammable solvent chemical spill contained by yellow absorbent boom near electrical socket',
    badgeEn: 'FLAMMABLE SOLVENT SPILL',
    badgeAr: 'انسكاب مذيبات كيميائية خطرة',
    cameraCode: 'CAM-105 // PRINT DEPOT',
  },
  stairwell_evac: {
    src: '/src/assets/images/ksia_executive_fire_1791744663454.jpg',
    alt: 'Executive Directorate Corridor - Heavy smoke rolling along ceiling with deployed yellow emergency evac-chair',
    badgeEn: 'EXECUTIVE CORRIDOR & EVAC-CHAIR',
    badgeAr: 'ممر الإدارة العليا وكرسي الإخلاء',
    cameraCode: 'CAM-401 // EXEC WING',
  },
};

export const ScenarioIllustration: React.FC<ScenarioIllustrationProps> = ({ 
  type, 
  className = '',
  stageNumber = 1 
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const config = SCENARIO_IMAGES[type] || SCENARIO_IMAGES.microwave_fire;

  return (
    <>
      <div 
        className={`relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group ${className}`}
      >
        {/* Aspect Ratio Container (16:9) */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
          {!imageError ? (
            <>
              {/* Shimmer Placeholder while loading */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
                </div>
              )}

              {/* Hyperrealistic Scenario Image */}
              <img
                src={config.src}
                alt={config.alt}
                referrerPolicy="no-referrer"
                loading="eager"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/50 pointer-events-none" />

              {/* Tactical Camera HUD Overlay */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800 text-[9px] sm:text-[10px] font-mono text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-bold text-red-400">REC</span>
                  <span className="text-slate-500">•</span>
                  <span>{config.cameraCode}</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-md font-bold">
                    STG {stageNumber}
                  </span>
                </div>
              </div>

              {/* Tactical Bottom Badge & Zoom Button */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                <div className="bg-slate-950/85 backdrop-blur-md border border-slate-800/80 rounded-md px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-white shadow-sm flex items-center gap-1.5 max-w-[80%] truncate">
                  <span className="text-amber-400">⚡</span>
                  <span className="truncate">{config.badgeEn}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsZoomed(true)}
                  aria-label="Enlarge image"
                  className="bg-slate-950/85 hover:bg-slate-900 backdrop-blur-md border border-slate-700/80 text-slate-200 hover:text-white p-1.5 rounded-md text-xs transition-colors shadow-md flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <Maximize2 className="w-3 h-3 text-slate-300" />
                </button>
              </div>
            </>
          ) : (
            /* Graceful Fallback if image fails */
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-950 text-center">
              <span className="text-3xl mb-2">🚨</span>
              <p className="text-xs font-bold text-slate-300">{config.badgeEn}</p>
              <p className="text-[10px] text-slate-500 mt-1 font-mono">{config.cameraCode}</p>
            </div>
          )}
        </div>
      </div>

      {/* Full-Screen Inspection Modal for Mobile & Desktop */}
      {isZoomed && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-center items-center p-3 sm:p-6"
          onClick={() => setIsZoomed(false)}
        >
          <div className="w-full max-w-4xl flex items-center justify-between pb-3 text-white">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-mono font-bold text-slate-200">
                {config.cameraCode} // HIGH-RES TACTICAL FEED
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
              }}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div 
            className="relative max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={config.src}
              alt={config.alt}
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[80vh] object-contain mx-auto"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 text-center">
              <p className="text-xs sm:text-sm font-bold text-white mb-0.5">{config.badgeEn}</p>
              <p className="text-[11px] text-slate-300 max-w-2xl mx-auto">{config.alt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
