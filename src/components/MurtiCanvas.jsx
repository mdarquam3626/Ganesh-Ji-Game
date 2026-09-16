import React from "react";
import {
  MATERIALS_DATA,
  FORM_DATA,
  COLORS_DATA,
  CLOTHING_DATA,
  CROWNS_DATA,
  ORNAMENTS_DATA,
  DECORATIONS_DATA,
  MOOSHAK_DATA
} from "../data/craftData";

export function MurtiCanvas({ selection }) {
  const mat = MATERIALS_DATA.find((m) => m.id === selection?.material) || null;
  const form = FORM_DATA.find((f) => f.id === selection?.form) || FORM_DATA[0];
  const col = COLORS_DATA.find((c) => c.id === selection?.color) || null;
  const cloth = CLOTHING_DATA.find((c) => c.id === selection?.clothing) || null;
  const crown = CROWNS_DATA.find((cr) => cr.id === selection?.crown) || null;
  const orn = ORNAMENTS_DATA.find((o) => o.id === selection?.ornaments) || null;
  const deco = DECORATIONS_DATA.find((d) => d.id === selection?.decorations) || null;
  const mooshak = MOOSHAK_DATA.find((m) => m.id === selection?.mooshak) || null;

  const isPOP = mat?.id === "pop_harmful";
  // Earthen base clay tone (defaults to sacred Shadu clay earth if unselected)
  const baseClay = mat ? mat.colorTone : "#a65637";
  const darkClay = mat ? mat.textureTone : "#7c351b";

  // Skin tint: when no paint color is selected, show pure unpainted natural clay
  const skinTint = isPOP ? "#e9e7e2" : (col ? col.hex : baseClay);

  const hasDhoti = Boolean(cloth);
  const dhotiColor = cloth ? cloth.color : darkClay;
  const dhotiBorder = cloth ? cloth.borderColor : darkClay;

  // Trunk path variation according to form
  let trunkPath =
    "M 195 240 Q 185 295 145 315 Q 120 325 110 305 Q 105 285 125 280 Q 145 285 160 270 Q 175 255 175 240 Z"; // Vamamukhi left
  if (form?.trunkStyle === "right") {
    trunkPath =
      "M 205 240 Q 215 295 255 315 Q 280 325 290 305 Q 295 285 275 280 Q 255 285 240 270 Q 225 255 225 240 Z";
  } else if (form?.trunkStyle === "center") {
    trunkPath =
      "M 192 240 Q 190 300 200 325 Q 200 338 212 338 Q 224 338 222 325 Q 210 300 208 240 Z";
  }

  const isMasterCrown = crown?.id === "royal_golden_mukut";
  const isFloralCrown = crown?.id === "floral_eco_mukut";

  const hasPrabhavali = deco?.id === "divine_prabhavali";
  const hasBananaMandap = deco?.id === "banana_leaf_backdrop";
  const hasFlowerRangoli = deco?.id === "flower_rangoli";
  const hasMarigoldGarland = deco?.id === "marigold_diyas";

  return (
    <svg viewBox="0 0 400 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="claySkinGrad" cx="45%" cy="38%" r="60%">
          <stop offset="0%" stopColor={skinTint} stopOpacity={isPOP ? 0.9 : 0.85} />
          <stop offset="65%" stopColor={baseClay} />
          <stop offset="100%" stopColor={darkClay} />
        </radialGradient>

        <linearGradient id="dhotiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={dhotiColor} />
          <stop offset="70%" stopColor={dhotiColor} />
          <stop offset="100%" stopColor="#7a2a0d" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="clayShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.28" floodColor="#3d2112" />
        </filter>
      </defs>

      {/* ── 1. BACKGROUND DECORATION LAYER ── */}
      {hasPrabhavali && (
        <g>
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="url(#goldGrad)"
            strokeWidth="12"
            opacity="0.85"
            filter="url(#softGlow)"
          />
          <circle
            cx="200"
            cy="200"
            r="162"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2"
            strokeDasharray="6,8"
            opacity="0.9"
          />
          {[...Array(16)].map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            const x1 = 200 + Math.cos(angle) * 164;
            const y1 = 200 + Math.sin(angle) * 164;
            const x2 = 200 + Math.cos(angle) * 178;
            const y2 = 200 + Math.sin(angle) * 178;
            return (
              <line
                key={`ray-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#goldGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            );
          })}
        </g>
      )}

      {hasBananaMandap && (
        <g>
          <path
            d="M 30 460 C 20 180 80 50 200 40 C 320 50 380 180 370 460"
            fill="none"
            stroke="#166534"
            strokeWidth="36"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M 40 460 C 30 190 90 65 200 55 C 310 65 370 190 360 460"
            fill="none"
            stroke="#22c55e"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>
      )}

      {/* ── 2. PEDESTAL & LOTUS BASE ── */}
      <g filter="url(#clayShadow)">
        <ellipse cx="200" cy="440" rx="160" ry="24" fill="#6b3a20" />
        <ellipse cx="200" cy="435" rx="150" ry="20" fill="#8c4e28" />

        <ellipse cx="200" cy="425" rx="135" ry="18" fill="#e11d48" />
        {[100, 130, 160, 190, 210, 240, 270, 300].map((x) => (
          <path
            key={`lotus-${x}`}
            d={`M ${x} 425 Q ${x + 10} 405 ${x + 20} 425 Z`}
            fill="#fb7185"
            stroke="#f43f5e"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* ── 3. FOUR DIVINE ARMS & ATTRIBUTES ── */}
      <g filter="url(#clayShadow)">
        {/* Back Upper Left Arm (Pasha / Lotus) */}
        <path d="M 140 240 Q 90 200 95 160 Q 115 155 125 180 Q 145 220 155 245 Z" fill="url(#claySkinGrad)" />
        <circle cx="95" cy="155" r="14" fill="#e11d48" opacity="0.9" />
        <path d="M 95 155 Q 85 140 95 130 Q 105 140 95 155" fill="#f43f5e" />

        {/* Back Upper Right Arm (Ankusha / Parashu) */}
        <path d="M 260 240 Q 310 200 305 160 Q 285 155 275 180 Q 255 220 245 245 Z" fill="url(#claySkinGrad)" />
        <rect x="298" y="130" width="6" height="50" rx="3" fill="url(#goldGrad)" transform="rotate(-15 300 150)" />
        <path d="M 300 135 Q 320 125 315 145 Z" fill="url(#goldGrad)" />

        {/* Front Lower Right Arm (Abhaya Mudra - Blessing Hand) */}
        <path d="M 255 280 Q 300 290 305 320 Q 285 340 270 315 Z" fill="url(#claySkinGrad)" />
        <circle cx="292" cy="316" r="10" fill="#f87171" opacity="0.4" />
        <circle cx="292" cy="316" r="4.5" fill="#dc2626" />

        {/* Front Lower Left Arm (Holding Modak Bowl) */}
        <path d="M 145 280 Q 105 295 105 325 Q 125 345 140 315 Z" fill="url(#claySkinGrad)" />
        <ellipse cx="112" cy="326" rx="18" ry="10" fill="url(#goldGrad)" />
        <circle cx="112" cy="320" r="7" fill="#fbbf24" />
        <path d="M 108 322 Q 112 312 116 322 Z" fill="#f59e0b" />
        <circle cx="104" cy="324" r="5" fill="#fbbf24" />
        <circle cx="120" cy="324" r="5" fill="#fbbf24" />
      </g>

      {/* ── 4. SEATED POSTURE & BODY ── */}
      <g filter="url(#clayShadow)">
        <ellipse cx="145" cy="405" rx="55" ry="26" fill={hasDhoti ? "url(#dhotiGrad)" : "url(#claySkinGrad)"} />
        <ellipse cx="255" cy="405" rx="55" ry="26" fill={hasDhoti ? "url(#dhotiGrad)" : "url(#claySkinGrad)"} />

        <ellipse cx="115" cy="415" rx="14" ry="8" fill="url(#claySkinGrad)" />
        <ellipse cx="285" cy="415" rx="14" ry="8" fill="url(#claySkinGrad)" />

        {/* Lambodara pot-belly */}
        <ellipse cx="200" cy="340" rx="72" ry="58" fill="url(#claySkinGrad)" />

        {/* Dhoti folds & hemline */}
        {hasDhoti ? (
          <>
            <path d="M 135 370 Q 200 420 265 370 Q 200 440 135 370 Z" fill={dhotiBorder} opacity="0.85" />
            <path d="M 194 370 L 194 430 L 206 430 L 206 370 Z" fill={dhotiBorder} />
          </>
        ) : (
          <path d="M 138 374 Q 200 405 262 374" fill="none" stroke={darkClay} strokeWidth="1.8" opacity="0.35" />
        )}

        {/* Torso */}
        <ellipse cx="200" cy="275" rx="60" ry="46" fill="url(#claySkinGrad)" />

        {/* Janeu thread */}
        <path d="M 160 250 Q 200 290 235 345" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="5,2" opacity="0.9" />
        <path d="M 161 251 Q 201 291 236 346" fill="none" stroke="#eab308" strokeWidth="1.5" opacity="0.95" />

        {/* Angavastram (Scarf) */}
        {hasDhoti && (
          <>
            <path d="M 148 240 Q 130 280 120 340" fill="none" stroke={dhotiBorder} strokeWidth="10" strokeLinecap="round" opacity="0.95" />
            <path d="M 148 240 Q 130 280 120 340" fill="none" stroke={dhotiColor} strokeWidth="6" strokeLinecap="round" />
          </>
        )}
      </g>

      {/* ── 5. DIVINE LARGE EARS ── */}
      <g filter="url(#clayShadow)">
        {/* Left Ear */}
        <path d="M 145 190 C 80 160 60 220 85 265 C 105 300 135 270 145 250 Z" fill="url(#claySkinGrad)" />
        <path d="M 135 200 C 95 180 80 225 100 255 C 115 275 135 255 135 240 Z" fill={darkClay} opacity="0.3" />
        <circle cx="85" cy="245" r="7" fill={orn ? "url(#goldGrad)" : darkClay} opacity={orn ? 1 : 0.35} />

        {/* Right Ear */}
        <path d="M 255 190 C 320 160 340 220 315 265 C 295 300 265 270 255 250 Z" fill="url(#claySkinGrad)" />
        <path d="M 265 200 C 305 180 320 225 300 255 C 285 275 265 255 265 240 Z" fill={darkClay} opacity="0.3" />
        <circle cx="315" cy="245" r="7" fill={orn ? "url(#goldGrad)" : darkClay} opacity={orn ? 1 : 0.35} />
      </g>

      {/* ── 6. ELEPHANT HEAD & FACE ── */}
      <g filter="url(#clayShadow)">
        <ellipse cx="200" cy="195" rx="58" ry="52" fill="url(#claySkinGrad)" />

        {/* Gentle Divine Eyes */}
        <g stroke="#26180e" strokeWidth="2.5" fill="none" strokeLinecap="round">
          {/* Left Eye */}
          <path d="M 166 198 Q 176 192 186 198" />
          <path d="M 167 198 Q 176 204 185 198" fill="#fff" stroke="none" />
          <circle cx="176" cy="198" r="3.2" fill="#26180e" stroke="none" />
          <circle cx="177.5" cy="196.5" r="1.2" fill="#fff" stroke="none" />

          {/* Right Eye */}
          <path d="M 214 198 Q 224 192 234 198" />
          <path d="M 215 198 Q 224 204 233 198" fill="#fff" stroke="none" />
          <circle cx="224" cy="198" r="3.2" fill="#26180e" stroke="none" />
          <circle cx="225.5" cy="196.5" r="1.2" fill="#fff" stroke="none" />
        </g>

        {/* Chandan & Kumkum Tilak with Om */}
        <g>
          <path d="M 184 168 Q 200 172 216 168" stroke="#fef3c7" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 186 174 Q 200 178 214 174" stroke="#fef3c7" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 200 162 L 200 184" stroke="#dc2626" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="200" cy="162" r="3" fill="#fbbf24" />
        </g>

        {/* Tusks */}
        <path d="M 162 244 Q 150 258 140 252 Q 155 240 165 238 Z" fill="#fffef0" stroke="#d6cfbe" strokeWidth="1" />
        <path d="M 238 244 L 246 250 L 242 240 Z" fill="#fffef0" stroke="#d6cfbe" strokeWidth="1" />

        {/* Trunk */}
        <path d={trunkPath} fill="url(#claySkinGrad)" stroke={darkClay} strokeWidth="1.5" />
        <path d="M 188 232 Q 200 236 212 232" stroke={darkClay} strokeWidth="1.8" fill="none" opacity="0.6" />
        <path d="M 186 244 Q 200 248 214 244" stroke={darkClay} strokeWidth="1.8" fill="none" opacity="0.6" />
        <path d="M 184 256 Q 200 260 216 256" stroke={darkClay} strokeWidth="1.8" fill="none" opacity="0.6" />
        <circle cx="130" cy="295" r="4.5" fill="#f59e0b" opacity="0.9" />
      </g>

      {/* ── 7. TRADITIONAL ORNAMENTS ── */}
      {orn && (
        <g filter="url(#clayShadow)">
          <path d="M 165 260 Q 200 286 235 260" fill="none" stroke="url(#goldGrad)" strokeWidth="8" strokeLinecap="round" />
          <polygon points="194,286 206,286 200,298" fill="url(#goldGrad)" />
          <circle cx="200" cy="290" r="3" fill="#dc2626" />

          {orn.id === "pearl_mala" && (
            <path d="M 155 250 Q 200 295 245 250" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeDasharray="6,4" />
          )}

          {orn.id === "rudraksha_tulsi" && (
            <path d="M 152 248 Q 200 305 248 248" fill="none" stroke="#78350f" strokeWidth="6" strokeLinecap="round" strokeDasharray="6,5" />
          )}
        </g>
      )}

      {/* ── 8. CROWN (MUKUT) ── */}
      {crown ? (
        <g filter="url(#clayShadow)">
          {isFloralCrown ? (
            <g>
              <path d="M 152 165 Q 200 135 248 165 L 240 120 Q 200 100 160 120 Z" fill="#15803d" />
              {[155, 172, 190, 208, 226, 243].map((x) => (
                <g key={`marigold-${x}`}>
                  <circle cx={x} cy="155" r="7" fill="#f59e0b" />
                  <circle cx={x} cy="155" r="4" fill="#ea580c" />
                </g>
              ))}
              {[165, 182, 200, 218, 235].map((x) => (
                <g key={`jasmine-${x}`}>
                  <circle cx={x} cy="135" r="6" fill="#fef08a" />
                  <circle cx={x} cy="135" r="3" fill="#f59e0b" />
                </g>
              ))}
              <circle cx="200" cy="115" r="8" fill="#e11d48" />
            </g>
          ) : isMasterCrown ? (
            <g>
              <path d="M 148 165 L 140 105 L 170 125 L 200 65 L 230 125 L 260 105 L 252 165 Z" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="2" />
              <circle cx="200" cy="95" r="9" fill="#dc2626" stroke="#fff" strokeWidth="1.5" />
              <polygon points="196,135 204,135 200,145" fill="#3b82f6" />
              <circle cx="160" cy="130" r="5" fill="#dc2626" />
              <circle cx="240" cy="130" r="5" fill="#dc2626" />
            </g>
          ) : (
            <g>
              <path
                d="M 154 165 L 150 115 L 175 130 L 200 90 L 225 130 L 250 115 L 246 165 Z"
                fill={isPOP ? "#dfdbd3" : "url(#goldGrad)"}
                stroke="#78350f"
                strokeWidth="1.5"
              />
              <circle cx="200" cy="118" r="6" fill="#dc2626" />
              <path d="M 154 165 Q 200 152 246 165" stroke="#f59e0b" strokeWidth="4" fill="none" />
            </g>
          )}
        </g>
      ) : (
        /* Unadorned sculpted clay forehead crest */
        <g filter="url(#clayShadow)">
          <ellipse cx="200" cy="160" rx="18" ry="6" fill={darkClay} opacity="0.3" />
          <path d="M 190 162 Q 200 150 210 162 Z" fill={baseClay} stroke={darkClay} strokeWidth="1" />
        </g>
      )}

      {/* ── 9. MOOSHAK JI (MOUSE MOUNT) ── */}
      {mooshak && (
        <g filter="url(#clayShadow)" transform="translate(45, 385)">
          <ellipse cx="25" cy="25" rx="18" ry="12" fill="#78716c" />
          <circle cx="12" cy="18" r="9" fill="#78716c" />
          <circle cx="8" cy="10" r="5" fill="#f43f5e" stroke="#78716c" strokeWidth="1.5" />
          <circle cx="16" cy="9" r="4" fill="#f43f5e" stroke="#78716c" strokeWidth="1.5" />
          <circle cx="9" cy="17" r="1.5" fill="#1c1917" />
          <path d="M 40 28 Q 52 35 48 20" fill="none" stroke="#78716c" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="2" cy="22" r="3.5" fill="#fbbf24" />
          {mooshak.id === "mooshak_bell" && <circle cx="18" cy="22" r="3" fill="#eab308" />}
        </g>
      )}

      {/* ── 10. FOREGROUND DECORATIONS ── */}
      {hasFlowerRangoli && (
        <g>
          <ellipse cx="200" cy="465" rx="140" ry="12" fill="none" stroke="#f59e0b" strokeWidth="6" strokeDasharray="8,6" />
          <ellipse cx="200" cy="465" rx="120" ry="10" fill="none" stroke="#dc2626" strokeWidth="4" strokeDasharray="6,4" />
        </g>
      )}

      {hasMarigoldGarland && (
        <g>
          {[80, 105, 130, 155, 180, 205, 230, 255, 270, 295, 320].map((x, idx) => {
            const y = 432 + Math.sin(idx * 0.6) * 4;
            const flowerCol = idx % 2 === 0 ? "#f59e0b" : "#ea580c";
            return <circle key={`garland-${x}`} cx={x} cy={y} r="6" fill={flowerCol} />;
          })}
        </g>
      )}
    </svg>
  );
}
