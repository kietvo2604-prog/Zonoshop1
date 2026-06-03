import { CreditCard, Wallet, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TopUpMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary neon-text text-center mb-2">CHỌN PHƯƠNG THỨC NẠP TIỀN</h1>
        <p className="text-center text-muted-foreground mb-12">Hãy chọn phương thức nạp tiền phù hợp cho bạn</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card Payment Option */}
          <button
            onClick={() => navigate("/nap-the")}
            className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 h-full neon-card-hover"
          >
            <div className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/5 transition-colors" />
            <div className="relative z-10 space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                  <CreditCard className="w-12 h-12 text-primary" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground text-center">Thẻ Cào</h2>
              <p className="text-sm text-muted-foreground text-center">Viettel, Vinaphone, Mobifone, Garena</p>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-primary">Ưu điểm:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>✓ Chiết khấu -20%</li>
                  <li>✓ Tự động 24/7</li>
                  <li>✓ Rút ngay</li>
                </ul>
              </div>

              <div className="pt-2">
                <span className="inline-block px-3 py-1.5 bg-primary/20 text-primary text-xs font-bold rounded-full">Nạp ngay →</span>
              </div>
            </div>
          </button>

          {/* Bank Transfer Option */}
          <button
            onClick={() => navigate("/nap-tien")}
            className="group relative bg-card border border-border rounded-2xl p-8 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10 h-full neon-card-hover"
          >
            <div className="absolute inset-0 rounded-2xl bg-accent/0 group-hover:bg-accent/5 transition-colors" />
            <div className="relative z-10 space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-accent/10 rounded-2xl group-hover:bg-accent/20 transition-colors">
                  <Wallet className="w-12 h-12 text-accent" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground text-center">ATM / Ví Điện Tử</h2>
              <p className="text-sm text-muted-foreground text-center">Ngân hàng hoặc ví điện tử (ZaloPay)</p>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-accent">Ưu điểm:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>✓ Bonus +5-10%</li>
                  <li>✓ Tự động 24/7</li>
                  <li>✓ Không cần quẹt thẻ</li>
                </ul>
              </div>

              <div className="pt-2">
                <span className="inline-block px-3 py-1.5 bg-accent/20 text-accent text-xs font-bold rounded-full">Nạp ngay →</span>
              </div>
            </div>
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            Lưu ý quan trọng
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Tất cả giao dịch được xử lý tự động 24/7 không cần chờ duyệt</li>
            <li>• Kiểm tra lịch sử nạp tiền để cập nhật trạng thái giao dịch</li>
            <li>• Nếu gặp sự cố, liên hệ hỗ trợ qua Discord: dsc.gg/ZonoShop</li>
            <li>• Tất cả các phương thức nạp đều an toàn và được bảo vệ</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TopUpMenu;
