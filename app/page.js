"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calculator, Download, Trash2, Plus, X } from 'lucide-react';

// Complete price data from 2025 AVW Price List (verified from PDF)
const priceData = {
  centralUnits: [
    {
      partNumber: "VAC-20HP",
      name: "Eurovac III - 20HP & 30\" Sep Detail Vacuum System",
      price: 17360.00,
      minBays: 5,
      maxBays: 5,
      hp: "20HP"
    },
    {
      partNumber: "VAC-25HP",
      name: "Eurovac III - 25HP & 34\" Sep Detail Vacuum System",
      price: 19370.00,
      minBays: 6,
      maxBays: 6,
      hp: "25HP"
    },
    {
      partNumber: "VAC-30HP",
      name: "Eurovac III - 30HP & 38\" Sep Detail Vacuum System",
      price: 24213.00,
      minBays: 7,
      maxBays: 8,
      hp: "30HP"
    },
    {
      partNumber: "VAC-DUAL-15HP",
      name: "Eurovac III - Double 15HP & 38\" Sep Detail Vacuum System",
      price: 28760.00,
      minBays: 7,
      maxBays: 8,
      hp: "Dual 15HP"
    },
    {
      partNumber: "VAC-40HP",
      name: "Eurovac III - 40HP & 42\" Sep Detail Vacuum System",
      price: 28329.00,
      minBays: 9,
      maxBays: 10,
      hp: "40HP"
    },
    {
      partNumber: "VAC-DUAL-20HP",
      name: "Eurovac III - Double 20HP & 38\" Sep Detail Vacuum System",
      price: 34370.00,
      minBays: 9,
      maxBays: 10,
      hp: "Dual 20HP"
    },
    {
      partNumber: "VAC-50HP",
      name: "Eurovac III - 50HP & 42\" Sep Detail Vacuum System",
      price: 34320.00,
      minBays: 11,
      maxBays: 13,
      hp: "50HP"
    },
    {
      partNumber: "VAC-DUAL-25HP",
      name: "Eurovac III - Double 25HP & 42\" Sep Detail Vacuum System",
      price: 40545.00,
      minBays: 11,
      maxBays: 13,
      hp: "Dual 25HP"
    },
    {
      partNumber: "VAC-60HP",
      name: "Eurovac III - 60HP & 48\" Sep Detail Vacuum System",
      price: 40210.00,
      minBays: 14,
      maxBays: 15,
      hp: "60HP"
    },
    {
      partNumber: "VAC-DUAL-30HP",
      name: "Eurovac III - Double 30HP & 48\" Sep Detail Vacuum System",
      price: 48025.00,
      minBays: 14,
      maxBays: 15,
      hp: "Dual 30HP"
    },
    {
      partNumber: "VAC-DUAL-40HP",
      name: "Eurovac III Double 40 HP & 54\" Bag Separator (20-22 Drops)",
      price: 50303.00,
      minBays: 16,
      maxBays: 22,
      hp: "Dual 40HP"
    }
  ],
  vfdControls: {
    "20HP": {
      "230/460": { partNumber: "CPA-VFD-12204602", price: 9720.00 },
      "575": { partNumber: "CPA-VFD-12205752", price: 9720.00 },
      "380": { partNumber: "CPA-VFD-12203802", price: 9720.00 }
    },
    "25HP": {
      "230/460": { partNumber: "CPA-VFD-12254602", price: 11145.00 },
      "575": { partNumber: "CPA-VFD-12255752", price: 11145.00 },
      "380": { partNumber: "CPA-VFD-12253802", price: 11145.00 }
    },
    "30HP": {
      "230/460": { partNumber: "CPA-VFD-12304602", price: 12420.00 },
      "575": { partNumber: "CPA-VFD-12305752", price: 12420.00 },
      "380": { partNumber: "CPA-VFD-12303802", price: 12420.00 }
    },
    "40HP": {
      "230/460": { partNumber: "CPA-VFD-12404602", price: 13390.00 },
      "575": { partNumber: "CPA-VFD-12405752", price: 13390.00 },
      "380": { partNumber: "CPA-VFD-12403802", price: 13390.00 }
    },
    "50HP": {
      "230/460": { partNumber: "CPA-VFD-12504602", price: 16165.00 },
      "575": { partNumber: "CPA-VFD-12505752", price: 16165.00 },
      "380": { partNumber: "CPA-VFD-12503802", price: 16165.00 }
    },
    "60HP": {
      "230/460": { partNumber: "CPA-VFD-12604602", price: 18385.00 },
      "575": { partNumber: "CPA-VFD-12605752", price: 18385.00 },
      "380": { partNumber: "CPA-VFD-12603802", price: 18385.00 }
    },
    "Dual 15HP": {
      "230/460": { partNumber: "CPA-VFD-111546023", price: 18063.00 },
      "575": { partNumber: "CPA-VFD-111545753", price: 18063.00 },
      "380": { partNumber: "CPA-VFD-111543803", price: 18063.00 }
    },
    "Dual 20HP": {
      "230/460": { partNumber: "CPA-VFD-112046023", price: 19913.00 },
      "575": { partNumber: "CPA-VFD-112045753", price: 19913.00 },
      "380": { partNumber: "CPA-VFD-112043803", price: 19913.00 }
    },
    "Dual 25HP": {
      "230/460": { partNumber: "CPA-VFD-112546023", price: 21630.00 },
      "575": { partNumber: "CPA-VFD-112545753", price: 21630.00 },
      "380": { partNumber: "CPA-VFD-112543803", price: 21630.00 }
    },
    "Dual 30HP": {
      "230/460": { partNumber: "CPA-VFD-113046023", price: 25313.00 },
      "575": { partNumber: "CPA-VFD-113045753", price: 25313.00 },
      "380": { partNumber: "CPA-VFD-113043803", price: 25313.00 }
    },
    "Dual 40HP": {
      "230/460": { partNumber: "CPA-VFD-12404602", price: 13390.00 },
      "575": { partNumber: "CPA-VFD-12405752", price: 13390.00 },
      "380": { partNumber: "CPA-VFD-12403802", price: 13390.00 }
    }
  },
  workstations: [
    {
      partNumber: "SYS-050-205GAR05",
      name: "VAC-ALUM-05-WORKSTATION - Central Vac Line Kit (For 1-5 Bays)",
      price: 1330.00,
      minBays: 1,
      maxBays: 5
    },
    {
      partNumber: "SYS-050-205GAR10",
      name: "VAC-ALUM-10-WORKSTATION - Central Vac Line Kit (For 6-10 Bays)",
      price: 1371.00,
      minBays: 6,
      maxBays: 10
    },
    {
      partNumber: "SYS-050-205GAR15",
      name: "VAC-ALUM-15-WORKSTATION - Central Vac Line Kit (For 11-15 Bays)",
      price: 1555.00,
      minBays: 11,
      maxBays: 15
    },
    {
      partNumber: "SYS-050-205GAR20",
      name: "VAC-ALUM-20-WORKSTATION - Central Vac Line Kit (For 16-20 Bays)",
      price: 1650.00,
      minBays: 16,
      maxBays: 20
    }
  ],
  components: {
    arches: {
      "VA5129A-1": { name: "Single Vacuum Canopy Arch, 5\" Round Post", price: 4066.00 },
      "VA5129A-2": { name: "Dual Vacuum Canopy Arch, 5\" Round Post", price: 4153.00 }
    },
    archComponents: {
      "R-VA2476C1": { name: "Cap for Vacuum Arch, 6\" OD, UHMW", price: 114.00 },
      "VA3246S": { name: "Separator, Baffle Type, Self-Serve Vacuum", price: 1613.00 },
      "VA5129AV": { name: "Cover for Base Plate on Vacuum Arch (5\" Pipe)", price: 474.00 },
      "TS3352-30": { name: "Trash Can w/Standard Lid, 30gal., Stainless Steel", price: 1154.00 },
      "GGBTL": { name: "G&G 6FT LED Bendable Tube Light w/cable", price: 590.00 }
    },
    dropComponents: {
      "VA2567V": { name: "Vacuum Inlet Valve and 1-1/2\" Hose Connector Assembly", price: 92.20 },
      "VA6101D": { name: "6' Retractable Vacuum Hose w/Claw Tool, Black Neoprene", price: 197.00 },
      "VA6101E": { name: "6' Retractable Vacuum Hose w/Crevice Tool, Black Neoprene", price: 192.00 }
    }
  }
};

