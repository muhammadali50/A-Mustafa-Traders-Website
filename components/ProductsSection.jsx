"use client";

import { useRef, useState } from "react";
import ButtonLink from "./ButtonLink";
import OptimizedImage from "./OptimizedImage";
import { useI18n } from "./LanguageProvider";
import { products } from "../data/products";
import styles from "./ProductsSection.module.css";

export default function ProductsSection() {
  const { t, dir, localize } = useI18n();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const gesture = useRef(null);
  const suppressClick = useRef(false);
  const lastMove = useRef(0);

  function move(direction) {
    if (Date.now() - lastMove.current < 450) return;
    lastMove.current = Date.now();
    setOpen(false);
    setActive((index) => (index + direction + products.length) % products.length);
  }

  function pointerDown(event) {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick.current = false;
    gesture.current = { x: event.clientX, y: event.clientY };
  }

  function pointerUp(event) {
    if (!gesture.current) return;
    const dx = event.clientX - gesture.current.x;
    const dy = event.clientY - gesture.current.y;
    gesture.current = null;
    if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy)) {
      suppressClick.current = true;
      move(dx < 0 ? 1 : -1);
    }
  }

  return (
    <section id="products" aria-labelledby="products-title" className={styles.section}>
      <div className={styles.stage}>
        <h2 id="products-title" className={styles.heading}>{t("productsSection.title")}</h2>
        {/* Brand signature: decorative Latin script in both languages. */}
        <p aria-hidden="true" lang="en" className={styles.signature}><span>A Mustafa</span> <span>Traders</span></p>
        {/* The carousel keeps one physical composition (and swipe/arrow mapping) in both languages. */}
        <div dir="ltr"
          className={`${styles.carousel} ${open ? styles.expanded : ""}`}
          role="region" aria-roledescription="carousel" aria-label={t("productsSection.carouselLabel")} tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowRight" ? 1 : -1);
            }
            if (event.key === "Escape") setOpen(false);
          }}
          onPointerDown={pointerDown}
          onPointerMove={(event) => {
            if (gesture.current && Math.abs(event.clientX - gesture.current.x) > 8) {
              event.currentTarget.setPointerCapture(event.pointerId);
            }
          }}
          onPointerUp={pointerUp}
          onPointerCancel={() => { gesture.current = null; }}
          onWheel={(event) => {
            if (Math.abs(event.deltaX) > 25 && Math.abs(event.deltaX) > Math.abs(event.deltaY)) move(event.deltaX > 0 ? 1 : -1);
          }}
        >
          {products.map((source, index) => {
            const product = localize("products", source);
            const half = Math.floor(products.length / 2);
            const distance = ((index - active + products.length + half) % products.length) - half;
            const offset = Math.max(-2, Math.min(2, distance));
            const isActive = offset === 0;
            const visible = Math.abs(offset) <= 1;
            const [left, top, width, height] = product.crop;
            return (
              <div key={product.id} className={styles.slot} data-offset={offset} aria-hidden={!visible}>
                <div id={`info-${product.id}`} role="region" aria-label={t("productsSection.details", { name: product.name })} aria-hidden={!isActive || !open} dir={dir}
                  className={`${styles.card} ${isActive && open ? styles.cardOpen : ""}`} style={{ backgroundColor: product.infoCardColor }}>
                  <h3>{product.name}</h3>
                  <p className={styles.type}>{product.type}</p>
                  <p>{product.description}</p>
                </div>
                <button type="button" className={styles.product} tabIndex={visible ? 0 : -1}
                  aria-label={isActive ? t(open ? "productsSection.hide" : "productsSection.show", { name: product.name }) : t("productsSection.select", product)}
                  aria-expanded={isActive ? open : undefined} aria-controls={isActive ? `info-${product.id}` : undefined}
                  onClick={() => {
                    if (suppressClick.current) { suppressClick.current = false; return; }
                    if (isActive) setOpen((value) => !value);
                    else move(offset < 0 ? -1 : 1);
                  }}>
                  <span className={styles.imageFrame} style={{ aspectRatio: `${width} / ${height}` }}>
                    <OptimizedImage src={`/media/${product.image}`} alt={t("productsSection.imageAlt", product)} width={product.source[0]} height={product.source[1]} draggable={false} className="object-contain"
                      sizes="(max-width: 639px) 36vw, min(28vw, 470px)"
                      style={{ width: `${product.source[0] / width * 100}%`, height: `${product.source[1] / height * 100}%`, left: `${-left / width * 100}%`, top: `${-top / height * 100}%` }} />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">{t("productsSection.status", { ...localize("products", products[active]), index: active + 1, total: products.length })}</p>
        <p className="sr-only">{t("productsSection.instructions")}</p>
        <div className={styles.footer}>
          <p className={styles.hint} aria-hidden="true">{t("productsSection.hint")}</p>
          <ButtonLink href="/products" variant="light" arrow className={styles.cta}>{t("productsSection.viewAll")}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
