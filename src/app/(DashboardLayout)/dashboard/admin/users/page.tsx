"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Shield, 
  ShieldAlert, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  Mail,
  MapPin,
  Calendar,
  Loader2,
  RefreshCw
} from "lucide-react";
import { getAllUsers, updateUserStatus, deleteUser } from "@/services/user";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      if (res.success) {
        setUsers(res.data);
      }
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusUpdate = async (id: string, currentStatus: boolean) => {
    const newStatus = currentStatus ? "BANNED" : "ACTIVE";
    try {
      const res = await updateUserStatus(id, newStatus);
      if (res.success) {
        toast.success(`User ${newStatus === "ACTIVE" ? "activated" : "banned"} successfully`);
        fetchUsers();
      }
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user permanently?")) return;
    
    try {
      const res = await deleteUser(id);
      if (res.success) {
        toast.success("User deleted successfully");
        fetchUsers();
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "ALL" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading && users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-green-brand" />
        <p className="text-muted-foreground font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Accessing User Database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="section-label mb-2">Administration</div>
          <h1 className="text-4xl font-serif font-black text-foreground tracking-tight">
            User <em>Management</em>
          </h1>
          <p className="text-muted-foreground font-medium mt-1">Oversee all platform participants and account statuses.</p>
        </div>
        <button 
          onClick={fetchUsers}
          className="p-4 rounded-2xl bg-muted hover:bg-muted/80 transition-all border border-border"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Filters & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name, email or phone..."
            className="w-full pl-12 pr-4 py-4 rounded-[24px] bg-white dark:bg-zinc-950 border border-border focus:ring-2 focus:ring-green-brand/20 outline-none transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <select 
            className="w-full pl-10 pr-4 py-4 rounded-[24px] bg-white dark:bg-zinc-950 border border-border focus:ring-2 focus:ring-green-brand/20 outline-none transition-all font-bold text-sm appearance-none cursor-pointer"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="ALL">All Roles</option>
            <option value="FARMER">Farmers</option>
            <option value="PROVIDER">Providers</option>
            <option value="VETERINARIAN">Specialists</option>
            <option value="ADMIN">Admins</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-zinc-950 border border-border rounded-[40px] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-muted-foreground">User Profile</th>
                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Role</th>
                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Location</th>
                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Joined</th>
                <th className="p-6 font-black text-[10px] uppercase tracking-widest text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence mode="popLayout">
                {filteredUsers.map((user, index) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-muted/20 transition-all group"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center font-bold text-lg border border-border overflow-hidden group-hover:scale-110 transition-transform">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            user.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <p className="font-black text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest ${
                        user.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-500' :
                        user.role === 'PROVIDER' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-6">
                      <p className="text-sm font-bold text-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-500" />
                        {user.location || "Not specified"}
                      </p>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.isVerified ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
                        <span className="text-xs font-bold uppercase tracking-tighter">
                          {user.isVerified ? "Active" : "Banned"}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleStatusUpdate(user.id, user.isVerified)}
                          className={`p-2 rounded-xl transition-all ${
                            user.isVerified ? 'hover:bg-red-500/10 text-red-500' : 'hover:bg-green-500/10 text-green-500'
                          }`}
                          title={user.isVerified ? "Ban User" : "Activate User"}
                        >
                          {user.isVerified ? <ShieldAlert className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-2 rounded-xl hover:bg-zinc-900 hover:text-white transition-all text-muted-foreground"
                          title="Delete User"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-serif font-black text-foreground">No users found</h3>
            <p className="text-muted-foreground font-medium">Try adjusting your search or filter settings.</p>
          </div>
        )}
      </div>
    </div>
  );
}
