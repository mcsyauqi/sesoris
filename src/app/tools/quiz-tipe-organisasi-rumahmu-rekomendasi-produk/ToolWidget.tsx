'use client';
import { useEffect, useRef, useState } from 'react';

const FORM_HTML = "\n    <div style=\"margin-bottom: 16px; padding: 12px; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px;\">\n      <p style=\"font-weight: 600; margin: 0 0 8px 0;\">1. Ruang utama yang ingin dirapikan?</p>\n      <label style=\"display: block; padding: 6px 0;\"><input type=\"radio\" name=\"q0\" value=\"0\" data-score='{\"bedroom\":1}' /> Kamar tidur</label><label style=\"display: block; padding: 6px 0;\"><input type=\"radio\" name=\"q0\" value=\"1\" data-score='{\"kitchen\":1}' /> Dapur</label><label style=\"display: block; padding: 6px 0;\"><input type=\"radio\" name=\"q0\" value=\"2\" data-score='{\"bath\":1}' /> Kamar mandi</label><label style=\"display: block; padding: 6px 0;\"><input type=\"radio\" name=\"q0\" value=\"3\" data-score='{\"living\":1}' /> Living room</label>\n    </div>\n    <div style=\"margin-bottom: 16px; padding: 12px; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px;\">\n      <p style=\"font-weight: 600; margin: 0 0 8px 0;\">2. Ukuran ruang?</p>\n      <label style=\"display: block; padding: 6px 0;\"><input type=\"radio\" name=\"q1\" value=\"0\" data-score='{\"small\":1}' /> Sempit (< 9m²)</label><label style=\"display: block; padding: 6px 0;\"><input type=\"radio\" name=\"q1\" value=\"1\" data-score='{\"medium\":1}' /> Sedang (9-15m²)</label><label style=\"display: block; padding: 6px 0;\"><input type=\"radio\" name=\"q1\" value=\"2\" data-score='{\"large\":1}' /> Luas (> 15m²)</label>\n    </div>\n    <div style=\"margin-bottom: 16px; padding: 12px; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px;\">\n      <p style=\"font-weight: 600; margin: 0 0 8px 0;\">3. Budget?</p>\n      <label style=\"display: block; padding: 6px 0;\"><input type=\"radio\" name=\"q2\" value=\"0\" data-score='{\"budget_low\":1}' /> < Rp 200rb</label><label style=\"display: block; padding: 6px 0;\"><input type=\"radio\" name=\"q2\" value=\"1\" data-score='{\"budget_mid\":1}' /> Rp 200rb - 1 juta</label><label style=\"display: block; padding: 6px 0;\"><input type=\"radio\" name=\"q2\" value=\"2\" data-score='{\"budget_high\":1}' /> > Rp 1 juta</label>\n    </div>";
const FORMULA_JS = "\n    var TIERS = [{\"id\":\"r\",\"label\":\"Rekomendasi Produk\",\"description\":\"Cek katalog Sesoris — pilih organizer sesuai ruang + ukuran + budget kamu.\",\"matchSrc\":\"() => true\"}];\n    var CUSTOM = '';\n    function calc() {\n      var scoreMap = {};\n      var radios = document.querySelectorAll('input[type=radio]:checked');\n      radios.forEach(function(r) {\n        try {\n          var data = JSON.parse(r.dataset.score);\n          Object.keys(data).forEach(function(k) {\n            scoreMap[k] = (scoreMap[k] || 0) + data[k];\n          });\n        } catch(e) {}\n      });\n      var tier = null;\n      // Evaluate match functions (inlined as strings from build time)\n      for (var i = 0; i < TIERS.length; i++) {\n        var t = TIERS[i];\n        if (t.matchSrc) {\n          try {\n            var matchFn = new Function('s', 'return (' + t.matchSrc + ')(s);');\n            if (matchFn(scoreMap)) { tier = t; break; }\n          } catch(e) {}\n        } else if (i === TIERS.length - 1) {\n          tier = t;\n        }\n      }\n      if (!tier && TIERS.length) tier = TIERS[TIERS.length - 1];\n      // MBTI custom resolver: pick top of each pair\n      var customResult = '';\n      if (CUSTOM === 'mbti') {\n        var EI = (scoreMap.E || 0) >= (scoreMap.I || 0) ? 'E' : 'I';\n        var SN = (scoreMap.S || 0) >= (scoreMap.N || 0) ? 'S' : 'N';\n        var TF = (scoreMap.T || 0) >= (scoreMap.F || 0) ? 'T' : 'F';\n        var JP = (scoreMap.J || 0) >= (scoreMap.P || 0) ? 'J' : 'P';\n        customResult = EI + SN + TF + JP;\n      }\n      return { tier: tier, scoreMap: scoreMap, customResult: customResult };\n    }";
const RESULT_RENDER = "\n    var r = calc();\n    var label = (r.customResult || r.tier?.label || 'Hasil');\n    var desc = r.tier?.description || '';\n    result.innerHTML = '<div style=\"text-align:center;\"><div style=\"font-size:32px;font-weight:bold;color:#1e40af;\">' + label + '</div><div style=\"margin-top:8px;color:#444;\">' + desc + '</div></div>';";

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
    <section className="bg-slate-50 p-6 rounded-xl my-6 shadow-sm">
      <div ref={formRef} dangerouslySetInnerHTML={{ __html: FORM_HTML }} />
      <div className="flex gap-2 mt-4">
        <button id="calcBtn" type="button" className="text-white px-6 py-3 rounded-md font-semibold" style={{ background: '#1e40af' }}>Generate</button>
        <button id="resetBtn" type="button" className="px-6 py-3 rounded-md border" style={{ borderColor: '#1e40af', color: '#1e40af' }}>Reset</button>
      </div>
      <div ref={resultRef} className="mt-4 p-4 bg-white rounded-lg text-base leading-relaxed" style={{ display: resultVisible ? 'block' : 'none' }} />
    </section>
  );
}
