import { useEffect, useState, useCallback } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Poppins', sans-serif;
    background: #f0f4ff;
    min-height: 100vh;
  }

  .portal-wrapper {
    min-height: 100vh;
    background: linear-gradient(135deg, #e8f0fe 0%, #fce8f3 50%, #e8fef0 100%);
    padding: 30px 20px 60px;
  }

  .portal-header {
    text-align: center;
    margin-bottom: 36px;
  }
  .portal-header .badge {
    display: inline-block;
    background: linear-gradient(90deg, #4f8ef7, #a259f7);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 5px 18px;
    border-radius: 50px;
    margin-bottom: 14px;
  }
  .portal-header h1 {
    font-family: 'Nunito', sans-serif;
    font-size: clamp(26px, 5vw, 42px);
    font-weight: 900;
    color: #1a1d3b;
    line-height: 1.15;
  }
  .portal-header h1 span {
    background: linear-gradient(90deg, #4f8ef7, #a259f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .portal-header p {
    margin-top: 8px;
    color: #6b7280;
    font-size: 15px;
  }

  .card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(79,142,247,0.10), 0 1.5px 6px rgba(0,0,0,0.04);
    padding: 36px 32px;
  }

  .form-card {
    max-width: 480px;
    margin: 0 auto;
  }
  .form-card h2 {
    font-family: 'Nunito', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #1a1d3b;
    margin-bottom: 6px;
    text-align: center;
  }
  .form-card .subtitle {
    text-align: center;
    color: #9ca3af;
    font-size: 13px;
    margin-bottom: 28px;
  }

  .field-group {
    margin-bottom: 16px;
  }
  .field-group label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 6px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .field-group input,
  .field-group select {
    width: 100%;
    padding: 13px 16px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    color: #111827;
    background: #f9fafb;
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .field-group input:focus,
  .field-group select:focus {
    border-color: #4f8ef7;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(79,142,247,0.12);
  }
  .field-group select {
    cursor: pointer;
  }

  .btn-start {
    width: 100%;
    padding: 15px;
    margin-top: 10px;
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    letter-spacing: 0.5px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(79,142,247,0.30);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .btn-start:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(79,142,247,0.40);
  }
  .btn-start:active { transform: translateY(0); }

  .exam-wrapper { max-width: 860px; margin: 0 auto; }

  .exam-topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 28px;
  }
  .topbar-info h2 {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #1a1d3b;
  }
  .topbar-info .post-tag {
    display: inline-block;
    background: linear-gradient(90deg, #e0eaff, #ede0ff);
    color: #4f3fa0;
    font-size: 12px;
    font-weight: 700;
    padding: 3px 12px;
    border-radius: 50px;
    margin-left: 8px;
  }
  .topbar-info p {
    color: #6b7280;
    font-size: 13px;
    margin-top: 4px;
  }

  .timer-box {
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    border: 1.5px solid #fca5a5;
    color: #b91c1c;
    padding: 10px 20px;
    border-radius: 12px;
    font-family: 'Nunito', sans-serif;
    font-weight: 900;
    font-size: 22px;
    letter-spacing: 1px;
    min-width: 110px;
    text-align: center;
  }
  .timer-box.warning {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border-color: #fbbf24;
    color: #92400e;
    animation: pulse 1s infinite;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.04); }
  }

  .progress-wrap {
    background: #e5e7eb;
    border-radius: 50px;
    height: 7px;
    margin-bottom: 24px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4f8ef7, #a259f7);
    border-radius: 50px;
    transition: width 0.4s;
  }
  .progress-label {
    font-size: 12px;
    color: #9ca3af;
    margin-bottom: 6px;
    text-align: right;
  }

  .question-card {
    margin-bottom: 18px;
    border: 1.5px solid #e5e7eb;
    border-radius: 16px;
    background: #fff;
    padding: 26px 28px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    transition: box-shadow 0.2s;
  }
  .question-card:hover {
    box-shadow: 0 6px 24px rgba(79,142,247,0.10);
  }
  .q-header {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 20px;
  }
  .q-number {
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Nunito', sans-serif;
    font-weight: 900;
    font-size: 14px;
  }
  .q-text {
    font-size: 15px;
    font-weight: 600;
    color: #111827;
    line-height: 1.6;
    flex: 1;
  }

  .options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  @media (max-width: 540px) {
    .options-grid { grid-template-columns: 1fr; }
    .card { padding: 24px 18px; }
  }

  .option-label {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 16px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    color: #374151;
    background: #f9fafb;
    transition: border-color 0.15s, background 0.15s;
    user-select: none;
  }
  .option-label:hover {
    border-color: #4f8ef7;
    background: #eff6ff;
    color: #1d4ed8;
  }
  .option-label input[type="radio"] { display: none; }
  .option-label input[type="radio"]:checked + .opt-badge {
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
    border-color: transparent;
  }
  .option-label:has(input:checked) {
    border-color: #4f8ef7;
    background: #eff6ff;
    color: #1d4ed8;
    font-weight: 600;
  }
  .opt-badge {
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2px solid #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 11px;
    color: #6b7280;
    transition: background 0.15s, color 0.15s;
  }

  .btn-submit {
    display: block;
    margin: 36px auto 0;
    padding: 15px 50px;
    background: linear-gradient(135deg, #16a34a, #15803d);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 17px;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(22,163,74,0.28);
    transition: transform 0.15s, box-shadow 0.15s, background 0.2s;
    letter-spacing: 0.5px;
    min-width: 220px;
  }
  .btn-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(22,163,74,0.38);
  }
  .btn-submit:disabled {
    cursor: not-allowed;
    background: linear-gradient(135deg, #6b7280, #4b5563);
    box-shadow: none;
  }

  .submit-overlay {
    position: fixed;
    inset: 0;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(6px);
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .submit-spinner {
    width: 64px;
    height: 64px;
    border: 5px solid #e5e7eb;
    border-top-color: #16a34a;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .submit-overlay h3 {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #1a1d3b;
  }
  .submit-overlay p {
    font-size: 13px;
    color: #6b7280;
    margin-top: -12px;
  }
  .submit-dots span {
    display: inline-block;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #16a34a;
    margin: 0 3px;
    animation: dotBounce 1.2s infinite ease-in-out;
  }
  .submit-dots span:nth-child(2) { animation-delay: 0.2s; }
  .submit-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes dotBounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1.1); opacity: 1; }
  }

  .result-card {
    text-align: center;
    padding: 44px 32px;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 8px 32px rgba(79,142,247,0.12);
    margin-top: 36px;
  }
  .result-icon {
    font-size: 56px;
    margin-bottom: 16px;
  }
  .result-score {
    font-family: 'Nunito', sans-serif;
    font-size: 48px;
    font-weight: 900;
    color: #1a1d3b;
    margin-bottom: 4px;
  }
  .result-score span {
    font-size: 24px;
    color: #9ca3af;
  }
  .result-verdict {
    display: inline-block;
    font-family: 'Nunito', sans-serif;
    font-size: 22px;
    font-weight: 900;
    letter-spacing: 3px;
    padding: 8px 32px;
    border-radius: 50px;
    margin-top: 12px;
  }
  .verdict-pass {
    background: #dcfce7;
    color: #15803d;
    border: 2px solid #86efac;
  }
  .verdict-fail {
    background: #fee2e2;
    color: #b91c1c;
    border: 2px solid #fca5a5;
  }
  .result-msg {
    margin-top: 14px;
    color: #6b7280;
    font-size: 14px;
  }

  .popup-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 15, 40, 0.72);
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .popup-box {
    background: #fff;
    border-radius: 24px;
    padding: 24px 28px 24px;
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 24px 64px rgba(79,142,247,0.18);
    animation: popIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes popIn {
    from { transform: scale(0.88); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
  }
  .popup-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin: 0 auto 10px;
  }
  .popup-box h2 {
    font-family: 'Nunito', sans-serif;
    font-size: 19px;
    font-weight: 900;
    color: #1a1d3b;
    text-align: center;
    margin-bottom: 4px;
  }
  .popup-box .popup-sub {
    text-align: center;
    color: #9ca3af;
    font-size: 12px;
    margin-bottom: 16px;
  }
  .rules-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }
  .rules-list li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    color: #374151;
    line-height: 1.45;
  }
  .rule-badge {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    margin-top: 1px;
  }
  .rule-badge.red   { background: #fee2e2; }
  .rule-badge.amber { background: #fef3c7; }
  .rule-badge.blue  { background: #dbeafe; }
  .rule-badge.green { background: #dcfce7; }
  .rule-badge.purple{ background: #ede9fe; }
  .rule-text strong {
    display: block;
    font-weight: 700;
    color: #111827;
    font-size: 13px;
  }
  .rule-text span {
    color: #6b7280;
    font-size: 12px;
  }
  .popup-warning {
    background: linear-gradient(90deg, #fef3c7, #fff7ed);
    border: 1.5px solid #fbbf24;
    border-radius: 10px;
    padding: 8px 12px;
    font-size: 12px;
    color: #92400e;
    text-align: center;
    margin-bottom: 14px;
    font-weight: 600;
  }
  .btn-agree {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(79,142,247,0.30);
    transition: transform 0.15s, box-shadow 0.15s;
    letter-spacing: 0.3px;
  }
  .btn-agree:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(79,142,247,0.40);
  }

  .steps {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 28px;
    flex-wrap: wrap;
  }
  .step {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #9ca3af;
    font-weight: 600;
  }
  .step.active { color: #4f8ef7; }
  .step-dot {
    width: 22px; height: 22px;
    border-radius: 50%;
    background: #e5e7eb;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 800;
    color: #9ca3af;
  }
  .step.active .step-dot {
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
  }
  .step-line {
    width: 24px; height: 2px;
    background: #e5e7eb;
  }

  /* ── ADMIN LOGIN ── */
  .admin-login-wrap {
    max-width: 420px;
    margin: 0 auto;
  }
  .admin-login-icon {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #1a1d3b, #4f3fa0);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    margin: 0 auto 18px;
    box-shadow: 0 4px 18px rgba(79,62,160,0.28);
  }
  .admin-login-wrap h2 {
    font-family: 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: 900;
    color: #1a1d3b;
    text-align: center;
    margin-bottom: 4px;
  }
  .admin-login-wrap .subtitle {
    text-align: center;
    color: #9ca3af;
    font-size: 13px;
    margin-bottom: 28px;
  }
  .btn-admin-login {
    width: 100%;
    padding: 14px;
    margin-top: 8px;
    background: linear-gradient(135deg, #1a1d3b, #4f3fa0);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(79,62,160,0.30);
    transition: transform 0.15s, box-shadow 0.15s;
    letter-spacing: 0.5px;
  }
  .btn-admin-login:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(79,62,160,0.40);
  }
  .btn-back-link {
    display: block;
    text-align: center;
    margin-top: 16px;
    color: #6b7280;
    font-size: 13px;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'Poppins', sans-serif;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .btn-back-link:hover { color: #4f8ef7; }

  /* ── DASHBOARD ── */
  .dashboard-wrapper {
    max-width: 1100px;
    margin: 0 auto;
  }
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
    margin-bottom: 28px;
  }
  .dashboard-header-left h2 {
    font-family: 'Nunito', sans-serif;
    font-size: 26px;
    font-weight: 900;
    color: #1a1d3b;
  }
  .dashboard-header-left p {
    color: #6b7280;
    font-size: 13px;
    margin-top: 3px;
  }
  .dashboard-header-right {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .btn-refresh {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 3px 12px rgba(79,142,247,0.28);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .btn-refresh:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(79,142,247,0.38);
  }
  .btn-refresh.spinning svg {
    animation: spin 0.7s linear infinite;
  }
  .btn-logout {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    color: #b91c1c;
    border: 1.5px solid #fca5a5;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .btn-logout:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(185,28,28,0.15);
  }

  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }
  .stat-card {
    background: #fff;
    border-radius: 16px;
    padding: 22px 20px;
    box-shadow: 0 4px 18px rgba(0,0,0,0.06);
    display: flex;
    align-items: center;
    gap: 16px;
    border: 1.5px solid #f3f4f6;
    transition: transform 0.18s, box-shadow 0.18s;
  }
  .stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(79,142,247,0.12);
  }
  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }
  .stat-icon.total  { background: linear-gradient(135deg, #dbeafe, #ede9fe); }
  .stat-icon.pass   { background: linear-gradient(135deg, #dcfce7, #bbf7d0); }
  .stat-icon.fail   { background: linear-gradient(135deg, #fee2e2, #fecaca); }
  .stat-icon.rate   { background: linear-gradient(135deg, #fef3c7, #fde68a); }
  .stat-info .stat-num {
    font-family: 'Nunito', sans-serif;
    font-size: 28px;
    font-weight: 900;
    color: #1a1d3b;
    line-height: 1;
  }
  .stat-info .stat-label {
    font-size: 12px;
    color: #6b7280;
    font-weight: 600;
    margin-top: 4px;
  }

  .controls-bar {
    background: #fff;
    border-radius: 16px;
    padding: 18px 20px;
    box-shadow: 0 4px 18px rgba(0,0,0,0.06);
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    border: 1.5px solid #f3f4f6;
  }
  .search-input-wrap {
    position: relative;
    flex: 1;
    min-width: 200px;
  }
  .search-input-wrap .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 16px;
    pointer-events: none;
  }
  .search-input-wrap input {
    width: 100%;
    padding: 10px 12px 10px 36px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-size: 13px;
    font-family: 'Poppins', sans-serif;
    color: #111827;
    background: #f9fafb;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .search-input-wrap input:focus {
    border-color: #4f8ef7;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(79,142,247,0.12);
  }
  .filter-group {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .filter-btn {
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    border: 1.5px solid #e5e7eb;
    background: #f9fafb;
    color: #6b7280;
    transition: all 0.15s;
  }
  .filter-btn:hover { border-color: #4f8ef7; color: #4f8ef7; }
  .filter-btn.active-all {
    background: linear-gradient(135deg, #4f8ef7, #a259f7);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 2px 10px rgba(79,142,247,0.30);
  }
  .filter-btn.active-pass {
    background: linear-gradient(135deg, #16a34a, #15803d);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 2px 10px rgba(22,163,74,0.25);
  }
  .filter-btn.active-fail {
    background: linear-gradient(135deg, #dc2626, #b91c1c);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 2px 10px rgba(220,38,38,0.25);
  }

  .table-wrap {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 18px rgba(0,0,0,0.06);
    border: 1.5px solid #f3f4f6;
    overflow: hidden;
  }
  .table-scroll {
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 720px;
  }
  thead {
    background: linear-gradient(135deg, #1a1d3b, #2d3069);
  }
  thead th {
    padding: 14px 16px;
    text-align: left;
    font-family: 'Nunito', sans-serif;
    font-size: 11px;
    font-weight: 800;
    color: rgba(255,255,255,0.85);
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
  }
  tbody tr {
    border-bottom: 1px solid #f3f4f6;
    transition: background 0.12s;
  }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: #f8faff; }
  tbody td {
    padding: 13px 16px;
    font-size: 13px;
    color: #374151;
    vertical-align: middle;
  }
  .td-name {
    font-weight: 700;
    color: #1a1d3b;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
  }
  .td-email {
    color: #4f8ef7;
    font-size: 12px;
  }
  .td-mobile {
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    color: #374151;
  }
  .post-pill {
    display: inline-block;
    background: linear-gradient(90deg, #e0eaff, #ede0ff);
    color: #4f3fa0;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 50px;
    white-space: nowrap;
  }
  .score-pill {
    display: inline-block;
    background: #f3f4f6;
    color: #1a1d3b;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 13px;
    padding: 3px 10px;
    border-radius: 6px;
  }
  .result-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 12px;
    padding: 4px 12px;
    border-radius: 50px;
    letter-spacing: 0.5px;
  }
  .result-badge.pass {
    background: #dcfce7;
    color: #15803d;
    border: 1.5px solid #86efac;
  }
  .result-badge.fail {
    background: #fee2e2;
    color: #b91c1c;
    border: 1.5px solid #fca5a5;
  }
  .td-time {
    font-size: 11px;
    color: #9ca3af;
    white-space: nowrap;
  }
  .table-footer {
    padding: 14px 18px;
    background: #f9fafb;
    border-top: 1px solid #f3f4f6;
    font-size: 12px;
    color: #6b7280;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .no-data {
    text-align: center;
    padding: 60px 20px;
    color: #9ca3af;
  }
  .no-data .no-data-icon {
    font-size: 44px;
    margin-bottom: 12px;
  }
  .no-data p {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #6b7280;
  }
  .no-data span {
    font-size: 13px;
    color: #9ca3af;
    margin-top: 4px;
    display: block;
  }
  .loading-row td {
    text-align: center;
    padding: 50px;
    color: #9ca3af;
  }
  .dash-spinner {
    width: 36px;
    height: 36px;
    border: 4px solid #e5e7eb;
    border-top-color: #4f8ef7;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 12px;
  }

  .btn-dashboard {
    width: 100%;
    padding: 13px;
    margin-top: 10px;
    background: linear-gradient(135deg, #1a1d3b, #4f3fa0);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Nunito', sans-serif;
    letter-spacing: 0.5px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(79,62,160,0.25);
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .btn-dashboard:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(79,62,160,0.35);
  }
  .btn-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 18px;
    margin-bottom: 2px;
  }
  .btn-divider-line {
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
  .btn-divider span {
    font-size: 11px;
    color: #9ca3af;
    font-weight: 600;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .dashboard-header { flex-direction: column; align-items: flex-start; }
    .stat-grid { grid-template-columns: 1fr 1fr; }
    .controls-bar { flex-direction: column; }
    .search-input-wrap { min-width: 100%; }
  }
  @media (max-width: 480px) {
    .stat-grid { grid-template-columns: 1fr; }
  }
`;

// ─────────────────────────────────────────────
// EXAM API  — original URL, untouched
// This is used to:
//   GET  → fetch questions
//   POST → save candidate result
// ─────────────────────────────────────────────
const EXAM_API =
  "https://script.google.com/macros/s/AKfycbxfUTjHz4K1Ot9I41n2junHHhPJowInlFHszVeSNBTg_I0gIMtmnwyKL5ouHL3z9vVy/exec";

// ─────────────────────────────────────────────
// RESULTS API — same script, different action
// The same Apps Script handles ?action=getResults
// ─────────────────────────────────────────────
const RESULTS_API =
  "https://script.google.com/macros/s/AKfycbxfUTjHz4K1Ot9I41n2junHHhPJowInlFHszVeSNBTg_I0gIMtmnwyKL5ouHL3z9vVy/exec";

// ─────────────────────────────────────────────
// Hardcoded Admin Credentials
// ─────────────────────────────────────────────
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "ksk@123";

export default function App() {

  // ── Existing state (completely unchanged) ──
  const [questions, setQuestions]               = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedDept, setSelectedDept]         = useState("");
  const [candidateName, setCandidateName]       = useState("");
  const [candidateEmail, setCandidateEmail]     = useState("");
  const [candidateMobile, setCandidateMobile]   = useState("");
  const [view, setView]                         = useState("login");
  const [score, setScore]                       = useState(null);
  const [totalQs, setTotalQs]                   = useState(0);
  const [timeLeft, setTimeLeft]                 = useState(1800);
  const [answered, setAnswered]                 = useState(0);
  const [isSubmitting, setIsSubmitting]         = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // ── New Dashboard / Admin state ──
  const [adminUser, setAdminUser]       = useState("");
  const [adminPass, setAdminPass]       = useState("");
  const [dashboardData, setDashboardData] = useState([]);
  const [dashLoading, setDashLoading]   = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [resultFilter, setResultFilter] = useState("ALL");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ─────────────────────────────────────────────
  // FETCH QUESTIONS — original logic, untouched
  // questions state is populated here
  // departments array derives from this
  // ─────────────────────────────────────────────
  useEffect(() => {
    fetch(EXAM_API)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log("Questions Loaded:", data.length);
          console.log("Questions Data:", data);
          console.log("First Record:", data[0]);
          setQuestions(data);
        } else {
          console.log("Questions Loaded: 0 (response not array)");
          console.log("Questions Data:", data);
          setQuestions([]);
        }
      })
      .catch((err) => {
        console.error("Questions fetch failed:", err);
        setQuestions([]);
      });
  }, []);

  // ─────────────────────────────────────────────
  // FETCH DASHBOARD DATA
  // ─────────────────────────────────────────────
  const fetchDashboardData = useCallback(async (showSpinner = true) => {
    if (showSpinner) setDashLoading(true);
    setIsRefreshing(true);
    try {
      const res  = await fetch(RESULTS_API);
      const data = await res.json();
      setDashboardData(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setDashboardData([]);
    } finally {
      setDashLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (view === "dashboard") {
      fetchDashboardData(true);
    }
  }, [view, fetchDashboardData]);

  // ─────────────────────────────────────────────
  // handleDepartment — original, untouched
  // Filters questions by selected department
  // Populates filteredQuestions for exam
  // ─────────────────────────────────────────────
  function handleDepartment(dept) {
    setSelectedDept(dept);
    const filtered = questions.filter((q) => q.Department === dept);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setFilteredQuestions(shuffled.slice(0, 10));
    setScore(null);
  }

  // ─────────────────────────────────────────────
  // startExam — original, untouched
  // ─────────────────────────────────────────────
  function startExam() {
    if (!candidateName || !candidateEmail || !candidateMobile || !selectedDept) {
      alert("Please fill all details before starting.");
      return;
    }
    setShowInstructions(true);
  }

  function agreeAndStart() {
    setShowInstructions(false);
    setView("exam");
  }

  // ─────────────────────────────────────────────
  // submitTest — original, untouched
  // ─────────────────────────────────────────────
  const submitTest = useCallback(() => {
    setIsSubmitting(true);
    let total = 0;
    filteredQuestions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected && selected.value === q["Correct Answer"]) total++;
    });
    const finalResult = total >= 6 ? "PASS" : "FAIL";
    setScore(total);
    setTotalQs(filteredQuestions.length);
    fetch(EXAM_API, {
      method: "POST",
      body: JSON.stringify({
        name:   candidateName,
        email:  candidateEmail,
        mobile: candidateMobile,
        post:   selectedDept,
        score:  total + "/" + filteredQuestions.length,
        result: finalResult,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setIsSubmitting(false);
        setView("result");
      })
      .catch(() => {
        setIsSubmitting(false);
        setView("result");
      });
  }, [filteredQuestions, candidateName, candidateEmail, candidateMobile, selectedDept]);

  // ─────────────────────────────────────────────
  // Security — original, untouched
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (view !== "exam") return;
    const handleVisibility = () => {
      if (document.hidden) {
        alert("Security violation detected! Your test has been auto submitted.");
        submitTest();
      }
    };
    const blockCopyPaste = (e) => e.preventDefault();
    const handleKey = (e) => {
      if (e.key === "PrintScreen") {
        alert("Screenshot detected! Your test has been terminated.");
        submitTest();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("copy", blockCopyPaste);
    document.addEventListener("paste", blockCopyPaste);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("copy", blockCopyPaste);
      document.removeEventListener("paste", blockCopyPaste);
      document.removeEventListener("keydown", handleKey);
    };
  }, [view, submitTest]);

  // ─────────────────────────────────────────────
  // Timer — original, untouched
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (view === "exam" && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
      return () => clearInterval(timer);
    }
    if (view === "exam" && timeLeft === 0) {
      alert("Time Up! Test Submitted Automatically.");
      submitTest();
    }
  }, [view, timeLeft, submitTest]);

  // ─────────────────────────────────────────────
  // countAnswered — original, untouched
  // ─────────────────────────────────────────────
  function countAnswered() {
    let c = 0;
    filteredQuestions.forEach((_, i) => {
      if (document.querySelector(`input[name="q${i}"]:checked`)) c++;
    });
    setAnswered(c);
  }

  // ─────────────────────────────────────────────
  // resetForNewCandidate — original + reset new state
  // ─────────────────────────────────────────────
  function resetForNewCandidate() {
    setCandidateName("");
    setCandidateEmail("");
    setCandidateMobile("");
    setSelectedDept("");
    setFilteredQuestions([]);
    setScore(null);
    setTotalQs(0);
    setTimeLeft(1800);
    setAnswered(0);
    setIsSubmitting(false);
    setShowInstructions(false);
    setAdminUser("");
    setAdminPass("");
    setDashboardData([]);
    setSearchQuery("");
    setResultFilter("ALL");
    setView("login");
  }

  // ─────────────────────────────────────────────
  // Admin Login Handler
  // ─────────────────────────────────────────────
  function handleAdminLogin() {
    if (
      adminUser.trim() === ADMIN_USERNAME &&
      adminPass         === ADMIN_PASSWORD
    ) {
      setAdminUser("");
      setAdminPass("");
      setView("dashboard");
    } else {
      alert("Invalid Credentials");
    }
  }

  // ─────────────────────────────────────────────
  // Derived values
  // ─────────────────────────────────────────────

  // departments array — built from questions state
  // If questions is empty this will be [] and dropdown shows no options
  // Once fetch completes, questions populates and dropdown shows options
  const departments = [
    ...new Set(
      questions
        .map((q) => q.Department)
        .filter((d) => d !== undefined && d !== null && d !== "")
    ),
  ];
  console.log("Departments:", departments);

  const mins       = Math.floor(timeLeft / 60);
  const secs       = String(timeLeft % 60).padStart(2, "0");
  const isWarning  = timeLeft <= 300;
  const progressPct = filteredQuestions.length
    ? Math.round((answered / filteredQuestions.length) * 100)
    : 0;

  // Dashboard computed
  const totalPass = dashboardData.filter(
    (r) => (r.result || "").toUpperCase() === "PASS"
  ).length;
  const totalFail = dashboardData.filter(
    (r) => (r.result || "").toUpperCase() === "FAIL"
  ).length;
  const passRate = dashboardData.length > 0
    ? Math.round((totalPass / dashboardData.length) * 100)
    : 0;

  const filteredDash = dashboardData.filter((row) => {
    const q           = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      (row.name   || "").toLowerCase().includes(q) ||
      (row.email  || "").toLowerCase().includes(q) ||
      (row.mobile || "").toLowerCase().includes(q) ||
      (row.post   || "").toLowerCase().includes(q);
    const matchResult =
      resultFilter === "ALL" ||
      (row.result || "").toUpperCase() === resultFilter;
    return matchSearch && matchResult;
  });

  // ═══════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════
  return (
    <>
      <style>{styles}</style>

      {/* ── INSTRUCTIONS POPUP ── */}
      {showInstructions && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-icon">⚠️</div>
            <h2>Exam Instructions</h2>
            <p className="popup-sub">Please read all rules carefully before starting</p>
            <ul className="rules-list">
              <li>
                <span className="rule-badge red">🚫</span>
                <span className="rule-text">
                  <strong>No Tab Switching</strong>
                  <span>
                    Do not minimize or switch to any other tab/window — test
                    will auto-submit.
                  </span>
                </span>
              </li>
              <li>
                <span className="rule-badge amber">📋</span>
                <span className="rule-text">
                  <strong>No Copy / Paste</strong>
                  <span>
                    Copying or pasting any content during the exam is strictly
                    prohibited.
                  </span>
                </span>
              </li>
              <li>
                <span className="rule-badge purple">📸</span>
                <span className="rule-text">
                  <strong>No Screenshots</strong>
                  <span>
                    Taking a screenshot (PrintScreen) will immediately terminate
                    your test.
                  </span>
                </span>
              </li>
              <li>
                <span className="rule-badge blue">📱</span>
                <span className="rule-text">
                  <strong>No Mobile Capture</strong>
                  <span>
                    Do not use your mobile phone to photograph or record the
                    questions.
                  </span>
                </span>
              </li>
              <li>
                <span className="rule-badge amber">🪑</span>
                <span className="rule-text">
                  <strong>Stay at Your Seat</strong>
                  <span>
                    Do not leave or move from your designated sitting place
                    during the exam.
                  </span>
                </span>
              </li>
              <li>
                <span className="rule-badge green">👁️</span>
                <span className="rule-text">
                  <strong>No One Behind You</strong>
                  <span>
                    Ensure that no person is standing or sitting behind you
                    while attempting the test.
                  </span>
                </span>
              </li>
            </ul>
            <div className="popup-warning">
              ⚠️ Any violation may lead to immediate disqualification
            </div>
            <button className="btn-agree" onClick={agreeAndStart}>
              ✅ I Agree — Start My Test
            </button>
          </div>
        </div>
      )}

      <div className="portal-wrapper">

        {/* Header — hidden on dashboard for cleaner look */}
        {view !== "dashboard" && (
          <div className="portal-header">
            <div className="badge">🏢 OSWAL Hiring Portal</div>
            <h1>Online <span>Examination</span> System</h1>
            <p>Professional Assessment Platform — Attempt all questions carefully</p>
          </div>
        )}

        {/* ════════════════════════════════════════
            VIEW 1 — LOGIN
        ════════════════════════════════════════ */}
        {view === "login" && (
          <>
            <div className="steps">
              <div className="step active">
                <div className="step-dot">1</div>
                <span>Fill Details</span>
              </div>
              <div className="step-line" />
              <div className="step">
                <div className="step-dot">2</div>
                <span>Attempt Test</span>
              </div>
              <div className="step-line" />
              <div className="step">
                <div className="step-dot">3</div>
                <span>View Result</span>
              </div>
            </div>

            <div className="card form-card">
              <h2>Candidate Details</h2>
              <p className="subtitle">Fill in your information to begin the test</p>

              {/* Full Name */}
              <div className="field-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="field-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. ramesh@email.com"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                />
              </div>

              {/* Mobile */}
              <div className="field-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  placeholder="e.g. 9876543210"
                  value={candidateMobile}
                  onChange={(e) => setCandidateMobile(e.target.value)}
                />
              </div>

              {/* ── Applied Post Dropdown ──
                  This is the ORIGINAL dropdown, untouched.
                  It reads from the `departments` array which is
                  derived from `questions` state populated by EXAM_API fetch.
                  Do NOT convert this to a text input.
              ── */}
              <div className="field-group">
                <label>Applied Post</label>
                <select
                  value={selectedDept}
                  onChange={(e) => handleDepartment(e.target.value)}
                >
                  <option value="">— Select Department / Post —</option>
                  {departments.map((dept, i) => (
                    <option key={i} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <button className="btn-start" onClick={startExam}>
                🚀 Start Test
              </button>
            </div>
          </>
        )}

        {/* ════════════════════════════════════════
            VIEW 2 — EXAM
        ════════════════════════════════════════ */}
        {view === "exam" && (
          <div className="exam-wrapper">

            <div className="card exam-topbar">
              <div className="topbar-info">
                <h2>
                  {candidateName}
                  <span className="post-tag">{selectedDept}</span>
                </h2>
                <p>
                  📋 {filteredQuestions.length} Questions &nbsp;|&nbsp; Answer
                  all carefully
                </p>
              </div>
              <div className={`timer-box ${isWarning ? "warning" : ""}`}>
                ⏱ {mins}:{secs}
              </div>
            </div>

            <div>
              <div className="progress-label">
                {answered} of {filteredQuestions.length} answered
              </div>
              <div className="progress-wrap">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {filteredQuestions.map((q, index) => (
              <div
                className="question-card"
                key={index}
                onChange={countAnswered}
              >
                <div className="q-header">
                  <div className="q-number">{index + 1}</div>
                  <div className="q-text">{q.Question}</div>
                </div>
                <div className="options-grid">
                  {[
                    { key: "A", text: q["Option A"] },
                    { key: "B", text: q["Option B"] },
                    { key: "C", text: q["Option C"] },
                    { key: "D", text: q["Option D"] },
                  ].map(({ key, text }) => (
                    <label className="option-label" key={key}>
                      <input type="radio" name={`q${index}`} value={key} />
                      <span className="opt-badge">{key}</span>
                      {text}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              className="btn-submit"
              onClick={submitTest}
              disabled={isSubmitting}
            >
              {isSubmitting ? "⏳ Submitting..." : "✅ Submit Test"}
            </button>

            {isSubmitting && (
              <div className="submit-overlay">
                <div className="submit-spinner" />
                <h3>Submitting Your Test...</h3>
                <p>Please wait, do not close this page</p>
                <div className="submit-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════
            VIEW 3 — RESULT
        ════════════════════════════════════════ */}
        {view === "result" && (
          <div className="exam-wrapper">
            <div className="result-card">
              <div className="result-icon">
                {score >= 6 ? "🎉" : "📝"}
              </div>
              <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "4px" }}>
                {candidateName} &nbsp;·&nbsp; {selectedDept}
              </p>
              <div className="result-score">
                {score} <span>/ {totalQs}</span>
              </div>
              <div
                className={`result-verdict ${
                  score >= 6 ? "verdict-pass" : "verdict-fail"
                }`}
              >
                {score >= 6 ? "✓ PASS" : "✗ FAIL"}
              </div>
              <p className="result-msg">
                {score >= 6
                  ? "Congratulations! You have cleared the test. Our team will contact you soon."
                  : "You did not meet the passing criteria. Better luck next time!"}
              </p>

              {/* New Candidate Button */}
              <button
                className="btn-start"
                style={{ marginTop: "28px", maxWidth: "260px" }}
                onClick={resetForNewCandidate}
              >
                👤 New Candidate Login
              </button>

              {/* Divider */}
              <div
                className="btn-divider"
                style={{ maxWidth: "260px", margin: "16px auto 0" }}
              >
                <div className="btn-divider-line" />
                <span>Admin Access</span>
                <div className="btn-divider-line" />
              </div>

              {/* View Dashboard Button */}
              <button
                className="btn-dashboard"
                style={{
                  maxWidth: "260px",
                  margin: "8px auto 0",
                  display: "block",
                }}
                onClick={() => setView("adminLogin")}
              >
                🔐 View Dashboard
              </button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════
            VIEW 4 — ADMIN LOGIN
        ════════════════════════════════════════ */}
        {view === "adminLogin" && (
          <div className="admin-login-wrap">
            <div className="card">
              <div className="admin-login-icon">🔐</div>
              <h2>Admin Login</h2>
              <p className="subtitle">
                Restricted area — authorised personnel only
              </p>

              <div className="field-group">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={adminUser}
                  autoComplete="off"
                  onChange={(e) => setAdminUser(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                />
              </div>

              <div className="field-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={adminPass}
                  autoComplete="off"
                  onChange={(e) => setAdminPass(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                />
              </div>

              <button className="btn-admin-login" onClick={handleAdminLogin}>
                🔓 Login to Dashboard
              </button>

              <button
                className="btn-back-link"
                onClick={() => setView("result")}
              >
                ← Back to Result
              </button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════
            VIEW 5 — DASHBOARD
        ════════════════════════════════════════ */}
        {view === "dashboard" && (
          <div className="dashboard-wrapper">

            {/* Dashboard Header */}
            <div className="dashboard-header">
              <div className="dashboard-header-left">
                <div className="badge" style={{ marginBottom: "8px" }}>
                  🏢 OSWAL Hiring Portal
                </div>
                <h2>📊 Admin Dashboard</h2>
                <p>
                  Candidate results & analytics — real-time data from Google
                  Sheets
                </p>
              </div>
              <div className="dashboard-header-right">
                <button
                  className={`btn-refresh ${isRefreshing ? "spinning" : ""}`}
                  onClick={() => fetchDashboardData(false)}
                  title="Refresh Data"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="23 4 23 10 17 10" />
                    <polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                  </svg>
                  {isRefreshing ? "Refreshing..." : "Refresh"}
                </button>
                <button
                  className="btn-logout"
                  onClick={resetForNewCandidate}
                  title="Logout"
                >
                  🚪 Logout
                </button>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-icon total">👥</div>
                <div className="stat-info">
                  <div className="stat-num">{dashboardData.length}</div>
                  <div className="stat-label">Total Candidates</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon pass">✅</div>
                <div className="stat-info">
                  <div className="stat-num" style={{ color: "#15803d" }}>
                    {totalPass}
                  </div>
                  <div className="stat-label">Total Pass</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon fail">❌</div>
                <div className="stat-info">
                  <div className="stat-num" style={{ color: "#b91c1c" }}>
                    {totalFail}
                  </div>
                  <div className="stat-label">Total Fail</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon rate">📈</div>
                <div className="stat-info">
                  <div className="stat-num" style={{ color: "#92400e" }}>
                    {passRate}%
                  </div>
                  <div className="stat-label">Pass Rate</div>
                </div>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="controls-bar">
              <div className="search-input-wrap">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search by name, email, mobile or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <button
                  className={`filter-btn ${
                    resultFilter === "ALL" ? "active-all" : ""
                  }`}
                  onClick={() => setResultFilter("ALL")}
                >
                  All ({dashboardData.length})
                </button>
                <button
                  className={`filter-btn ${
                    resultFilter === "PASS" ? "active-pass" : ""
                  }`}
                  onClick={() => setResultFilter("PASS")}
                >
                  ✅ Pass ({totalPass})
                </button>
                <button
                  className={`filter-btn ${
                    resultFilter === "FAIL" ? "active-fail" : ""
                  }`}
                  onClick={() => setResultFilter("FAIL")}
                >
                  ❌ Fail ({totalFail})
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="table-wrap">
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Candidate Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Applied Post</th>
                      <th>Score</th>
                      <th>Result</th>
                      <th>Date / Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashLoading ? (
                      <tr className="loading-row">
                        <td colSpan="8">
                          <div className="dash-spinner" />
                          <div
                            style={{
                              fontFamily: "'Nunito', sans-serif",
                              fontWeight: 700,
                              color: "#6b7280",
                            }}
                          >
                            Loading candidates...
                          </div>
                        </td>
                      </tr>
                    ) : filteredDash.length === 0 ? (
                      <tr>
                        <td colSpan="8">
                          <div className="no-data">
                            <div className="no-data-icon">🗂️</div>
                            <p>No records found</p>
                            <span>
                              {searchQuery
                                ? "Try a different search term or clear filters."
                                : "No candidates have attempted the test yet."}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredDash.map((row, i) => {
                        const isPass =
                          (row.result || "").toUpperCase() === "PASS";
                        return (
                          <tr key={i}>
                            <td
                              style={{
                                color: "#9ca3af",
                                fontWeight: 700,
                                fontSize: "12px",
                              }}
                            >
                              {i + 1}
                            </td>
                            <td className="td-name">{row.name || "—"}</td>
                            <td className="td-email">{row.email || "—"}</td>
                            <td className="td-mobile">{row.mobile || "—"}</td>
                            <td>
                              <span className="post-pill">
                                {row.post || "—"}
                              </span>
                            </td>
                            <td>
                              <span className="score-pill">
                                {row.score || "—"}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`result-badge ${
                                  isPass ? "pass" : "fail"
                                }`}
                              >
                                {isPass ? "✓ PASS" : "✗ FAIL"}
                              </span>
                            </td>
                            <td className="td-time">
                              {row.timestamp || "—"}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {!dashLoading && filteredDash.length > 0 && (
                <div className="table-footer">
                  <span>
                    Showing <strong>{filteredDash.length}</strong> of{" "}
                    <strong>{dashboardData.length}</strong> records
                  </span>
                  <span>
                    {(resultFilter !== "ALL" || searchQuery) && (
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "#4f8ef7",
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: "12px",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                        onClick={() => {
                          setResultFilter("ALL");
                          setSearchQuery("");
                        }}
                      >
                        × Clear filters
                      </button>
                    )}
                  </span>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </>
  );
}