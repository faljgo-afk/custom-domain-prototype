const { useState } = React;

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconCheck = ({ size = 5, color = "text-emerald-500" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`w-${size} h-${size} ${color}`}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconX = ({ size = 5 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`w-${size} h-${size} text-red-500`}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-500">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconCopy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);
const IconSpinner = ({ size = 5, color = "text-blue-500" }) => (
  <svg className={`spinner w-${size} h-${size} ${color}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
  </svg>
);
const IconExternal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// ─── Pipeline ─────────────────────────────────────────────────────────────────
const STEPS = [
  { label: "Enter domain" },
  { label: "Configure DNS" },
  { label: "SSL certificate" },
  { label: "Active" },
];

function Pipeline({ currentStep, failed }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((step, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        const isError = failed && i === currentStep;

        return (
          <React.Fragment key={i}>
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-all ${
                isError
                  ? "bg-red-100 text-red-600 ring-2 ring-red-300"
                  : done
                  ? "bg-emerald-500 text-white"
                  : active
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}>
                {isError
                  ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  : done
                  ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"/></svg>
                  : i + 1
                }
              </div>
              <span className={`text-sm whitespace-nowrap ${
                isError ? "text-red-600 font-medium" : active ? "text-gray-900 font-medium" : done ? "text-gray-500" : "text-gray-400"
              }`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-3 min-w-[24px] ${done ? "bg-emerald-300" : "bg-gray-200"}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function validateDomain(value) {
  const v = value.trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return "Remove the http:// or https:// prefix";
  if (v.endsWith("/")) return "Remove the trailing slash";
  if (v.includes(" ")) return "Domain cannot contain spaces";
  if (!/^[a-z0-9]([a-z0-9\-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9\-]*[a-z0-9])?)+$/i.test(v))
    return "Enter a valid domain, e.g. yourcompany.com or shop.yourcompany.com";
  return "";
}

function genToken() {
  return "swag42-verify=" + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
        copied ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
      }`}
    >
      {copied ? <IconCheck size={3} color="text-emerald-500" /> : <IconCopy />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// ─── State views ──────────────────────────────────────────────────────────────

function ConnectForm({ onSubmit, initialDomain = "", onAutofill }) {
  const [value, setValue] = useState(initialDomain);
  const [touched, setTouched] = useState(!!initialDomain);
  const error = touched ? validateDomain(value) : null;
  const isValid = error === "" && value.trim() !== "";

  const handleAutofill = () => {
    setValue("shop.acme-corp.com");
    setTouched(true);
    onAutofill && onAutofill("shop.acme-corp.com");
  };

  return (
    <div className="fade-in max-w-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Connect a custom domain</h2>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        Use your own domain — <span className="mono text-gray-700 text-xs">yourcompany.com</span> or <span className="mono text-gray-700 text-xs">shop.yourcompany.com</span> — instead of a Swag42 subdomain. SSL is provisioned automatically.
      </p>

      <div className="mb-1">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Domain</label>
        <input
          type="text"
          value={value}
          placeholder="yourcompany.com"
          onChange={e => { setValue(e.target.value); setTouched(true); }}
          onBlur={() => setTouched(true)}
          className={`w-full mono px-3.5 py-2.5 text-sm rounded-lg border outline-none transition-all ${
            error && touched
              ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          }`}
        />
        {touched && error && (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        )}
      </div>

      <button
        onClick={handleAutofill}
        className="text-xs text-blue-600 hover:text-blue-700 mt-2 mb-6 underline-offset-2 hover:underline"
      >
        Fill with test data
      </button>

      <div className="flex items-center gap-3">
        <button
          onClick={() => isValid && onSubmit(value.trim())}
          disabled={!isValid}
          className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
            isValid
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function DnsRow({ label, fields }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
      </div>
      <div className="divide-y divide-gray-100">
        {fields.map(({ name, value }) => (
          <div key={name} className="flex items-center px-4 py-3 gap-4">
            <span className="text-xs text-gray-400 w-24 shrink-0 uppercase tracking-wide">{name}</span>
            <span className="mono text-sm text-gray-800 flex-1 break-all">{value}</span>
            <CopyButton value={value} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PendingState({ domain, verifyToken, onCheck, onChangeDomain, simulateSuccess }) {
  const [checking, setChecking] = useState(false);
  const [checkedOnce, setCheckedOnce] = useState(false);

  const subdomain = domain.includes(".") && domain.split(".").length > 2
    ? domain.split(".")[0]
    : "@";

  const handleCheck = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      if (simulateSuccess) {
        onCheck && onCheck(true);
      } else {
        setCheckedOnce(true);
        onCheck && onCheck(false);
      }
    }, 2000);
  };

  return (
    <div className="fade-in max-w-2xl">
      <div className="flex items-start gap-3 mb-6">
        <div className="mt-0.5"><IconClock /></div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Configure your DNS</h2>
          <p className="text-gray-500 text-sm mt-1">
            Add the following records to your DNS provider for <span className="mono text-gray-700">{domain}</span>, then verify.
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Step 1 — CNAME record</p>
        <DnsRow label="CNAME" fields={[
          { name: "Type", value: "CNAME" },
          { name: "Host / Name", value: subdomain },
          { name: "Value / Points to", value: "shops.swag42.shop" },
          { name: "TTL", value: "Auto (3600)" },
        ]} />

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-5">Step 2 — TXT verification record</p>
        <DnsRow label="TXT" fields={[
          { name: "Type", value: "TXT" },
          { name: "Host / Name", value: `_swag42-verify.${domain}` },
          { name: "Value", value: verifyToken },
          { name: "TTL", value: "Auto" },
        ]} />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex gap-3 mb-6 text-sm text-amber-800">
        <IconClock />
        <span>DNS changes may take up to 48 hours to propagate. Your shop at <span className="mono font-medium">example.swag42.shop</span> continues working in the meantime.</span>
      </div>

      {checkedOnce && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 mb-4 fade-in">
          Not verified yet. Try again in a few minutes.
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={handleCheck}
          disabled={checking}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-60 transition-all"
        >
          {checking && <IconSpinner size={4} color="text-white" />}
          {checking ? "Checking…" : "Check verification"}
        </button>
        <button onClick={onChangeDomain} className="text-sm text-gray-500 hover:text-gray-700 hover:underline underline-offset-2">
          Change domain
        </button>
      </div>
    </div>
  );
}

function SslProvisioningState({ domain }) {
  return (
    <div className="fade-in max-w-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Setting up your domain</h2>

      <div className="space-y-3">
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-emerald-200 bg-emerald-50">
          <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <IconCheck size={4} color="text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-900">DNS verified</p>
            <p className="text-xs text-emerald-600 mono">{domain}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-blue-200 bg-blue-50">
          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <IconSpinner size={4} color="text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-900">Issuing SSL certificate</p>
            <p className="text-xs text-blue-500">Usually takes 1–3 minutes</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-5 leading-relaxed">
        Your SSL certificate is being issued. This page will update automatically once it's ready.
      </p>
    </div>
  );
}

function ActiveState({ domain, onRemove }) {
  const [showModal, setShowModal] = useState(false);
  const sslExpiry = new Date();
  sslExpiry.setMonth(sslExpiry.getMonth() + 3);
  const connectedDate = new Date();
  connectedDate.setDate(connectedDate.getDate() - 2);

  const fmt = d => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="fade-in max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <IconCheck size={5} color="text-emerald-600" />
        </div>
        <div>
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-0.5">Active</p>
          <p className="mono text-lg font-semibold text-gray-900">{domain}</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden mb-6">
        <div className="divide-y divide-gray-100">
          <div className="flex items-center px-4 py-3 gap-4">
            <span className="text-sm text-gray-500 w-36 shrink-0">SSL Certificate</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot"></div>
              <span className="text-sm font-medium text-gray-800">Active</span>
              <span className="text-xs text-gray-400">· expires {fmt(sslExpiry)}</span>
            </div>
          </div>
          <div className="flex items-center px-4 py-3 gap-4">
            <span className="text-sm text-gray-500 w-36 shrink-0">DNS Status</span>
            <div className="flex items-center gap-2">
              <IconCheck size={4} color="text-emerald-500" />
              <span className="text-sm font-medium text-gray-800">Verified</span>
            </div>
          </div>
          <div className="flex items-center px-4 py-3 gap-4">
            <span className="text-sm text-gray-500 w-36 shrink-0">Connected</span>
            <span className="text-sm text-gray-800">{fmt(connectedDate)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="text-sm text-red-500 hover:text-red-600 hover:underline underline-offset-2"
      >
        Remove domain
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 fade-in" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Remove custom domain?</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Your shop will revert to <span className="mono text-gray-700">example.swag42.shop</span>. This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={() => { setShowModal(false); onRemove(); }} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FailedState({ domain, errorType, onChangeDomain }) {
  const isCname = errorType === "cname";
  return (
    <div className="fade-in max-w-xl">
      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-4 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <IconX size={4} />
          <span className="text-sm font-semibold text-red-700">Domain verification failed</span>
        </div>
        <p className="text-xs text-red-600 leading-relaxed">
          We couldn't verify <span className="mono">{domain}</span>. Check the details below and update your DNS records.
        </p>
      </div>

      <div className="space-y-2 mb-6">
        <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${isCname ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"}`}>
          <div className="mt-0.5">{isCname ? <IconX size={4} /> : <IconCheck size={4} color="text-emerald-500" />}</div>
          <div>
            <p className={`text-sm font-medium ${isCname ? "text-red-700" : "text-emerald-700"}`}>CNAME record</p>
            <p className={`text-xs mt-0.5 ${isCname ? "text-red-500" : "text-emerald-500"}`}>
              {isCname ? "CNAME record not found. Make sure the record is published and has propagated." : "Record found and resolves correctly."}
            </p>
          </div>
        </div>

        <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${!isCname ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"}`}>
          <div className="mt-0.5">{!isCname ? <IconX size={4} /> : <IconCheck size={4} color="text-emerald-500" />}</div>
          <div>
            <p className={`text-sm font-medium ${!isCname ? "text-red-700" : "text-emerald-700"}`}>TXT verification record</p>
            <p className={`text-xs mt-0.5 ${!isCname ? "text-red-500" : "text-emerald-500"}`}>
              {!isCname ? "TXT record found but the value doesn't match. Double-check the verification token." : "Verification token matches."}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={onChangeDomain} className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800">
          Try again
        </button>
      </div>
    </div>
  );
}

// ─── Debug Panel ──────────────────────────────────────────────────────────────
function DebugPanel({ state, setState, failureType, setFailureType, simulateSuccess, setSimulateSuccess, onAutofill, onResetAutofill, onReset }) {
  const [open, setOpen] = useState(true);
  const states = ["form", "pending", "ssl_provisioning", "active", "failed"];
  const stateLabels = { form: "Form", pending: "Pending", ssl_provisioning: "SSL Provisioning", active: "Active", failed: "Failed" };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`bg-gray-950 text-gray-100 rounded-xl shadow-2xl border border-gray-800 transition-all overflow-hidden ${open ? "w-64" : "w-auto"}`}>
        <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-900">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Debug panel</span>
          <span className="text-gray-500 text-xs">{open ? "▼" : "▲"}</span>
        </button>

        {open && (
          <div className="px-3 pb-3 space-y-4 fade-in">
            <div>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">State</p>
              <div className="grid grid-cols-2 gap-1">
                {states.map(s => (
                  <button key={s} onClick={() => setState(s)}
                    className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${state === s ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}>
                    {stateLabels[s]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Quick fill</p>
              <div className="space-y-1">
                <button onClick={onAutofill} className="w-full px-2 py-1.5 rounded text-xs font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 text-left">Autofill domain</button>
                <button onClick={onResetAutofill} className="w-full px-2 py-1.5 rounded text-xs font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 text-left">Reset & autofill</button>
              </div>
            </div>

            {state === "pending" && (
              <div className="fade-in">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Check verification</p>
                <div className="space-y-1">
                  <button onClick={() => setSimulateSuccess(false)}
                    className={`w-full px-2 py-1.5 rounded text-xs font-medium text-left transition-all ${!simulateSuccess ? "bg-gray-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}>
                    Fail — not verified yet
                  </button>
                  <button onClick={() => setSimulateSuccess(true)}
                    className={`w-full px-2 py-1.5 rounded text-xs font-medium text-left transition-all ${simulateSuccess ? "bg-emerald-700 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}>
                    Success — DNS verified ✓
                  </button>
                </div>
              </div>
            )}

            {state === "failed" && (
              <div className="fade-in">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Error variant</p>
                <div className="space-y-1">
                  {["cname", "txt"].map(t => (
                    <button key={t} onClick={() => setFailureType(t)}
                      className={`w-full px-2 py-1.5 rounded text-xs font-medium text-left transition-all ${failureType === t ? "bg-red-700 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}>
                      {t === "cname" ? "CNAME not found" : "TXT mismatch"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-gray-800 pt-3">
              <button onClick={onReset} className="w-full px-2 py-1.5 rounded text-xs font-medium bg-red-900/60 text-red-300 hover:bg-red-900 transition-all border border-red-800/50">
                Reset all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Step index per state ─────────────────────────────────────────────────────
function getStepIndex(state) {
  if (state === "form") return 0;
  if (state === "pending" || state === "failed") return 1;
  if (state === "ssl_provisioning") return 2;
  if (state === "active") return 3;
  return 0;
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [state, setState] = useState("form");
  const [domain, setDomain] = useState("");
  const [verifyToken] = useState(genToken);
  const [failureType, setFailureType] = useState("cname");
  const [simulateSuccess, setSimulateSuccess] = useState(false);

  const gotoState = (s) => setState(s);

  const handleSubmit = (d) => {
    setDomain(d);
    setState("pending");
  };

  const handleChangeDomain = () => setState("form");
  const handleRemove = () => { setState("form"); setDomain(""); };

  const handleAutofill = () => {
    setDomain("shop.acme-corp.com");
    if (state === "form") setState("form");
  };

  const handleResetAutofill = () => {
    setDomain("shop.acme-corp.com");
    setState("form");
  };

  const handleReset = () => { setState("form"); setDomain(""); };

  const stepIndex = getStepIndex(state);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-8 py-4 flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-900">Swag42 Admin</span>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-500">Settings</span>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-500">Custom Domain</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Custom Domain</h1>
          <p className="text-sm text-gray-500">
            Your shop is currently at{" "}
            <a className="mono text-blue-600 hover:underline underline-offset-2 text-xs" href="#">example.swag42.shop</a>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 min-h-[320px]">
          <Pipeline currentStep={stepIndex} failed={state === "failed"} />

          {state === "form" && (
            <ConnectForm onSubmit={handleSubmit} initialDomain={domain} onAutofill={(d) => setDomain(d)} />
          )}
          {state === "pending" && (
            <PendingState
              domain={domain || "shop.acme-corp.com"}
              verifyToken={verifyToken}
              onCheck={(success) => { if (success) setState("ssl_provisioning"); }}
              onChangeDomain={handleChangeDomain}
              simulateSuccess={simulateSuccess}
            />
          )}
          {state === "ssl_provisioning" && <SslProvisioningState domain={domain || "shop.acme-corp.com"} />}
          {state === "active" && <ActiveState domain={domain || "shop.acme-corp.com"} onRemove={handleRemove} />}
          {state === "failed" && (
            <FailedState domain={domain || "shop.acme-corp.com"} errorType={failureType} onChangeDomain={handleChangeDomain} />
          )}
        </div>
      </div>

      <DebugPanel
        state={state} setState={gotoState}
        failureType={failureType} setFailureType={setFailureType}
        simulateSuccess={simulateSuccess} setSimulateSuccess={setSimulateSuccess}
        onAutofill={handleAutofill} onResetAutofill={handleResetAutofill} onReset={handleReset}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
