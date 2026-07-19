import { cleanValue, NODE_FIELDS, RECORD_FIELDS } from "./Tooltip.js";

// DOM bottom sheet shown on touch devices instead of the world-space tooltip.
// Same data pipeline as Tooltip ({node, record, connections}), but scrollable
// and with a tappable source link.

const STYLE = `
.aiwar-sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  max-height: 60vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #ffffff;
  color: #111111;
  font-family: ui-monospace, Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.45;
  border-radius: 14px 14px 0 0;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.35);
  padding: 16px 18px calc(16px + env(safe-area-inset-bottom));
  transform: translateY(105%);
  transition: transform 0.25s ease;
}
.aiwar-sheet.aiwar-sheet--open {
  transform: translateY(0);
}
.aiwar-sheet__close {
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
}
.aiwar-sheet__title {
  font-size: 17px;
  font-weight: 700;
  margin: 0 36px 2px 0;
}
.aiwar-sheet__meta {
  color: #555555;
  margin-bottom: 8px;
}
.aiwar-sheet__section {
  color: #666666;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  margin: 14px 0 4px;
  border-top: 1px solid #dddddd;
  padding-top: 10px;
}
.aiwar-sheet__field {
  margin: 4px 0;
}
.aiwar-sheet__label {
  font-weight: 700;
}
.aiwar-sheet a {
  color: #1a56b0;
}
`;

export default class MobilePanel {
  constructor() {
    const style = document.createElement("style");
    style.textContent = STYLE;
    document.head.appendChild(style);

    this.element = document.createElement("div");
    this.element.className = "aiwar-sheet";
    document.body.appendChild(this.element);

    this.closeButton = document.createElement("button");
    this.closeButton.className = "aiwar-sheet__close";
    this.closeButton.textContent = "✕";
    this.closeButton.addEventListener("click", () => this.hide());
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
    const field = this._append(parent, "div", "aiwar-sheet__field");
    this._append(field, "span", "aiwar-sheet__label", `${label}: `);
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
    this._append(this.element, "div", "aiwar-sheet__title", title);

    const metaParts = [
      cleanValue(node?.year),
      cleanValue(node?.currentStatus),
    ].filter(Boolean);
    if (metaParts.length) {
      this._append(
        this.element,
        "div",
        "aiwar-sheet__meta",
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
        "aiwar-sheet__section",
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
        const field = this._append(this.element, "div", "aiwar-sheet__field");
        this._append(field, "span", "aiwar-sheet__label", "Source: ");
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
      this._append(this.element, "div", "aiwar-sheet__section", "CONNECTIONS");
      for (const group of connections) {
        this._appendField(this.element, group.label, group.names.join(", "));
      }
    }

    this.element.scrollTop = 0;
    this.element.classList.add("aiwar-sheet--open");
  }

  hide() {
    this.element.classList.remove("aiwar-sheet--open");
  }
}
