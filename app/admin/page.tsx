'use client';

import React, { useState, useEffect } from 'react';
import {
  Lock,
  ShieldCheck,
  Search,
  RefreshCw,
  Download,
  LogOut,
  Users,
  IndianRupee,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import { Logo } from '@/components/Logo';

interface Registration {
  id: number;
  name: string;
  email: string;
  phone: string;
  order_id: string | null;
  payment_id: string | null;
  signature: string | null;
  amount: number;
  status: string;
  ticket_id: string | null;
  created_at: string;
}

export default function AdminDashboard() {
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [savedPassword, setSavedPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Check sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('sapain_admin_pass');
    if (stored) {
      setSavedPassword(stored);
      fetchRegistrations(stored);
    }
  }, []);

  const fetchRegistrations = async (pass: string) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/admin/registrations', {
        headers: { 'x-admin-password': pass },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRegistrations(data.data || []);
        setIsAuthenticated(true);
        sessionStorage.setItem('sapain_admin_pass', pass);
      } else {
        setErrorMsg(data.error || 'Invalid password. Please try again.');
        setIsAuthenticated(false);
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      setErrorMsg(e.message || 'Error connecting to server.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput) return;
    setSavedPassword(passwordInput);
    fetchRegistrations(passwordInput);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('sapain_admin_pass');
    setIsAuthenticated(false);
    setPasswordInput('');
    setSavedPassword('');
  };

  const copyToClipboard = (text: string, idKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(idKey);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportToCSV = () => {
    if (!registrations.length) return;
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Amount (INR)', 'Status', 'Order ID', 'Payment ID', 'Ticket ID'];
    const rows = filteredRegistrations.map((r) => [
      r.id,
      new Date(r.created_at).toLocaleString(),
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${r.phone.replace(/"/g, '""')}"`,
      r.amount,
      r.status,
      r.order_id || '',
      r.payment_id || '',
      r.ticket_id || '',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sapain_registrations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter registrations
  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.order_id && r.order_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.payment_id && r.payment_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.ticket_id && r.ticket_id.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalRegistrations = registrations.length;
  const completedPayments = registrations.filter((r) => r.status === 'completed');
  const totalRevenue = completedPayments.reduce((acc, curr) => acc + (curr.amount || 499), 0);
  const pendingPayments = registrations.filter((r) => r.status === 'pending');

  // Password Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] flex items-center justify-center p-4">
        <div className="relative w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <Logo className="h-8" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Access Required</span>
            </div>
            <h1 className="text-2xl font-bold font-display text-white">Enter Admin Password</h1>
            <p className="text-xs text-neutral-400">Please authenticate to view user registrations and payment statuses.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-neutral-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#F2F2F2] hover:bg-white text-[#000000] font-bold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Access Dashboard
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Interface
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] p-4 md:p-8 space-y-6">
      {/* Top Navbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 p-4 md:px-6 md:py-4 rounded-xl border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Logo className="h-7" />
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
            Admin Portal
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => fetchRegistrations(savedPassword)}
            disabled={loading}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-medium rounded-lg border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          <button
            onClick={exportToCSV}
            className="px-3 py-1.5 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 text-xs font-medium rounded-lg border border-violet-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium rounded-lg border border-red-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-neutral-400 text-xs font-medium">
            <span>Total Registrations</span>
            <Users className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold font-display text-white">{totalRegistrations}</div>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-neutral-400 text-xs font-medium">
            <span>Total Revenue</span>
            <IndianRupee className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold font-display text-green-400">₹{totalRevenue.toLocaleString()}</div>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-neutral-400 text-xs font-medium">
            <span>Successful Payments</span>
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold font-display text-white">{completedPayments.length}</div>
        </div>

        <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2">
          <div className="flex justify-between items-center text-neutral-400 text-xs font-medium">
            <span>Pending Registrations</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold font-display text-amber-400">{pendingPayments.length}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, email, phone, order ID..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:border-violet-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-neutral-400 font-medium whitespace-nowrap">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg text-xs text-white px-3 py-2 focus:border-violet-500 focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-[#0A0A0A] text-white">All Statuses</option>
            <option value="completed" className="bg-[#0A0A0A] text-white">Completed</option>
            <option value="pending" className="bg-[#0A0A0A] text-white">Pending</option>
            <option value="failed" className="bg-[#0A0A0A] text-white">Failed</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs text-neutral-300">
          <thead className="bg-white/10 text-neutral-200 uppercase tracking-wider font-semibold text-[10px] border-b border-white/10">
            <tr>
              <th className="p-4"># / Date</th>
              <th className="p-4">User Details</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment Status</th>
              <th className="p-4">Razorpay Order & Payment ID</th>
              <th className="p-4">Ticket Pass ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredRegistrations.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-neutral-500">
                  {loading ? 'Loading registrations from database...' : 'No registrations found.'}
                </td>
              </tr>
            ) : (
              filteredRegistrations.map((r, index) => (
                <tr key={r.id || index} className="hover:bg-white/5 transition-colors">
                  {/* Date & ID */}
                  <td className="p-4 space-y-0.5">
                    <div className="font-mono text-white font-semibold">#{r.id}</div>
                    <div className="text-[10px] text-neutral-400">
                      {new Date(r.created_at).toLocaleDateString()} {new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>

                  {/* Name */}
                  <td className="p-4 font-medium text-white">
                    <div className="text-sm font-semibold">{r.name}</div>
                  </td>

                  {/* Contact */}
                  <td className="p-4 space-y-0.5">
                    <div className="text-neutral-200">{r.email}</div>
                    <div className="text-neutral-400 font-mono text-[11px]">{r.phone}</div>
                  </td>

                  {/* Amount */}
                  <td className="p-4 font-bold text-white text-sm">
                    ₹{r.amount || 499}
                  </td>

                  {/* Payment Status */}
                  <td className="p-4">
                    {r.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    ) : r.status === 'pending' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-semibold">
                        <Clock className="w-3 h-3" />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-semibold">
                        <AlertCircle className="w-3 h-3" />
                        {r.status}
                      </span>
                    )}
                  </td>

                  {/* Order & Payment ID */}
                  <td className="p-4 space-y-1 font-mono text-[11px]">
                    {r.order_id && (
                      <div className="flex items-center gap-1.5 text-neutral-300">
                        <span className="text-neutral-500 text-[10px]">Order:</span>
                        <span>{r.order_id}</span>
                        <button
                          onClick={() => copyToClipboard(r.order_id!, `ord_${r.id}`)}
                          className="hover:text-white transition-colors"
                        >
                          {copiedId === `ord_${r.id}` ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-neutral-500" />}
                        </button>
                      </div>
                    )}
                    {r.payment_id && (
                      <div className="flex items-center gap-1.5 text-green-400">
                        <span className="text-neutral-500 text-[10px]">PayID:</span>
                        <span>{r.payment_id}</span>
                        <button
                          onClick={() => copyToClipboard(r.payment_id!, `pay_${r.id}`)}
                          className="hover:text-white transition-colors"
                        >
                          {copiedId === `pay_${r.id}` ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-neutral-500" />}
                        </button>
                      </div>
                    )}
                    {!r.order_id && !r.payment_id && <span className="text-neutral-600">-</span>}
                  </td>

                  {/* Ticket Pass ID */}
                  <td className="p-4 font-mono">
                    {r.ticket_id ? (
                      <span className="bg-violet-500/10 text-violet-300 px-2 py-0.5 rounded border border-violet-500/20 text-xs font-semibold">
                        {r.ticket_id}
                      </span>
                    ) : (
                      <span className="text-neutral-600">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
