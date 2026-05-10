"use client";

// InlineEditableItem: allows inline editing of an item's name and price
import { ReceiptItem, Person } from "@/lib/types";
function InlineEditableItem({ item, idx, setItems }: {
  item: ReceiptItem;
  idx: number;
  setItems: React.Dispatch<React.SetStateAction<ReceiptItem[]>>;
}) {
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(item.name);
  const [price, setPrice] = React.useState(item.price.toFixed(2));
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const priceInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (editing && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [editing]);

  React.useEffect(() => {
    setName(item.name);
    setPrice(item.price.toFixed(2));
  }, [item.name, item.price]);

  function handleSave() {
    setItems(items => items.map((it, i) => i === idx ? {
      ...it,
      name: name.trim() || it.name,
      price: isNaN(Number(price)) ? it.price : Math.max(0, Number(price)),
    } : it));
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setName(item.name);
      setPrice(item.price.toFixed(2));
      setEditing(false);
    }
  }

  // Separate editing state for name and price
  const [editingField, setEditingField] = React.useState<null | 'name' | 'price'>(null);

  React.useEffect(() => {
    if (editingField === 'name' && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    } else if (editingField === 'price' && priceInputRef.current) {
      priceInputRef.current.focus();
      priceInputRef.current.select();
    }
  }, [editingField]);

  function handleSaveField() {
    setItems(items => items.map((it, i) => i === idx ? {
      ...it,
      name: name.trim() || it.name,
      price: isNaN(Number(price)) ? it.price : Math.max(0, Number(price)),
    } : it));
    setEditingField(null);
  }

  function handleKeyDownField(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSaveField();
    } else if (e.key === "Escape") {
      setName(item.name);
      setPrice(item.price.toFixed(2));
      setEditingField(null);
    }
  }

  return (
    <div className="flex min-w-0 items-center gap-2">
      {editingField === 'name' ? (
        <input
          ref={nameInputRef}
          className="bg-white text-black font-bold px-2 py-1 rounded w-32 max-w-full outline-none"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={handleSaveField}
          onKeyDown={handleKeyDownField}
          maxLength={32}
          aria-label="Edit item name"
          style={{fontSize:'1.1rem'}}
        />
      ) : (
        <span
          className="truncate font-bold text-lg cursor-pointer"
          style={{ maxWidth: 140 }}
          tabIndex={0}
          onClick={() => setEditingField('name')}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setEditingField('name'); }}
          aria-label={`Edit item name for ${item.name}`}
        >
          {item.name}
        </span>
      )}
      <span className="text-black font-bold">$</span>
      {editingField === 'price' ? (
        <input
          ref={priceInputRef}
          className="bg-white text-black font-bold px-2 py-1 rounded w-16 max-w-full outline-none"
          value={price}
          onChange={e => setPrice(e.target.value.replace(/[^\d.]/g, ''))}
          onBlur={handleSaveField}
          onKeyDown={handleKeyDownField}
          maxLength={8}
          aria-label="Edit item price"
          style={{fontSize:'1.1rem'}}
        />
      ) : (
        <span
          className="text-lg cursor-pointer"
          tabIndex={0}
          onClick={() => setEditingField('price')}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setEditingField('price'); }}
          aria-label={`Edit item price for ${item.name}`}
          style={{marginLeft: 4}}
        >
          {`$${item.price.toFixed(2)}`}
        </span>
      )}
    </div>
  );
}


import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSplit } from "@/app/context/SplitContext";

// InlineEditableName: allows inline editing of a person's name
function InlineEditableName({ person, idx, setPeople, removePerson }: {
  person: Person;
  idx: number;
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  removePerson: (idx: number) => void;
}) {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(person.name);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus input when editing starts
  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  // Update value if person.name changes externally
  React.useEffect(() => {
    setValue(person.name);
  }, [person.name]);

  function handleSave() {
    setPeople(people => people.map((p, i) => i === idx ? { ...p, name: value.trim() || p.name } : p));
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setValue(person.name);
      setEditing(false);
    }
  }

  return (
    <div className="flex items-center gap-2 group">
      <div
        className="flex items-center gap-2 px-3 py-1 rounded bg-opacity-80 cursor-pointer"
        style={{ background: person.color, color: '#fff', minWidth: 0 }}
        onClick={() => setEditing(true)}
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setEditing(true); }}
        role="button"
        aria-label={`Edit name for ${person.name}`}
      >
        {editing ? (
          <input
            ref={inputRef}
            className="bg-white text-black font-bold px-2 py-1 rounded w-28 max-w-full outline-none"
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            maxLength={20}
            aria-label="Edit person name"
          />
        ) : (
          <span className="truncate font-bold text-lg" style={{ maxWidth: 100, color: person.color }}>{person.name}</span>
        )}
      </div>
      <button
        className="opacity-0 group-hover:opacity-100 transition-opacity text-white bg-black bg-opacity-60 rounded-full p-1 ml-1"
        style={{ fontSize: 18, lineHeight: 1 }}
        onClick={() => removePerson(idx)}
        title="Remove person"
        tabIndex={-1}
        aria-label={`Remove ${person.name}`}
      >
        ×
      </button>
    </div>
  );
}


