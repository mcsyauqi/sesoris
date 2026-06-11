'use client';
import { useEffect, useRef, useState } from 'react';
import { widgetCardStyle, widgetTitleStyle, widgetButtonRowStyle, widgetResultStyle } from '../tool-ui';

const FORM_HTML = "\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #E9ECEF; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>1.</strong> Have you used it in the last 3 months?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq0\" value=\"1\" /> Yes</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq0\" value=\"0\" checked /> No</label>\n    </div>\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #E9ECEF; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>2.</strong> Does it have emotional value (a memory or meaningful gift)?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq1\" value=\"1\" /> Yes</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq1\" value=\"0\" checked /> No</label>\n    </div>\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #E9ECEF; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>3.</strong> Could you easily replace or rebuy it?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq2\" value=\"1\" /> Yes</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq2\" value=\"0\" checked /> No</label>\n    </div>\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #E9ECEF; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>4.</strong> Does it fit the current style and function of the room?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq3\" value=\"1\" /> Yes</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq3\" value=\"0\" checked /> No</label>\n    </div>\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #E9ECEF; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>5.</strong> Would you miss it or go looking for it if it were gone?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq4\" value=\"1\" /> Yes</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq4\" value=\"0\" checked /> No</label>\n    </div>\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #E9ECEF; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>6.</strong> Does it have a dedicated storage spot?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq5\" value=\"1\" /> Yes</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq5\" value=\"0\" checked /> No</label>\n    </div>\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #E9ECEF; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>7.</strong> Is it still in good condition (not broken or expired)?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq6\" value=\"1\" /> Yes</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq6\" value=\"0\" checked /> No</label>\n    </div>\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #E9ECEF; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>8.</strong> Will you use it within the next 6 months?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq7\" value=\"1\" /> Yes</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq7\" value=\"0\" checked /> No</label>\n    </div>";
const FORMULA_JS = "\n    function calc() {\n      var radios = document.querySelectorAll('input[type=radio]:checked');\n      var score = 0;\n      radios.forEach(function(r){ score += parseInt(r.value) || 0; });\n      var rec;\n      if (score >= 6) rec = { label: 'KEEP', color: '#16a34a', desc: 'This item is worth keeping. Make sure it has a clear storage spot.' };\n      else if (score >= 3) rec = { label: 'REVIEW', color: '#f59e0b', desc: 'Think it over. Put it in a \"review\" box for 30 days - if you never use it, let it go.' };\n      else rec = { label: 'LET GO', color: '#dc2626', desc: 'It is time to let this one go. Choose: donate, sell, or toss it (if broken).' };\n      return { score: score, rec: rec };\n    }";
const RESULT_RENDER = "\n    var r = calc();\n    result.innerHTML = '<div style=\"text-align:center;\"><div style=\"font-size:14px;color:#666;\">Score: ' + r.score + ' / 8</div><div style=\"font-size:36px;font-weight:bold;color:' + r.rec.color + ';margin:8px 0;\">' + r.rec.label + '</div><div style=\"color:#444;\">' + r.rec.desc + '</div></div>';";

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
      <h2 style={widgetTitleStyle}>Calculator Tool</h2>
      <div ref={formRef} dangerouslySetInnerHTML={{ __html: FORM_HTML }} />
      <div style={widgetButtonRowStyle}>
        <button id="calcBtn" type="button" className="btn btn-primary">Calculate</button>
        <button id="resetBtn" type="button" className="btn btn-outline">Reset</button>
      </div>
      <div ref={resultRef} style={{ ...widgetResultStyle, display: resultVisible ? 'block' : 'none' }} />
    </section>
  );
}
