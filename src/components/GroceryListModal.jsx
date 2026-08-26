import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Trash2, Check, Copy, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GroceryListModal({ isOpen, onClose }) {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadItems();
    }
  }, [isOpen]);

  const loadItems = () => {
    try {
      const saved = localStorage.getItem('cooksmart_grocery_list');
      if (saved) {
        setItems(JSON.parse(saved));
      } else {
        setItems([]);
      }
    } catch (e) {
      console.error(e);
      setItems([]);
    }
  };

  const saveItems = (updated) => {
    setItems(updated);
    localStorage.setItem('cooksmart_grocery_list', JSON.stringify(updated));
  };

  const toggleItem = (id) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    saveItems(updated);
  };

  const removeItem = (id) => {
    const updated = items.filter(item => item.id !== id);
    saveItems(updated);
  };

  const clearAll = () => {
    saveItems([]);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    const newItem = {
      id: Date.now() + Math.random(),
      text: newItemText.trim(),
      recipeName: 'Custom Item',
      checked: false
    };
    saveItems([newItem, ...items]);
    setNewItemText('');
  };

  const copyToClipboard = () => {
    if (items.length === 0) return;
    const text = items
      .map(i => `${i.checked ? '✓ ' : '□ '} ${i.text}${i.recipeName ? ` (${i.recipeName})` : ''}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          className="relative bg-[#12141D] border border-white/10 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[85vh]"
          onClick={e => e.stopPropagation()}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[70px] pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                <ShoppingCart size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white font-['Outfit']">Grocery List</h3>
                <p className="text-xs text-gray-400 font-medium">
                  {items.filter(i => i.checked).length} of {items.length} items checked
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Add custom item form */}
          <form onSubmit={addItem} className="flex gap-2 mb-4 relative z-10">
            <input
              type="text"
              placeholder="Add an item manually..."
              value={newItemText}
              onChange={e => setNewItemText(e.target.value)}
              className="flex-1 bg-[#191C28] border border-white/10 focus:border-orange-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-colors shrink-0 shadow-md shadow-orange-500/20"
            >
              <Plus size={16} /> Add
            </button>
          </form>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar relative z-10 my-2">
            {items.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center justify-center text-gray-500">
                <ShoppingCart size={40} className="mb-3 opacity-30 text-orange-400" />
                <p className="text-white font-bold text-base mb-1 font-['Outfit']">Your list is empty</p>
                <p className="text-xs max-w-xs text-gray-400">
                  Add ingredients from recipes with "Add All to Grocery List" or type your own items above!
                </p>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${
                    item.checked
                      ? 'bg-white/[0.02] border-white/5 opacity-60'
                      : 'bg-[#181A25] border-white/8 hover:border-orange-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        item.checked
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'border-white/20 group-hover:border-orange-500/50'
                      }`}
                    >
                      {item.checked && <Check size={12} strokeWidth={3} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`text-sm font-medium block truncate ${item.checked ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                        {item.text}
                      </span>
                      {item.recipeName && (
                        <span className="text-[10px] text-gray-500 font-semibold block">
                          from {item.recipeName}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all ml-2"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 relative z-10 mt-auto">
              <button
                onClick={clearAll}
                className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1.5 transition-colors font-semibold px-2 py-1.5"
              >
                <Trash2 size={14} /> Clear All
              </button>

              <button
                onClick={copyToClipboard}
                className="btn-gradient-orange text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-orange-500/20 transition-all"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied List!' : 'Copy to Clipboard'}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
