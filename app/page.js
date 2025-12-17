"use client";
import React, { useState, useEffect } from 'react';
import { Trash2, Download } from 'lucide-react';

const inputStyles = `
  input, textarea, select {
    color: black !important;
  }
  input::placeholder, textarea::placeholder {
    color: #999 !important;
  }
`;

export default function page() {
  // Pre-defined items in backend
  const backendItems = [
    {
      id: 1,
      name: 'CPA-SMAS9806437',
      description: '20HP - 460V On/Off Starter',
      price: 786.00
    },
    {
      id: 2,
      name: 'CPA-VFD11204602',
      description: '20HP - 460V Indoor VFD Control Panel',
      price: 7740.00
    },
    {
      id: 3,
      name: 'CPA-VFD12204602',
      description: '20HP - 460V Outdoor VFD Control Panel',
      price: 9720.00
    },
    {
      id: 4,
      name: 'CPA-SMAS9919285',
      description: '20HP - 208V On/Off Control Panel ',
      price: 1299.00
    },
    {
      id: 5,
      name: 'CPA-VFD11202302',
      description: '20HP - 208V Indoor VFD Control Panel',
      price: 8215.00
    }
    {
      id: 6,
      name: 'CPA-VFD12202302',
      description: '20HP - 208V Outdoor VFD Control Panel',
      price: 10370.00
    }
  ];

  const [quotation, setQuotation] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Load data from storage on mount
  useEffect(() => {
    try {
      const savedData = window.localStorage.getItem('quotationData');
      if (savedData) {
        const { quotation: savedQuotation } = JSON.parse(savedData);
        setQuotation(savedQuotation || []);
      }
    } catch (err) {
      console.log('Could not load saved data');
    }
  }, []);

  // Save data whenever quotation changes
  useEffect(() => {
    try {
      window.localStorage.setItem('quotationData', JSON.stringify({ quotation }));
    } catch (err) {
      console.log('Could not save data');
    }
  }, [quotation]);

  const handleAddToQuotation = () => {
    if (!selectedItem || !quantity) {
      alert('Please select an item and enter quantity');
      return;
    }

    const item = backendItems.find(i => i.id === parseInt(selectedItem));
    if (!item) return;

    const quotationItem = {
      id: Date.now(),
      itemId: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: parseInt(quantity),
      total: item.price * parseInt(quantity)
    };

    setQuotation([...quotation, quotationItem]);
    setSelectedItem('');
    setQuantity('');
    setSearchTerm('');
  };

  const handleRemoveFromQuotation = (id) => {
    setQuotation(quotation.filter(item => item.id !== id));
  };

  const handleExport = () => {
    let csv = 'QUOTATION REPORT\n';
    csv += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    csv += 'QUOTATION ITEMS\n';
    csv += 'Number,Item Name,Description,Price,Quantity,Total\n';
    
    quotation.forEach((item, index) => {
      csv += `${index + 1},"${item.name}","${item.description}",${item.price.toFixed(2)},${item.quantity},${item.total.toFixed(2)}\n`;
    });
    
    csv += '\n\n';
    csv += `GRAND TOTAL,,,,,${grandTotal.toFixed(2)}\n`;
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `quotation-${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all quotations?')) {
      setQuotation([]);
    }
  };

  const grandTotal = quotation.reduce((sum, item) => sum + item.total, 0);

  const filteredItems = backendItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <style>{inputStyles}</style>

      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-light text-gray-900">Quotation Builder</h1>
              <p className="text-sm text-gray-500 mt-1">Create and manage your quotations</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <Download size={16} /> Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Build Quotation */}
          <div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Build Quotation</h2>

              <div className="space-y-4 mb-6 p-4 border border-gray-200 rounded bg-gray-50">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Service</label>
                  <input
                    type="text"
                    placeholder="Search by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:outline-none focus:border-gray-500 mb-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Service</label>
                  <select
                    value={selectedItem}
                    onChange={(e) => {
                      setSelectedItem(e.target.value);
                      setSearchTerm('');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:outline-none focus:border-gray-500"
                  >
                    <option value="">Choose a service</option>
                    {filteredItems.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} — ${item.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="1"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:outline-none focus:border-gray-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={handleAddToQuotation}
                      className="w-full px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quotation Table */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Quotation Items</h3>
              {quotation.length === 0 ? (
                <div className="border border-gray-200 rounded p-8 text-center">
                  <p className="text-sm text-gray-500">Add items to create quotation</p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">#</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Service</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-900">Price</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-900">Qty</th>
                        <th className="px-4 py-3 text-right font-semibold text-gray-900">Total</th>
                        <th className="px-4 py-3 text-center font-semibold text-gray-900">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotation.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-900">{index + 1}</td>
                          <td className="px-4 py-3 text-gray-900 font-medium">{item.name}</td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{item.description}</td>
                          <td className="px-4 py-3 text-right text-gray-900">${item.price.toFixed(2)}</td>
                          <td className="px-4 py-3 text-center text-gray-900">{item.quantity}</td>
                          <td className="px-4 py-3 text-right text-gray-900 font-semibold">${item.total.toFixed(2)}</td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleRemoveFromQuotation(item.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Totals */}
                  <div className="bg-gray-50 border-t border-gray-200 px-4 py-4">
                    <div className="flex justify-end">
                      <div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600 mb-2">Subtotal</p>
                          <p className="text-lg font-semibold text-gray-900">${grandTotal.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {quotation.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="mt-4 text-sm text-gray-500 hover:text-red-600 transition"
                >
                  Clear quotation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}