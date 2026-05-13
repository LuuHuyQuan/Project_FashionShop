import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, Tag, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { Badge } from '../../components/ui/badge';
import { useCart } from '../../context/CartContext';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500000 ? 0 : 30000;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const hasItems = cartItems.length > 0;

  if (!hasItems) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Giỏ hàng của bạn</h1>
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-20">
            <div className="bg-muted p-8 rounded-full mb-6">
              <ShoppingBag size={64} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống</h2>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!
            </p>
            <a
              href="/products"
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              Tiếp tục mua sắm
              <ArrowRight size={20} />
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Giỏ hàng của bạn</h1>
      <p className="text-muted-foreground mb-8">Bạn có {cartItems.length} sản phẩm trong giỏ hàng</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="overflow-hidden hover-lift">
              <CardContent className="p-0">
                <div className="flex gap-6 p-6">
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                    <img
                      src={item.images?.[0]?.url || 'https://via.placeholder.com/300'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                        <div className="flex gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            Size: {item.selectedSize}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Màu: {item.selectedColor}
                          </Badge>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="h-8 w-8 rounded-full hover:bg-red-50 flex items-center justify-center group transition-colors"
                      >
                        <Trash2 size={18} className="text-muted-foreground group-hover:text-red-500 transition-colors" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">Số lượng:</span>
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors rounded-l-lg"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[3rem] text-center border-x">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors rounded-r-lg"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-xl">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                        <p className="text-sm text-muted-foreground">{item.price.toLocaleString('vi-VN')}đ / sản phẩm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Continue Shopping */}
          <div className="pt-4">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline underline-offset-4"
            >
              ← Tiếp tục mua sắm
            </button>
          </div>
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Tag size={16} />
                  Mã giảm giá
                </label>
                <div className="flex gap-2">
                  <Input placeholder="Nhập mã..." />
                  <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg font-medium transition-colors whitespace-nowrap">
                    Áp dụng
                  </button>
                </div>
              </div>

              <Separator />
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span className="font-medium">{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phí vận chuyển</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <Badge className="bg-green-500">Miễn phí</Badge>
                    ) : (
                      `${shipping.toLocaleString('vi-VN')}đ`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Giảm giá</span>
                  <span className="font-medium text-green-600">-{discount.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Tổng cộng</span>
                <span className="font-bold text-2xl text-primary">{total.toLocaleString('vi-VN')}đ</span>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-primary/90 transition-all hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                Thanh toán
                <ArrowRight size={20} />
              </button>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <p className="text-xs text-muted-foreground flex items-start gap-2">
                  <ShoppingBag size={14} className="mt-0.5 flex-shrink-0" />
                  Miễn phí vận chuyển cho đơn hàng từ 500.000đ
                </p>
                <p className="text-xs text-muted-foreground flex items-start gap-2">
                  <ShoppingBag size={14} className="mt-0.5 flex-shrink-0" />
                  Đổi trả miễn phí trong 30 ngày
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
