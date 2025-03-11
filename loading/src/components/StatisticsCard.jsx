"use client"; 
// Necessário se você usar hooks ou algo do lado do cliente nesse componente

import React from "react";
import PropTypes from "prop-types";

export default function StatisticsCard({ title, value, icon, footer }) {
  return (
    <div className="border border-blue-gray-100 shadow-sm rounded p-4 bg-white">
      <div className="flex items-center">
        {/* Exibe o ícone, se existir */}
        {icon && (
          <div className="bg-blue-600 p-3 rounded-full text-white">
            {icon}
          </div>
        )}
        <div className={icon ? "ml-4" : ""}>
          {/* Título */}
          <div className="text-sm text-blue-gray-600">{title}</div>
          {/* Valor */}
          <div className="text-2xl font-bold text-blue-gray-800">{value}</div>
        </div>
      </div>
      {/* Rodapé opcional */}
      {footer && <div className="mt-2 text-xs text-blue-gray-500">{footer}</div>}
    </div>
  );
}

StatisticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,
  footer: PropTypes.node,
};
