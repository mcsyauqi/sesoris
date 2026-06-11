'use client';
import { useEffect, useRef, useState } from 'react';
import { widgetCardStyle, widgetTitleStyle, widgetButtonRowStyle, widgetResultStyle } from '../tool-ui';

const FORM_HTML = "\n    <div style=\"margin-bottom: 16px;\">\n      <label for=\"amt\" style=\"display: block; margin-bottom: 4px; font-weight: 600;\">Amount</label>\n      <input type=\"number\" id=\"amt\" placeholder=\"e.g. 100\" step=\"any\" style=\"width: 100%; padding: 12px; border: 1px solid #DEE2E6; border-radius: 8px; font-size: 16px;\" />\n    </div>\n    <div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;\">\n      <div>\n        <label for=\"from\" style=\"display: block; margin-bottom: 4px; font-weight: 600;\">From</label>\n        <select id=\"from\" style=\"width: 100%; padding: 12px; border: 1px solid #DEE2E6; border-radius: 8px; font-size: 16px;\"><option value=\"gram\" data-kind=\"mass\">Gram (g)</option><option value=\"kg\" data-kind=\"mass\">Kilogram (kg)</option><option value=\"ons\" data-kind=\"mass\">Ons (Indonesian, 100 g)</option><option value=\"pon\" data-kind=\"mass\">Pon (Indonesian, 500 g)</option><option value=\"lb\" data-kind=\"mass\">Pound (lb)</option><option value=\"oz\" data-kind=\"mass\">Ounce (oz)</option><option value=\"ml\" data-kind=\"volume\">Milliliter (ml)</option><option value=\"liter\" data-kind=\"volume\">Liter (L)</option><option value=\"cup\" data-kind=\"volume\">Cup (240 ml)</option><option value=\"sendok_makan\" data-kind=\"volume\">Tablespoon (tbsp, 15 ml)</option><option value=\"sendok_teh\" data-kind=\"volume\">Teaspoon (tsp, 5 ml)</option><option value=\"cangkir\" data-kind=\"volume\">Teacup (240 ml)</option><option value=\"gelas_belimbing\" data-kind=\"volume\">Glass (Indonesian, 200 ml)</option></select>\n      </div>\n      <div>\n        <label for=\"to\" style=\"display: block; margin-bottom: 4px; font-weight: 600;\">To</label>\n        <select id=\"to\" style=\"width: 100%; padding: 12px; border: 1px solid #DEE2E6; border-radius: 8px; font-size: 16px;\"><option value=\"gram\" data-kind=\"mass\">Gram (g)</option><option value=\"kg\" data-kind=\"mass\">Kilogram (kg)</option><option value=\"ons\" data-kind=\"mass\">Ons (Indonesian, 100 g)</option><option value=\"pon\" data-kind=\"mass\">Pon (Indonesian, 500 g)</option><option value=\"lb\" data-kind=\"mass\">Pound (lb)</option><option value=\"oz\" data-kind=\"mass\">Ounce (oz)</option><option value=\"ml\" data-kind=\"volume\">Milliliter (ml)</option><option value=\"liter\" data-kind=\"volume\">Liter (L)</option><option value=\"cup\" data-kind=\"volume\">Cup (240 ml)</option><option value=\"sendok_makan\" data-kind=\"volume\">Tablespoon (tbsp, 15 ml)</option><option value=\"sendok_teh\" data-kind=\"volume\">Teaspoon (tsp, 5 ml)</option><option value=\"cangkir\" data-kind=\"volume\">Teacup (240 ml)</option><option value=\"gelas_belimbing\" data-kind=\"volume\">Glass (Indonesian, 200 ml)</option></select>\n      </div>\n    </div>";
const FORMULA_JS = "\n    var UNITS = {\"gram\":{\"factor\":1,\"kind\":\"mass\",\"label\":\"Gram (g)\"},\"kg\":{\"factor\":1000,\"kind\":\"mass\",\"label\":\"Kilogram (kg)\"},\"ons\":{\"factor\":100,\"kind\":\"mass\",\"label\":\"Ons (Indonesian, 100 g)\"},\"pon\":{\"factor\":500,\"kind\":\"mass\",\"label\":\"Pon (Indonesian, 500 g)\"},\"lb\":{\"factor\":453.592,\"kind\":\"mass\",\"label\":\"Pound (lb)\"},\"oz\":{\"factor\":28.3495,\"kind\":\"mass\",\"label\":\"Ounce (oz)\"},\"ml\":{\"factor\":1,\"kind\":\"volume\",\"label\":\"Milliliter (ml)\"},\"liter\":{\"factor\":1000,\"kind\":\"volume\",\"label\":\"Liter (L)\"},\"cup\":{\"factor\":240,\"kind\":\"volume\",\"label\":\"Cup (240 ml)\"},\"sendok_makan\":{\"factor\":15,\"kind\":\"volume\",\"label\":\"Tablespoon (tbsp, 15 ml)\"},\"sendok_teh\":{\"factor\":5,\"kind\":\"volume\",\"label\":\"Teaspoon (tsp, 5 ml)\"},\"cangkir\":{\"factor\":240,\"kind\":\"volume\",\"label\":\"Teacup (240 ml)\"},\"gelas_belimbing\":{\"factor\":200,\"kind\":\"volume\",\"label\":\"Glass (Indonesian, 200 ml)\"}};\n    function calc() {\n      var amt = parseFloat(document.getElementById('amt').value);\n      var from = document.getElementById('from').value;\n      var to = document.getElementById('to').value;\n      var fromU = UNITS[from], toU = UNITS[to];\n      if (isNaN(amt)) return { error: 'Enter a valid number.' };\n      if (!fromU || !toU) return { error: 'Unit not recognized.' };\n      if (fromU.kind !== toU.kind) return { error: 'Mass <-> volume conversion is not accurate without the ingredient density. Pick units of the same type.' };\n      var base = amt * fromU.factor;\n      var out = base / toU.factor;\n      return { out: out, amt: amt, fromLabel: fromU.label, toLabel: toU.label };\n    }";
const RESULT_RENDER = "\n    var r = calc();\n    if (r.error) { result.innerHTML = '<span style=\"color:#dc2626\">' + r.error + '</span>'; return; }\n    var rounded = Math.round(r.out * 10000) / 10000;\n    result.innerHTML = '<strong>Result:</strong> ' + r.amt + ' ' + r.fromLabel.split(' ')[0] + ' = ' + rounded.toLocaleString('en-US') + ' ' + r.toLabel.split(' ')[0];";

