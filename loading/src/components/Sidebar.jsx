"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  ShoppingCartIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  ReceiptPercentIcon,
  XMarkIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar({ isOpen, closeSidebar, sidebarRef }) {
  const pathname = usePathname();

  const navLinks = [
    { label: "Início", href: "/dashboard", icon: <HomeIcon className="h-5 w-5" /> },
    { label: "Vendas", href: "/dashboard/vendas", icon: <ShoppingCartIcon className="h-5 w-5" /> },
    { label: "Estoque", href: "/dashboard/estoque", icon: <ClipboardDocumentListIcon className="h-5 w-5" /> },
    { label: "Usuários", href: "/dashboard/usuarios", icon: <UsersIcon className="h-5 w-5" /> },
    { label: "Nota Fiscal", href: "/dashboard/notafiscal", icon: <ReceiptPercentIcon className="h-5 w-5" /> },
  ];

  const reportLinks = [
    { label: "Relatórios Impressos", href: "/dashboard/relatorios", icon: <ChartBarIcon className="h-5 w-5" /> },
  ];

  return (
    <aside
      ref={sidebarRef}
      className={`
        fixed top-1 left-4 bottom-4 w-75 z-20
        bg-gradient-to-br from-blue-950 to-gray-900 text-white shadow-xl overflow-hidden
        rounded-xl transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-[21rem]"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Topo: Logo no canto superior esquerdo */}
        <div className="relative border-b border-gray-700 p-5">
          <Link href="/dashboard" className="flex items-center justify-center" onClick={closeSidebar}>
            <img
              src="/logo.png"
              alt="Logo"
              className="h-auto w-40 object-contain transition-transform hover:scale-105"
            />
          </Link>
        </div>

        {/* Navegação Principal */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer
                      ${isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}
                    `}
                    onClick={closeSidebar}
                  >
                    {link.icon}
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Seção de Relatórios */}
          <div className="mt-6 border-t border-gray-700 pt-4">
            <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-2">
              Relatórios
            </h3>
            <ul className="space-y-4">
              {reportLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer
                        ${isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}
                      `}
                      onClick={closeSidebar}
                    >
                      {link.icon}
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Rodapé */}
        <div className="border-t border-gray-700 p-4 text-sm text-center">
          <p>Suporte: support@loading.com.br</p>
          <p>Telefone: (75) 99219-1260</p>
          <div className="mt-2 text-[10px] text-gray-400">
            &copy; 2025 Loading. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </aside>
  );
}
