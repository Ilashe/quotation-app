"use client";
import React, { useState } from 'react';
import { Calculator, Download, Settings } from 'lucide-react';

// Complete price data from 2025 AVW Price List
const priceData = {
  centralUnits: {
    "SYS-20C-7030BS0B": {
      name: "Eurovac III - 20HP & 30\" Sep Detail Vacuum System",
      price: 17360.00,
      bays: 5,
      hp: "20HP"
    },
    "SYS-25C-6534BS0B": {
      name: "Eurovac III - 25HP & 34\" Sep Detail Vacuum System",
      price: 19370.00,
      bays: 6,
      hp: "25HP"
    },
    "SYS-30C-7038BS0B": {
      name: "Eurovac III - 30HP & 38\" Sep Detail Vacuum System",
      price: 24213.00,
      bays: [7, 8],
      hp: "30HP"
    },
    "SYS-152-7038BS0B": {
      name: "Eurovac III - Double 15HP & 38\" Sep Detail Vacuum System",
      price: 28760.00,
      bays: [7, 8],
      hp: "Dual 15HP"
    },
    "SYS-40C-7042BS0S": {
      name: "Eurovac III - 40HP & 42\" Sep Detail Vacuum System",
      price: 28329.00,
      bays: [9, 10],
      hp: "40HP"
    },
    "SYS-202-7038BS0B": {
      name: "Eurovac III - Double 20HP & 38\" Sep Detail Vacuum System",
      price: 34370.00,
      bays: [9, 10],
      hp: "Dual 20HP"
    },
    "SYS-50C-7542BS0S": {
      name: "Eurovac III - 50HP & 42\" Sep Detail Vacuum System",
      price: 34320.00,
      bays: [11, 12, 13],
      hp: "50HP"
    },
    "SYS-252-7042BS0B": {
      name: "Eurovac III - Double 25HP & 42\" Sep Detail Vacuum System",
      price: 40545.00,
      bays: [11, 12, 13],
      hp: "Dual 25HP"
    },
    "SYS-60C-7548BS0S": {
      name: "Eurovac III - 60HP & 48\" Sep Detail Vacuum System",
      price: 40210.00,
      bays: [14, 15],
      hp: "60HP"
    },
    "SYS-302-7548BS0B": {
      name: "Eurovac III - Double 30HP & 48\" Sep Detail Vacuum System",
      price: 48025.00,
      bays: [14, 15],
      hp: "Dual 30HP"
    },
    "VAC-DUAL-40HP": {
      name: "Eurovac III Double 40 HP & 54\" Bag Separator (20-22 Drops)",
      price: 50303.00,
      bays: [16, 17, 18, 19, 20, 21, 22],
      hp: "Dual 40HP"
    }
  },
  vfdControls: {
    "20HP": {
      "460V-Indoor": { partNumber: "CPA-VFD-11204602", price: 7740.00 },
      "460V-Outdoor": { partNumber: "CPA-VFD-12204602", price: 9720.00 },
      "208V-Indoor": { partNumber: "CPA-VFD-11202302", price: 8215.00 },
      "208V-Outdoor": { partNumber: "CPA-VFD-12202302", price: 10370.00 }
    },
    "25HP": {
      "460V-Indoor": { partNumber: "CPA-VFD-11254602", price: 9170.00 },
      "460V-Outdoor": { partNumber: "CPA-VFD-12254602", price: 11145.00 },
      "208V-Indoor": { partNumber: "CPA-VFD-11252302", price: 9275.00 },
      "208V-Outdoor": { partNumber: "CPA-VFD-12252302", price: 11980.00 }
    },
    "30HP": {
      "460V-Indoor": { partNumber: "CPA-VFD-11304602", price: 10245.00 },
      "460V-Outdoor": { partNumber: "CPA-VFD-12304602", price: 12420.00 },
      "208V-Indoor": { partNumber: "CPA-VFD-11302302", price: 11185.00 },
      "208V-Outdoor": { partNumber: "CPA-VFD-12302302", price: 13895.00 }
    },
    "40HP": {
      "460V-Indoor": { partNumber: "CPA-VFD-11404602", price: 11760.00 },
      "460V-Outdoor": { partNumber: "CPA-VFD-12404602", price: 13390.00 },
      "208V-Indoor": { partNumber: "CPA-VFD-11402302", price: 12485.00 },
      "208V-Outdoor": { partNumber: "CPA-VFD-12402302", price: 15195.00 }
    },
    "50HP": {
      "460V-Indoor": { partNumber: "CPA-VFD-11504602", price: 13395.00 },
      "460V-Outdoor": { partNumber: "CPA-VFD-12504602", price: 16165.00 },
      "208V-Indoor": { partNumber: "CPA-VFD-11502302", price: 15275.00 },
      "208V-Outdoor": { partNumber: "CPA-VFD-12502302", price: 18505.00 }
    },
    "60HP": {
      "460V-Indoor": { partNumber: "CPA-VFD-11604602", price: 15615.00 },
      "460V-Outdoor": { partNumber: "CPA-VFD-12604602", price: 18385.00 },
      "208V-Indoor": { partNumber: "CPA-VFD-11602302", price: 17805.00 },
      "208V-Outdoor": { partNumber: "CPA-VFD-12602302", price: 21035.00 }
    },
    "Dual 15HP": {
      "460V-Indoor": { partNumber: "CPA-VFD-111546022", price: 14103.00 },
      "460V-Outdoor": { partNumber: "CPA-VFD-111546023", price: 18063.00 },
      "208V-Indoor": { partNumber: "CPA-VFD-111546022", price: 14103.00 },
      "208V-Outdoor": { partNumber: "CPA-VFD-111546023", price: 18063.00 }
    },
    "Dual 20HP": {
      "460V-Indoor": { partNumber: "CPA-VFD-112046022", price: 15953.00 },
      "460V-Outdoor": { partNumber: "CPA-VFD-112046023", price: 19913.00 },
      "208V-Indoor": { partNumber: "CPA-VFD-112046022", price: 16903.00 },
      "208V-Outdoor": { partNumber: "CPA-VFD-112046023", price: 21213.00 }
    },
    "Dual 25HP": {
      "460V-Indoor": { partNumber: "CPA-VFD-112546022", price: 18813.00 },
      "460V-Outdoor": { partNumber: "CPA-VFD-112546023", price: 21630.00 },
      "208V-Indoor": { partNumber: "CPA-VFD-112520822", price: 19023.00 },
      "208V-Outdoor": { partNumber: "CPA-VFD-112520823", price: 24433.00 }
    },
    "Dual 30HP": {
      "460V-Indoor": { partNumber: "CPA-VFD-113046022", price: 20963.00 },
      "460V-Outdoor": { partNumber: "CPA-VFD-113046023", price: 25313.00 },
      "208V-Indoor": { partNumber: "CPA-VFD-113020822", price: 22843.00 },
      "208V-Outdoor": { partNumber: "CPA-VFD-113020823", price: 28263.00 }
    },
    "Dual 40HP": {
      "460V-Indoor": { partNumber: "CPA-VFD-11404602", price: 11760.00 },
      "460V-Outdoor": { partNumber: "CPA-VFD-12404602", price: 13390.00 },
      "208V-Indoor": { partNumber: "CPA-VFD-11402302", price: 12485.00 },
      "208V-Outdoor": { partNumber: "CPA-VFD-12402302", price: 15195.00 }
    }
  },
  pipingPackages: {
    5: { partNumber: "SYS-050-205GAR05", price: 1330.00 },
    6: { partNumber: "SYS-050-205GAR06", price: 1441.00 },
    7: { partNumber: "SYS-050-205GAR07", price: 1441.00 },
    8: { partNumber: "SYS-050-205GAR08", price: 1441.00 },
    9: { partNumber: "SYS-050-205GAR09", price: 1441.00 },
    10: { partNumber: "SYS-050-205GAR10", price: 1441.00 },
    11: { partNumber: "SYS-050-205GAR11", price: 1555.00 },
    12: { partNumber: "SYS-050-205GAR12", price: 1555.00 },
    13: { partNumber: "SYS-050-205GAR13", price: 1555.00 },
    14: { partNumber: "SYS-050-205GAR14", price: 1555.00 },
    15: { partNumber: "SYS-050-205GAR15", price: 1555.00 }
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
      "VAC-CUFFSWIVEL-150HX150T": { name: "Swivel Cuff, 1-1/2\" Vacuum Hose x 1-1/2\" Tube", price: 5.60 }
    },
    tools: {
      crevice: {
        "VAC-CREVICE-TOOL": { name: "Crevice Tool for 1-1/2\" Vacuum Hose", price: 7.80 },
        "VA5129W": { name: "Single Tool Holster Bracket", price: 241.00 },
        "VA3352WS": { name: "Crevice Tool Holster, Black", price: 114.00 }
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
  workstations: {
    "VAC-ALUM-6-10": {
      name: "Central Vac Line Kit: Post/Arch Aluminum (6-10 Bays)",
      price: 1371.00,
      minBays: 6,
      maxBays: 10
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
  const [rows, setRows] = useState(2);
  const [spotsPerRow, setSpotsPerRow] = useState(10);
  const [toolPreference, setToolPreference] = useState('half');
  const [voltage, setVoltage] = useState('460V');
  const [vfdType, setVfdType] = useState('Indoor');
  const [centralUnitType, setCentralUnitType] = useState('single');
  const [quote, setQuote] = useState(null);
  const [showPriceEditor, setShowPriceEditor] = useState(false);

  const roundToNearest50 = (num) => {
    return Math.ceil(num / 50) * 50;
  };

  const selectCentralUnit = (totalArches, unitType) => {
    const units = Object.entries(priceData.centralUnits);
    
    for (const [key, unit] of units) {
      const baysArray = Array.isArray(unit.bays) ? unit.bays : [unit.bays];
      const isDual = unit.hp.includes('Dual');
      
      if (baysArray.includes(totalArches)) {
        if ((unitType === 'dual' && isDual) || (unitType === 'single' && !isDual)) {
          return { partNumber: key, ...unit };
        }
      }
    }
    
    for (const [key, unit] of units) {
      const baysArray = Array.isArray(unit.bays) ? unit.bays : [unit.bays];
      if (baysArray.includes(totalArches)) {
        return { partNumber: key, ...unit };
      }
    }
    
    const lastUnit = units[units.length - 1];
    return { partNumber: lastUnit[0], ...lastUnit[1] };
  };

  const selectWorkstation = (spotsPerRow, totalSpots) => {
    const stations = Object.entries(priceData.workstations);
    for (const [key, station] of stations) {
      if (spotsPerRow >= station.minBays && spotsPerRow <= station.maxBays) {
        return { partNumber: key, ...station };
      }
    }
    const lastStation = stations[stations.length - 1];
    return { partNumber: lastStation[0], ...lastStation[1] };
  };

  const calculateQuote = () => {
    const totalSpots = rows * spotsPerRow;
    const singleDrops = rows * 2;
    const dualDrops = (spotsPerRow - 1) * rows;
    const totalArches = singleDrops + dualDrops;
    const totalDrops = (dualDrops * 2) + singleDrops;

    const centralUnit = selectCentralUnit(totalArches, centralUnitType);
    const vfdKey = `${voltage}-${vfdType}`;
    const vfd = priceData.vfdControls[centralUnit.hp]?.[vfdKey] || { partNumber: "N/A", price: 0 };
    const workstation = selectWorkstation(spotsPerRow, totalSpots);
    
    const pipingPkg = priceData.pipingPackages[totalArches] || priceData.pipingPackages[15];

    const hose150Length = roundToNearest50(totalDrops * 25);
    const hose2Length = roundToNearest50(totalArches * 5);

    let lineItems = [];

    lineItems.push({
      partNumber: centralUnit.partNumber,
      description: centralUnit.name,
      qty: 1,
      unitPrice: centralUnit.price,
      total: centralUnit.price
    });

    lineItems.push({
      partNumber: vfd.partNumber,
      description: `${centralUnit.hp} - ${voltage} ${vfdType} VFD Control Panel`,
      qty: 1,
      unitPrice: vfd.price,
      total: vfd.price
    });

    lineItems.push({
      partNumber: workstation.partNumber,
      description: workstation.name,
      qty: totalSpots,
      unitPrice: workstation.price,
      total: workstation.price * totalSpots
    });

    const tubeBends = priceData.tubeBends["TUBEBENDS-10IN"];
    lineItems.push({
      partNumber: "TUBEBENDS-10IN",
      description: tubeBends.name,
      qty: 2,
      unitPrice: tubeBends.price,
      total: tubeBends.price * 2
    });

    if (pipingPkg) {
      lineItems.push({
        partNumber: pipingPkg.partNumber,
        description: `Aluminum Piping Package for ${totalArches} Arch connections`,
        qty: 1,
        unitPrice: pipingPkg.price,
        total: pipingPkg.price
      });
    }

    lineItems.push({
      partNumber: "VA5129A-1",
      description: priceData.components.arches["VA5129A-1"].name,
      qty: singleDrops,
      unitPrice: priceData.components.arches["VA5129A-1"].price,
      total: priceData.components.arches["VA5129A-1"].price * singleDrops
    });

    lineItems.push({
      partNumber: "VA5129A-2",
      description: priceData.components.arches["VA5129A-2"].name,
      qty: dualDrops,
      unitPrice: priceData.components.arches["VA5129A-2"].price,
      total: priceData.components.arches["VA5129A-2"].price * dualDrops
    });

    Object.entries(priceData.components.archComponents).forEach(([key, item]) => {
      lineItems.push({
        partNumber: key,
        description: item.name,
        qty: totalArches,
        unitPrice: item.price,
        total: item.price * totalArches
      });
    });

    Object.entries(priceData.components.dropComponents).forEach(([key, item]) => {
      lineItems.push({
        partNumber: key,
        description: item.name,
        qty: totalDrops,
        unitPrice: item.price,
        total: item.price * totalDrops
      });
    });

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
        rows,
        spotsPerRow,
        totalSpots,
        singleDrops,
        dualDrops,
        totalArches,
        totalDrops,
        centralUnit: centralUnit.name
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
    a.download = `vacuum-quote-${rows}x${spotsPerRow}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calculator className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">Vacuum System Quote Calculator</h1>
            </div>
            <button
              onClick={() => setShowPriceEditor(!showPriceEditor)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
              {showPriceEditor ? 'Hide' : 'Show'} Prices
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Rows
              </label>
              <input
                type="number"
                min="1"
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parking Spots Per Row
              </label>
              <input
                type="number"
                min="2"
                value={spotsPerRow}
                onChange={(e) => setSpotsPerRow(parseInt(e.target.value) || 2)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
              />
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Central Unit Type
              </label>
              <select
                value={centralUnitType}
                onChange={(e) => setCentralUnitType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
              >
                <option value="single">Single Pump (Preferred)</option>
                <option value="dual">Dual Pump (Preferred)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voltage
              </label>
              <select
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
              >
                <option value="460V">460V</option>
                <option value="208V">208V</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                VFD Type
              </label>
              <select
                value={vfdType}
                onChange={(e) => setVfdType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black"
              >
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
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
                <p className="text-sm text-gray-600">Configuration</p>
                <p className="text-xl font-bold text-indigo-600">{quote.config.rows} × {quote.config.spotsPerRow}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Arches</p>
                <p className="text-xl font-bold text-indigo-600">{quote.config.totalArches}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Drops</p>
                <p className="text-xl font-bold text-indigo-600">{quote.config.totalDrops}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Spots</p>
                <p className="text-xl font-bold text-indigo-600">{quote.config.totalSpots}</p>
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
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-indigo-50 border-t-2 border-indigo-200">
                    <td colSpan="4" className="px-4 py-4 text-right text-lg font-bold text-gray-800">Subtotal:</td>
                    <td className="px-4 py-4 text-right text-xl font-bold text-indigo-600">${quote.subtotal.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {showPriceEditor && (
          <div className="bg-white rounded-lg shadow-xl p-8 mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Price Reference</h3>
            <p className="text-sm text-gray-600 mb-4">
              All prices are loaded from the 2025 AVW Price List. To modify prices, update the JSON structure in the code.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg font-mono text-xs overflow-auto max-h-96">
              <pre>{JSON.stringify(priceData, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VacuumQuoteCalculator;