export default function ToolWidget() {
  const formRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [resultVisible, setResultVisible] = useState(false);

  useEffect(() => {
    if (!formRef.current || !resultRef.current) return;
    const result = resultRef.current;
    const fn = new Function('result', FORMULA_JS + '\n; return function() {' + RESULT_RENDER + '};');
    const handler = fn(result);

    const btn = document.getElementById('calcBtn');
    const resetBtn = document.getElementById('resetBtn');

    function onCalc() {
      setResultVisible(true);
      handler();
    }
    function onReset() {
      const root = formRef.current;
      if (root) {
        const inputs = root.querySelectorAll('input, select, textarea');
        inputs.forEach((el: Element) => {
          const node = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
          if (node instanceof HTMLInputElement && (node.type === 'radio' || node.type === 'checkbox')) {
            node.checked = node.defaultChecked;
          } else if (node instanceof HTMLSelectElement) {
            node.selectedIndex = 0;
          } else {
            node.value = '';
          }
        });
      }
      result.innerHTML = '';
      setResultVisible(false);
    }

    btn && btn.addEventListener('click', onCalc);
    resetBtn && resetBtn.addEventListener('click', onReset);
    return () => {
      btn && btn.removeEventListener('click', onCalc);
      resetBtn && resetBtn.removeEventListener('click', onReset);
    };
  }, []);

  return (
    <section style={widgetCardStyle}>
      <h2 style={widgetTitleStyle}>Converter Tool</h2>
      <div ref={formRef} dangerouslySetInnerHTML={{ __html: FORM_HTML }} />
      <div style={widgetButtonRowStyle}>
        <button id="calcBtn" type="button" className="btn btn-primary">Calculate</button>
        <button id="resetBtn" type="button" className="btn btn-outline">Reset</button>
      </div>
      <div ref={resultRef} style={{ ...widgetResultStyle, display: resultVisible ? 'block' : 'none' }} />
    </section>
  );
}
