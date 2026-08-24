import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Search, Mail, Calendar, User, FileText, RefreshCw, CheckCircle2, AlertCircle, Send, LogOut } from 'lucide-react';
import { signInWithGmail, sendFormSubmissionViaGmail, logoutGmail, initGmailAuth } from '../lib/gmail';
import { User as FirebaseUser } from 'firebase/auth';

interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  date: string;
  deliveredViaGmail?: boolean;
}

export const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Gmail OAuth State
  const [gmailUser, setGmailUser] = useState<FirebaseUser | null>(null);
  const [gmailToken, setGmailToken] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initGmailAuth((user, token) => {
      setGmailUser(user);
      setGmailToken(token);
    }, () => {
      setGmailUser(null);
      setGmailToken(null);
    });
    return () => unsubscribe();
  }, []);

  const handleGmailConnect = async () => {
    setIsConnecting(true);
    setTestStatus(null);
    try {
      const res = await signInWithGmail();
      setGmailUser(res.user);
      setGmailToken(res.accessToken);
    } catch (err: any) {
      setTestStatus(`Gmail OAuth Error: ${err.message || 'Failed to authenticate'}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleGmailDisconnect = async () => {
    await logoutGmail();
    setGmailUser(null);
    setGmailToken(null);
    setTestStatus(null);
  };

  const handleSendTestEmail = async () => {
    if (!gmailToken) {
      setTestStatus('Please connect Gmail account first.');
      return;
    }
    setTestStatus('Sending test submission via Gmail API...');
    try {
      await sendFormSubmissionViaGmail(
        gmailToken,
        {
          name: 'Admin Test Runner',
          email: gmailUser?.email || 'admin@reliabilityiq.com',
          service: 'Gmail Integration Test',
          details: 'This is a test form submission verified via the ReliabilityIQ Admin Dashboard.',
          subject: '[ReliabilityIQ] Gmail Integration Test Dispatch'
        },
        'reliabilityiqventures@gmail.com'
      );
      setTestStatus('Success! Test email sent to reliabilityiqventures@gmail.com via Gmail API.');
    } catch (err: any) {
      setTestStatus(`Failed to send test email: ${err.message}`);
    }
  };

  const fetchLeads = async (pass: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/leads', {
        headers: {
          'Authorization': pass
        }
      });
      if (!response.ok) throw new Error('Unauthorized');
      const data = await response.json();
      setLeads(data.leads.reverse()); // Show newest first
      setIsAuthenticated(true);
      setError('');
    } catch (err) {
      setError('Invalid admin password');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads(password);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pt-24 px-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bg-card border border-border-primary p-8 rounded-2xl shadow-xl w-full max-w-md"
        >
          <div className="flex justify-center mb-6 text-accent">
            <Lock size={48} />
          </div>
          <h2 className="text-2xl font-semibold text-text-primary text-center mb-2">Admin Access</h2>
          <p className="text-text-secondary text-center mb-6 text-sm">Please enter the administrative password to view captured leads.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (hint: admin123)"
                className="w-full bg-bg-primary border border-border-primary rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 text-white rounded-lg py-3 font-medium transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw size={20} className="animate-spin" /> : 'Access Dashboard'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 relative z-20 bg-bg-primary">
      <div className="max-w-6xl mx-auto">
        {/* Gmail API Integration Control Center */}
        <div className="mb-8 p-6 bg-bg-card border border-border-primary rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 text-accent rounded-xl">
                <Mail size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  Gmail Form Submission Integration
                  {gmailUser ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-mono font-normal">
                      <CheckCircle2 size={12} /> Connected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-mono font-normal">
                      <AlertCircle size={12} /> Disconnected
                    </span>
                  )}
                </h2>
                <p className="text-sm text-text-secondary mt-1 max-w-xl">
                  {gmailUser 
                    ? `Authenticated as ${gmailUser.email}. All website form submissions and leads will be dispatched directly to your Gmail inbox.`
                    : 'Connect your Google/Gmail account to receive website inquiries directly in your inbox via the Gmail API.'
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap shrink-0">
              {gmailUser ? (
                <>
                  <button
                    onClick={handleSendTestEmail}
                    className="px-4 py-2.5 rounded-xl bg-accent text-bg-primary font-bold text-xs flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Send size={14} /> Send Test Dispatch
                  </button>
                  <button
                    onClick={handleGmailDisconnect}
                    className="px-4 py-2.5 rounded-xl bg-bg-primary border border-border-primary text-text-secondary font-medium text-xs flex items-center gap-2 hover:text-red-400 hover:border-red-400/40 transition-colors"
                  >
                    <LogOut size={14} /> Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={handleGmailConnect}
                  disabled={isConnecting}
                  className="px-5 py-2.5 rounded-xl bg-accent text-bg-primary font-bold text-xs flex items-center gap-2.5 hover:opacity-90 transition-all shadow-md"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#ffffff" opacity="0.8" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  </svg>
                  <span>{isConnecting ? 'Authenticating...' : 'Sign in with Google'}</span>
                </button>
              )}
            </div>
          </div>

          {testStatus && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl bg-bg-primary border border-border-primary text-xs font-mono text-text-secondary flex items-center justify-between"
            >
              <span>{testStatus}</span>
              <button onClick={() => setTestStatus(null)} className="text-text-secondary hover:text-text-primary">✕</button>
            </motion.div>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Lead Activity</h1>
            <p className="text-text-secondary">Overview of all inquiries captured by the AI Chatbot.</p>
          </div>
          <button 
            onClick={() => fetchLeads(password)}
            className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border-primary rounded-lg hover:border-accent text-text-primary transition-colors"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh Data
          </button>
        </div>

        <div className="bg-bg-card border border-border-primary rounded-xl overflow-hidden shadow-sm">
          {leads.length === 0 ? (
            <div className="p-12 text-center text-text-secondary flex flex-col items-center">
              <Search size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium text-text-primary">No leads captured yet.</p>
              <p>Test the chatbot in the bottom right to generate a lead.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-bg-primary border-b border-border-primary text-text-secondary text-sm">
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Contact Details</th>
                    <th className="px-6 py-4 font-medium">Service Interest</th>
                    <th className="px-6 py-4 font-medium">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-primary">
                  {leads.map((lead) => (
                    <motion.tr 
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-bg-primary/50 transition-colors"
                    >
                      <td className="px-6 py-4 align-top whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-text-primary">
                          <Calendar size={14} className="text-text-secondary" />
                          {new Date(lead.date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-text-secondary ml-6 mt-1">
                          {new Date(lead.date).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top">
                        <div className="flex items-center gap-2 text-sm font-medium text-text-primary mb-1">
                          <User size={14} className="text-accent" />
                          {lead.name}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                          <Mail size={14} />
                          <a href={`mailto:${lead.email}`} className="hover:text-accent transition-colors">{lead.email}</a>
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lead.service !== 'N/A' ? 'bg-accent/10 text-accent' : 'bg-bg-primary text-text-secondary border border-border-primary'}`}>
                          {lead.service}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-top">
                        <div className="flex gap-2">
                          <FileText size={14} className="text-text-secondary shrink-0 mt-0.5" />
                          <p className="text-sm text-text-primary line-clamp-3 hover:line-clamp-none transition-all duration-300 max-w-md">
                            {lead.message || <span className="text-text-secondary italic">No message provided.</span>}
                          </p>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
