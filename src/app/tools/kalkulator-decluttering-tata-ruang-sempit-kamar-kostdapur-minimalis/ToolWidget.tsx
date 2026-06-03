'use client';
import { useEffect, useRef, useState } from 'react';

const FORM_HTML = "\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #e0e0e0; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>1.</strong> Pernah dipakai 3 bulan terakhir?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq0\" value=\"1\" /> Ya</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq0\" value=\"0\" checked /> Tidak</label>\n    </div>\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #e0e0e0; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>2.</strong> Punya emotional value (kenangan/hadiah penting)?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq1\" value=\"1\" /> Ya</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq1\" value=\"0\" checked /> Tidak</label>\n    </div>\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #e0e0e0; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>3.</strong> Bisa diganti/dibeli ulang dengan mudah?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq2\" value=\"1\" /> Ya</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq2\" value=\"0\" checked /> Tidak</label>\n    </div>\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #e0e0e0; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>4.</strong> Cocok dengan style/fungsi ruangan sekarang?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq3\" value=\"1\" /> Ya</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq3\" value=\"0\" checked /> Tidak</label>\n    </div>\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #e0e0e0; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>5.</strong> Bila tidak ada, akan rindu atau cari?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq4\" value=\"1\" /> Ya</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq4\" value=\"0\" checked /> Tidak</label>\n    </div>\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #e0e0e0; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>6.</strong> Punya tempat penyimpanan tetap?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq5\" value=\"1\" /> Ya</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq5\" value=\"0\" checked /> Tidak</label>\n    </div>\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #e0e0e0; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>7.</strong> Kondisi masih bagus (bukan rusak/basi)?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq6\" value=\"1\" /> Ya</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq6\" value=\"0\" checked /> Tidak</label>\n    </div>\n    <div style=\"margin-bottom: 12px; padding: 10px; background: #fff; border: 1px solid #e0e0e0; border-radius: 6px;\">\n      <p style=\"margin: 0 0 6px 0;\"><strong>8.</strong> Akan dipakai dalam 6 bulan ke depan?</p>\n      <label style=\"display: inline-block; margin-right: 12px;\"><input type=\"radio\" name=\"dq7\" value=\"1\" /> Ya</label>\n      <label style=\"display: inline-block;\"><input type=\"radio\" name=\"dq7\" value=\"0\" checked /> Tidak</label>\n    </div>";
const FORMULA_JS = "\n    function calc() {\n      var radios = document.querySelectorAll('input[type=radio]:checked');\n      var score = 0;\n      radios.forEach(function(r){ score += parseInt(r.value) || 0; });\n      var rec;\n      if (score >= 6) rec = { label: 'KEEP', color: '#16a34a', desc: 'Barang ini layak dipertahankan. Pastikan tempat penyimpanan jelas.' };\n      else if (score >= 3) rec = { label: 'REVIEW', color: '#f59e0b', desc: 'Pertimbangkan ulang. Coba simpan di kotak \"review\" selama 30 hari - kalau gak dipakai, lepas.' };\n      else rec = { label: 'LEPAS', color: '#dc2626', desc: 'Sudah waktunya dilepas. Pilih: donate, jual, atau buang (kalau rusak).' };\n      return { score: score, rec: rec };\n    }";
const RESULT_RENDER = "\n    var r = calc();\n    result.innerHTML = '<div style=\"text-align:center;\"><div style=\"font-size:14px;color:#666;\">Skor: ' + r.score + ' / 8</div><div style=\"font-size:36px;font-weight:bold;color:' + r.rec.color + ';margin:8px 0;\">' + r.rec.label + '</div><div style=\"color:#444;\">' + r.rec.desc + '</div></div>';";

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
