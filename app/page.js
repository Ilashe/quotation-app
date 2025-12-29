"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calculator, Download, Trash2, Plus, X } from 'lucide-react';

// Complete price data from 2025 AVW Price List
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
      "VAC-CUFFSWIVEL-150HX150T": { name: "Swivel Cuff, 1-1/2\" Vacuum Hose x 1-1/2\" Tube", price: 5.60 }
    },
    tools: {
      crevice: {
        "VAC-CREVICE-TOOL": { name: "Crevice Tool for 1-1/2\" Vacuum Hose", price: 7.80 },
        "VA3352WS": { name: "Crevice Tool Holster, Black", price: 114.00 },
        "VA5129W": { name: "Single Tool Holster Bracket", price: 241.00 }
      },
      claw: {
        "VAC-CLAW-NOZ": { name: "Claw Nozzle, 13\"Lg for 1-1/2\" Vacuum Hose", price: 7.20 },
        "VA5129WS": { name: "Claw Hanger, Two-Peg Style with PVC Flapper Valve", price: 175.00 },
        "VA5129WL": { name: "\"L\" Claw Holder Bracket", price: 63.70 }
      }
    },
    hoses: {
      "VAC-HOSE-150": { name: "1-1/2\" Black Vacuum Hose", pricePerFoot: 3.40 },
      "VAC-HOSE-2IN": { name: "2\" Black Vacuum Hose", pricePerFoot: 4.50 }
    }
  },
  tubeBends: {
    "TUBEBENDS-10IN": {
      name: "10\" Galvanized Tube, Bends & Compression Couplings",
      price: 2995.00
    }
  }
};