const VacuumQuoteCalculator = () => {
  const [rows, setRows] = useState([{ id: 1, spots: 5 }]);
  const [centralUnit, setCentralUnit] = useState('');
  const [siteVoltage, setSiteVoltage] = useState('230/460');
  const [toolPreference, setToolPreference] = useState('half');
  const [quote, setQuote] = useState(null);

  // Calculate total spots across all rows
  const totalSpots = rows.reduce((sum, row) => sum + row.spots, 0);

  // Get available central units based on total spots
  const getAvailableCentralUnits = (spots) => {
    return priceData.centralUnits.filter(unit => 
      spots >= unit.minBays && spots <= unit.maxBays
    );
  };

  // Update central unit when total spots change
  useEffect(() => {
    const availableUnits = getAvailableCentralUnits(totalSpots);
    if (availableUnits.length > 0 && !centralUnit) {
      setCentralUnit(availableUnits[0].partNumber);
    } else if (availableUnits.length > 0) {
      // Check if current selection is still valid
      const isValid = availableUnits.some(unit => unit.partNumber === centralUnit);
      if (!isValid) {
        setCentralUnit(availableUnits[0].partNumber);
      }
    }
  }, [totalSpots]);

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      spots: 5
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const updateRowSpots = (index, value) => {
    const newRows = [...rows];
    newRows[index].spots = value;
    setRows(newRows);
  };

  const calculateQuote = () => {
    const lineItems = [];
    const totalArches = rows.length;
    const totalDrops = totalSpots;

    // Get selected central unit
    const selectedUnit = priceData.centralUnits.find(u => u.partNumber === centralUnit);
    if (!selectedUnit) {
      alert('Please select a valid central unit');
      return;
    }

    // Add central unit (only once)
    lineItems.push({
      partNumber: selectedUnit.partNumber,
      description: selectedUnit.name,
      qty: 1,
      unitPrice: selectedUnit.price,
      total: selectedUnit.price
    });

    // Add VFD Control (only once, based on central unit HP)
    const vfdControl = priceData.vfdControls[selectedUnit.hp]?.[siteVoltage];
    if (vfdControl) {
      lineItems.push({
        partNumber: vfdControl.partNumber,
        description: `${selectedUnit.hp} - ${siteVoltage}V Outdoor VFD Control Panel`,
        qty: 1,
        unitPrice: vfdControl.price,
        total: vfdControl.price
      });
    }

    // Add piping (based on total spots)
    const piping = priceData.workstations.find(w => 
      totalSpots >= w.minBays && totalSpots <= w.maxBays
    );
    if (piping) {
      lineItems.push({
        partNumber: piping.partNumber,
        description: piping.name,
        qty: 1,
        unitPrice: piping.price,
        total: piping.price
      });
    }

    // Add arches (one per row, dual if row has more than 3 spots)
    rows.forEach((row, index) => {
      const isDual = row.spots > 3;
      const archType = isDual ? "VA5129A-2" : "VA5129A-1";
      const arch = priceData.components.arches[archType];
      
      lineItems.push({
        partNumber: archType,
        description: `${arch.name} (Row ${index + 1})`,
        qty: 1,
        unitPrice: arch.price,
        total: arch.price
      });
    });

    // Add arch components (per arch)
    Object.entries(priceData.components.archComponents).forEach(([partNum, component]) => {
      lineItems.push({
        partNumber: partNum,
        description: component.name,
        qty: totalArches,
        unitPrice: component.price,
        total: component.price * totalArches
      });
    });

    // Add drop components (per drop)
    const inletValve = priceData.components.dropComponents["VA2567V"];
    lineItems.push({
      partNumber: "VA2567V",
      description: inletValve.name,
      qty: totalDrops,
      unitPrice: inletValve.price,
      total: inletValve.price * totalDrops
    });

    // Add hoses based on tool preference
    if (toolPreference === 'half') {
      const clawCount = Math.ceil(totalDrops / 2);
      const creviceCount = totalDrops - clawCount;

      const clawHose = priceData.components.dropComponents["VA6101D"];
      lineItems.push({
        partNumber: "VA6101D",
        description: clawHose.name,
        qty: clawCount,
        unitPrice: clawHose.price,
        total: clawHose.price * clawCount
      });

      const creviceHose = priceData.components.dropComponents["VA6101E"];
      lineItems.push({
        partNumber: "VA6101E",
        description: creviceHose.name,
        qty: creviceCount,
        unitPrice: creviceHose.price,
        total: creviceHose.price * creviceCount
      });
    } else if (toolPreference === 'claw') {
      const clawHose = priceData.components.dropComponents["VA6101D"];
      lineItems.push({
        partNumber: "VA6101D",
        description: clawHose.name,
        qty: totalDrops,
        unitPrice: clawHose.price,
        total: clawHose.price * totalDrops
      });
    } else {
      const creviceHose = priceData.components.dropComponents["VA6101E"];
      lineItems.push({
        partNumber: "VA6101E",
        description: creviceHose.name,
        qty: totalDrops,
        unitPrice: creviceHose.price,
        total: creviceHose.price * totalDrops
      });
    }

    const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);

    setQuote({
      config: {
        rows: rows.length,
        totalSpots: totalSpots,
        totalArches: totalArches,
        totalDrops: totalDrops,
        centralUnit: selectedUnit.name,
        voltage: siteVoltage,
        toolPreference: toolPreference
      },
      lineItems,
      subtotal
    });
  };

  const deleteLineItem = (index) => {
    const newLineItems = quote.lineItems.filter((_, i) => i !== index);
    const newSubtotal = newLineItems.reduce((sum, item) => sum + item.total, 0);
    setQuote({
      ...quote,
      lineItems: newLineItems,
      subtotal: newSubtotal
    });
  };

  const exportQuote = () => {
    if (!quote) return;

    const csvRows = [
      ['Part Number', 'Description', 'Quantity', 'Unit Price', 'Total'],
      ...quote.lineItems.map(item => [
        item.partNumber,
        item.description,
        item.qty,
        item.unitPrice.toFixed(2),
        item.total.toFixed(2)
      ]),
      ['', '', '', 'Subtotal:', quote.subtotal.toFixed(2)]
    ];

    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vacuum-quote-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const availableUnits = getAvailableCentralUnits(totalSpots);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Vacuum System Quote Calculator</h1>
              <p className="text-gray-600">Configure your custom vacuum system</p>
            </div>
          </div>

          {/* Central Unit Selection (Single for entire quote) */}
          <div className="mb-6 p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Central Unit (Total Spots: {totalSpots})
            </label>
            <select
              value={centralUnit}
              onChange={(e) => setCentralUnit(e.target.value)}
              disabled={availableUnits.length === 0}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              {availableUnits.length === 0 ? (
                <option value="">No units available for {totalSpots} spots</option>
              ) : (
                availableUnits.map(unit => (
                  <option key={unit.partNumber} value={unit.partNumber}>
                    {unit.partNumber} ({unit.minBays}-{unit.maxBays} bays)
                  </option>
                ))
              )}
            </select>
            {availableUnits.length === 0 && (
              <p className="mt-2 text-sm text-red-600">
                Total spots ({totalSpots}) exceeds maximum capacity. Please adjust your configuration.
              </p>
            )}
          </div>

          {/* Rows Configuration */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Parking Rows Configuration</h3>
            <div className="grid grid-cols-12 gap-3 mb-3 text-sm font-medium text-gray-700">
              <div className="col-span-3">Row</div>
              <div className="col-span-8">Parking Spots</div>
              <div className="col-span-1"></div>
            </div>

            {rows.map((row, index) => (
              <div key={index} className="grid grid-cols-12 gap-3 mb-2 items-center">
                <div className="col-span-3 flex items-center gap-2">
                  <input
                    type="text"
                    value={`Row ${index + 1}`}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm"
                  />
                  {index === rows.length - 1 && (
                    <button
                      onClick={addRow}
                      className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex-shrink-0"
                      title="Add row"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="col-span-8">
                  <input
                    type="number"
                    min="2"
                    value={row.spots}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 2;
                      updateRowSpots(index, value >= 2 ? value : 2);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black text-sm"
                  />
                </div>

                <div className="col-span-1 flex justify-center">
                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(index)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                      title="Remove row"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Voltage
              </label>
              <select
                value={siteVoltage}
                onChange={(e) => setSiteVoltage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
              >
                <option value="230/460">230/460V (US Standard)</option>
                <option value="575">575V (Canada)</option>
                <option value="380">380V (Australia / Europe)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tool Preference
              </label>
              <select
                value={toolPreference}
                onChange={(e) => setToolPreference(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
              >
                <option value="half">50/50 (Crevice + Claw)</option>
                <option value="crevice">Crevice Only</option>
                <option value="claw">Claw Only</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateQuote}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Generate Quote
          </button>
        </div>

        {quote && (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Quote Summary</h2>
              <button
                onClick={exportQuote}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                Export CSV
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-indigo-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Total Rows</p>
                <p className="text-xl font-bold text-indigo-600">{quote.config.rows}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Spots</p>
                <p className="text-xl font-bold text-indigo-600">{quote.config.totalSpots}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Arches</p>
                <p className="text-xl font-bold text-indigo-600">{quote.config.totalArches}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Drops</p>
                <p className="text-xl font-bold text-indigo-600">{quote.config.totalDrops}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Part Number</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Qty</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Unit Price</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.lineItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono text-gray-800">{item.partNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.description}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-800">{item.qty}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800">${item.unitPrice.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">${item.total.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => deleteLineItem(index)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors"
                          title="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-indigo-50 border-t-2 border-indigo-200">
                    <td colSpan="4" className="px-4 py-4 text-right text-lg font-bold text-gray-800">Subtotal:</td>
                    <td colSpan="2" className="px-4 py-4 text-right text-xl font-bold text-indigo-600">${quote.subtotal.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VacuumQuoteCalculator;
