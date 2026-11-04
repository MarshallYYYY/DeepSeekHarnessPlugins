window.__ModuleLoader__.load({
  id: '@local/turn-summary',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'turnSummary';
    const MODE_PREFIX = 'dsh.turn-summary.enabled.';
    const NAMES_PREFIX = 'dsh.turn-summary.names.';
    const LARGE_PREFIX = 'dsh.turn-marks.large.v2.';

    const zh = {
      toggle: '轮次摘要模式',
      toggleShort: '摘要',
      title: '轮次摘要',
      count: '共 {count} 轮',
      hint: '左键跳转 · 右键重命名',
      noText: '（无文字提问）',
      turn: '第 {turn} 轮',
      rename: '重命名这个轮次',
      largeOn: '大号',
      largeOff: '原始',
      largeToOriginal: '当前大号，切换为原始横条',
      largeToLarge: '当前原始，切换为大号横条',
    };

    const en = {
      toggle: 'Turn summary mode',
      toggleShort: 'Summary',
      title: 'Turn summaries',
      count: '{count} turns',
      hint: 'Click to jump · Right-click to rename',
      noText: '(no text prompt)',
      turn: 'Turn {turn}',
      rename: 'Rename this turn',
      largeOn: 'Large',
      largeOff: 'Original',
      largeToOriginal: 'Large marks, switch to original',
      largeToLarge: 'Original marks, switch to large',
    };

    const CSS = `
      nav[class*="_frame"][data-large-turn-marks="on"] button[data-index][class*="_mark"]::before {
        width: 28px;
        height: 6px;
        border-radius: 3px;
        transform: translateY(-50%) scaleX(.9);
      }

      nav[class*="_frame"][data-large-turn-marks="on"] button[data-index][class*="_markUnloaded"]::before {
        transform: translateY(-50%) scaleX(.8);
      }

      nav[class*="_frame"][data-large-turn-marks="on"] button[data-index][class*="_markPreview"]::before,
      nav[class*="_frame"][data-large-turn-marks="on"] button[data-index][class*="_markActive"]::before,
      nav[class*="_frame"][data-large-turn-marks="on"] button[data-index]:focus-visible::before {
        transform: translateY(-50%) scaleX(1);
      }

      nav[data-turn-summary-mode="on"] {
        visibility: hidden;
        pointer-events: none;
      }

      .dsh-ts-float {
        position: fixed;
        z-index: 80;
      }

      .dsh-ts-size {
        position: fixed;
        z-index: 80;
        box-sizing: border-box;
        height: 22px;
        padding: 0 8px;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 999px;
        background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 10px;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
      }

      .dsh-ts-size:hover {
        border-color: var(--dsw-alias-border-l2);
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-primary);
      }

      .dsh-ts-size:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 1px;
      }

      .dsh-ts-switch {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        height: 24px;
        padding: 0 8px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--dsw-alias-label-secondary);
        font: inherit;
        font-size: 12px;
        line-height: 1;
        cursor: pointer;
        flex: none;
      }

      .dsh-ts-float .dsh-ts-switch {
        padding: 0 10px;
        border: 1px solid var(--dsw-alias-border-l1);
        background: var(--dsw-alias-bg-layer-1);
      }

      .dsh-ts-switch:hover {
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-primary);
      }

      .dsh-ts-float .dsh-ts-switch:hover {
        border-color: var(--dsw-alias-border-l2);
      }

      .dsh-ts-switch:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: 1px;
      }

      .dsh-ts-switch-on {
        color: var(--dsw-alias-label-primary);
      }

      .dsh-ts-track {
        position: relative;
        width: 26px;
        height: 14px;
        box-sizing: border-box;
        flex: none;
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 999px;
        background: var(--dsw-alias-bg-layer-2);
        transition: background-color .15s, border-color .15s;
      }

      .dsh-ts-thumb {
        position: absolute;
        top: 1px;
        left: 1px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--dsw-alias-label-secondary);
        transition: transform .15s, background-color .15s;
      }

      .dsh-ts-switch-on .dsh-ts-track {
        border-color: var(--dsw-alias-brand-primary);
        background: var(--dsw-alias-brand-primary);
      }

      .dsh-ts-switch-on .dsh-ts-thumb {
        transform: translateX(12px);
        background: var(--dsw-alias-bg-base);
      }

      .dsh-ts-panel {
        position: fixed;
        z-index: 80;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 280px;
        max-width: calc(100vw - 64px);
        border: 1px solid var(--dsw-alias-border-l1);
        border-radius: 16px;
        background: var(--dsw-alias-bg-layer-1);
        color: var(--dsw-alias-label-primary);
        pointer-events: auto;
        overflow: hidden;
      }

      .dsh-ts-heading {
        display: flex;
        align-items: baseline;
        gap: 8px;
        min-width: 0;
      }

      .dsh-ts-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 11px 14px 9px;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
        flex: none;
      }

      .dsh-ts-title {
        font-size: 13px;
        font-weight: 600;
      }

      .dsh-ts-count {
        color: var(--dsw-alias-label-secondary);
        font-size: 11px;
      }

      .dsh-ts-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1 1 auto;
        min-height: 0;
        padding: 6px;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-width: thin;
      }

      .dsh-ts-row {
        display: flex;
        align-items: flex-start;
        gap: 9px;
        box-sizing: border-box;
        padding: 9px 10px;
        border-radius: 10px;
        outline: none;
        cursor: pointer;
      }

      .dsh-ts-row:hover {
        background: var(--dsw-alias-bg-layer-2);
      }

      .dsh-ts-row:focus-visible {
        outline: 2px solid var(--dsw-alias-brand-primary);
        outline-offset: -2px;
      }

      .dsh-ts-row[data-active="true"] {
        background: var(--dsw-alias-bg-layer-2);
        box-shadow: inset 2px 0 0 var(--dsw-alias-brand-primary);
      }

      .dsh-ts-turn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 22px;
        height: 20px;
        padding: 0 5px;
        box-sizing: border-box;
        flex: none;
        border-radius: 6px;
        background: var(--dsw-alias-bg-layer-2);
        color: var(--dsw-alias-label-secondary);
        font-size: 10px;
        font-weight: 600;
      }

      .dsh-ts-summary {
        flex: 1;
        min-width: 0;
        color: var(--dsw-alias-label-primary);
        font-size: 12px;
        line-height: 1.5;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        white-space: normal;
        word-break: break-word;
      }

      .dsh-ts-input {
        flex: 1;
        min-width: 0;
        box-sizing: border-box;
        padding: 4px 7px;
        border: 1px solid var(--dsw-alias-brand-primary);
        border-radius: 7px;
        outline: none;
        background: var(--dsw-alias-bg-base);
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 12px;
        line-height: 1.5;
      }

      .dsh-ts-hint {
        padding: 6px 12px 8px;
        flex: none;
        border-top: 1px solid var(--dsw-alias-border-l1);
        color: var(--dsw-alias-label-secondary);
        font-size: 10px;
        text-align: center;
      }

      @media (max-width: 760px) {
        .dsh-ts-switch-label {
          display: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .dsh-ts-track,
        .dsh-ts-thumb {
          transition: none;
        }
      }
    `;

    function readSessionEnabled(sessionId) {
      try {
        const stored = localStorage.getItem(`${MODE_PREFIX}${sessionId}`);
        return stored === null ? true : stored === '1';
      } catch {
        return true;
      }
    }

    function writeSessionEnabled(sessionId, enabled) {
      try {
        localStorage.setItem(`${MODE_PREFIX}${sessionId}`, enabled ? '1' : '0');
      } catch {
        // Session-only state is still useful when storage is unavailable.
      }
    }

    function readLargeMarks(sessionId) {
      try {
        return localStorage.getItem(`${LARGE_PREFIX}${sessionId}`) === '1';
      } catch {
        return false;
      }
    }

    function writeLargeMarks(sessionId, large) {
      try {
        localStorage.setItem(`${LARGE_PREFIX}${sessionId}`, large ? '1' : '0');
      } catch {
        // Session-only state is still useful when storage is unavailable.
      }
    }

    function createPanelStore() {
      let snapshot = null;
      const listeners = new Set();
      return {
        source: {
          getSnapshot: () => snapshot,
          subscribe: (listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
          },
        },
        set: (next) => {
          snapshot = next;
          for (const listener of listeners) listener();
        },
        clear: () => {
          if (snapshot === null) return;
          snapshot = null;
          for (const listener of listeners) listener();
        },
      };
    }

    const panelStore = createPanelStore();

    function readNames(sessionId) {
      try {
        const raw = localStorage.getItem(`${NAMES_PREFIX}${sessionId}`);
        if (raw === null) return {};
        const parsed = JSON.parse(raw);
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {};
        const names = {};
        for (const [turn, value] of Object.entries(parsed)) {
          if (typeof value === 'string' && value.trim() !== '') names[turn] = value;
        }
        return names;
      } catch {
        return {};
      }
    }

    function writeNames(sessionId, names) {
      try {
        localStorage.setItem(`${NAMES_PREFIX}${sessionId}`, JSON.stringify(names));
      } catch {
        // Keep the in-memory names for this page when storage is unavailable.
      }
    }

    function normalizeOutline(outline) {
      if (!Array.isArray(outline)) return [];
      const entries = [];
      for (const raw of outline) {
        if (typeof raw !== 'object' || raw === null) continue;
        if (!Number.isSafeInteger(raw.turn) || raw.turn < 0) continue;
        entries.push({
          turn: raw.turn,
          prompt: typeof raw.prompt === 'string' ? raw.prompt : '',
        });
      }
      entries.sort((left, right) => left.turn - right.turn);
      return entries;
    }

    function cleanText(value) {
      return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
    }

    function summarize(value) {
      const text = cleanText(value);
      if (text.length <= 40) return text;
      const clipped = text.slice(0, 40);
      const space = clipped.lastIndexOf(' ');
      const cut = space > 22 ? clipped.slice(0, space) : clipped;
      return `${cut.trimEnd()}…`;
    }

    function findRail() {
      return document.querySelector('nav[class*="_frame"]');
    }

    function sameBox(left, right) {
      return Math.abs(left.top - right.top) < 0.5
        && Math.abs(left.right - right.right) < 0.5
        && Math.abs(left.height - right.height) < 0.5
        && left.visible === right.visible;
    }

    function navigateToMark(rail, index) {
      const selector = `button[data-index="${index}"]`;
      const direct = rail.querySelector(selector);
      if (direct !== null) {
        direct.click();
        return;
      }
      const scroller = rail.querySelector('div[class*="_scroller"]');
      if (scroller === null) return;
      const target = Math.max(0, index * 10 - scroller.clientHeight / 2);
      scroller.scrollTop = target;
      scroller.dispatchEvent(new Event('scroll', { bubbles: true }));
      let attempts = 6;
      const tryClick = () => {
        if (!rail.isConnected) return;
        const button = rail.querySelector(selector);
        if (button !== null) {
          button.click();
          return;
        }
        attempts -= 1;
        if (attempts > 0) window.setTimeout(tryClick, 40);
      };
      window.setTimeout(tryClick, 40);
    }

    function SummarySwitch({ tr, checked, onClick }) {
      return h(
        'button',
        {
          type: 'button',
          role: 'switch',
          'aria-checked': checked ? 'true' : 'false',
          'aria-label': tr('toggle'),
          title: tr('toggle'),
          className: `dsh-ts-switch${checked ? ' dsh-ts-switch-on' : ''}`,
          onClick,
        },
        h(
          'span',
          { className: 'dsh-ts-track', 'aria-hidden': 'true' },
          h('span', { className: 'dsh-ts-thumb' }),
        ),
        h('span', { className: 'dsh-ts-switch-label' }, tr('toggleShort')),
      );
    }

    function TurnSummaryOverlay({ t, usePanel }) {
      const tr = typeof t === 'function' ? t : (key) => key;
      React.useInsertionEffect(() => {
        const tag = document.createElement('style');
        tag.dataset.plugin = '@local/turn-summary';
        tag.textContent = CSS;
        document.head.appendChild(tag);
        return () => {
          tag.remove();
        };
      }, []);

      const view = usePanel((snapshot) => snapshot);
      if (view == null || view.box === null || !view.box.visible || view.entries.length === 0) {
        return null;
      }
      const enabled = view.enabled;
      const toggle = view.toggle;

      const viewportHeight = window.innerHeight;

      if (!enabled) {
        // Closed: the switch is a standalone pill just above the bars, and the
        // size control sits just below them. Both share the rail's right edge.
        const top = Math.min(
          Math.max(8, view.box.top - 34),
          Math.max(8, viewportHeight - 32),
        );
        const sizeTop = Math.min(
          view.box.top + view.box.height + 8,
          Math.max(8, viewportHeight - 30),
        );
        return h(
          React.Fragment,
          null,
          h(
            'div',
            {
              className: 'dsh-ts-float',
              style: { top, right: view.box.right },
            },
            h(SummarySwitch, {
              tr,
              checked: false,
              onClick: toggle,
            }),
          ),
          h(
            'button',
            {
              type: 'button',
              className: 'dsh-ts-size',
              style: { top: sizeTop, right: view.box.right },
              title: view.largeMarks ? tr('largeToOriginal') : tr('largeToLarge'),
              'aria-label': view.largeMarks ? tr('largeToOriginal') : tr('largeToLarge'),
              'aria-pressed': view.largeMarks ? 'true' : 'false',
              onClick: view.toggleLarge,
            },
            view.largeMarks ? tr('largeOn') : tr('largeOff'),
          ),
        );
      }

      // Open: the panel is vertically centred on the bar rail and right-aligned
      // to the rail's right edge. The switch lives in the panel header, so the
      // panel is not anchored underneath the switch.
      const maxHeight = Math.max(180, Math.round(viewportHeight * 0.7));
      const half = maxHeight / 2;
      const railCenter = view.box.top + view.box.height / 2;
      const center = Math.min(
        Math.max(railCenter, half + 8),
        viewportHeight - half - 8,
      );

      return h(TurnSummaryPanel, {
        tr,
        view,
        maxHeight,
        center,
        right: view.box.right,
        onClose: toggle,
      });
    }

    function TurnSummaryPanel({ tr, view, maxHeight, center, right, onClose }) {
      const [editing, setEditing] = React.useState(null);
      const [draft, setDraft] = React.useState('');
      const skipBlur = React.useRef(false);
      const listRef = React.useRef(null);
      const lastFollow = React.useRef({
        sessionId: view.sessionId,
        turn: null,
        prompt: '',
      });
      const entries = view.entries;
      const names = view.names;
      const activeIndex = view.activeIndex;

      React.useEffect(() => {
        setEditing(null);
        setDraft('');
      }, [view.sessionId]);

      React.useLayoutEffect(() => {
        if (activeIndex < 0 || listRef.current === null) return;
        const row = listRef.current.querySelector(`[data-turn-index="${activeIndex}"]`);
        if (row !== null && typeof row.scrollIntoView === 'function') {
          row.scrollIntoView({ block: 'nearest' });
        }
      }, [activeIndex]);

      // After the user submits, the outline gains a new latest turn (and then
      // its prompt preview). Follow the newest entry to the bottom of the list.
      React.useLayoutEffect(() => {
        const latest = entries[entries.length - 1];
        if (latest === undefined) return;
        const previous = lastFollow.current;
        const sessionChanged = previous.sessionId !== view.sessionId;
        const turnChanged = previous.turn !== latest.turn;
        const promptChanged = previous.prompt !== latest.prompt;
        lastFollow.current = {
          sessionId: view.sessionId,
          turn: latest.turn,
          prompt: latest.prompt,
        };
        if (!sessionChanged && !turnChanged && !promptChanged) return;
        const list = listRef.current;
        if (list === null) return;
        list.scrollTop = list.scrollHeight;
      }, [entries, view.sessionId]);

      function summaryFor(entry) {
        const custom = names[String(entry.turn)];
        if (typeof custom === 'string' && custom.trim() !== '') return custom;
        return summarize(entry.prompt) || tr('noText');
      }

      function startRename(event, entry) {
        event.preventDefault();
        event.stopPropagation();
        skipBlur.current = false;
        setEditing(entry.turn);
        setDraft(names[String(entry.turn)] ?? '');
      }

      function commit(turn) {
        view.rename(turn, draft);
        setEditing(null);
      }

      function cancel() {
        skipBlur.current = true;
        setEditing(null);
      }

      return h(
        'aside',
        {
          className: 'dsh-ts-panel',
          style: {
            top: center,
            right,
            maxHeight,
            transform: 'translateY(-50%)',
          },
          'aria-label': tr('title'),
        },
        h(
          'div',
          { className: 'dsh-ts-header' },
          h(
            'div',
            { className: 'dsh-ts-heading' },
            h('span', { className: 'dsh-ts-title' }, tr('title')),
            h('span', { className: 'dsh-ts-count' }, tr('count', { count: entries.length })),
          ),
          h(SummarySwitch, {
            tr,
            checked: true,
            onClick: onClose,
          }),
        ),
        h(
          'div',
          { className: 'dsh-ts-list', ref: listRef },
          entries.map((entry, index) => {
            const active = activeIndex === index;
            const isEditing = editing === entry.turn;
            return h(
              'div',
              {
                key: entry.turn,
                role: 'button',
                tabIndex: 0,
                className: 'dsh-ts-row',
                'data-turn-index': index,
                'data-active': active ? 'true' : undefined,
                'aria-current': active ? 'true' : undefined,
                title: tr('turn', { turn: entry.turn }),
                onClick: () => {
                  if (!isEditing) view.navigate(index);
                },
                onKeyDown: (event) => {
                  if (isEditing) return;
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    view.navigate(index);
                  }
                },
                onContextMenu: (event) => startRename(event, entry),
              },
              h('span', { className: 'dsh-ts-turn' }, String(entry.turn)),
              isEditing
                ? h('input', {
                    className: 'dsh-ts-input',
                    value: draft,
                    autoFocus: true,
                    'aria-label': tr('rename'),
                    placeholder: summaryFor(entry),
                    onChange: (event) => setDraft(event.target.value),
                    onClick: (event) => event.stopPropagation(),
                    onPointerDown: (event) => event.stopPropagation(),
                    onFocus: (event) => event.target.select(),
                    onKeyDown: (event) => {
                      event.stopPropagation();
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        commit(entry.turn);
                      } else if (event.key === 'Escape') {
                        event.preventDefault();
                        cancel();
                      }
                    },
                    onBlur: () => {
                      if (skipBlur.current) {
                        skipBlur.current = false;
                        return;
                      }
                      commit(entry.turn);
                    },
                  })
                : h('span', { className: 'dsh-ts-summary' }, summaryFor(entry)),
            );
          }),
        ),
        h('div', { className: 'dsh-ts-hint' }, tr('hint')),
      );
    }

    function TurnSummaryController({ sessionId, useProjection }) {
      const [enabled, setEnabled] = React.useState(() => readSessionEnabled(sessionId));
      const [largeMarks, setLargeMarks] = React.useState(() => readLargeMarks(sessionId));
      const outline = useProjection('turnOutline');
      const entries = React.useMemo(() => normalizeOutline(outline), [outline]);
      const hasEntries = entries.length > 0;
      const [names, setNames] = React.useState(() => readNames(sessionId));
      const [box, setBox] = React.useState(null);
      const [activeIndex, setActiveIndex] = React.useState(-1);
      const railRef = React.useRef(null);

      React.useEffect(() => {
        setNames(readNames(sessionId));
        setEnabled(readSessionEnabled(sessionId));
        setLargeMarks(readLargeMarks(sessionId));
      }, [sessionId]);

      const toggle = React.useCallback(() => {
        setEnabled((current) => {
          const next = !current;
          writeSessionEnabled(sessionId, next);
          return next;
        });
      }, [sessionId]);

      const toggleLarge = React.useCallback(() => {
        setLargeMarks((current) => {
          const next = !current;
          writeLargeMarks(sessionId, next);
          return next;
        });
      }, [sessionId]);

      React.useLayoutEffect(() => {
        if (!hasEntries) {
          setBox(null);
          setActiveIndex(-1);
          return;
        }
        let disposed = false;
        let rail = null;
        let frame = 0;
        let attempts = 0;
        let resize = null;
        let mutations = null;
        let host = null;

        const measure = () => {
          if (disposed || rail === null) return;
          const rect = rail.getBoundingClientRect();
          const next = {
            top: rect.top,
            right: Math.max(8, window.innerWidth - rect.right),
            height: Math.max(0, rect.height),
            visible: rect.width > 0 && rect.height > 0,
          };
          setBox((previous) => (previous !== null && sameBox(previous, next) ? previous : next));
        };

        const readActive = () => {
          if (disposed || rail === null) return;
          const active = rail.querySelector('button[aria-current="true"]');
          const value = active === null ? -1 : Number(active.getAttribute('data-index'));
          const next = Number.isInteger(value) ? value : -1;
          setActiveIndex((previous) => (previous === next ? previous : next));
        };

        const attach = () => {
          if (disposed) return;
          rail = findRail();
          if (rail === null) {
            attempts += 1;
            if (attempts < 120) frame = requestAnimationFrame(attach);
            return;
          }
          railRef.current = rail;
          if (enabled) rail.dataset.turnSummaryMode = 'on';
          rail.dataset.largeTurnMarks = largeMarks ? 'on' : 'off';
          measure();
          if (typeof ResizeObserver === 'function') {
            resize = new ResizeObserver(measure);
            resize.observe(rail);
            host = rail.closest('[data-conversation-scroll]') ?? rail.parentElement;
            if (host !== null) resize.observe(host);
          }
          mutations = new MutationObserver(readActive);
          mutations.observe(rail, {
            attributes: true,
            attributeFilter: ['aria-current'],
            childList: true,
            subtree: true,
          });
          readActive();
          window.addEventListener('resize', measure);
        };

        attach();

        return () => {
          disposed = true;
          cancelAnimationFrame(frame);
          if (rail !== null) {
            delete rail.dataset.turnSummaryMode;
            delete rail.dataset.largeTurnMarks;
            railRef.current = null;
          }
          resize?.disconnect();
          mutations?.disconnect();
          window.removeEventListener('resize', measure);
        };
      }, [enabled, sessionId, hasEntries]);

      React.useEffect(() => {
        const rail = railRef.current;
        if (rail !== null) rail.dataset.largeTurnMarks = largeMarks ? 'on' : 'off';
      }, [largeMarks]);

      const navigate = React.useCallback((index) => {
        const rail = railRef.current ?? findRail();
        if (rail === null) return;
        setActiveIndex(index);
        navigateToMark(rail, index);
      }, []);

      const rename = React.useCallback((turn, value) => {
        const clean = typeof value === 'string' ? value.trim() : '';
        setNames((current) => {
          const next = { ...current };
          if (clean === '') delete next[String(turn)];
          else next[String(turn)] = clean;
          writeNames(sessionId, next);
          return next;
        });
      }, [sessionId]);

      React.useEffect(() => {
        panelStore.set({
          enabled,
          toggle,
          largeMarks,
          toggleLarge,
          sessionId,
          entries,
          names,
          box,
          activeIndex,
          navigate,
          rename,
        });
      }, [enabled, toggle, largeMarks, toggleLarge, sessionId, entries, names, box, activeIndex, navigate, rename]);

      React.useEffect(() => () => {
        panelStore.clear();
      }, []);

      return null;
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'turn summary dictionaries');

        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'turn-summary',
          locale: NS,
          inject: () => ({
            hooks: {
              panel: panelStore.source,
            },
          }),
        }, TurnSummaryOverlay));

        ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({
          name: 'conversation.session.header.actions',
          id: 'turn-summary-controller',
          order: 5,
        }, TurnSummaryController));
      },
    };
  },
});
