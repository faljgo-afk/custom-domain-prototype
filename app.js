const {
  useState
} = React;

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconGlobe = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-5 h-5"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("line", {
  x1: "2",
  y1: "12",
  x2: "22",
  y2: "12"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
}));
const IconCheck = ({
  size = 5,
  color = "text-emerald-500"
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: `w-${size} h-${size} ${color}`
}, /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));
const IconX = ({
  size = 5
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: `w-${size} h-${size} text-red-500`
}, /*#__PURE__*/React.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
}));
const IconClock = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-5 h-5 text-amber-500"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "12 6 12 12 16 14"
}));
const IconCopy = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-4 h-4"
}, /*#__PURE__*/React.createElement("rect", {
  x: "9",
  y: "9",
  width: "13",
  height: "13",
  rx: "2",
  ry: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
}));
const IconSpinner = ({
  size = 5,
  color = "text-blue-500"
}) => /*#__PURE__*/React.createElement("svg", {
  className: `spinner w-${size} h-${size} ${color}`,
  viewBox: "0 0 24 24",
  fill: "none"
}, /*#__PURE__*/React.createElement("circle", {
  className: "opacity-25",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  strokeWidth: "4"
}), /*#__PURE__*/React.createElement("path", {
  className: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
}));
const IconArrowRight = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-4 h-4"
}, /*#__PURE__*/React.createElement("line", {
  x1: "5",
  y1: "12",
  x2: "19",
  y2: "12"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "12 5 19 12 12 19"
}));
const IconExternal = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "w-3.5 h-3.5"
}, /*#__PURE__*/React.createElement("path", {
  d: "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "15 3 21 3 21 9"
}), /*#__PURE__*/React.createElement("line", {
  x1: "10",
  y1: "14",
  x2: "21",
  y2: "3"
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────
function validateDomain(value) {
  const v = value.trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return "Remove the http:// or https:// prefix";
  if (v.endsWith("/")) return "Remove the trailing slash";
  if (v.includes(" ")) return "Domain cannot contain spaces";
  if (!/^[a-z0-9]([a-z0-9\-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9\-]*[a-z0-9])?)+$/i.test(v)) return "Enter a valid domain, e.g. shop.yourcompany.com";
  return "";
}
function genToken() {
  return "swag42-verify=" + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
}
function CopyButton({
  value
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: copy,
    className: `inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${copied ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"}`
  }, copied ? /*#__PURE__*/React.createElement(IconCheck, {
    size: 3,
    color: "text-emerald-500"
  }) : /*#__PURE__*/React.createElement(IconCopy, null), copied ? "Copied" : "Copy");
}

// ─── State views ──────────────────────────────────────────────────────────────

