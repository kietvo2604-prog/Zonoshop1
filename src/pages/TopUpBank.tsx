import { useState, useEffect } from "react";
import { Wallet, Smartphone, Gift, Copy, CheckCircle, Clock, History, Loader2 } from "lucide-react";
import zalopayQR from "@/assets/zalopay-qr.png";
import mbbankQR from "@/assets/mbbank-qr.png";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const banks: { name: string; number: string; holder: string; qr?: string }[] = [
  { name: "MB Bank", number: "0987672604", holder: "VO ANH KIET", qr: mbbankQR },
  { name: "BV Bank", number: "99ZP25275M36980652", holder: "ZALOPAY_VO ANH KIET" },
];

const eWallets = [
  { name: "ZaloPay", number: "0987672604", holder: "VO ANH KIET", hasQR: true },
];

type TopupRequest = {
  id: string;
  amount: number;
  method: string;
  status: string;
  note: string | null;
  created_at: string;
};

const TopUpBank = () => {
  const { user } = useAuth();
  const [copiedField, setCopiedField] = useState("");
  const [transferCode, setTransferCode] = useState<string | null>(null);
  const [recentTopups, setRecentTopups] = useState<TopupRequest[]>([]);
  const [loadingTopups, setLoadingTopups] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setLoadingTopups(true);
      const [profileRes, topupRes] = await Promise.all([
        supabase.from("profiles").select("transfer_code").eq("user_id", user.id).single(),
        supabase
          .from("topup_requests")
          .select("*")
          .eq("user_id", user.id)
          .or("method.eq.Ngân hàng,method.eq.Ví điện tử")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);
      setTransferCode(profileRes.data?.transfer_code || null);
      setRecentTopups(topupRes.data || []);
      setLoadingTopups(false);
    };
    fetchData();
  }, [user]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border bg-accent/10 border-accent/30 text-accent">
            <Clock className="w-3 h-3" /> Chờ xử lý
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border bg-primary/10 border-primary/30 text-primary">
            <CheckCircle className="w-3 h-3" /> Đã duyệt
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border bg-destructive/10 border-destructive/30 text-destructive">
            ✕ Từ chối
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-primary neon-text text-center">NẠP TIỀN BẰNG ATM / VÍ ĐIỆN TỬ</h1>
        <p className="text-center text-muted-foreground text-sm">Chuyển khoản ngân hàng hoặc ví điện tử — Tự động 24/7</p>

        <Link
          to="/nap-tien"
          className="inline-flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg hover:bg-border transition-colors text-sm text-muted-foreground hover:text-foreground"
        >
          ← Quay lại
        </Link>

        {/* Promotion Banner */}
        <div className="gradient-accent rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gift className="w-8 h-8 text-accent-foreground" />
            <div>
              <p className="font-bold text-accent-foreground">ƯU ĐÃI KHI NẠP ATM</p>
              <p className="text-sm text-accent-foreground/80">Nạp dưới 50k → +10% bonus. Từ 50k trở lên → +5% bonus!</p>
            </div>
          </div>
          <span className="font-display text-2xl font-bold text-accent-foreground">+10%</span>
        </div>

        {/* E-wallets */}
        <div className="bg-card border border-border rounded-xl p-6 neon-card space-y-4">
          <div className="flex items-center gap-2 justify-center">
            <Smartphone className="w-6 h-6 text-neon-cyan" />
            <h2 className="font-display text-lg font-bold text-secondary neon-cyan-text">VÍ ĐIỆN TỬ</h2>
          </div>
          <div className="flex flex-col items-center gap-3">
            {eWallets.map((w) => (
              <div key={w.name} className="bg-muted border border-border rounded-lg p-4 text-center w-full">
                <p className="font-bold text-foreground mb-1">{w.name}</p>
                {w.hasQR && (
                  <div className="my-3 flex justify-center">
                    <img src={zalopayQR} alt="ZaloPay QR" className="w-64 h-64 rounded-lg border border-border object-contain bg-white" />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground font-mono">{w.number || "Chưa cập nhật"}</span>
                  {w.number && (
                    <button onClick={() => handleCopy(w.number, w.name)} className="flex items-center gap-1 text-primary hover:text-primary/80 text-xs">
                      {copiedField === w.name ? (
                        <>
                          <CheckCircle className="w-3 h-3" /> Đã copy
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
                {w.holder && <p className="text-xs text-muted-foreground mt-1">Chủ TK: {w.holder}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Bank accounts */}
        <div className="bg-card border border-border rounded-xl p-6 neon-card space-y-4">
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-neon-cyan" />
            <h2 className="font-display text-lg font-bold text-secondary neon-cyan-text">CHUYỂN KHOẢN NGÂN HÀNG</h2>
          </div>
          <div className="space-y-3">
            {banks.map((bank) => (
              <div key={bank.name} className="bg-muted border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-foreground">{bank.name}</span>
                </div>
                {bank.qr && (
                  <div className="my-3 flex justify-center">
                    <img src={bank.qr} alt={`${bank.name} QR`} className="w-64 h-64 rounded-lg border border-border object-contain bg-white" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">STK: </span>
                    <span className="text-foreground font-mono">{bank.number}</span>
                  </div>
                  <button onClick={() => handleCopy(bank.number, bank.name)} className="flex items-center gap-1 text-primary hover:text-primary/80 text-xs justify-end">
                    {copiedField === bank.name ? (
                      <>
                        <CheckCircle className="w-3 h-3" /> Đã copy
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy STK
                      </>
                    )}
                  </button>
                </div>
                {bank.holder && <p className="text-xs text-muted-foreground mt-1">Chủ TK: {bank.holder}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Transfer note with unique code */}
        <div className="bg-card border border-border rounded-xl p-6 neon-card">
          <h3 className="font-bold text-foreground mb-3">📌 Nội dung chuyển khoản</h3>
          {transferCode ? (
            <div className="bg-muted border border-primary/30 rounded-lg p-4 flex items-center justify-between">
              <code className="text-primary font-mono text-lg font-bold">{transferCode}</code>
              <button onClick={() => handleCopy(transferCode, "content")} className="flex items-center gap-1 text-primary hover:text-primary/80 text-xs">
                {copiedField === "content" ? (
                  <>
                    <CheckCircle className="w-3 h-3" /> Đã copy
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="bg-muted border border-border rounded-lg p-4 text-center">
              <p className="text-muted-foreground text-sm">Vui lòng đăng nhập để xem mã nội dung chuyển khoản của bạn.</p>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-3">
            ⚠️ Mỗi tài khoản có một mã riêng. Vui lòng ghi đúng nội dung chuyển khoản để hệ thống tự động cộng tiền.
          </p>
        </div>

        {/* Recent Top-up History */}
        {user && (
          <div className="bg-card border border-border rounded-xl p-6 neon-card space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-foreground">Lịch sử nạp gần đây (Ngân hàng)</h3>
              </div>
              <Link to="/lich-su-nap" className="text-xs text-primary hover:underline">
                Xem tất cả →
              </Link>
            </div>
            {loadingTopups ? (
              <div className="flex justify-center py-6">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            ) : recentTopups.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Chưa có lịch sử nạp bằng ngân hàng</p>
            ) : (
              <div className="space-y-2">
                {recentTopups.map((topup) => (
                  <div key={topup.id} className="bg-muted border border-border rounded-lg p-3 flex items-center justify-between text-sm">
                    <div>
                      <p className="font-semibold text-foreground">{topup.method}</p>
                      <p className="text-xs text-muted-foreground">{new Date(topup.created_at).toLocaleString("vi-VN")}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{topup.amount.toLocaleString("vi-VN")}đ</p>
                      {statusBadge(topup.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TopUpBank;
