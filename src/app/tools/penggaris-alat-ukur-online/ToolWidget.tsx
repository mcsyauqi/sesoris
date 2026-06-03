'use client';
import { useEffect, useRef, useState } from 'react';

const FORM_HTML = "\n    <div style=\"padding:12px;background:#fef3c7;border-radius:6px;margin-bottom:16px;font-size:13px;color:#555;\">\n      <strong>Catatan:</strong> Akurasi tergantung resolusi layar. Untuk kalibrasi presisi, samakan panjang gambar (mis. KTP 8.5cm) dengan ukuran asli.\n    </div>\n    <div style=\"margin-bottom: 16px;\">\n      <label for=\"objLen\" style=\"display: block; margin-bottom: 4px; font-weight: 600;\">Panjang Objek (cm)</label>\n      <input type=\"number\" id=\"objLen\" value=\"10\" min=\"0.1\" max=\"30\" step=\"0.1\" style=\"width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px;\" />\n    </div>\n    <div style=\"margin-bottom: 16px;\">\n      <label style=\"display: block; margin-bottom: 4px; font-weight: 600;\">Unit</label>\n      <label style=\"display:inline-block;margin-right:12px;\"><input type=\"radio\" name=\"unitMode\" value=\"cm\" checked /> cm / mm</label>\n      <label style=\"display:inline-block;\"><input type=\"radio\" name=\"unitMode\" value=\"inch\" /> inch</label>\n    </div>";
const FORMULA_JS = "\n    // 1 cm at 96dpi = 96/2.54 = ~37.795 px\n    var PX_PER_CM = 37.795;\n    function buildRulerSvg(unit, objLen) {\n      var w = unit === 'cm' ? 30 * PX_PER_CM : 12 * PX_PER_CM * 2.54;\n      var h = 80;\n      var svg = '<svg viewBox=\"0 0 ' + w + ' ' + h + '\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:100%;width:100%;height:auto;background:#fff;border:1px solid #ccc;border-radius:4px;\">';\n      svg += '<rect x=\"0\" y=\"0\" width=\"' + w + '\" height=\"' + h + '\" fill=\"#fffbe6\" />';\n      if (unit === 'cm') {\n        for (var i = 0; i <= 30; i++) {\n          var x = i * PX_PER_CM;\n          svg += '<line x1=\"' + x + '\" y1=\"0\" x2=\"' + x + '\" y2=\"20\" stroke=\"#333\" stroke-width=\"1.5\" />';\n          svg += '<text x=\"' + (x+2) + '\" y=\"32\" font-size=\"10\" fill=\"#333\" font-family=\"sans-serif\">' + i + '</text>';\n          if (i < 30) {\n            for (var j = 1; j < 10; j++) {\n              var mx = x + j * PX_PER_CM / 10;\n              var mh = j === 5 ? 12 : 7;\n              svg += '<line x1=\"' + mx + '\" y1=\"0\" x2=\"' + mx + '\" y2=\"' + mh + '\" stroke=\"#666\" stroke-width=\"0.8\" />';\n            }\n          }\n        }\n      } else {\n        var pxPerInch = PX_PER_CM * 2.54;\n        for (var i = 0; i <= 12; i++) {\n          var x = i * pxPerInch;\n          svg += '<line x1=\"' + x + '\" y1=\"0\" x2=\"' + x + '\" y2=\"20\" stroke=\"#333\" stroke-width=\"1.5\" />';\n          svg += '<text x=\"' + (x+2) + '\" y=\"32\" font-size=\"10\" fill=\"#333\" font-family=\"sans-serif\">' + i + '\"</text>';\n          for (var j = 1; j < 16; j++) {\n            var mx = x + j * pxPerInch / 16;\n            var mh = (j % 8 === 0) ? 13 : (j % 4 === 0 ? 10 : (j % 2 === 0 ? 8 : 5));\n            svg += '<line x1=\"' + mx + '\" y1=\"0\" x2=\"' + mx + '\" y2=\"' + mh + '\" stroke=\"#666\" stroke-width=\"0.7\" />';\n          }\n        }\n      }\n      // Object bar\n      if (objLen) {\n        var barW = unit === 'cm' ? objLen * PX_PER_CM : objLen * PX_PER_CM * 2.54;\n        svg += '<rect x=\"0\" y=\"50\" width=\"' + barW + '\" height=\"18\" fill=\"#1e40af\" rx=\"3\" />';\n        svg += '<text x=\"' + (barW/2) + '\" y=\"63\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"11\" font-weight=\"bold\" font-family=\"sans-serif\">' + objLen + ' ' + (unit === 'cm' ? 'cm' : 'inch') + '</text>';\n      }\n      svg += '</svg>';\n      return svg;\n    }\n    function calc() {\n      var unit = document.querySelector('input[name=unitMode]:checked').value;\n      var objLen = parseFloat(document.getElementById('objLen').value) || 0;\n      return { unit: unit, objLen: objLen, svg: buildRulerSvg(unit, objLen) };\n    }";
const RESULT_RENDER = "\n    var r = calc();\n    var conv = r.unit === 'cm'\n      ? r.objLen + ' cm = ' + (r.objLen * 10).toFixed(1) + ' mm = ' + (r.objLen / 2.54).toFixed(2) + ' inch'\n      : r.objLen + ' inch = ' + (r.objLen * 2.54).toFixed(2) + ' cm = ' + (r.objLen * 25.4).toFixed(1) + ' mm';\n    result.innerHTML = '<div style=\"overflow-x:auto;\">' + r.svg + '</div><div style=\"margin-top:8px;padding:10px;background:#f3f4f6;border-radius:6px;text-align:center;font-weight:600;\">' + conv + '</div>';";

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
