"use client";

import React from "react";
import PropTypes from "prop-types";

export default function StatisticsChart({ title, description, footer }) {
  return (
    <div className="border border-blue-gray-100 shadow-sm rounded p-4 bg-white">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-blue-gray-800">{title}</h3>
        <p className="text-sm text-blue-gray-600">{description}</p>
      </div>
      {/* Placeholder para o gráfico */}
      <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center">
        <span className="text-blue-gray-500">Chart Placeholder</span>
      </div>
      {footer && <div className="text-xs text-blue-gray-500">{footer}</div>}
    </div>
  );
}

StatisticsChart.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  footer: PropTypes.node,
};
