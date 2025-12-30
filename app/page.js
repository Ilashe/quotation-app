"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calculator, Download, Trash2, Plus, X, Info } from 'lucide-react';

// Complete price data
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
      maxBays: 10,
      hp: "30HP",
      quantity: 2
    },
    {
      partNumber: "VAC-DUAL-15HP",
      name: "Eurovac III - Double 15HP & 38\" Sep Detail Vacuum System",
      price: 28760.00,
      minBays: 7,
      maxBays: 8,
      hp: "Dual 15HP",
      quantity: 1
    },
    {
      partNumber: "VAC-40HP",
      name: "Eurovac III - 40HP & 42\" Sep Detail Vacuum System",
      price: 28329.00,
      minBays: 9,
      maxBays: 10,
      hp: "40HP",
      quantity: 1
    },
    {
      partNumber: "VAC-DUAL-20HP",
      name: "Eurovac III - Double 20HP & 38\" Sep Detail Vacuum System",
      price: 34370.00,
      minBays: 9,
      maxBays: 10,
      hp: "Dual 20HP",
      quantity: 1
    },
    {
      partNumber: "VAC-50HP",
      name: "Eurovac III - 50HP & 42\" Sep Detail Vacuum System",
      price: 34320.00,
      minBays: 11,
      maxBays: 13,
      hp: "50HP",
      quantity: 1
    },
    {
      partNumber: "VAC-DUAL-25HP",
      name: "Eurovac III - Double 25HP & 42\" Sep Detail Vacuum System",
      price: 40545.00,
      minBays: 11,
      maxBays: 13,
      hp: "Dual 25HP",
      quantity: 1
    },
    {
      partNumber: "VAC-60HP",
      name: "Eurovac III - 60HP & 48\" Sep Detail Vacuum System",
      price: 40210.00,
      minBays: 14,
      maxBays: 15,
      hp: "60HP",
      quantity: 1
    },
    {
      partNumber: "VAC-DUAL-30HP",
      name: "Eurovac III - Double 30HP & 48\" Sep Detail Vacuum System",
      price: 48025.00,
      minBays: 14,
      maxBays: 15,
      hp: "Dual 30HP",
      quantity: 1
    },
    {
      partNumber: "VAC-DUAL-40HP",
      name: "Eurovac III Double 40 HP & 54\" Bag Separator",
      price: 50303.00,
      minBays: 16,
      maxBays: 22,
      hp: "Dual 40HP",
      quantity: 1
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
  workstations: {
    "VAC-ALUM-05": { 
      partNumber: "SYS-050-205GAR05",
      name: "VAC-ALUM-05-WORKSTATION - Central Vac Line Kit", 
      minBays: 1, 
      maxBays: 5,
      price: 1331.00 
    },
    "VAC-ALUM-10": { 
      partNumber: "SYS-050-205GAR10",
      name: "VAC-ALUM-10-WORKSTATION - Central Vac Line Kit", 
      minBays: 6, 
      maxBays: 10,
      price: 1371.00 
    },
    "VAC-ALUM-15": { 
      partNumber: "SYS-050-205GAR15",
      name: "VAC-ALUM-15-WORKSTATION - Central Vac Line Kit", 
      minBays: 11, 
      maxBays: 15,
      price: 1441.00 
    },
    "VAC-ALUM-20": { 
      partNumber: "SYS-050-205GAR20",
      name: "VAC-ALUM-20-WORKSTATION - Central Vac Line Kit", 
      minBays: 16, 
      maxBays: 20,
      price: 1522.00 
    }
  },
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
      "VA3223": { name: "Swivel Cuff", price: 15.40 }
    },
    tools: {
      crevice: {
        "VA2482": { name: "Crevice Tool", price: 7.80 },
        "VA2482H": { name: "Crevice Tool Holster", price: 114.00 },
        "VA2482B": { name: "Single Tool Holster Bracket", price: 241.00 }
      },
      claw: {
        "VA2481": { name: "Claw Nozzle", price: 7.20 },
        "VA2481H": { name: "Claw Hanger", price: 175.00 },
        "VA2481B": { name: "Claw Holder Bracket", price: 63.70 }
      }
    },
    hoses: {
      "VA6101-1.5": { name: "1-1/2\" Vacuum Hose (per foot)", price: 3.40 },
      "VA6101-2": { name: "2\" Vacuum Hose (per foot)", price: 4.50 }
    }
  }
};