function EmptyState({
  onConnect
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "fade-in flex flex-col items-center text-center py-16 px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-5"
  }, /*#__PURE__*/React.createElement(IconGlobe, null)), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-semibold text-gray-900 mb-2"
  }, "Use your own domain"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-sm max-w-md leading-relaxed mb-8"
  }, "Connect a custom domain so your shop is accessible at ", /*#__PURE__*/React.createElement("span", {
    className: "mono text-gray-700"
  }, "shop.yourcompany.com"), " instead of a Swag42 subdomain. SSL is provisioned automatically."), /*#__PURE__*/React.createElement("button", {
    onClick: onConnect,
    className: "inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
  }, "Connect custom domain ", /*#__PURE__*/React.createElement(IconArrowRight, null)));
}
function ConnectForm({
  onSubmit,
  initialDomain = "",
  onAutofill
}) {
  const [value, setValue] = useState(initialDomain);
  const [touched, setTouched] = useState(!!initialDomain);
  const error = touched ? validateDomain(value) : null;
  const isValid = error === "" && value.trim() !== "";
  const handleAutofill = () => {
    setValue("shop.acme-corp.com");
    setTouched(true);
    onAutofill && onAutofill("shop.acme-corp.com");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fade-in max-w-lg"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-semibold text-gray-900 mb-1"
  }, "Connect a custom domain"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-sm mb-6"
  }, "Enter the domain or subdomain you'd like to use for your shop."), /*#__PURE__*/React.createElement("div", {
    className: "mb-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium text-gray-700 mb-1.5"
  }, "Domain"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: value,
    placeholder: "shop.yourcompany.com",
    onChange: e => {
      setValue(e.target.value);
      setTouched(true);
    },
    onBlur: () => setTouched(true),
    className: `w-full mono px-3.5 py-2.5 text-sm rounded-lg border outline-none transition-all ${error && touched ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200" : "border-gray-300 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100"}`
  }), touched && error && /*#__PURE__*/React.createElement("p", {
    className: "mt-1.5 text-xs text-red-500"
  }, error)), /*#__PURE__*/React.createElement("button", {
    onClick: handleAutofill,
    className: "text-xs text-blue-600 hover:text-blue-700 mt-2 mb-6 underline-offset-2 hover:underline"
  }, "Fill with test data"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => isValid && onSubmit(value.trim()),
    disabled: !isValid,
    className: `px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${isValid ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`
  }, "Continue")));
}
function DnsRow({
  label,
  fields
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl border border-gray-200 bg-white overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-gray-500 uppercase tracking-wider"
  }, label)), /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-gray-100"
  }, fields.map(({
    name,
    value
  }) => /*#__PURE__*/React.createElement("div", {
    key: name,
    className: "flex items-center px-4 py-3 gap-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400 w-24 shrink-0 uppercase tracking-wide"
  }, name), /*#__PURE__*/React.createElement("span", {
    className: "mono text-sm text-gray-800 flex-1 break-all"
  }, value), /*#__PURE__*/React.createElement(CopyButton, {
    value: value
  })))));
}
function PendingState({
  domain,
  verifyToken,
  onCheck,
  onChangeDomain
}) {
  const [checking, setChecking] = useState(false);
  const [checkedOnce, setCheckedOnce] = useState(false);
  const subdomain = domain.split(".")[0];
  const handleCheck = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setCheckedOnce(true);
      onCheck && onCheck();
    }, 2000);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fade-in max-w-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-3 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-0.5"
  }, /*#__PURE__*/React.createElement(IconClock, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-semibold text-gray-900"
  }, "Configure your DNS"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-sm mt-1"
  }, "Add the following records to your DNS provider for ", /*#__PURE__*/React.createElement("span", {
    className: "mono text-gray-700"
  }, domain), ", then verify."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 mb-6"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-400 uppercase tracking-wider"
  }, "Step 1 — CNAME record"), /*#__PURE__*/React.createElement(DnsRow, {
    label: "CNAME",
    fields: [{
      name: "Type",
      value: "CNAME"
    }, {
      name: "Host / Name",
      value: subdomain
    }, {
      name: "Value / Points to",
      value: "shops.swag42.shop"
    }, {
      name: "TTL",
      value: "Auto (3600)"
    }]
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-400 uppercase tracking-wider mt-5"
  }, "Step 2 — TXT verification record"), /*#__PURE__*/React.createElement(DnsRow, {
    label: "TXT",
    fields: [{
      name: "Type",
      value: "TXT"
    }, {
      name: "Host / Name",
      value: `_swag42-verify.${domain}`
    }, {
      name: "Value",
      value: verifyToken
    }, {
      name: "TTL",
      value: "Auto"
    }]
  })), /*#__PURE__*/React.createElement("div", {
    className: "bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex gap-3 mb-6 text-sm text-amber-800"
  }, /*#__PURE__*/React.createElement(IconClock, null), /*#__PURE__*/React.createElement("span", null, "DNS changes may take up to 48 hours to propagate. Your shop at ", /*#__PURE__*/React.createElement("span", {
    className: "mono font-medium"
  }, "example.swag42.shop"), " continues working in the meantime.")), checkedOnce && /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 mb-4 fade-in"
  }, "Not verified yet. Try again in a few minutes."), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleCheck,
    disabled: checking,
    className: "inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-60 transition-all"
  }, checking && /*#__PURE__*/React.createElement(IconSpinner, {
    size: 4,
    color: "text-white"
  }), checking ? "Checking…" : "Check verification"), /*#__PURE__*/React.createElement("button", {
    onClick: onChangeDomain,
    className: "text-sm text-gray-500 hover:text-gray-700 hover:underline underline-offset-2"
  }, "Change domain")));
}
function SslProvisioningState({
  domain
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "fade-in max-w-lg"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-semibold text-gray-900 mb-6"
  }, "Setting up your domain"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 px-4 py-3.5 rounded-xl border border-emerald-200 bg-emerald-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 4,
    color: "text-emerald-600"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-emerald-900"
  }, "DNS verified"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-emerald-600 mono"
  }, domain))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 px-4 py-3.5 rounded-xl border border-blue-200 bg-blue-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement(IconSpinner, {
    size: 4,
    color: "text-blue-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-blue-900"
  }, "Issuing SSL certificate"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-blue-500"
  }, "Usually takes 1–3 minutes")))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mt-5 leading-relaxed"
  }, "Your SSL certificate is being issued. This page will update automatically once it's ready."));
}
function ActiveState({
  domain,
  onRemove
}) {
  const [showModal, setShowModal] = useState(false);
  const sslExpiry = new Date();
  sslExpiry.setMonth(sslExpiry.getMonth() + 3);
  const connectedDate = new Date();
  connectedDate.setDate(connectedDate.getDate() - 2);
  const fmt = d => d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "fade-in max-w-xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 5,
    color: "text-emerald-600"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-emerald-600 font-semibold uppercase tracking-wider mb-0.5"
  }, "Active"), /*#__PURE__*/React.createElement("p", {
    className: "mono text-lg font-semibold text-gray-900"
  }, domain))), /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl border border-gray-200 bg-white overflow-hidden mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-gray-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center px-4 py-3 gap-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-500 w-36 shrink-0"
  }, "SSL Certificate"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2 h-2 rounded-full bg-emerald-400 pulse-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-800"
  }, "Active"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400"
  }, "· expires ", fmt(sslExpiry)))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center px-4 py-3 gap-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-500 w-36 shrink-0"
  }, "DNS Status"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(IconCheck, {
    size: 4,
    color: "text-emerald-500"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-800"
  }, "Verified"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center px-4 py-3 gap-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-500 w-36 shrink-0"
  }, "Connected"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-800"
  }, fmt(connectedDate))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowModal(true),
    className: "text-sm text-red-500 hover:text-red-600 hover:underline underline-offset-2"
  }, "Remove domain"), showModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black/40 flex items-center justify-center z-50 fade-in",
    onClick: () => setShowModal(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-semibold text-gray-900 mb-2"
  }, "Remove custom domain?"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mb-6 leading-relaxed"
  }, "Your shop will revert to ", /*#__PURE__*/React.createElement("span", {
    className: "mono text-gray-700"
  }, "example.swag42.shop"), ". This action cannot be undone."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowModal(false),
    className: "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowModal(false);
      onRemove();
    },
    className: "px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
  }, "Remove")))));
}
function FailedState({
  domain,
  errorType,
  onChangeDomain
}) {
  const isCname = errorType === "cname";
  return /*#__PURE__*/React.createElement("div", {
    className: "fade-in max-w-xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-red-50 border border-red-200 rounded-xl px-4 py-4 mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(IconX, {
    size: 4
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-red-700"
  }, "Domain verification failed")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-red-600 leading-relaxed"
  }, "We couldn't verify ", /*#__PURE__*/React.createElement("span", {
    className: "mono"
  }, domain), ". Check the details below and update your DNS records.")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: `flex items-start gap-3 px-4 py-3 rounded-xl border ${isCname ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-0.5"
  }, isCname ? /*#__PURE__*/React.createElement(IconX, {
    size: 4
  }) : /*#__PURE__*/React.createElement(IconCheck, {
    size: 4,
    color: "text-emerald-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: `text-sm font-medium ${isCname ? "text-red-700" : "text-emerald-700"}`
  }, "CNAME record"), /*#__PURE__*/React.createElement("p", {
    className: `text-xs mt-0.5 ${isCname ? "text-red-500" : "text-emerald-500"}`
  }, isCname ? "CNAME record not found. Make sure the record is published and has propagated." : "Record found and resolves correctly."))), /*#__PURE__*/React.createElement("div", {
    className: `flex items-start gap-3 px-4 py-3 rounded-xl border ${!isCname ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-0.5"
  }, !isCname ? /*#__PURE__*/React.createElement(IconX, {
    size: 4
  }) : /*#__PURE__*/React.createElement(IconCheck, {
    size: 4,
    color: "text-emerald-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: `text-sm font-medium ${!isCname ? "text-red-700" : "text-emerald-700"}`
  }, "TXT verification record"), /*#__PURE__*/React.createElement("p", {
    className: `text-xs mt-0.5 ${!isCname ? "text-red-500" : "text-emerald-500"}`
  }, !isCname ? "TXT record found but the value doesn't match. Double-check the verification token." : "Verification token matches.")))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onChangeDomain,
    className: "px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800"
  }, "Try again"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 hover:underline underline-offset-2"
  }, "View documentation ", /*#__PURE__*/React.createElement(IconExternal, null))));
}
function DebugPanel({
  state,
  setState,
  domain,
  setDomain,
  failureType,
  setFailureType,
  onAutofill,
  onResetAutofill,
  onReset
}) {
  const [open, setOpen] = useState(true);
  const states = ["empty", "pending", "ssl_provisioning", "active", "failed"];
  const stateLabels = {
    empty: "Empty",
    pending: "Pending",
    ssl_provisioning: "SSL Provisioning",
    active: "Active",
    failed: "Failed"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-4 right-4 z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: `bg-gray-950 text-gray-100 rounded-xl shadow-2xl border border-gray-800 transition-all overflow-hidden ${open ? "w-64" : "w-auto"}`
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    className: "w-full flex items-center justify-between px-3 py-2.5 hover:bg-gray-900"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-gray-400 uppercase tracking-widest"
  }, "Debug panel"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500 text-xs"
  }, open ? "▼" : "▲")), open && /*#__PURE__*/React.createElement("div", {
    className: "px-3 pb-3 space-y-4 fade-in"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
  }, "State"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-1"
  }, states.map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => setState(s),
    className: `px-2 py-1.5 rounded text-xs font-medium transition-all ${state === s ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`
  }, stateLabels[s])))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
  }, "Quick fill"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onAutofill,
    className: "w-full px-2 py-1.5 rounded text-xs font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 text-left"
  }, "Autofill domain"), /*#__PURE__*/React.createElement("button", {
    onClick: onResetAutofill,
    className: "w-full px-2 py-1.5 rounded text-xs font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 text-left"
  }, "Reset & autofill"))), state === "failed" && /*#__PURE__*/React.createElement("div", {
    className: "fade-in"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5"
  }, "Error variant"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, ["cname", "txt"].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setFailureType(t),
    className: `w-full px-2 py-1.5 rounded text-xs font-medium text-left transition-all ${failureType === t ? "bg-red-700 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`
  }, t === "cname" ? "CNAME not found" : "TXT mismatch")))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-gray-800 pt-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onReset,
    className: "w-full px-2 py-1.5 rounded text-xs font-medium bg-red-900/60 text-red-300 hover:bg-red-900 transition-all border border-red-800/50"
  }, "Reset all")))));
}
function App() {
  const [state, setState] = useState("empty");
  const [domain, setDomain] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [verifyToken] = useState(genToken);
  const [failureType, setFailureType] = useState("cname");
  const gotoState = s => {
    setState(s);
    setShowForm(false);
  };
  const handleSubmit = d => {
    setDomain(d);
    setShowForm(false);
    setState("pending");
  };
  const handleChangeDomain = () => {
    setState("empty");
    setShowForm(true);
  };
  const handleRemove = () => {
    setState("empty");
    setDomain("");
    setShowForm(false);
  };
  const handleAutofill = () => {
    setDomain("shop.acme-corp.com");
    if (state === "empty") setShowForm(true);
  };
  const handleResetAutofill = () => {
    setState("empty");
    setDomain("shop.acme-corp.com");
    setShowForm(true);
  };
  const handleReset = () => {
    setState("empty");
    setDomain("");
    setShowForm(false);
  };
  const currentShop = domain || "example";
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto px-8 py-4 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-gray-900"
  }, "Swag42 Admin"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-500"
  }, "Settings"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-500"
  }, "Custom Domain"))), /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto px-8 py-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-8"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-bold text-gray-900 mb-1"
  }, "Custom Domain"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Your shop is currently at", " ", /*#__PURE__*/React.createElement("a", {
    className: "mono text-blue-600 hover:underline underline-offset-2 text-xs",
    href: "#"
  }, currentShop, ".swag42.shop"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl border border-gray-200 shadow-sm p-8 min-h-[320px]"
  }, state === "empty" && !showForm && /*#__PURE__*/React.createElement(EmptyState, {
    onConnect: () => setShowForm(true)
  }), state === "empty" && showForm && /*#__PURE__*/React.createElement(ConnectForm, {
    onSubmit: handleSubmit,
    initialDomain: domain,
    onAutofill: d => setDomain(d)
  }), state === "pending" && /*#__PURE__*/React.createElement(PendingState, {
    domain: domain || "shop.acme-corp.com",
    verifyToken: verifyToken,
    onCheck: () => {},
    onChangeDomain: handleChangeDomain
  }), state === "ssl_provisioning" && /*#__PURE__*/React.createElement(SslProvisioningState, {
    domain: domain || "shop.acme-corp.com"
  }), state === "active" && /*#__PURE__*/React.createElement(ActiveState, {
    domain: domain || "shop.acme-corp.com",
    onRemove: handleRemove
  }), state === "failed" && /*#__PURE__*/React.createElement(FailedState, {
    domain: domain || "shop.acme-corp.com",
    errorType: failureType,
    onChangeDomain: handleChangeDomain
  }))), /*#__PURE__*/React.createElement(DebugPanel, {
    state: state,
    setState: gotoState,
    domain: domain,
    setDomain: setDomain,
    failureType: failureType,
    setFailureType: setFailureType,
    onAutofill: handleAutofill,
    onResetAutofill: handleResetAutofill,
    onReset: handleReset
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
