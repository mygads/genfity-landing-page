import React from "react";
import { useCart } from "./CartContext";

interface CartSidebarProps {
    open: boolean;
    onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ open, onClose }) => {
    const { items, removeFromCart, updateQty, clearCart } = useCart();
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 z-[99999] duration-300"
                    onClick={onClose}
                    aria-label="Tutup keranjang"
                />
            )}
            <div
                className={`fixed top-0 right-0 h-screen w-80 max-w-full bg-white dark:bg-gray-900 shadow-lg z-[100000] transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
                style={{ boxShadow: open ? "-2px 0 16px rgba(0,0,0,0.08)" : undefined }}
            >
                <div className="flex flex-col h-full overflow-y-auto">
                    <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                        <h2 className="text-lg font-bold">Keranjang</h2>
                        <button onClick={onClose} aria-label="Tutup" className="text-2xl font-bold hover:text-primary">×</button>
                    </div>
                    <div className="flex-1 p-4">
                        {items.length === 0 ? (
                            <div className="text-center text-gray-500 mt-10">Keranjang kosong</div>
                        ) : (
                            <ul>
                                {items.map((item) => (
                                    <li key={item.id} className="flex items-center mb-4 border-b pb-2 dark:border-gray-700">
                                        {item.image && (
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-3" />
                                        )}
                                        <div className="flex-1">
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-sm text-gray-500">Rp{item.price.toLocaleString()}</div>
                                            <div className="flex items-center mt-1">
                                                <button onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))} className="px-2 py-1 border rounded-l hover:bg-gray-100 dark:hover:bg-gray-800">-</button>
                                                <span className="px-3">{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2 py-1 border rounded-r hover:bg-gray-100 dark:hover:bg-gray-800">+</button>
                                            </div>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-500 hover:text-red-700" aria-label="Hapus">🗑️</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="p-4 border-t dark:border-gray-700">
                        <div className="flex justify-between font-semibold mb-3">
                            <span>Total</span>
                            <span>Rp{total.toLocaleString()}</span>
                        </div>
                        <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition mb-2" disabled={items.length === 0}>Checkout</button>
                        <button className="w-full text-sm text-gray-500 hover:text-red-500" onClick={clearCart} disabled={items.length === 0}>Kosongkan Keranjang</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartSidebar;
