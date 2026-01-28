import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { LogOut, Package, RefreshCw, Trash2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Order = Database['public']['Tables']['orders']['Row'];
type OrderStatus = Database['public']['Enums']['order_status'];

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
  confirmed: "bg-blue-500/20 text-blue-600 border-blue-500/30",
  shipped: "bg-purple-500/20 text-purple-600 border-purple-500/30",
  delivered: "bg-green-500/20 text-green-600 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-600 border-red-500/30",
};

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, isLoading, navigate]);

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load orders");
      console.error(error);
    } else {
      setOrders(data || []);
    }
    setIsLoadingOrders(false);
  };

  useEffect(() => {
    if (user && isAdmin) {
      fetchOrders();
    }
  }, [user, isAdmin]);

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      toast.error("Failed to update order");
      console.error(error);
    } else {
      toast.success("Order updated!");
      fetchOrders();
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId);

    if (error) {
      toast.error("Failed to delete order");
      console.error(error);
    } else {
      toast.success("Order deleted!");
      fetchOrders();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Orders</h2>
            <p className="text-muted-foreground">Manage customer orders</p>
          </div>
          <Button onClick={fetchOrders} variant="outline" className="gap-2">
            <RefreshCw className={`w-4 h-4 ${isLoadingOrders ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {(Object.keys(statusLabels) as OrderStatus[]).map((status) => {
            const statusOrders = orders.filter(o => o.status === status);
            const statusTotal = statusOrders.reduce((sum, o) => sum + o.total, 0);
            return (
              <div key={status} className={`glass-card p-4 rounded-xl border-l-4 ${
                status === 'delivered' ? 'border-l-green-500' : 
                status === 'pending' ? 'border-l-yellow-500' : 
                status === 'cancelled' ? 'border-l-red-500' : 
                status === 'shipped' ? 'border-l-purple-500' : 'border-l-blue-500'
              }`}>
                <div className="text-2xl font-bold">
                  {statusOrders.length}
                </div>
                <div className="text-sm text-muted-foreground">{statusLabels[status]}</div>
                <div className="text-lg font-semibold text-primary mt-1">
                  ৳{statusTotal.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Orders Table */}
        <div className="glass-card rounded-xl overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingOrders ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
                    No orders yet
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString('bn-BD')}
                    </TableCell>
                    <TableCell className="font-medium">{order.name}</TableCell>
                    <TableCell>{order.phone}</TableCell>
                    <TableCell className="min-w-[200px] max-w-[300px]">
                      <div className="whitespace-pre-wrap break-words">{order.address}</div>
                    </TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell className="font-bold">৳{order.total}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className={`font-medium ${
                          (order as any).payment_method === 'bkash' ? 'text-pink-600' : 
                          (order as any).payment_method === 'nagad' ? 'text-orange-600' : 
                          'text-green-600'
                        }`}>
                          {(order as any).payment_method === 'cod' ? 'COD' : 
                           (order as any).payment_method === 'bkash' ? 'bKash' : 
                           (order as any).payment_method === 'nagad' ? 'Nagad' : 'COD'}
                        </span>
                        {(order as any).payment_phone && (
                          <div className="text-xs text-muted-foreground">
                            {(order as any).payment_phone}
                          </div>
                        )}
                        {(order as any).payment_trxid && (
                          <div className="text-xs text-muted-foreground">
                            TrxID: {(order as any).payment_trxid}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) => updateOrderStatus(order.id, value as OrderStatus)}
                      >
                        <SelectTrigger className={`w-32 ${statusColors[order.status]}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(statusLabels) as OrderStatus[]).map((status) => (
                            <SelectItem key={status} value={status}>
                              {statusLabels[status]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteOrder(order.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
