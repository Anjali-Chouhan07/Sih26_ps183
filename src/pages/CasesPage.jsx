import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileSpreadsheet,
  Upload,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function CasesPage() {
  const { cases, stats, setCurrentPage, setActiveCase, showToast } = useApp();

  const [activeFilter, setActiveFilter] = useState('All Cases');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const filterTabs = [
    { label: 'All Cases', count: cases.length },
    { label: 'Active', count: cases.filter(c => c.status === 'Active').length },
    { label: 'Under Review', count: cases.filter(c => c.status === 'Under Review').length },
    { label: 'Closed', count: cases.filter(c => c.status === 'Closed').length },
    { label: 'On Hold', count: cases.filter(c => c.status === 'On Hold').length },
  ];

  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      const matchesFilter = activeFilter === 'All Cases' || c.status === activeFilter;
      const matchesSearch = !searchQuery.trim() || 
        c.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.caseType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [cases, activeFilter, searchQuery]);

  const handleOpenCase = (caseItem) => {
    setActiveCase({
      ...caseItem,
      riskScore: caseItem.priority === 'High' ? 87 : caseItem.priority === 'Medium' ? 64 : 28,
      riskCategory: caseItem.priority === 'High' ? "High Risk" : "Medium Risk",
      totalFundsTracedINR: "₹ 48,75,320",
      totalFundsTracedBTC: "~ 0.8 BTC",
      hops: 4,
      transactionsCount: 127,
      vaspCount: "2 Identified",
      balanceBTC: "0.48 BTC",
      balanceINR: "₹ 4,32,000",
      firstSeen: "12 Apr 2025, 10:24",
      lastSeen: "14 Apr 2025, 16:32",
      tags: [caseItem.caseType, "Mixer", "Monitored"],
      detectedEntities: [
        { name: "Binance", type: "Exchange / VASP", confidence: "98%", status: "Identified", risk: "Medium" },
        { name: "Tornado Cash", type: "Mixer", confidence: "87%", status: "Identified", risk: "Critical" },
      ],
      suspiciousPatterns: [
        { label: "Rapid fund movement", level: "High", color: "text-red-400 bg-red-950/60 border-red-800" },
        { label: "Multiple small transfers", level: "Medium", color: "text-amber-400 bg-amber-950/60 border-amber-800" },
      ],
      recommendations: [
        "Inspect fund consolidation nodes",
        "Request compliance disclosure from relevant VASP"
      ],
      graph: {
        nodes: [
          { id: "victim", label: "Victim", address: "0x12ab...9f3e", type: "victim", x: 80, y: 200, color: "#00d2ff" },
          { id: "suspect", label: "Suspect Wallet", address: caseItem.suspectWallet.substring(0, 10) + "...", type: "suspect", x: 250, y: 200, color: "#ef4444", pulse: true },
          { id: "walletA", label: "Wallet A", address: "0x5e2a...1a7c", type: "wallet", x: 420, y: 110, color: "#3b82f6" },
          { id: "binance", label: "Binance", address: "0x4f9c3e...8d2c", type: "exchange", x: 600, y: 200, color: "#f59e0b" },
        ],
        edges: [
          { from: "victim", to: "suspect", amount: "1.2 BTC", date: "12 Apr 10:24" },
          { from: "suspect", to: "walletA", amount: "0.5 BTC", date: "12 Apr 11:03" },
          { from: "walletA", to: "binance", amount: "0.5 BTC", date: "12 Apr 13:45" },
        ]
      },
      transactions: [
        { id: 1, txHash: "0x9d11a...7d9c", from: "0x12ab...9f3e", to: caseItem.suspectWallet.substring(0, 12) + "...", amount: "1.2", token: "BTC", time: "12 Apr 10:24", status: "Confirmed", risk: "High" },
        { id: 2, txHash: "0x4e7c...2d1f", from: caseItem.suspectWallet.substring(0, 12) + "...", to: "0x5e2a...1a7c", amount: "0.5", token: "BTC", time: "12 Apr 11:03", status: "Confirmed", risk: "Medium" },
      ]
    });
    setCurrentPage('dashboard');
    showToast(`Loaded Case ${caseItem.caseId} into Active Dashboard!`, 'success');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-0.5">
            CASES
          </span>
          <h1 className="text-xl font-extrabold text-white tracking-wide">
            Manage Investigation Cases
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Track, analyze and manage all blockchain investigation cases
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-xs text-slate-400 italic hidden sm:block">"Every transaction leaves a trace."</p>
          <button
            onClick={() => setCurrentPage('new-investigation')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Case</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0b142d] border border-[#1b2b52] rounded-xl p-4 shadow flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-white">{stats.totalCases}</div>
            <div className="text-xs text-slate-400 font-medium">Total Cases</div>
          </div>
          <span className="text-xs font-bold text-emerald-400 flex items-center">↑ 12%</span>
        </div>

        <div className="bg-[#0b142d] border border-[#1b2b52] rounded-xl p-4 shadow flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-white">{stats.activeCases}</div>
            <div className="text-xs text-slate-400 font-medium">Active</div>
          </div>
          <span className="text-xs font-bold text-emerald-400 flex items-center">↑ 8%</span>
        </div>

        <div className="bg-[#0b142d] border border-[#1b2b52] rounded-xl p-4 shadow flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-white">{stats.underReviewCases}</div>
            <div className="text-xs text-slate-400 font-medium">Under Review</div>
          </div>
          <span className="text-xs font-bold text-amber-400 flex items-center">↓ 5%</span>
        </div>

        <div className="bg-[#0b142d] border border-[#1b2b52] rounded-xl p-4 shadow flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-white">{stats.closedCases}</div>
            <div className="text-xs text-slate-400 font-medium">Closed</div>
          </div>
          <span className="text-xs font-bold text-emerald-400 flex items-center">↑ 18%</span>
        </div>
      </div>

      {/* Main Grid: Cases Table (Left 2 cols) & Stats/Actions (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cases Table Container */}
        <div className="lg:col-span-2 bg-[#0b142d] border border-[#1b2b52] rounded-xl p-4 shadow-lg space-y-4">
          {/* Filter Tabs & Search Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#162548]">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {filterTabs.map((t) => (
                <button
                  key={t.label}
                  onClick={() => setActiveFilter(t.label)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeFilter === t.label
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white hover:bg-[#101e40]'
                  }`}
                >
                  {t.label} ({t.count})
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#070d1e] border border-[#162548] focus:border-blue-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white outline-none w-36 sm:w-48"
                />
              </div>
              <button 
                onClick={() => showToast("Filters updated.", "info")}
                className="p-1.5 bg-[#070d1e] border border-[#162548] hover:bg-[#122045] rounded-lg text-slate-400 hover:text-white"
                title="Filter Options"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#070d1e] text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Case ID</th>
                  <th className="py-2.5 px-3">Title</th>
                  <th className="py-2.5 px-3">Case Type</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Priority</th>
                  <th className="py-2.5 px-3">Assigned To</th>
                  <th className="py-2.5 px-3">Date Created</th>
                  <th className="py-2.5 px-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#152345]">
                {filteredCases.map((c, idx) => (
                  <tr 
                    key={c.id} 
                    onClick={() => handleOpenCase(c)}
                    className="hover:bg-[#0e1b3d] cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-3 text-slate-500">{idx + 1}</td>
                    <td className="py-3 px-3 font-mono font-bold text-cyan-400 hover:underline">
                      {c.caseId}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-200">{c.title}</td>
                    <td className="py-3 px-3 text-slate-400">{c.caseType}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        c.status === 'Active' ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800' :
                        c.status === 'Under Review' ? 'bg-amber-950/80 text-amber-400 border-amber-800' :
                        c.status === 'Closed' ? 'bg-slate-800 text-slate-300 border-slate-700' :
                        'bg-blue-950/80 text-blue-400 border-blue-800'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-bold ${
                        c.priority === 'Critical' ? 'text-rose-400' :
                        c.priority === 'High' ? 'text-red-400' :
                        c.priority === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {c.priority}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{c.assignedTo}</td>
                    <td className="py-3 px-3 text-slate-400 text-[11px]">{c.dateCreated}</td>
                    <td className="py-3 px-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast(`Opened actions for ${c.caseId}`, 'info');
                        }}
                        className="p-1 hover:bg-[#1b2b52] rounded text-slate-400 hover:text-white"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-3 border-t border-[#162548] text-xs text-slate-400">
            <span>Showing 1 to {filteredCases.length} of {cases.length} cases</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded bg-[#070d1e] border border-[#162548] hover:bg-[#122045] disabled:opacity-50">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setCurrentPageNum(n)}
                  className={`w-6 h-6 rounded text-xs font-semibold ${
                    currentPageNum === n ? 'bg-blue-600 text-white' : 'bg-[#070d1e] border border-[#162548] text-slate-300 hover:bg-[#122045]'
                  }`}
                >
                  {n}
                </button>
              ))}
              <span>... 13</span>
              <button className="p-1 rounded bg-[#070d1e] border border-[#162548] hover:bg-[#122045]">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Case Statistics, Recent Activity & Actions */}
        <div className="space-y-4">
          {/* Case Statistics Donut */}
          <div className="bg-[#0b142d] border border-[#1b2b52] rounded-xl p-4 shadow-lg">
            <span className="text-xs font-bold text-white block pb-2 border-b border-[#162548]">
              Case Statistics
            </span>

            <div className="flex items-center justify-center gap-4 py-3">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="transparent" stroke="#101e40" strokeWidth="16" />
                  {/* Active 39% */}
                  <circle cx="50" cy="50" r="38" fill="transparent" stroke="#10b981" strokeWidth="16" strokeDasharray="93 238" strokeDashoffset="0" />
                  {/* Under Review 26% */}
                  <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f59e0b" strokeWidth="16" strokeDasharray="62 238" strokeDashoffset="-93" />
                  {/* Closed 35% */}
                  <circle cx="50" cy="50" r="38" fill="transparent" stroke="#ef4444" strokeWidth="16" strokeDasharray="83 238" strokeDashoffset="-155" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-extrabold text-white">124</span>
                  <span className="text-[8px] text-slate-400">Total Cases</span>
                </div>
              </div>

              <div className="space-y-1 text-[11px]">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span className="text-slate-300">Active</span><span className="text-slate-400 font-mono">48 (39%)</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span className="text-slate-300">Under Review</span><span className="text-slate-400 font-mono">32 (26%)</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span><span className="text-slate-300">Closed</span><span className="text-slate-400 font-mono">44 (35%)</span></div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#0b142d] border border-[#1b2b52] rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-[#162548] mb-2">
              <span className="text-xs font-bold text-white">Recent Activity</span>
              <span className="text-[10px] text-blue-400 hover:underline cursor-pointer">View All</span>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { text: "CN-1024 status changed to Active", time: "2 hours ago", color: "text-emerald-400" },
                { text: "New case CN-1023 created", time: "5 hours ago", color: "text-blue-400" },
                { text: "Evidence added to CN-1022", time: "8 hours ago", color: "text-purple-400" },
                { text: "CN-1021 closed & sealed", time: "1 day ago", color: "text-slate-400" },
                { text: "Report generated for CN-1019", time: "1 day ago", color: "text-cyan-400" },
              ].map((act, idx) => (
                <div key={idx} className="p-1.5 rounded bg-[#070d1e] border border-[#142347]">
                  <p className="text-slate-200 text-[11px] font-medium">{act.text}</p>
                  <span className="text-[10px] text-slate-500">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#0b142d] border border-[#1b2b52] rounded-xl p-4 shadow-lg space-y-2">
            <span className="text-xs font-bold text-white block pb-2 border-b border-[#162548]">
              Quick Actions
            </span>
            <button 
              onClick={() => setCurrentPage('new-investigation')}
              className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Case</span>
            </button>
            <button 
              onClick={() => showToast("Case data import wizard opened.", "info")}
              className="w-full py-2 px-3 bg-[#070d1e] hover:bg-[#122045] border border-[#162548] text-slate-200 hover:text-white rounded-lg text-xs font-medium flex items-center gap-2 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span>Import Data</span>
            </button>
            <button 
              onClick={() => showToast("Case summary report generated!", "success")}
              className="w-full py-2 px-3 bg-[#070d1e] hover:bg-[#122045] border border-[#162548] text-slate-200 hover:text-white rounded-lg text-xs font-medium flex items-center gap-2 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Generate Report</span>
            </button>
            <button 
              onClick={() => showToast("Exporting cases dataset as CSV...", "info")}
              className="w-full py-2 px-3 bg-[#070d1e] hover:bg-[#122045] border border-[#162548] text-slate-200 hover:text-white rounded-lg text-xs font-medium flex items-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export Cases</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