const COLORS = [
  { name: "orange", color: "#FF5A1F" },
  { name: "magenta", color: "#FF00A8" },
  { name: "blue", color: "#0047FF" },
  { name: "lime", color: "#B7FF00" },
  { name: "yellow", color: "#FFF500" },
  { name: "cyan", color: "#00FFF5" },
  { name: "purple", color: "#A800FF" },
  { name: "red", color: "#FF1F1F" },
];


// Always pick a new color, never repeat
function getNextColor(used: string[]) {
  const available = COLORS.filter(c => !used.includes(c.color));
  if (available.length === 0) return COLORS[0].color;
  return available[0].color;
}

// Returns layout for assignment buttons based on people count
function getAssignLayout(count: number) {
  // For 1: [[0]]
  // For 2: [[0],[1]]
  // For 3: [[0,1],[2]]
  // For 4: [[0,1],[2,3]]
  // For 5+: fill rows of 2
  if (count === 1) return { direction: 'column', positions: [[0]] };
  if (count === 2) return { direction: 'column', positions: [[0],[1]] };
  if (count === 3) return { direction: 'column', positions: [[0,1],[2]] };
  if (count === 4) return { direction: 'column', positions: [[0,1],[2,3]] };
  // For 5+, fill rows of 2
  const rows = [];
  let i = 0;
  while (i < count) {
    rows.push([i, i+1].filter(x => x < count));
    i += 2;
  }
  return { direction: 'column', positions: rows };
}

