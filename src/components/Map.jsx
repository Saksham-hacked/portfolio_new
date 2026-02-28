import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const YOUR_LOCATION = {
  name: 'Roorkee, Uttarakhand',
  coordinates: [77.8898, 29.8543],
}

export default function LocationMap() {
  return (
    <div className="mt-24">
      <div className="border border-black/10 p-6 max-w-2xl mx-auto">
        
        {/* Label */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-black" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/40">
            Current Location
          </span>
        </div>

        {/* Map */}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 800, center: [78, 29] }}
          style={{ width: '100%', height: '260px' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: '#f0f0f0', stroke: '#fff', strokeWidth: 0.5, outline: 'none' },
                    hover:   { fill: '#e0e0e0', outline: 'none' },
                    pressed: { fill: '#e0e0e0', outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Pin */}
          <Marker coordinates={YOUR_LOCATION.coordinates}>
            {/* Pulse ring */}
            <circle r={10} fill="black" fillOpacity={0.1}>
              <animate attributeName="r" from="6" to="14" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Dot */}
            <circle r={5} fill="black" />
            {/* Label */}
            <text
              textAnchor="middle"
              y={-14}
              style={{ fontFamily: 'Space Mono', fontSize: '8px', fill: '#111', letterSpacing: '0.1em' }}
            >
              {YOUR_LOCATION.name.toUpperCase()}
            </text>
          </Marker>
        </ComposableMap>

        {/* Bottom tag */}
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/25 mt-2 text-right">
          {YOUR_LOCATION.name} • India
        </p>
      </div>
    </div>
  )
}

