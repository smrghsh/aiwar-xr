import { cleanValue, NODE_FIELDS, RECORD_FIELDS } from "./Tooltip.js";

// DOM panel opened by clicking/tapping a node. Two variants:
//   "sheet" — bottom sheet on touch devices
//   "side"  — right-hand dock on desktop (complements the hover tooltip)
// Same data pipeline as Tooltip ({node, record, connections}), but scrollable
// and with a tappable source link.

const STYLE = `
.aiwar-panel {
  position: fixed;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #ffffff;
  color: #111111;
  font-family: ui-monospace, Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.45;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.35);
  padding: 16px 18px calc(16px + env(safe-area-inset-bottom));
  transition: transform 0.25s ease;
}
.aiwar-panel--sheet {
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  max-height: 60vh;
  border-radius: 14px 14px 0 0;
  transform: translateY(105%);
}
.aiwar-panel--side {
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 900;
  width: min(380px, 85vw);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.35);
  transform: translateX(105%);
}
.aiwar-panel--open {
  transform: none;
}
.aiwar-panel__close {
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  background: #eeeeee;
  color: #333333;
  font-size: 16px;
  line-height: 1;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  cursor: pointer;
}
.aiwar-panel__title {
  font-size: 17px;
  font-weight: 700;
  margin: 0 36px 2px 0;
}
.aiwar-panel__meta {
  color: #555555;
  margin-bottom: 8px;
}
.aiwar-panel__section {
  color: #666666;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  margin: 14px 0 4px;
  border-top: 1px solid #dddddd;
  padding-top: 10px;
}
.aiwar-panel__field {
  margin: 4px 0;
}
.aiwar-panel__label {
  font-weight: 700;
}
.aiwar-panel a {
  color: #1a56b0;
}
`;

export default class InfoPanel {
  constructor({ variant = "side" } = {}) {
    const style = document.createElement("style");
    style.textContent = STYLE;
    document.head.appendChild(style);

    this.element = document.createElement("div");
    this.element.className = `aiwar-panel aiwar-panel--${variant}`;
    document.body.appendChild(this.element);

    this.closeButton = document.createElement("button");
    this.closeButton.className = "aiwar-panel__close";
    this.closeButton.textContent = "✕";
    this.closeButton.addEventListener("click", () => this.hide());

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.hide();
    });
  }

  _append(parent, tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    parent.appendChild(el);
    return el;
  }

  _appendField(parent, label, value) {
    if (!value) return;
    const field = this._append(parent, "div", "aiwar-panel__field");
    this._append(field, "span", "aiwar-panel__label", `${label}: `);
    this._append(field, "span", "", value);
  }

  render(data) {
    const node = data?.node || null;
    const record = data?.record || null;
    this.element.replaceChildren(this.closeButton);

    const title =
      cleanValue(node?.name) ||
      cleanValue(record?.Weapon) ||
      cleanValue(data?.name) ||
      "(unknown)";
    this._append(this.element, "div", "aiwar-panel__title", title);

    const metaParts = [
      cleanValue(node?.year),
      cleanValue(node?.currentStatus),
    ].filter(Boolean);
    if (metaParts.length) {
      this._append(
        this.element,
        "div",
        "aiwar-panel__meta",
        metaParts.join("  ·  ")
      );
    }

    if (node) {
      for (const [key, label] of NODE_FIELDS) {
        this._appendField(this.element, label, cleanValue(node[key]));
      }
    }

    if (record) {
      this._append(
        this.element,
        "div",
        "aiwar-panel__section",
        "AI WAR CLOUD DATABASE"
      );
      const developed = cleanValue(record.Developed);
      if (developed && developed !== cleanValue(node?.year)) {
        this._appendField(this.element, "Developed", developed);
      }
      for (const [key, label] of RECORD_FIELDS) {
        this._appendField(this.element, label, cleanValue(record[key]));
      }
      const source = cleanValue(record.Source);
      const sourceType = cleanValue(record.SourceType);
      const sourceText =
        source && sourceType ? `${source} (${sourceType})` : source || sourceType;
      const url = cleanValue(record.URL);
      if (sourceText) {
        const field = this._append(this.element, "div", "aiwar-panel__field");
        this._append(field, "span", "aiwar-panel__label", "Source: ");
        if (/^https?:\/\//.test(url)) {
          const link = this._append(field, "a", "", `${sourceText} ↗`);
          link.href = url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        } else {
          this._append(field, "span", "", sourceText);
        }
      }
    }

    const connections = Array.isArray(data?.connections)
      ? data.connections
      : null;
    if (connections?.length) {
      this._append(this.element, "div", "aiwar-panel__section", "CONNECTIONS");
      for (const group of connections) {
        this._appendField(this.element, group.label, group.names.join(", "));
      }
    }

    this.element.scrollTop = 0;
    this.element.classList.add("aiwar-panel--open");
  }

  hide() {
    this.element.classList.remove("aiwar-panel--open");
  }
}
