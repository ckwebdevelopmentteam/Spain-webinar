'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  CreditCard,
  Settings,
  Search,
  Plus,
  RefreshCw,
  Download,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  IndianRupee,
  X,
  TrendingUp,
  PlusCircle,
  Building2,
} from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  batch_name: string;
  total_fee: number;
  paid_amount: number;
  pending_amount: number;
  status: string;
  created_at: string;
}

interface Batch {
  id: number;
  name: string;
  fee: number;
  description: string;
}

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
  // Auth state
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Navigation tab state: 'dashboard' | 'students' | 'batches' | 'webinar' | 'settings'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'batches' | 'webinar' | 'settings'>('students');

  // Data states
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [batchFilter, setBatchFilter] = useState<string>('all');

  // Modals state
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedStudentForPay, setSelectedStudentForPay] = useState<Student | null>(null);
  const [additionalPayment, setAdditionalPayment] = useState<string>('');

  // Form states for Add Student
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    batch_name: 'Batch A',
    total_fee: 10000,
    paid_amount: 0,
  });

  // Batch edit state
  const [batchFees, setBatchFees] = useState<{ [key: string]: number }>({});
  const [_copiedId, _setCopiedId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Check sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('sapain_admin_token');
    if (stored) {
      setAuthToken(stored);
      fetchData(stored);
    }
  }, []);

  const fetchData = async (token: string) => {
    setLoading(true);
    setAuthError('');
    try {
      // 1. Fetch Students
      const resStudents = await fetch('/api/admin/students', {
        headers: { 'x-admin-token': token },
      });
      const dataStudents = await resStudents.json();

      // 2. Fetch Batches
      const resBatches = await fetch('/api/admin/batches', {
        headers: { 'x-admin-token': token },
      });
      const dataBatches = await resBatches.json();

      // 3. Fetch Webinar Registrations
      const resRegs = await fetch('/api/admin/registrations', {
        headers: { 'x-admin-token': token },
      });
      const dataRegs = await resRegs.json();

      if (resStudents.ok && dataStudents.success) {
        setStudents(dataStudents.data || []);
        setIsAuthenticated(true);
      } else {
        setAuthError(dataStudents.error || 'Invalid or expired session. Please log in.');
        setIsAuthenticated(false);
        sessionStorage.removeItem('sapain_admin_token');
        setLoading(false);
        return;
      }

      if (resBatches.ok && dataBatches.success) {
        setBatches(dataBatches.data || []);
        const feesMap: { [key: string]: number } = {};
        (dataBatches.data || []).forEach((b: Batch) => {
          feesMap[b.name] = b.fee;
        });
        setBatchFees(feesMap);
      }

      if (resRegs.ok && dataRegs.success) {
        setRegistrations(dataRegs.data || []);
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      setAuthError(e.message || 'Error connecting to database.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput) return;
    setLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        setAuthToken(data.token);
        sessionStorage.setItem('sapain_admin_token', data.token);
        setIsAuthenticated(true);
        fetchData(data.token);
      } else {
        setAuthError(data.error || 'Invalid admin credentials.');
        setIsAuthenticated(false);
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      setAuthError(e.message || 'Error communicating with authentication server.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('sapain_admin_token');
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthToken('');
  };

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Add Student Handler
  const handleAddStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': authToken,
        },
        body: JSON.stringify(newStudent),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotify('Student added successfully!');
        setIsAddStudentOpen(false);
        setNewStudent({
          name: '',
          email: '',
          phone: '',
          batch_name: 'Batch A',
          total_fee: batchFees['Batch A'] || 10000,
          paid_amount: 0,
        });
        fetchData(authToken);
      } else {
        alert(data.error || 'Failed to add student');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding student');
    }
  };

  // Update Payment Handler
  const handleUpdatePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForPay) return;

    try {
      const res = await fetch('/api/admin/students', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': authToken,
        },
        body: JSON.stringify({
          id: selectedStudentForPay.id,
          additional_payment: Number(additionalPayment) || 0,
          total_fee: selectedStudentForPay.total_fee,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showNotify('Payment record updated successfully!');
        setIsPayModalOpen(false);
        setSelectedStudentForPay(null);
        setAdditionalPayment('');
        fetchData(authToken);
      } else {
        alert(data.error || 'Failed to update payment');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating payment');
    }
  };

  // Update Batch Fee Settings
  const handleSaveBatchFee = async (batchName: string, newFee: number) => {
    try {
      const res = await fetch('/api/admin/batches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': authToken,
        },
        body: JSON.stringify({ name: batchName, fee: newFee }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotify(`Fee for ${batchName} updated to ₹${newFee.toLocaleString()}!`);
        fetchData(authToken);
      } else {
        alert(data.error || 'Failed to save batch fee');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating batch fee');
    }
  };

  // When user changes batch selection in Add Student modal, update default fee $X$
  const handleBatchChange = (selectedBatch: string) => {
    const defaultFee = batchFees[selectedBatch] || 10000;
    setNewStudent({
      ...newStudent,
      batch_name: selectedBatch,
      total_fee: defaultFee,
    });
  };

  const _copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    _setCopiedId(key);
    setTimeout(() => _setCopiedId(null), 2000);
  };

  const exportStudentsCSV = () => {
    if (!students.length) return;
    const headers = ['ID', 'Enrolled Timestamp', 'Name', 'Email', 'Phone', 'Batch', 'Total Fee (X)', 'Paid (Y)', 'Pending Due (X-Y)', 'Status'];
    const rows = filteredStudents.map((s) => [
      s.id,
      `"${new Date(s.created_at).toLocaleString('en-IN')}"`,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.phone.replace(/"/g, '""')}"`,
      s.batch_name,
      s.total_fee,
      s.paid_amount,
      s.pending_amount,
      s.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `students_fees_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportWebinarCSV = () => {
    if (!registrations.length) return;
    const headers = ['ID', 'Booking Timestamp', 'Customer Name', 'Email', 'Phone', 'Amount (INR)', 'Razorpay Order ID', 'Payment ID', 'Ticket ID', 'Status'];
    const rows = registrations.map((r) => [
      r.id,
      `"${new Date(r.created_at).toLocaleString('en-IN')}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${(r.phone || '').replace(/"/g, '""')}"`,
      r.amount || 299,
      r.order_id || '',
      r.payment_id || '',
      r.ticket_id || '',
      r.status || 'completed',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `webinar_modal_registrations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.batch_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || s.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesBatch = batchFilter === 'all' || s.batch_name === batchFilter;

    return matchesSearch && matchesStatus && matchesBatch;
  });

  // Calculate Metrics
  const totalStudents = students.length;
  const totalCollectedFees = students.reduce((acc, curr) => acc + (Number(curr.paid_amount) || 0), 0);
  const totalPendingFees = students.reduce((acc, curr) => acc + (Number(curr.pending_amount) || 0), 0);
  const completedCount = students.filter((s) => s.status.toLowerCase() === 'completed').length;
  const partialCount = students.filter((s) => s.status.toLowerCase() === 'partial').length;
  const pendingCount = students.filter((s) => s.status.toLowerCase() === 'pending').length;

  // Login Screen (If not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-violet-600 font-bold text-xl font-display">
              <Building2 className="w-6 h-6" />
              <span>thynck-os</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 font-display">Admin Sign In</h1>
            <p className="text-xs text-slate-500">Enter your password to access the student & fee management dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-violet-600 focus:outline-none transition-all"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-semibold text-sm rounded-lg transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* LEFT SIDEBAR (Matching reference thynck-os) */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between hidden md:flex flex-shrink-0">
        <div className="space-y-6">
          {/* Logo Brand */}
          <div className="flex items-center gap-2 font-bold font-display text-lg text-slate-900">
            <Building2 className="w-6 h-6 text-violet-600" />
            <span>thynck-os</span>
            <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-1.5 py-0.5 rounded border border-slate-200 ml-auto">v2.4</span>
          </div>

          {/* Search modules input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search modules..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-violet-600 focus:outline-none"
            />
          </div>

          {/* Navigation Groups */}
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-2">Main Workspace</span>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('students')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'students'
                      ? 'bg-violet-50 text-violet-600 font-bold border border-violet-100 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4" />
                    <span>Students & Fees</span>
                  </div>
                  <span className="bg-violet-100 text-violet-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {students.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('batches')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'batches'
                      ? 'bg-violet-50 text-violet-600 font-bold border border-violet-100 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Fee Settings / Batches</span>
                </button>

                <button
                  onClick={() => setActiveTab('webinar')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'webinar'
                      ? 'bg-violet-50 text-violet-600 font-bold border border-violet-100 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4" />
                    <span>Razorpay Transactions</span>
                  </div>
                  <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                    {registrations.length}
                  </span>
                </button>
              </nav>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-2">System</span>
              <nav className="space-y-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Sidebar Footer User Profile */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs font-mono">
              SA
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 leading-none">Super Admin</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">admin@sapain.edu</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* TOP HEADER BAR */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold font-display text-slate-900 capitalize">
              {activeTab === 'students' && 'Students & Fee Management'}
              {activeTab === 'batches' && 'Batch Fee Settings'}
              {activeTab === 'webinar' && 'Razorpay Payments'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeTab === 'students' && 'Manage student enrollments, batch fee calculations, and pending balances.'}
              {activeTab === 'batches' && 'Set default total fees (X) for Batch A, Batch B, and Batch C.'}
              {activeTab === 'webinar' && 'View live webinar payments verified via Razorpay webhook.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => fetchData(authToken)}
              disabled={loading}
              className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            {activeTab === 'students' && (
              <>
                <button
                  onClick={exportStudentsCSV}
                  className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>

                <button
                  onClick={() => setIsAddStudentOpen(true)}
                  className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  + Add Student
                </button>
              </>
            )}

            {activeTab === 'webinar' && (
              <button
                onClick={exportWebinarCSV}
                className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            )}
          </div>
        </header>

        {/* TAB CONTENT CONTAINER */}
        <div className="p-6 space-y-6 overflow-y-auto">

          {/* TAB 1: STUDENTS & FEE MANAGEMENT */}
          {activeTab === 'students' && (
            <>
              {/* TOP KPI CARDS (Matching Reference Layout) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Students */}
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +50%
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Total Students</span>
                    <span className="text-2xl font-bold font-display text-slate-900">{totalStudents}</span>
                  </div>
                </div>

                {/* Total Collected Revenue */}
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <IndianRupee className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Collected
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Total Fees Paid (Y)</span>
                    <span className="text-2xl font-bold font-display text-emerald-600">₹{totalCollectedFees.toLocaleString()}</span>
                  </div>
                </div>

                {/* Total Pending Due */}
                <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                      Balance Due
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Total Pending Due (X - Y)</span>
                    <span className="text-2xl font-bold font-display text-purple-600">₹{totalPendingFees.toLocaleString()}</span>
                  </div>
                </div>

                {/* Yellow Highlight Card (Matching Unassigned / Action Needed reference) */}
                <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-amber-900">Pending Payments</span>
                    </div>
                    <div className="text-2xl font-bold font-display text-amber-950">{pendingCount + partialCount} Students</div>
                    <span className="text-[10px] font-semibold text-amber-800">Requires Fee Collection</span>
                  </div>
                  <button
                    onClick={() => setStatusFilter('pending')}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm cursor-pointer transition-all"
                  >
                    Action Needed
                  </button>
                </div>
              </div>

              {/* SEARCH & FILTERS BAR */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
                  {/* Search bar */}
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search students by name, email, phone..."
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-600 focus:outline-none"
                    />
                  </div>

                  {/* Dropdown Filters */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 px-3 py-2 focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Statuses</option>
                      <option value="completed">Completed</option>
                      <option value="partial">Partial</option>
                      <option value="pending">Pending</option>
                    </select>

                    <select
                      value={batchFilter}
                      onChange={(e) => setBatchFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 px-3 py-2 focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Batches</option>
                      {batches.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name} (₹{b.fee.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Filter Pills (Matching reference "All 16, New 4, Contacted 2...") */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      statusFilter === 'all'
                        ? 'bg-slate-900 text-white shadow'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>All</span>
                    <span className="bg-slate-700 text-white text-[10px] px-1.5 py-0.2 rounded-full">{totalStudents}</span>
                  </button>

                  <button
                    onClick={() => setStatusFilter('completed')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      statusFilter === 'completed'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    <span>Completed</span>
                    <span className="bg-emerald-200 text-emerald-900 text-[10px] px-1.5 py-0.2 rounded-full">{completedCount}</span>
                  </button>

                  <button
                    onClick={() => setStatusFilter('partial')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      statusFilter === 'partial'
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                    }`}
                  >
                    <span>Partial</span>
                    <span className="bg-blue-200 text-blue-900 text-[10px] px-1.5 py-0.2 rounded-full">{partialCount}</span>
                  </button>

                  <button
                    onClick={() => setStatusFilter('pending')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      statusFilter === 'pending'
                        ? 'bg-amber-600 text-white shadow'
                        : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    <span>Pending</span>
                    <span className="bg-amber-200 text-amber-900 text-[10px] px-1.5 py-0.2 rounded-full">{pendingCount}</span>
                  </button>
                </div>
              </div>

              {/* DATA TABLE (Matching Thynck-OS reference style) */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="p-4">Student</th>
                        <th className="p-4">Batch</th>
                        <th className="p-4">Total Fee (X)</th>
                        <th className="p-4">Paid Amount (Y)</th>
                        <th className="p-4">Pending Due (X - Y)</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Enrolled Timestamp</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center py-12 text-slate-400">
                            {loading ? 'Loading students...' : 'No student records found.'}
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((s) => (
                          <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                            {/* Student Avatar + Name + Email */}
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center font-mono text-xs flex-shrink-0">
                                  {s.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 text-xs">{s.name}</div>
                                  <div className="text-slate-400 text-[11px]">{s.email} • {s.phone}</div>
                                </div>
                              </div>
                            </td>

                            {/* Batch */}
                            <td className="p-4">
                              <span className="font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                                {s.batch_name}
                              </span>
                            </td>

                            {/* Total Fee (X) */}
                            <td className="p-4 font-bold text-slate-900">
                              ₹{s.total_fee.toLocaleString()}
                            </td>

                            {/* Paid Amount (Y) */}
                            <td className="p-4 font-bold text-emerald-600">
                              ₹{s.paid_amount.toLocaleString()}
                            </td>

                            {/* Pending Due (X - Y) */}
                            <td className="p-4 font-bold text-purple-600">
                              ₹{s.pending_amount.toLocaleString()}
                            </td>

                            {/* Status Badge */}
                            <td className="p-4">
                              {s.status.toLowerCase() === 'completed' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                  <CheckCircle2 className="w-3 h-3" /> Completed
                                </span>
                              ) : s.status.toLowerCase() === 'partial' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                                  <Clock className="w-3 h-3" /> Partial
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                                  <AlertCircle className="w-3 h-3" /> Pending
                                </span>
                              )}
                            </td>

                            {/* Enrolled Timestamp */}
                            <td className="p-4 font-mono text-[11px]">
                              <div className="font-semibold text-slate-800">
                                {new Date(s.created_at).toLocaleDateString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3 text-slate-400" />
                                {new Date(s.created_at).toLocaleTimeString('en-IN', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true,
                                })}
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="p-4 text-right">
                              <button
                                onClick={() => {
                                  setSelectedStudentForPay(s);
                                  setIsPayModalOpen(true);
                                }}
                                className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-[11px] font-bold rounded-lg transition-all shadow-sm cursor-pointer inline-flex items-center gap-1"
                              >
                                <PlusCircle className="w-3.5 h-3.5" /> + Payment
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: BATCH FEE SETTINGS */}
          {activeTab === 'batches' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div>
                  <h2 className="text-lg font-bold font-display text-slate-900">Batch Fee Structure Settings</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Set total batch fee ($X$). When adding a student to a batch, the system automatically loads this fee ($X$) and calculates pending balance ($X - Y$).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {['Batch A', 'Batch B', 'Batch C'].map((bName) => (
                    <div key={bName} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">{bName}</span>
                        <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">Active</span>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Total Fee Amount ($X$)</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                          <input
                            type="number"
                            value={batchFees[bName] || 10000}
                            onChange={(e) => setBatchFees({ ...batchFees, [bName]: Number(e.target.value) })}
                            className="w-full pl-8 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:border-violet-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleSaveBatchFee(bName, batchFees[bName] || 10000)}
                        className="w-full py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Save {bName} Fee
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RAZORPAY WEBINAR REGISTRATIONS */}
          {activeTab === 'webinar' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h2 className="font-bold text-slate-900 text-sm font-display">Razorpay Live Webinar Transactions</h2>
                <span className="text-xs text-slate-500 font-mono">Total Transactions: {registrations.length}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-100 text-slate-500 uppercase tracking-wider font-semibold text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-4">Timestamp / ID</th>
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Razorpay Order & Payment ID</th>
                      <th className="p-4">Ticket Pass ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {registrations.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-slate-400">
                          No Razorpay transactions found.
                        </td>
                      </tr>
                    ) : (
                      registrations.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-mono text-[11px]">
                            <div className="flex items-center gap-1.5 font-bold text-slate-900">
                              <span>#{r.id}</span>
                              <span className="text-[9px] font-normal px-1.5 py-0.2 rounded bg-violet-50 text-violet-700 border border-violet-200">
                                Modal Booking
                              </span>
                            </div>
                            <div className="text-slate-800 font-semibold text-xs mt-1">
                              {new Date(r.created_at).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {new Date(r.created_at).toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true,
                              })}
                            </div>
                          </td>
                          <td className="p-4 font-bold text-slate-900">{r.name}</td>
                          <td className="p-4 text-slate-600">
                            <div>{r.email}</div>
                            <div className="font-mono text-[10px] text-slate-400">{r.phone}</div>
                          </td>
                          <td className="p-4 font-bold text-slate-900">₹{r.amount || 299}</td>
                          <td className="p-4 font-mono text-[10px] space-y-1">
                            {r.order_id && <div className="text-slate-600">Ord: {r.order_id}</div>}
                            {r.payment_id && <div className="text-emerald-600 font-bold">Pay: {r.payment_id}</div>}
                          </td>
                          <td className="p-4 font-mono">
                            {r.ticket_id ? (
                              <span className="bg-violet-50 text-violet-700 px-2 py-0.5 rounded border border-violet-200 text-xs font-semibold">
                                {r.ticket_id}
                              </span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* MODAL 1: + ADD STUDENT */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">+ Add New Student</h3>
                <p className="text-xs text-slate-500">Store student enrollment and fee payment details in database.</p>
              </div>
              <button onClick={() => setIsAddStudentOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:border-violet-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="aarav@example.com"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:border-violet-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:border-violet-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Batch *</label>
                <select
                  value={newStudent.batch_name}
                  onChange={(e) => handleBatchChange(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-semibold focus:bg-white focus:border-violet-600 focus:outline-none cursor-pointer"
                >
                  {['Batch A', 'Batch B', 'Batch C'].map((b) => (
                    <option key={b} value={b}>
                      {b} (Default Fee: ₹{(batchFees[b] || 10000).toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Fee Amount ($X$)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input
                      type="number"
                      required
                      value={newStudent.total_fee}
                      onChange={(e) => setNewStudent({ ...newStudent, total_fee: Number(e.target.value) })}
                      className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:bg-white focus:border-violet-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Initial Paid Amount ($Y$)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input
                      type="number"
                      value={newStudent.paid_amount}
                      onChange={(e) => setNewStudent({ ...newStudent, paid_amount: Number(e.target.value) })}
                      className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-emerald-600 focus:bg-white focus:border-violet-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Fee Math Summary Box */}
              <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200 space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Total Fee ($X$):</span>
                  <span className="font-bold text-slate-900">₹{newStudent.total_fee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Paid Amount ($Y$):</span>
                  <span className="font-bold text-emerald-600">₹{newStudent.paid_amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 text-slate-900 font-bold">
                  <span>Pending Due ($X - Y$):</span>
                  <span className="text-purple-600">₹{Math.max(0, newStudent.total_fee - newStudent.paid_amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Assigned Status:</span>
                  <span className="font-bold uppercase tracking-wider text-violet-700">
                    {newStudent.paid_amount >= newStudent.total_fee
                      ? 'Completed'
                      : newStudent.paid_amount > 0
                      ? 'Partial'
                      : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-200">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Enrollment Timestamp:
                  </span>
                  <span className="font-mono text-slate-700 font-semibold">
                    {new Date().toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Save Student to DB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: UPDATE / RECORD ADDITIONAL PAYMENT */}
      {isPayModalOpen && selectedStudentForPay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">+ Record Student Payment</h3>
                <p className="text-xs text-slate-500">Collect fee payment for {selectedStudentForPay.name}</p>
              </div>
              <button onClick={() => setIsPayModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdatePaymentSubmit} className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Batch:</span>
                  <span className="font-bold text-slate-900">{selectedStudentForPay.batch_name}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Batch Fee ($X$):</span>
                  <span className="font-bold text-slate-900">₹{selectedStudentForPay.total_fee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Already Paid ($Y$):</span>
                  <span className="font-bold text-emerald-600">₹{selectedStudentForPay.paid_amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold pt-1 border-t border-slate-200">
                  <span>Current Pending Due ($X - Y$):</span>
                  <span className="text-purple-600">₹{selectedStudentForPay.pending_amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-200">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Payment Timestamp:
                  </span>
                  <span className="font-mono text-slate-700 font-semibold">
                    {new Date().toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Enter Additional Payment Received (₹)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 4000"
                    value={additionalPayment}
                    onChange={(e) => setAdditionalPayment(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:border-violet-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Dynamic Calculation Preview */}
              {additionalPayment && Number(additionalPayment) > 0 && (
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-900 text-xs space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span>New Total Paid:</span>
                    <span>₹{(selectedStudentForPay.paid_amount + Number(additionalPayment)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>New Remaining Due:</span>
                    <span>₹{Math.max(0, selectedStudentForPay.total_fee - (selectedStudentForPay.paid_amount + Number(additionalPayment))).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] pt-1">
                    <span>New Status:</span>
                    <span className="font-bold uppercase">
                      {selectedStudentForPay.paid_amount + Number(additionalPayment) >= selectedStudentForPay.total_fee
                        ? 'Completed'
                        : 'Partial'}
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPayModalOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
