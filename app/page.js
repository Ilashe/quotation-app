"use client";
import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Download, Upload } from 'lucide-react';

const inputStyles = `
  input, textarea, select {
    color: black !important;
  }
  input::placeholder, textarea::placeholder {
    color: #999 !important;
  }
`;

export default function page() {
  const [items, setItems] = useState([]);
  const [quotation, setQuotation] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');

  // Load data from storage on mount
  useEffect(() => {
    try {
      const savedData = window.localStorage.getItem('quotationData');
      if (savedData) {
        const { items: savedItems, quotation: savedQuotation } = JSON.parse(savedData);
        setItems(savedItems || []);
        setQuotation(savedQuotation || []);
      }
    } catch (err) {
      console.log('Could not load saved data');
    }
  }, []);

  // Save data whenever items or quotation changes
  useEffect(() => {
    try {
      window.localStorage.setItem('quotationData', JSON.stringify({ items, quotation }));
    } catch (err) {
      console.log('Could not save data');
    }
  }, [items, quotation]);

  const handleAddItem = () => {
    if (formData.name && formData.description && formData.price) {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price)
      };
      setItems([...items, newItem]);
      setFormData({ name: '', description: '', price: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleAddToQuotation = () => {
    if (!selectedItem || !quantity) {
      alert('Please select an item and enter quantity');
      return;
    }

    const item = items.find(i => i.id === parseInt(selectedItem));
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
  };

  const handleRemoveFromQuotation = (id) => {
    setQuotation(quotation.filter(item => item.id !== id));
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleExport = () => {
    // Create CSV content
    let csv = 'QUOTATION REPORT\n';
    csv += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    csv += 'QUOTATION ITEMS\n';
    csv += 'Number,Item Name,Description,Price,Quantity,Total\n';
    
    quotation.forEach((item, index) => {
      csv += `${index + 1},"${item.name}","${item.description}",${item.price.toFixed(2)},${item.quantity},${item.total.toFixed(2)}\n`;
    });
    
    csv += '\n\n';
    csv += `GRAND TOTAL,,,,,${grandTotal.toFixed(2)}\n`;
    
    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `quotation-${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setItems(data.items || []);
        setQuotation(data.quotation || []);
        alert('Data imported successfully!');
      } catch (err) {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      setItems([]);
      setQuotation([]);
    }
  };

  const grandTotal = quotation.reduce((sum, item) => sum + item.total, 0);

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
              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer">
                <Upload size={16} /> Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Item Registry */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Add Items</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Web Design"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:outline-none focus:border-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Details about the item"
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:outline-none focus:border-gray-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">$</span>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      step="0.01"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm text-black focus:outline-none focus:border-gray-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddItem}
                  className="w-full px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition"
                >
                  Add Item
                </button>
              </div>
            </div>

            {/* Items List */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Inventory ({items.length})</h3>
              <div className="space-y-2">
                {items.length === 0 ? (
                  <p className="text-sm text-gray-500 py-4">No items yet</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="p-3 border border-gray-200 rounded text-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                          <p className="text-sm font-medium text-gray-900 mt-2">${item.price.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="ml-3 p-1 text-gray-400 hover:text-red-600 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right: Quotation */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Build Quotation</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Item</label>
                  <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black focus:outline-none focus:border-gray-500"
                  >
                    <option value="">Choose an item</option>
                    {items.map((item) => (
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
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Item</th>
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