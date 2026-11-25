"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { DISTRICTS } from "./districts";
import { mockBooks } from "../../lib/hostelandresto/mock-data";
import "./styles.css";

export default function SaintLouisMap() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = DISTRICTS.find(
    (district) => district.id === (hovered ?? selected),
  );
  const selectedDistrict = DISTRICTS.find(
    (district) => district.id === selected,
  );
  const districtProfiles = selectedDistrict
    ? mockBooks.filter((book) => book.district === selectedDistrict.name)
    : [];
  const lodgingProfiles = districtProfiles.filter((book) =>
    ["Hôtel", "Appartement", "Chambre d'hôte"].includes(book.type),
  );
  const restaurantProfiles = districtProfiles.filter(
    (book) => book.type === "Restaurant",
  );

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  }

  function toggleSelection(id: number, name: string) {
    const isDeselecting = selected === id;
    setSelected(isDeselecting ? null : id);
    showToast(
      isDeselecting
        ? `${name} · désélectionné`
        : `${name} · sélectionné`,
    );
  }

  return (
    <section className="map-app" aria-label="Carte interactive de Saint-Louis">
      <div className="page-content">
        <div className="workspace">
          <section className="map-card" aria-label="Carte interactive">
            <div className="map-frame">
              <div
                className="map-base"
                aria-hidden="true"
              >
                <svg
                  className="landscape"
                  viewBox="0 0 1046 1014"
                  preserveAspectRatio="none"
                >
                  <path className="road road-one" d="M80 0 350 1014M340 0 610 1014M720 0 990 1014M0 220l1046 330M0 650l1046-350M0 830l1046-390" />
                  <path className="road road-two" d="M170 0 440 1014M520 0 790 1014M900 0l146 550M0 460l1046 260M0 980l1046-420" />
                </svg>
                <div className="map-caption map-caption-south">LANGUE DE BARBARIE</div>
                <div className="map-coordinates">16°01&apos; N&nbsp; / &nbsp;16°30&apos; O</div>
              </div>

              <svg
                className="district-map"
                viewBox="0 0 1046 1014"
                preserveAspectRatio="none"
                role="group"
                aria-label="Contours des 32 quartiers"
              >
                {DISTRICTS.map((district) => {
                  const isSelected = selected === district.id;
                  const isHovered = hovered === district.id;
                  return (
                    <path
                      key={district.id}
                      d={district.d}
                      className="district-outline"
                      fill={
                        isSelected
                          ? "rgba(203, 103, 79, 0.28)"
                          : isHovered
                            ? "rgba(117, 153, 110, 0.2)"
                            : "rgba(82, 118, 82, 0.035)"
                      }
                      stroke={
                        isSelected
                          ? "#cb674f"
                          : isHovered
                            ? "#547652"
                            : "rgba(64, 86, 65, 0.7)"
                      }
                      strokeWidth={isSelected ? 3 : isHovered ? 2.8 : 1.5}
                      tabIndex={0}
                      role="button"
                      aria-label={district.name}
                      aria-pressed={isSelected}
                      onMouseEnter={() => setHovered(district.id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(district.id)}
                      onBlur={() => setHovered(null)}
                      onClick={() => toggleSelection(district.id, district.name)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggleSelection(district.id, district.name);
                        }
                      }}
                    >
                      <title>{district.name}</title>
                    </path>
                  );
                })}
              </svg>

              <div className="map-chip" aria-live="polite">
                <span className="map-chip-dot" />
                {active ? active.name : "SAINT-LOUIS"}
              </div>
              <div className="north-marker" aria-label="Nord">
                <span>N</span>
                <svg viewBox="0 0 16 24" fill="none" aria-hidden="true">
                  <path d="M8 1 14 22l-6-4-6 4L8 1Z" />
                </svg>
              </div>
              <span className="map-scale"><i /> 1 km</span>
            </div>

          </section>

          <aside className="side-panel">
            <section className="detail-card">
              <div className="section-label"><span>01</span> QUARTIER SÉLECTIONNÉ</div>
              {selectedDistrict ? (
                <div className="selected-detail">
                  <span className="selected-index">
                    {String(selectedDistrict.id + 1).padStart(2, "0")}
                  </span>
                  <h2>{selectedDistrict.name}</h2>
                  <p>Quartier de Saint-Louis, Sénégal</p>
                  <div className="district-profile-counts" aria-label="Profils du quartier">
                    <div>
                      <strong>{lodgingProfiles.length}</strong>
                      <span>Hébergements</span>
                    </div>
                    <div>
                      <strong>{restaurantProfiles.length}</strong>
                      <span>Restaurants</span>
                    </div>
                  </div>
                  {districtProfiles.length > 0 ? (
                    <ul className="district-profile-list">
                      {districtProfiles.map((profile) => (
                        <li key={profile.id}>
                          <Link href={`/book/${profile.id}`}>
                            <span>{profile.title}</span>
                            <span>{profile.type}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="district-profile-empty">
                      Aucun profil n’est encore associé à ce quartier.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleSelection(selectedDistrict.id, selectedDistrict.name)}
                  >
                    Effacer la sélection <span aria-hidden="true">×</span>
                  </button>
                </div>
              ) : (
                <div className="empty-detail">
                  <span className="empty-compass" aria-hidden="true">
                    <svg viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="15.5" />
                      <path d="m25.5 14.5-3.8 7.2-7.2 3.8 3.8-7.2 7.2-3.8Z" />
                      <path d="M20 3v3m0 28v3M3 20h3m28 0h3" />
                    </svg>
                  </span>
                  <h2>À vous d’explorer</h2>
                  <p>Sélectionnez un quartier sur la carte pour afficher ses détails.</p>
                </div>
              )}
            </section>

            <section className="district-list-card">
              <div className="list-heading">
                <div>
                  <div className="section-label"><span>02</span> INDEX DES QUARTIERS</div>
                </div>
                <span className="list-count">32</span>
              </div>
              <div className="district-list">
                {DISTRICTS.map((district) => (
                  <button
                    key={district.id}
                    type="button"
                    className={`district-row${selected === district.id ? " selected" : ""}`}
                    onMouseEnter={() => setHovered(district.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(district.id)}
                    onBlur={() => setHovered(null)}
                    onClick={() => toggleSelection(district.id, district.name)}
                    aria-pressed={selected === district.id}
                  >
                    <span className="row-index">
                      {String(district.id + 1).padStart(2, "0")}
                    </span>
                    <span>{district.name}</span>
                    <span className="row-arrow" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>

      </div>

      {toast && <div className="toast" role="status">{toast}</div>}
    </section>
  );
}
