import { useEffect, useMemo, useRef, useState } from "react";
import { FiClock, FiGlobe, FiMapPin } from "react-icons/fi";
import { useTranslation } from "../hooks/useTranslation";
import GlobeCanvas from "./GlobeCanvas";

const timeZones = [
  {
    id: "bangkok",
    city: { th: "กรุงเทพฯ", en: "Bangkok" },
    country: { th: "ประเทศไทย", en: "Thailand" },
    zone: "Asia/Bangkok",
    short: "BKK",
    latitude: 13.7563,
    longitude: 100.5018,
  },
  {
    id: "tokyo",
    city: { th: "โตเกียว", en: "Tokyo" },
    country: { th: "ญี่ปุ่น", en: "Japan" },
    zone: "Asia/Tokyo",
    short: "TYO",
    latitude: 35.6762,
    longitude: 139.6503,
  },
  {
    id: "london",
    city: { th: "ลอนดอน", en: "London" },
    country: { th: "สหราชอาณาจักร", en: "United Kingdom" },
    zone: "Europe/London",
    short: "LON",
    latitude: 51.5074,
    longitude: -0.1278,
  },
  {
    id: "new-york",
    city: { th: "นิวยอร์ก", en: "New York" },
    country: { th: "สหรัฐอเมริกา", en: "United States" },
    zone: "America/New_York",
    short: "NYC",
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: "sydney",
    city: { th: "ซิดนีย์", en: "Sydney" },
    country: { th: "ออสเตรเลีย", en: "Australia" },
    zone: "Australia/Sydney",
    short: "SYD",
    latitude: -33.8688,
    longitude: 151.2093,
  },
  {
    id: "los-angeles",
    city: { th: "ลอสแอนเจลิส", en: "Los Angeles" },
    country: { th: "สหรัฐอเมริกา", en: "United States" },
    zone: "America/Los_Angeles",
    short: "LAX",
    latitude: 34.0522,
    longitude: -118.2437,
  },
];

function WorldClock() {
  const { i18n } = useTranslation();
  const [now, setNow] = useState(() => new Date());
  const [selectedId, setSelectedId] = useState("bangkok");
  const [isGlobePaused, setIsGlobePaused] = useState(false);
  const resumeTimerRef = useRef(null);
  const isThai = i18n.language === "th";
  const language = isThai ? "th-TH" : "en-GB";
  const selected = timeZones.find((item) => item.id === selectedId) ?? timeZones[0];

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const selectTimeZone = (id) => {
    setSelectedId(id);
    setIsGlobePaused(true);
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      setIsGlobePaused(false);
    }, 7000);
  };

  const formatTime = (zone, withSeconds = false) =>
    new Intl.DateTimeFormat(language, {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      ...(withSeconds ? { second: "2-digit" } : {}),
      hour12: false,
    }).format(now);

  const selectedDate = useMemo(
    () =>
      new Intl.DateTimeFormat(language, {
        timeZone: selected.zone,
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now),
    [language, now, selected.zone]
  );

  const selectedCoordinates = `${Math.abs(selected.latitude).toFixed(2)}° ${
    selected.latitude >= 0 ? "N" : "S"
  } · ${Math.abs(selected.longitude).toFixed(2)}° ${
    selected.longitude >= 0 ? "E" : "W"
  }`;

  const copy = isThai
    ? {
        kicker: "เวลารอบโลก",
        title: "สำรวจเวลาตามโซนต่าง ๆ",
        hint: "เลือกเมืองเพื่อดูเวลาปัจจุบัน",
        aria: "เลือกเขตเวลา",
      }
    : {
        kicker: "World time",
        title: "Explore time around the world",
        hint: "Choose a city to see its local time",
        aria: "Select a time zone",
      };

  return (
    <section className="world-clock" aria-labelledby="world-clock-title">
      <div className="world-clock-visual">
        <div
          className={`world-clock-orbit${isGlobePaused ? " is-paused" : ""}`}
          aria-hidden="true"
        >
          <GlobeCanvas selectedZone={selected} paused={isGlobePaused} />
          <span className="world-clock-orbit-line" />
        </div>

        <div className="world-clock-location">
          <FiMapPin aria-hidden="true" />
          <div>
            <span>{selected.city[isThai ? "th" : "en"]}</span>
            <small>{selectedCoordinates}</small>
          </div>
        </div>
      </div>

      <div className="world-clock-content">
        <div className="world-clock-heading">
          <div>
            <p className="world-clock-kicker">
              <FiGlobe aria-hidden="true" />
              {copy.kicker}
            </p>
            <h2 id="world-clock-title">{copy.title}</h2>
          </div>

          <div className="world-clock-current" aria-live="polite">
            <FiClock aria-hidden="true" />
            <div>
              <strong>{formatTime(selected.zone, true)}</strong>
              <span>{selectedDate}</span>
            </div>
          </div>
        </div>

        <p className="world-clock-hint">{copy.hint}</p>

        <div className="world-clock-zones" role="group" aria-label={copy.aria}>
          {timeZones.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`world-clock-zone${selected.id === item.id ? " is-active" : ""}`}
              onClick={() => selectTimeZone(item.id)}
              aria-pressed={selected.id === item.id}
            >
              <span>{item.short}</span>
              <strong>{formatTime(item.zone)}</strong>
              <small>{item.city[isThai ? "th" : "en"]}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorldClock;