export default function AssignPage() {
  const {
    people,
    setPeople,
    items,
    setItems,
    assignments,
    setAssignments,
    taxPercent,
    setTaxPercent,
    tipPercent,
    setTipPercent,
  } = useSplit();
  const [showAssignments, setShowAssignments] = React.useState(false);

  // Add/remove/edit logic using context
  function addPerson() {
    const usedColors = people.map((p: Person) => p.color);
    const color = getNextColor(usedColors);
    setPeople([
      ...people,
      {
        id: crypto.randomUUID(),
        name: `PERSON ${people.length + 1}`,
        color,
      },
    ]);
  }

  function removePerson(idx: number) {
    setPeople((people: Person[]) => people.filter((_, i: number) => i !== idx));
    // Remove assignments for this person from all items
    setAssignments((assignments: Record<number, string[]>) => {
      const newAssignments = { ...assignments };
      Object.keys(newAssignments).forEach((itemId: string) => {
        newAssignments[Number(itemId)] = newAssignments[Number(itemId)].filter((pid: string) => pid !== idx.toString());
      });
      return newAssignments;
    });
  }

  function toggleAssign(itemIdx: number, personIdx: number) {
    setAssignments((assignments: Record<number, string[]>) => {
      const itemId = items[itemIdx]?.id;
      if (itemId == null) return assignments;
      const assigned = assignments[itemId] || [];
      const personId = personIdx.toString();
      const updated = assigned.includes(personId)
        ? assigned.filter((pid: string) => pid !== personId)
        : [...assigned, personId];
      return { ...assignments, [itemId]: updated };
    });
  }

  function addItem() {
    setItems((items: ReceiptItem[]) => [
      ...items,
      {
        id: items.length > 0 ? Math.max(...items.map((i: ReceiptItem) => i.id)) + 1 : 1,
        name: `ITEM ${items.length + 1}`,
        price: 10.0,
      },
    ]);
  }

  function removeItem(idx: number) {
    setItems((items: ReceiptItem[]) => items.filter((_, i: number) => i !== idx));
    // Remove assignments for this item
    setAssignments((assignments: Record<number, string[]>) => {
      const newAssignments = { ...assignments };
      const itemId = items[idx]?.id;
      if (itemId != null) delete newAssignments[itemId];
      return newAssignments;
    });
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-2 pb-6 bg-orange text-white">
      {/* Header */}
      <div className="w-full pt-6 pb-4 flex flex-col items-start pl-2 select-none">
        <h1 className="text-[2.8rem] font-black leading-none tracking-tight text-white" style={{ fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif', fontWeight: 900 }}>
          02 / ASSIGN
        </h1>
      </div>

      {/* People Section */}
      <div className="w-full max-w-[420px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-extrabold">People</span>
          <button onClick={addPerson} className="text-3xl font-black text-white">+</button>
        </div>
        <div className="border-4 border-lime bg-blue rounded-none p-3 flex flex-col gap-2 mb-6">
          {/* Custom people list with color square on right */}
          <div className="flex flex-col gap-1">
            {people.map((person, idx) => (
              <div key={person.name + idx} className="flex items-center justify-between w-full">
                <InlineEditableName
                  person={person}
                  idx={idx}
                  setPeople={setPeople}
                  removePerson={removePerson}
                />
                <div style={{ width: 24, height: 24, background: person.color, border: '3px solid #B7FF00', marginLeft: 8, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assign Items Section */}
      <div className="w-full max-w-[420px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-extrabold">Assign Items</span>
          <button onClick={addItem} className="text-3xl font-black text-white">+</button>
        </div>
        {items.map((item, idx) => {
          const assignLayout = getAssignLayout(people.length);
          const assignedPersonIds = assignments[item.id] || [];
          return (
            <div key={item.id ?? idx} className="border-4 border-blue bg-black rounded-none p-3 flex flex-col gap-2 mb-4">
              <div className="flex items-center justify-between">
                <InlineEditableItem item={item} idx={idx} setItems={setItems} />
                <div className="flex items-center" style={{gap: 8}}>
                  <div style={{ display: 'flex', flexDirection: assignLayout.direction as React.CSSProperties['flexDirection'], gap: 4, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', minWidth: 40 }}>
                    {assignLayout.positions.map((row, rowIdx) => (
                      <div key={rowIdx} style={{ display: 'flex', flexDirection: assignLayout.direction === 'column' ? 'row' : 'column', gap: 4 }}>
                        {row.map((pidx) => {
                          if (pidx >= people.length) return null;
                          const person = people[pidx];
                          const assigned = assignedPersonIds.includes(pidx.toString());
                          return (
                            <button
                              key={pidx}
                              onClick={() => toggleAssign(idx, pidx)}
                              className="w-6 h-6 border-4 focus:outline-none"
                              style={{
                                background: person.color,
                                borderColor: '#B7FF00',
                                borderStyle: 'solid',
                                borderRadius: 0,
                                opacity: assigned ? 1 : 0.5,
                                boxShadow: assigned ? `0 0 0 2px ${person.color}` : 'none',
                                transition: 'background 0.2s, opacity 0.2s, border-color 0.2s',
                              }}
                              title={assigned ? `Unassign ${person.name}` : `Assign ${person.name}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => removeItem(idx)} className="ml-2 flex-shrink-0 flex items-center justify-center" style={{alignSelf:'center'}} title="Remove item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6H5M5 6H21M5 6V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17" stroke="#F5F5F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>


      {/* Tax & Tip - editable, always one line */}
      <div className="w-full max-w-[420px] flex gap-0 mt-2 mb-6 whitespace-nowrap">
        <div className="flex-1 bg-[#0047FF] border-4 border-[#B7FF00] text-[1.4rem] font-black text-left px-4 py-2 flex items-center min-w-0 rounded-none" style={{borderRight: '2px solid #B7FF00'}}>
          <label className="flex items-center gap-2 w-full" style={{color:'#B7FF00',fontFamily:'Inter, Helvetica Neue, Arial, sans-serif'}}>
            Tax :
            <input
              type="number"
              min={0}
              max={100}
              value={taxPercent}
              onChange={e => setTaxPercent(Number(e.target.value))}
              className="w-12 bg-transparent border-none outline-none text-[1.4rem] font-black text-right px-0"
              style={{color:'#B7FF00'}}
            />
            <span style={{fontSize:'1.1rem',fontWeight:'bold',marginLeft:'-2px',marginRight:'2px',color:'#B7FF00'}}>%</span>
          </label>
        </div>
        <div className="flex-1 bg-[#B7FF00] border-4 border-[#0047FF] text-[1.4rem] font-black text-left px-4 py-2 flex items-center min-w-0 rounded-none" style={{borderLeft: '2px solid #0047FF'}}>
          <label className="flex items-center gap-2 w-full" style={{color:'#0047FF',fontFamily:'Inter, Helvetica Neue, Arial, sans-serif'}}>
            Tip :
            <input
              type="number"
              min={0}
              max={100}
              value={tipPercent}
              onChange={e => setTipPercent(Number(e.target.value))}
              className="w-12 bg-transparent border-none outline-none text-[1.4rem] font-black text-right px-0"
              style={{color:'#0047FF'}}
            />
            <span style={{fontSize:'1.1rem',fontWeight:'bold',marginLeft:'-2px',marginRight:'2px',color:'#0047FF'}}>%</span>
          </label>
        </div>
      </div>

      {/* Calculate Button */}
      <Button
        className="w-full max-w-[420px] h-[64px] bg-lime text-black text-3xl font-black rounded-none border-none transition-all active:scale-95 mt-2 flex items-center justify-center gap-3"
        style={{fontWeight:900, fontSize:'2.2rem', letterSpacing:'-0.03em'}}
        onClick={() => setShowAssignments(true)}
      >
        CALCULATE
        <span className="flex items-center">
          <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12H34" stroke="#000" strokeWidth="4" strokeLinecap="round"/>
            <path d="M24 4L34 12L24 20" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </Button>

      {/* Assignment Debug Modal */}
      {showAssignments && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-black mb-4">Assignments</h2>
            <pre className="text-xs whitespace-pre-wrap mb-4" style={{maxHeight:300,overflowY:'auto'}}>{JSON.stringify(items.map((item) => ({
              item: item.name,
              assigned: (assignments[item.id] || []).map(pid => people[Number(pid)]?.name).filter(Boolean),
            })), null, 2)}</pre>
            <Button onClick={() => setShowAssignments(false)} className="bg-black text-white font-black px-6 py-2">Close</Button>
          </div>
        </div>
      )}
    </main>
  );
}