const VacuumQuoteCalculator = () => {
  const [rows, setRows] = useState([{ id: 1, spots: 5 }]);
  const [centralUnit, setCentralUnit] = useState('');
  const [siteVoltage, setSiteVoltage] = useState('230/460');
  const [toolPreference, setToolPreference] = useState('half');
  const [quote, setQuote] = useState(null);

  // Calculate total arches across all rows
  const calculateTotalArches = () => {
    return rows.reduce((total, row) => {
      if (!row.spots || row.spots === '') return total;
      // For each row: 2 single arches (beginning and end) + (spots - 1) dual arches
      const dualArches = row.spots > 1 ? row.spots - 1 : 0;
      return total + 2 + dualArches; // 2 single + dual arches
    }, 0);
  };

  // Calculate drops per row
  const calculateDropsPerRow = (spots) => {
    if (!spots || spots === '') return 0;
    // Drops = (dual arches * 2) + single arches
    const dualArches = spots > 1 ? spots - 1 : 0;
    const singleArches = 2;
    return (dualArches * 2) + singleArches;
  };

  // Calculate total drops
  const calculateTotalDrops = () => {
    return rows.reduce((total, row) => {
      if (!row.spots || row.spots === '') return total;
      return total + calculateDropsPerRow(row.spots);
    }, 0);
  };

  const totalArches = calculateTotalArches();
  const totalDrops = calculateTotalDrops();
  const totalBays = rows.reduce((sum, row) => sum + (row.spots || 0), 0);

  // Get available central units based on total bays (not arches)
  const getAvailableCentralUnits = () => {
    return priceData.centralUnits.filter(unit => 
      totalBays >= unit.minBays && totalBays <= unit.maxBays
    );
  };

  useEffect(() => {
    const availableUnits = getAvailableCentralUnits();
    if (availableUnits.length > 0 && !centralUnit) {
      setCentralUnit(availableUnits[0].partNumber);
    } else if (availableUnits.length > 0) {
      const isValid = availableUnits.some(unit => unit.partNumber === centralUnit);
      if (!isValid) {
        setCentralUnit(availableUnits[0].partNumber);
      }
    }
  }, [totalBays]);

  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, spots: 5 }]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const updateRowSpots = (index, value) => {
    const newRows = [...rows];
    newRows[index].spots = value === '' ? '' : value;
    setRows(newRows);
  };

  // Round to nearest 50
  const roundToNearest50 = (value) => {
    return Math.ceil(value / 50) * 50;
  };

  const calculateQuote = () => {
    if (!centralUnit) {
      alert('Please select a central unit');
      return;
    }

    // Validate all rows have valid spots
    const hasEmptyRows = rows.some(row => !row.spots || row.spots === '' || row.spots < 2);
    if (hasEmptyRows) {
      alert('Please ensure all rows have at least 2 bays');
      return;
    }

    const lineItems = [];
    
    const selectedUnit = priceData.centralUnits.find(u => u.partNumber === centralUnit);
    if (!selectedUnit) {
      alert('Please select a valid central unit');
      return;
    }

    // 1. Central Unit (FIRST ITEM)
    const unitQuantity = selectedUnit.quantity || 1;
    lineItems.push({
      partNumber: selectedUnit.partNumber,
      description: selectedUnit.name,
      qty: unitQuantity,
      unitPrice: selectedUnit.price,
      total: selectedUnit.price * unitQuantity
    });

    // 2. VFD Control
    const vfdControl = priceData.vfdControls[selectedUnit.hp]?.[siteVoltage];
    if (vfdControl) {
      lineItems.push({
        partNumber: vfdControl.partNumber,
        description: `${selectedUnit.hp} - ${siteVoltage}V Outdoor VFD Control Panel`,
        qty: unitQuantity,
        unitPrice: vfdControl.price,
        total: vfdControl.price * unitQuantity
      });
    }

    // 3. Workstations (per row, based on spots per row)
    rows.forEach((row, index) => {
      const workstation = Object.values(priceData.workstations).find(w => 
        row.spots >= w.minBays && row.spots <= w.maxBays
      );
      
      if (workstation) {
        lineItems.push({
          partNumber: workstation.partNumber,
          description: `${workstation.name} (Row ${index + 1})`,
          qty: row.spots,
          unitPrice: workstation.price,
          total: workstation.price * row.spots
        });
      }
    });

    // 4. Arches (per row)
    let totalSingleArches = 0;
    let totalDualArches = 0;

    rows.forEach((row) => {
      const dualArches = row.spots > 1 ? row.spots - 1 : 0;
      totalSingleArches += 2; // Beginning and end
      totalDualArches += dualArches;
    });

    // Add single arches
    if (totalSingleArches > 0) {
      const singleArch = priceData.components.arches["VA5129A-1"];
      lineItems.push({
        partNumber: "VA5129A-1",
        description: singleArch.name,
        qty: totalSingleArches,
        unitPrice: singleArch.price,
        total: singleArch.price * totalSingleArches
      });
    }

    // Add dual arches
    if (totalDualArches > 0) {
      const dualArch = priceData.components.arches["VA5129A-2"];
      lineItems.push({
        partNumber: "VA5129A-2",
        description: dualArch.name,
        qty: totalDualArches,
        unitPrice: dualArch.price,
        total: dualArch.price * totalDualArches
      });
    }

    // 5. Arch Components (based on total arches)
    Object.entries(priceData.components.archComponents).forEach(([partNum, component]) => {
      lineItems.push({
        partNumber: partNum,
        description: component.name,
        qty: totalArches,
        unitPrice: component.price,
        total: component.price * totalArches
      });
    });

    // 6. Drop Components (inlet valves and swivel cuffs - based on total drops)
    const inletValve = priceData.components.dropComponents["VA2567V"];
    lineItems.push({
      partNumber: "VA2567V",
      description: inletValve.name,
      qty: totalDrops,
      unitPrice: inletValve.price,
      total: inletValve.price * totalDrops
    });

    const swivelCuff = priceData.components.dropComponents["VA3223"];
    lineItems.push({
      partNumber: "VA3223",
      description: swivelCuff.name,
      qty: totalDrops,
      unitPrice: swivelCuff.price,
      total: swivelCuff.price * totalDrops
    });

    // 7. Tools (based on preference - total must equal totalDrops)
    if (toolPreference === 'half') {
      const creviceCount = Math.ceil(totalDrops / 2);
      const clawCount = totalDrops - creviceCount;

      // Crevice tools
      const creviceTool = priceData.components.tools.crevice["VA2482"];
      lineItems.push({
        partNumber: "VA2482",
        description: creviceTool.name,
        qty: creviceCount,
        unitPrice: creviceTool.price,
        total: creviceTool.price * creviceCount
      });

      const creviceHolster = priceData.components.tools.crevice["VA2482H"];
      lineItems.push({
        partNumber: "VA2482H",
        description: creviceHolster.name,
        qty: creviceCount,
        unitPrice: creviceHolster.price,
        total: creviceHolster.price * creviceCount
      });

      const creviceBracket = priceData.components.tools.crevice["VA2482B"];
      lineItems.push({
        partNumber: "VA2482B",
        description: creviceBracket.name,
        qty: creviceCount,
        unitPrice: creviceBracket.price,
        total: creviceBracket.price * creviceCount
      });

      // Claw tools
      const clawNozzle = priceData.components.tools.claw["VA2481"];
      lineItems.push({
        partNumber: "VA2481",
        description: clawNozzle.name,
        qty: clawCount,
        unitPrice: clawNozzle.price,
        total: clawNozzle.price * clawCount
      });

      const clawHanger = priceData.components.tools.claw["VA2481H"];
      lineItems.push({
        partNumber: "VA2481H",
        description: clawHanger.name,
        qty: clawCount,
        unitPrice: clawHanger.price,
        total: clawHanger.price * clawCount
      });

      const clawBracket = priceData.components.tools.claw["VA2481B"];
      lineItems.push({
        partNumber: "VA2481B",
        description: clawBracket.name,
        qty: clawCount,
        unitPrice: clawBracket.price,
        total: clawBracket.price * clawCount
      });

    } else if (toolPreference === 'claw') {
      // All claw tools
      const clawNozzle = priceData.components.tools.claw["VA2481"];
      lineItems.push({
        partNumber: "VA2481",
        description: clawNozzle.name,
        qty: totalDrops,
        unitPrice: clawNozzle.price,
        total: clawNozzle.price * totalDrops
      });

      const clawHanger = priceData.components.tools.claw["VA2481H"];
      lineItems.push({
        partNumber: "VA2481H",
        description: clawHanger.name,
        qty: totalDrops,
        unitPrice: clawHanger.price,
        total: clawHanger.price * totalDrops
      });

      const clawBracket = priceData.components.tools.claw["VA2481B"];
      lineItems.push({
        partNumber: "VA2481B",
        description: clawBracket.name,
        qty: totalDrops,
        unitPrice: clawBracket.price,
        total: clawBracket.price * totalDrops
      });

    } else {
      // All crevice tools
      const creviceTool = priceData.components.tools.crevice["VA2482"];
      lineItems.push({
        partNumber: "VA2482",
        description: creviceTool.name,
        qty: totalDrops,
        unitPrice: creviceTool.price,
        total: creviceTool.price * totalDrops
      });

      const creviceHolster = priceData.components.tools.crevice["VA2482H"];
      lineItems.push({
        partNumber: "VA2482H",
        description: creviceHolster.name,
        qty: totalDrops,
        unitPrice: creviceHolster.price,
        total: creviceHolster.price * totalDrops
      });

      const creviceBracket = priceData.components.tools.crevice["VA2482B"];
      lineItems.push({
        partNumber: "VA2482B",
        description: creviceBracket.name,
        qty: totalDrops,
        unitPrice: creviceBracket.price,
        total: creviceBracket.price * totalDrops
      });
    }

    // 8. Hoses
    // 1.5" hose: drops * 25 feet, rounded to nearest 50
    const hose15Feet = totalDrops * 25;
    const hose15Rounded = roundToNearest50(hose15Feet);
    const hose15 = priceData.components.hoses["VA6101-1.5"];
    lineItems.push({
      partNumber: "VA6101-1.5",
      description: `${hose15.name} (${hose15Rounded} ft)`,
      qty: hose15Rounded,
      unitPrice: hose15.price,
      total: roundToNearest50(hose15Rounded * hose15.price)
    });

    // 2" hose: total arches * 5 feet, rounded to nearest 50
    const hose2Feet = totalArches * 5;
    const hose2Rounded = roundToNearest50(hose2Feet);
    const hose2 = priceData.components.hoses["VA6101-2"];
    lineItems.push({
      partNumber: "VA6101-2",
      description: `${hose2.name} (${hose2Rounded} ft)`,
      qty: hose2Rounded,
      unitPrice: hose2.price,
      total: roundToNearest50(hose2Rounded * hose2.price)
    });

    const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);

    setQuote({
      config: {
        rows: rows.length,
        totalArches: totalArches,
        totalDrops: totalDrops,
        centralUnit: selectedUnit.partNumber,
        voltage: siteVoltage,
        toolPreference: toolPreference
      },
      lineItems,
      subtotal
    });
  };

  const exportQuote = () => {
    if (!quote) return;

    let csvContent = 'Part Number,Description,Quantity,Unit Price,Total\n';
    
    quote.lineItems.forEach(item => {
      csvContent += `${item.partNumber},"${item.description}",${item.qty},${item.unitPrice.toFixed(2)},${item.total.toFixed(2)}\n`;
    });
    
    csvContent += `\n,,,,Subtotal,$${quote.subtotal.toFixed(2)}`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vacuum-quote-${new Date().toISOString().split('T')[0]}.csv`;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 md:p-8">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * {
          font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          opacity: 1;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex-shrink-0 relative bg-slate-100 rounded-xl p-2">
                <Image
                  src="/avw_logo.png"
                  alt="Company Logo"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Vacuum System Calculator</h1>
                <p className="text-sm text-slate-500 mt-0.5">Professional quote generation tool</p>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-5 flex items-center gap-2">
            <div className="w-1.5 h-5 bg-blue-600 rounded-full"></div>
            System Configuration
          </h2>

          {/* Rows Section */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-slate-700 mb-3 block">Parking Rows</label>
            
            <div className="space-y-2">
              {rows.map((row, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-20">
                    <input
                      type="text"
                      value={`Row ${index + 1}`}
                      disabled
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 text-sm font-medium"
                    />
                  </div>
                  
                  <div className="flex-1 max-w-xs">
                    <div className="relative">
                      <input
                        type="number"
                        min="2"
                        value={row.spots}
                        onChange={(e) => {
                          const value = e.target.value === '' ? '' : parseInt(e.target.value);
                          updateRowSpots(index, value);
                        }}
                        onBlur={(e) => {
                          const value = parseInt(e.target.value) || 2;
                          updateRowSpots(index, value >= 2 ? value : 2);
                        }}
                        onFocus={(e) => e.target.select()}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 pr-16"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 font-medium">
                        bays
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-xs text-slate-500">
                    {calculateDropsPerRow(row.spots)} drops
                  </div>

                  <div className="flex items-center gap-2">
                    {index === rows.length - 1 && (
                      <button
                        onClick={addRow}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all hover:scale-105 active:scale-95"
                        title="Add row"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                    
                    {rows.length > 1 && (
                      <button
                        onClick={() => removeRow(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Remove row"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-4 text-sm">
              <div className="text-slate-600">
                <span className="font-semibold text-slate-900">{totalArches}</span> total arches
              </div>
              <div className="text-slate-600">
                <span className="font-semibold text-slate-900">{totalDrops}</span> total drops
              </div>
            </div>
          </div>

          {/* Central Unit Section */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-start justify-between mb-3">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                Central Unit
                <span className="text-xs font-normal text-slate-500">({totalBays} bays)</span>
              </label>
            </div>
            
            {(() => {
              const availableUnits = getAvailableCentralUnits();
              return (
                <select
                  value={centralUnit}
                  onChange={(e) => setCentralUnit(e.target.value)}
                  disabled={availableUnits.length === 0}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 bg-white disabled:bg-slate-100 disabled:cursor-not-allowed transition-all"
                >
                  {availableUnits.length === 0 ? (
                    <option value="">{totalBays === 0 ? "Configure bays below" : `No units available for ${totalBays} bays`}</option>
                  ) : (
                    <>
                      <option value="">Select central unit</option>
                      {availableUnits.map(unit => (
                        <option key={unit.partNumber} value={unit.partNumber}>
                          {unit.partNumber} (Qty: {unit.quantity || 1}) - {unit.minBays}-{unit.maxBays} bays
                        </option>
                      ))}
                    </>
                  )}
                </select>
              );
            })()}
            
            {totalBays > 0 && getAvailableCentralUnits().length === 0 && (
              <div className="mt-2 flex items-start gap-2 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Total of {totalBays} bays exceeds maximum capacity. Please adjust configuration.</span>
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Site Voltage</label>
              <select
                value={siteVoltage}
                onChange={(e) => setSiteVoltage(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 bg-white"
              >
                <option value="230/460">230/460V (US Standard)</option>
                <option value="575">575V (Canada)</option>
                <option value="380">380V (Australia / Europe)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Tool Preference</label>
              <select
                value={toolPreference}
                onChange={(e) => setToolPreference(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900 bg-white"
              >
                <option value="half">50/50 Mix (Crevice + Claw)</option>
                <option value="crevice">Crevice Tools Only</option>
                <option value="claw">Claw Tools Only</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={calculateQuote}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          >
            <Calculator className="w-5 h-5" />
            Generate Quote
          </button>
        </div>

        {/* Quote Results */}
        {quote && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-1.5 h-5 bg-green-600 rounded-full"></div>
                Quote Summary
              </h2>
              <button
                onClick={exportQuote}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs text-slate-500 font-medium mb-1">Total Rows</p>
                <p className="text-2xl font-bold text-slate-900">{quote.config.rows}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs text-slate-500 font-medium mb-1">Total Arches</p>
                <p className="text-2xl font-bold text-slate-900">{quote.config.totalArches}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-xs text-blue-600 font-medium mb-1">Central Unit</p>
                <p className="text-lg font-bold text-blue-900">{quote.config.centralUnit}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs text-slate-500 font-medium mb-1">Total Drops</p>
                <p className="text-2xl font-bold text-slate-900">{quote.config.totalDrops}</p>
              </div>
            </div>

            {/* Quote Table */}
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Part No.</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Description</th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Qty</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Unit Price</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Total</th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {quote.lineItems.map((item, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-3 text-xs font-mono text-slate-700 font-medium">{item.partNumber}</td>
                      <td className="px-3 py-3 text-sm text-slate-700">{item.description}</td>
                      <td className="px-3 py-3 text-sm text-center text-slate-900 font-medium">{item.qty}</td>
                      <td className="px-3 py-3 text-sm text-right text-slate-700 font-mono">${item.unitPrice.toFixed(2)}</td>
                      <td className="px-3 py-3 text-sm text-right font-semibold text-slate-900 font-mono">${item.total.toFixed(2)}</td>
                      <td className="px-3 py-3 text-center">
                        <button
                          onClick={() => deleteLineItem(index)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 border-t-2 border-slate-200">
                    <td colSpan="4" className="px-3 py-4 text-right text-base font-bold text-slate-900">Subtotal:</td>
                    <td colSpan="2" className="px-3 py-4 text-right text-xl font-bold text-blue-600 font-mono">${quote.subtotal.toFixed(2)}</td>
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
