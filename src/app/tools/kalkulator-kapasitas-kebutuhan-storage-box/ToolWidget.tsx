'use client';
import { useEffect, useRef, useState } from 'react';

const FORM_HTML = "\n    <div style=\"margin-bottom: 16px;\">\n      <label for=\"boxLiter\" style=\"display: block; margin-bottom: 4px; font-weight: 600;\">Kapasitas Box (liter)</label>\n      <select id=\"boxLiter\" style=\"width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px;\">\n        <option value=\"30\">30 L (kecil)</option>\n        <option value=\"50\" selected>50 L (sedang)</option>\n        <option value=\"80\">80 L (besar)</option>\n        <option value=\"120\">120 L (jumbo)</option>\n      </select>\n    </div>\n    <div style=\"margin-bottom: 16px;\">\n      <label for=\"baju\" style=\"display: block; margin-bottom: 4px; font-weight: 600;\">Jumlah Baju / Pakaian (pcs)</label>\n      <input type=\"number\" id=\"baju\" placeholder=\"Misal: 30\" style=\"width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px;\" />\n    </div>\n    <div style=\"margin-bottom: 16px;\">\n      <label for=\"buku\" style=\"display: block; margin-bottom: 4px; font-weight: 600;\">Jumlah Buku</label>\n      <input type=\"number\" id=\"buku\" placeholder=\"Misal: 15\" style=\"width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px;\" />\n    </div>\n    <div style=\"margin-bottom: 16px;\">\n      <label for=\"sepatu\" style=\"display: block; margin-bottom: 4px; font-weight: 600;\">Jumlah Pasang Sepatu</label>\n      <input type=\"number\" id=\"sepatu\" placeholder=\"Misal: 5\" style=\"width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px;\" />\n    </div>\n    <div style=\"margin-bottom: 16px;\">\n      <label for=\"kecil\" style=\"display: block; margin-bottom: 4px; font-weight: 600;\">Barang Kecil Lain (pcs)</label>\n      <input type=\"number\" id=\"kecil\" placeholder=\"Misal: 20\" style=\"width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px;\" />\n    </div>";
const FORMULA_JS = "\n    var VOL = { baju: 1.5, buku: 1.0, sepatu: 3.0, kecil: 0.5 };\n    function calc() {\n      var box = parseFloat(document.getElementById('boxLiter').value) || 50;\n      var baju = parseInt(document.getElementById('baju').value) || 0;\n      var buku = parseInt(document.getElementById('buku').value) || 0;\n      var sepatu = parseInt(document.getElementById('sepatu').value) || 0;\n      var kecil = parseInt(document.getElementById('kecil').value) || 0;\n      var totalLiter = baju * VOL.baju + buku * VOL.buku + sepatu * VOL.sepatu + kecil * VOL.kecil;\n      var efficiency = 0.75;\n      var boxesNeeded = totalLiter > 0 ? Math.ceil(totalLiter / (box * efficiency)) : 0;\n      return { totalLiter: totalLiter, boxesNeeded: boxesNeeded, box: box };\n    }";
const RESULT_RENDER = "\n    var r = calc();\n    result.innerHTML = '<strong>Estimasi volume total:</strong> ' + r.totalLiter.toFixed(1) + ' L<br><strong>Storage box dibutuhkan:</strong> ' + r.boxesNeeded + ' x ' + r.box + ' L<br><small style=\"color:#666\">Asumsi efisiensi pengisian 75% (ruang antar barang).</small>';";

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
      <h2 className="text-xl font-bold mb-4">Tool Kalkulator</h2>
      <div ref={formRef} dangerouslySetInnerHTML={{ __html: FORM_HTML }} />
      <div className="flex gap-2 mt-4">
        <button id="calcBtn" type="button" className="text-white px-6 py-3 rounded-md font-semibold" style={{ background: '#1e40af' }}>Hitung</button>
        <button id="resetBtn" type="button" className="px-6 py-3 rounded-md border" style={{ borderColor: '#1e40af', color: '#1e40af' }}>Reset</button>
      </div>
      <div ref={resultRef} className="mt-4 p-4 bg-white rounded-lg text-base leading-relaxed" style={{ display: resultVisible ? 'block' : 'none' }} />
    </section>
  );
}
