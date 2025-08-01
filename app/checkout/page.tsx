"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CreditCard, QrCode, Clock } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const [transactionId, setTransactionId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [block, setBlock] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isBefore8PM = currentTime.getHours() < 20;
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  const getDeliveryOptions = () => {
    if (isBefore8PM) {
      return {
        immediate: "Available until 9:00 PM",
        nextDay: "Next day delivery available",
        nextWeek: "Next week delivery available",
      };
    } else {
      return {
        nextDay: "Next day delivery available",
        nextWeek: "Next week delivery available",
        nextMonth: "Next month delivery available",
      };
    }
  };

  const deliveryOptions = getDeliveryOptions();

  const handlePlaceOrder = async () => {
    if (!transactionId.trim()) {
      alert("Please enter the transaction ID");
      return;
    }

    if (!/^\d{12}$/.test(transactionId.trim())) {
      alert("Transaction ID must be exactly 12 digits long");
      return;
    }

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!roomNumber.trim()) {
      alert("Please enter your room number");
      return;
    }

    if (!block.trim()) {
      alert("Please enter your block");
      return;
    }

    if (!contactNumber.trim()) {
      alert("Please enter your contact number");
      return;
    }

    if (!/^\d{10}$/.test(contactNumber.trim())) {
      alert("Contact number must be exactly 10 digits long");
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        items: state.items,
        totalPrice: state.totalPrice,
        transactionId: transactionId.trim(),
        name: name.trim(),
        roomNumber: roomNumber.trim(),
        block: block.trim(),
        contactNumber: contactNumber.trim(),
        deliveryAddress: `Boys Hostel, Manipal Bangalore - Block ${block.trim()}, Room ${roomNumber.trim()}`,
        orderTime: serverTimestamp(),
        status: "pending",
      };

      const docRef = await addDoc(collection(db, "orders"), orderData);

      alert(`Order placed successfully! Order ID: ${docRef.id}`);
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Add some items to your cart first
            </p>
            <Link href="/">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shopping
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b border-gray-100"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.imageUrl || "/icon.png"}
                          alt={item.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total Amount</span>
                      <span className="text-2xl text-green-600">
                        ₹{state.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <QrCode className="w-5 h-5 mr-2" />
                  Payment QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-white p-2 rounded-lg border-2 border-dashed border-gray-300">
                  <img
                    src="https://raw.githubusercontent.com/Shrit1401/zwappr/8a8af5d10c074ea802c126b48f45882000c8f803/public/upi.png"
                    alt="Payment QR Code"
                    className="rounded-xl w-full"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Scan this QR code to make the payment of ₹
                  {state.totalPrice.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Current Time: {currentTime.toLocaleTimeString()}</span>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Delivery Options
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(deliveryOptions).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            key === "immediate" ? "bg-green-500" : "bg-blue-500"
                          }`}
                        ></div>
                        <span className="text-sm text-blue-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Number
                  </label>
                  <Input
                    placeholder="Enter your room number"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Block
                  </label>
                  <Input
                    placeholder="Enter your block (e.g., A, B, C)"
                    value={block}
                    onChange={(e) => setBlock(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <Input
                    placeholder="Enter your 10-digit contact number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    maxLength={10}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter your 10-digit mobile number
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">
                    Delivery Details
                  </h3>
                  <div className="space-y-2 text-sm text-green-800">
                    <p>
                      <strong>Name:</strong> {name || "Not specified"}
                    </p>
                    <p>
                      <strong>Area:</strong> Boys Hostel, Manipal Bangalore
                    </p>
                    <p>
                      <strong>Room:</strong> {roomNumber || "Not specified"}
                    </p>
                    <p>
                      <strong>Block:</strong> {block || "Not specified"}
                    </p>
                    <p>
                      <strong>Contact:</strong>{" "}
                      {contactNumber || "Not specified"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction ID
                  </label>
                  <Input
                    placeholder="Enter your 12-digit transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    maxLength={12}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the 12-digit transaction ID received after payment
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">
                    Payment Instructions
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Scan the QR code to make payment</li>
                    <li>• Use UPI, Paytm, or any digital payment method</li>
                    <li>• Copy the transaction ID from your payment app</li>
                    <li>• Paste the transaction ID in the field above</li>
                    <li>• Click "Place Order" to confirm</li>
                  </ul>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={
                    isProcessing ||
                    !transactionId.trim() ||
                    !name.trim() ||
                    !roomNumber.trim() ||
                    !block.trim() ||
                    !contactNumber.trim()
                  }
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