const VacuumQuoteCalculator = () => {
  const [rows, setRows] = useState([{ spots: 10, centralUnit: '' }]);
  const [toolPreference, setToolPreference] = useState('half');
  const [siteVoltage, setSiteVoltage] = useState('230/460');
  const [quote, setQuote] = useState(null);

  const roundToNearest50 = (num) => {
    return Math.ceil(num / 50) * 50;
  };

  const getAvailableCentralUnits = (spots) => {
    const units = priceData.centralUnits.filter(unit => {
      return spots >= unit.minBays && spots <= unit.maxBays;
    });
    
    return units.sort((a, b) => {
      const aIsDual = a.hp.includes('Dual');
      const bIsDual = b.hp.includes('Dual');
      if (aIsDual === bIsDual) return 0;
      return aIsDual ? 1 : -1;
    });
  };

  const selectWorkstation = (spotsPerRow) => {
    for (const station of priceData.workstations) {
      if (spotsPerRow >= station.minBays && spotsPerRow <= station.maxBays) {
        return station;
      }
    }
    return priceData.workstations[priceData.workstations.length - 1];
  };

  const addRow = () => {
    setRows([...rows, { spots: 10, centralUnit: '' }]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
    }
  };

  const updateRowSpots = (index, spots) => {
    const newRows = [...rows];
    newRows[index].spots = spots;
    newRows[index].centralUnit = ''; // Reset central unit when spots change
    setRows(newRows);
  };

  const updateRowCentralUnit = (index, centralUnit) => {
    const newRows = [...rows];
    newRows[index].centralUnit = centralUnit;
    setRows(newRows);
  };

  useEffect(() => {
    // Auto-select central units when spots change
    const newRows = rows.map(row => {
      if (!row.centralUnit && row.spots > 0) {
        const availableUnits = getAvailableCentralUnits(row.spots);
        if (availableUnits.length > 0) {
          return { ...row, centralUnit: availableUnits[0].partNumber };
        }
      }
      return row;
    });
    
    if (JSON.stringify(newRows) !== JSON.stringify(rows)) {
      setRows(newRows);
    }
  }, [rows]);

  const calculateQuote = () => {
    let lineItems = [];
    let totalSpots = 0;
    let totalSingleArches = 0;
    let totalDualArches = 0;
    let totalArches = 0;
    let totalDrops = 0;

    // Add central units and VFDs for each row
    rows.forEach((row, index) => {
      const centralUnit = priceData.centralUnits.find(u => u.partNumber === row.centralUnit);
      if (!centralUnit) {
        alert(`Please select a central unit for Row ${index + 1}`);
        return;
      }

      totalSpots += row.spots;
      
      // Calculate arches for this row
      const singleArchesThisRow = 2;
      const dualArchesThisRow = row.spots - 1;
      const archesThisRow = singleArchesThisRow + dualArchesThisRow;
      const dropsThisRow = (dualArchesThisRow * 2) + singleArchesThisRow;
      
      totalSingleArches += singleArchesThisRow;
      totalDualArches += dualArchesThisRow;
      totalArches += archesThisRow;
      totalDrops += dropsThisRow;

      // Add central unit
      lineItems.push({
        partNumber: centralUnit.partNumber,
        description: `${centralUnit.name} (Row ${index + 1})`,
        qty: 1,
        unitPrice: centralUnit.price,
        total: centralUnit.price
      });

      // Add VFD
      const vfd = priceData.vfdControls[centralUnit.hp]?.[siteVoltage];
      if (vfd) {
        lineItems.push({
          partNumber: vfd.partNumber,
          description: `${centralUnit.hp} - ${siteVoltage}V Outdoor VFD Control Panel (Row ${index + 1})`,
          qty: 1,
          unitPrice: vfd.price,
          total: vfd.price
        });
      }
    });

    // Add workstations
    rows.forEach((row, index) => {
      const workstation = selectWorkstation(row.spots);
      lineItems.push({
        partNumber: workstation.partNumber,
        description: `${workstation.name} (Row ${index + 1})`,
        qty: row.spots,
        unitPrice: workstation.price,
        total: workstation.price * row.spots
      });
    });

    // Add tube bends (2 per system)
    const tubeBends = priceData.tubeBends["TUBEBENDS-10IN"];
    lineItems.push({
      partNumber: "TUBEBENDS-10IN",
      description: tubeBends.name,
      qty: rows.length * 2,
      unitPrice: tubeBends.price,
      total: tubeBends.price * rows.length * 2
    });

    // Add single arches
    lineItems.push({
      partNumber: "VA5129A-1",
      description: priceData.components.arches["VA5129A-1"].name,
      qty: totalSingleArches,
      unitPrice: priceData.components.arches["VA5129A-1"].price,
      total: priceData.components.arches["VA5129A-1"].price * totalSingleArches
    });

    // Add dual arches
    lineItems.push({
      partNumber: "VA5129A-2",
      description: priceData.components.arches["VA5129A-2"].name,
      qty: totalDualArches,
      unitPrice: priceData.components.arches["VA5129A-2"].price,
      total: priceData.components.arches["VA5129A-2"].price * totalDualArches
    });

    // Add arch components
    Object.entries(priceData.components.archComponents).forEach(([key, item]) => {
      lineItems.push({
        partNumber: key,
        description: item.name,
        qty: totalArches,
        unitPrice: item.price,
        total: item.price * totalArches
      });
    });

    // Add drop components
    Object.entries(priceData.components.dropComponents).forEach(([key, item]) => {
      lineItems.push({
        partNumber: key,
        description: item.name,
        qty: totalDrops,
        unitPrice: item.price,
        total: item.price * totalDrops
      });
    });

    // Add tools based on preference
    if (toolPreference === 'half') {
      const halfDrops = totalDrops / 2;
      
      Object.entries(priceData.components.tools.crevice).forEach(([key, item]) => {
        lineItems.push({
          partNumber: key,
          description: item.name,
          qty: halfDrops,
          unitPrice: item.price,
          total: item.price * halfDrops
        });
      });

      Object.entries(priceData.components.tools.claw).forEach(([key, item]) => {
        lineItems.push({
          partNumber: key,
          description: item.name,
          qty: halfDrops,
          unitPrice: item.price,
          total: item.price * halfDrops
        });
      });
    } else if (toolPreference === 'crevice') {
      Object.entries(priceData.components.tools.crevice).forEach(([key, item]) => {
        lineItems.push({
          partNumber: key,
          description: item.name,
          qty: totalDrops,
          unitPrice: item.price,
          total: item.price * totalDrops
        });
      });
    } else if (toolPreference === 'claw') {
      Object.entries(priceData.components.tools.claw).forEach(([key, item]) => {
        lineItems.push({
          partNumber: key,
          description: item.name,
          qty: totalDrops,
          unitPrice: item.price,
          total: item.price * totalDrops
        });
      });
    }

    // Add hoses
    const hose150Length = roundToNearest50(totalDrops * 25);
    const hose2Length = roundToNearest50(totalArches * 5);

    const hose150 = priceData.components.hoses["VAC-HOSE-150"];
    lineItems.push({
      partNumber: "VAC-HOSE-150",
      description: `${hose150.name} (${hose150Length} ft)`,
      qty: hose150Length,
      unitPrice: hose150.pricePerFoot,
      total: hose150.pricePerFoot * hose150Length
    });

    const hose2 = priceData.components.hoses["VAC-HOSE-2IN"];
    lineItems.push({
      partNumber: "VAC-HOSE-2IN",
      description: `${hose2.name} (${hose2Length} ft)`,
      qty: hose2Length,
      unitPrice: hose2.pricePerFoot,
      total: hose2.pricePerFoot * hose2Length
    });

    const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);

    setQuote({
      config: {
        rows: rows.length,
        totalSpots,
        totalSingleArches,
        totalDualArches,
        totalArches,
        totalDrops,
        siteVoltage
      },
      lineItems,
      subtotal
    });
  };

  const exportQuote = () => {
    if (!quote) return;

    let csvContent = "Part Number,Description,Quantity,Unit Price,Total\n";
    quote.lineItems.forEach(item => {
      csvContent += `"${item.partNumber}","${item.description}",${item.qty},$${item.unitPrice.toFixed(2)},$${item.total.toFixed(2)}\n`;
    });
    csvContent += `\n,,,,Subtotal,$${quote.subtotal.toFixed(2)}`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vacuum-quote-${rows.length}rows.csv`;
    a.click();
  };

  const deleteLineItem = (index) => {
    const updatedLineItems = quote.lineItems.filter((_, i) => i !== index);
    const newSubtotal = updatedLineItems.reduce((sum, item) => sum + item.total, 0);
    
    setQuote({
      ...quote,
      lineItems: updatedLineItems,
      subtotal: newSubtotal
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex-shrink-0 relative">
                <Image
                  src="/avw-logo.png"   // path is from /public
                  alt="Company Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Vacuum System Quote Calculator</h1>
            </div>
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-12 gap-3 mb-3 text-sm font-medium text-gray-700">
              <div className="col-span-2">Row</div>
              <div className="col-span-3">Parking Spots</div>
              <div className="col-span-6">Central Unit</div>
              <div className="col-span-1"></div>
            </div>

            {rows.map((row, index) => {
              const availableUnits = getAvailableCentralUnits(row.spots);
              return (
                <div key={index} className="grid grid-cols-12 gap-3 mb-2 items-center">
                  <div className="col-span-2 flex items-center gap-2">
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

                  <div className="col-span-3">
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

                  <div className="col-span-6">
                    <select
                      value={row.centralUnit}
                      onChange={(e) => updateRowCentralUnit(index, e.target.value)}
                      disabled={availableUnits.length === 0}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                    >
                      {availableUnits.length === 0 ? (
                        <option value="">No units available</option>
                      ) : (
                        availableUnits.map(unit => (
                          <option key={unit.partNumber} value={unit.partNumber}>
                            {unit.partNumber} ({unit.minBays}-{unit.maxBays} spots)
                          </option>
                        ))
                      )}
                    </select>
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
              );
            })}
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