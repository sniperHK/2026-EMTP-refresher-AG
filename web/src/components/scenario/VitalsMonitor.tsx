import type { Vitals } from '@/data/types'
import { cn } from '@/lib/utils'

interface VitalsMonitorProps {
  vitals: Vitals
  className?: string
}

interface VitalItemProps {
  label: string
  value: string | number
  unit?: string
  color: string
  size?: 'lg' | 'md'
}

function VitalItem({ label, value, unit, color, size = 'lg' }: VitalItemProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 px-2 py-1">
      <span className="text-[10px] font-medium tracking-wider uppercase opacity-70" style={{ color }}>
        {label}
      </span>
      <span
        className={cn(
          'font-mono font-bold leading-none tabular-nums',
          size === 'lg' ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
        )}
        style={{ color }}
      >
        {value}
      </span>
      {unit && (
        <span className="text-[10px] opacity-50" style={{ color }}>
          {unit}
        </span>
      )}
    </div>
  )
}

export function VitalsMonitor({ vitals, className }: VitalsMonitorProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-700 bg-gray-950 p-3 shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]',
        className
      )}
    >
      {/* Top info bar */}
      <div className="mb-2 flex items-center justify-between border-b border-gray-800 pb-1.5">
        <span className="text-[10px] font-medium tracking-wider text-gray-500">
          PATIENT MONITOR
        </span>
        {vitals.rhythm && (
          <span className="text-[11px] font-mono text-yellow-400/80">
            {vitals.rhythm}
          </span>
        )}
      </div>

      {/* Desktop grid / Mobile horizontal scroll */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:justify-around">
        {/* HR */}
        <VitalItem label="HR" value={vitals.hr} unit="bpm" color="#22c55e" />

        {/* SpO2 */}
        <VitalItem label="SpO2" value={vitals.spo2} unit="%" color="#06b6d4" />

        {/* BP */}
        <VitalItem label="NIBP" value={vitals.bp} unit="mmHg" color="#ef4444" />

        {/* RR */}
        <VitalItem label="RR" value={vitals.rr} unit="/min" color="#eab308" />

        {/* ETCO2 */}
        {vitals.etco2 !== undefined && (
          <VitalItem label="ETCO2" value={vitals.etco2} unit="mmHg" color="#a78bfa" />
        )}

        {/* GCS */}
        {vitals.gcs && (
          <VitalItem label="GCS" value={vitals.gcs} color="#f97316" size="md" />
        )}

        {/* Temp */}
        {vitals.temp !== undefined && (
          <VitalItem label="TEMP" value={vitals.temp} unit="°C" color="#f472b6" />
        )}
      </div>

      {/* Alert indicators */}
      <div className="mt-2 flex flex-wrap gap-1.5 border-t border-gray-800 pt-1.5">
        {vitals.hr > 120 && (
          <span className="rounded bg-red-900/50 px-1.5 py-0.5 text-[10px] font-medium text-red-400 animate-pulse">
            TACHY
          </span>
        )}
        {vitals.hr < 50 && vitals.hr > 0 && (
          <span className="rounded bg-red-900/50 px-1.5 py-0.5 text-[10px] font-medium text-red-400 animate-pulse">
            BRADY
          </span>
        )}
        {vitals.spo2 < 90 && vitals.spo2 > 0 && (
          <span className="rounded bg-red-900/50 px-1.5 py-0.5 text-[10px] font-medium text-cyan-400 animate-pulse">
            LOW SpO2
          </span>
        )}
        {vitals.hr === 0 && (
          <span className="rounded bg-red-900/80 px-2 py-0.5 text-[11px] font-bold text-red-300 animate-pulse">
            CARDIAC ARREST
          </span>
        )}
      </div>
    </div>
  )
}
