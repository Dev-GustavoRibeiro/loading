"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Header({ isOpen, toggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Fecha o dropdown se clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleUserMenu() {
    setMenuOpen((prev) => !prev);
  }

  return (
    <header className=" bg-white rounded-xl flex mx-1 px-10 py-1 flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
      {/* Esquerda: Botão de toggle + breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-600 hover:bg-gray-200 rounded"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
        <nav className="text-gray-600 font-medium">
          <span className="text-lg font-bold mr-1">Dashboard</span>
        </nav>
      </div>

      {/* Direita: Campo de busca + Avatar */}
      <div className="flex items-center gap-4 relative self-start sm:self-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Avatar + Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleUserMenu}
            className="flex items-center gap-2 rounded-full border border-gray-300 p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <img
              src="/user.png"
              alt="User Avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
              <ul className="space-y-2">
                <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <BellIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Notificações</span>
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <Cog6ToothIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Configurações</span>
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 text-red-600" />
                  <span className="text-sm text-red-600">Sair</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
