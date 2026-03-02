<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'

const { currentPage, total, currentSlideNo } = useNav()

// Hide header on cover slides (they have their own full-bleed design)
const hide = computed(() => {
  // currentPage is 1-indexed; we hide only on the cover page of each module
  // Cover slides are the very first slide (page 1) — check via DOM class as fallback
  return false
})
</script>

<template>
  <header v-if="!hide" class="emtp-header">
    <!-- Left: brand (matches website Header.tsx left side) -->
    <div class="emtp-left">
      <span class="emtp-brand">2026 EMTP 複訓</span>
      <span class="emtp-sep"></span>
      <span class="emtp-sub">院前高級救命術</span>
    </div>
    <!-- Right: slide counter (matches website fullscreen button area) -->
    <div class="emtp-right">
      <span class="emtp-counter">{{ currentPage }} / {{ total }}</span>
    </div>
  </header>
</template>

<style>
/* ── Global header — matches web/src/components/layout/Header.tsx ── */
.emtp-header {
  position: fixed;
  inset: 0 0 auto 0;
  height: 48px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  z-index: 200;
  font-family: 'Noto Sans TC', 'PingFang TC', system-ui, sans-serif;
  box-sizing: border-box;
}

.emtp-left  { display: flex; align-items: center; gap: 0; }
.emtp-brand { color: #1B2A4A; font-size: 14px; font-weight: 700; letter-spacing: 0.01em; }
.emtp-sep   { display: inline-block; width: 1px; height: 16px; background: #d1d5db; margin: 0 12px; }
.emtp-sub   { color: #6b7280; font-size: 12px; font-weight: 500; }
.emtp-right { display: flex; align-items: center; }
.emtp-counter { color: #9ca3af; font-size: 11px; font-weight: 500; }

/* ── Push all slide content below the header ── */
.slidev-layout {
  padding-top: 52px !important;
  box-sizing: border-box;
}

/* Cover layout: fill the header area too (gradient goes full bleed) */
.slidev-layout.cover {
  padding-top: 0 !important;
}

/* Ensure cover slides show the header on top of gradient */
.slidev-layout.cover ~ .emtp-header,
.slidev-page[data-index="0"] .emtp-header {
  background: rgba(27, 42, 74, 0.7);
  border-color: rgba(255,255,255,0.1);
}
.slidev-layout.cover .emtp-brand,
.slidev-layout.cover .emtp-sub  { color: rgba(255,255,255,0.85); }
.slidev-layout.cover .emtp-sep  { background: rgba(255,255,255,0.2); }
.slidev-layout.cover .emtp-counter { color: rgba(255,255,255,0.4); }
</style>
